import Events from "./api/events";
import Users from "./api/users";
import * as Cookies from "./cookies";
import { workingDays, workingHours } from "../assets/data";

import { publish, subscribe } from "./eventBus";


class Store {
    constructor() {
        this.state = {};

        subscribe("login", () => {
            this.getCurrentUser();
        });

        subscribe("participantFilterChanged", (data) => {
            this.state.events = this.filterEventsByParticipant(data, this.state.basicEvents);
            publish("refreshEvents");
        })

        this.state.workingDays = workingDays;
        this.state.workingHours = workingHours;
    }

    async getEvents() {
        let response = await Events.get();
        this.state.events = this.formatEvents(response);
        this.state.basicEvents = response;
    }

    formatEvents(array) {
        let formattedArray = {};

        this.workingDays.forEach(day => {
            formattedArray[day] = this.filterEventsByDay(day, array);
        });

        console.log(formattedArray)

        return formattedArray;
    }

    filterEventsByDay(key, array) {
        let filteredObj = {};

        array.forEach(({id, data}) => {
            
            if (data.day === key) {
                filteredObj[data.time] = this.refactorEvent(id, data);
            }
        });

        return filteredObj;
    }

    filterEventsByParticipant(key, array) {
        
        if (key) {
            let filtered = array.filter(({data}) => data.participants.includes(key));        
            return this.formatEvents(filtered);
        } else {
            return this.formatEvents(array);
        }
    }

    refactorEvent(id, {name, participants}) {
        return {
            id,
            name,
            participants
        };
    }

    pushEvent(data) {
        
        Events.post(data)
        .then(() => {
            this.getEvents()
            .then(() => {
                publish("refreshEvents");
            })
        })
    }

    deleteEvent(id, data) {
        return Events.delete(id)
        .then(() => {
            delete this.state.events[data.day][data.time];
            console.log(this.state.events);
            window.location.hash = "/";
            publish("refreshEvents");   
        })
    }

    updatePosition(id, drop) {

        this.state.events.forEach((item) => {
            if (item.id === id) {
                item.data.day = drop.day;
                item.data.time = drop.time;
                drop.participants = item.data.participants;
                drop.name = item.data.name;

                Events.put(id, drop);
            }
        });
    }

    async getUsers() {
        let response = await Users.get();
        this.state.users = response;
    }

    pushUser(data) {
        Events.post(data)
        .then(() => {
            this.state.users.push(data);
            publish("refreshUsers");
        })
        .catch(error => {
            console.log(error)
        })
    }

    clearCurrentUser() {
        Cookies.deleteCookie("currentUser");
    }

    async getCurrentUser() {
        let cookies = Cookies.getCookie("currentUser");
        this.state.currentUser = await cookies ? JSON.parse(cookies) : {};
    }
    
    async setCurrentUser(data) {
        Cookies.setCookie("currentUser", JSON.stringify(data))
        .then(() => {
            this.state.currentUser = data;
            return true;
        });
    }

    getData() {
        let events = this.getEvents();
        let users = this.getUsers();
        let current = this.getCurrentUser();

        return new Promise(resolve => {
            events.then(() => {
                users.then(() => {
                    current.then(() => {
                        resolve();
                    })
                })
            })
        })
    }

    getEventByDate(day, time) {
        let eventsByDay = this.state.events[day];
        let eventsByTime = eventsByDay ? eventsByDay[time] : false;

        return eventsByTime ? eventsByTime : false;
    }


    get events() {
        if (this.state.events) {
            return this.state.events;
        } else {
            return new Error("No events in store");
        }
    }

    getEventById(id) {
        if (this.state.basicEvents) {
            return this.state.basicEvents.filter(item => item.id === id);
        } else {
            return null;
        }
    }

    get users() {
        if (this.state.users) {
            return this.state.users;
        } else {
            return new Error("No users in store");
        }
    }

    get isAdmin() {
        return this.state.currentUser ? this.state.currentUser.isAdmin : undefined;
    }   
    
    get isLoggedIn() {
        if (this.state.currentUser) {
            return this.state.currentUser.name ? true : false;
        } else {
            return false;
        }
    }

    get currentUser() {
        return this.state.currentUser;
    }

    get workingDays() {
        return this.state.workingDays;
    }

    get workingHours() {
        return this.state.workingHours;
    }
}

export default new Store();