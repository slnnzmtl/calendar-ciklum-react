import API from "./index";

class EventsAPI extends API {
    constructor() {
        super();
        
        this.entity = "events";
    }

    async get() {
        let response = await super.get(this.entity);
        let data = await response.json();

        if (data) {
            data.forEach(item => {
                item.data = JSON.parse(item.data);
            });

            return data;
        } else {
            return [];
        }
    }
    
    async post(data) {
        return await super.post(this.entity, data);
    }

    async delete(id) {
        return await super.delete(this.entity, id);
    }

    async put(id, data) {
        return await super.put(this.entity, id, data);
    }
} 

export default new EventsAPI();