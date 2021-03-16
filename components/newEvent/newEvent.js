import * as Cookies from "../../utils/cookies.js";
import * as EventBus from "../../utils/eventBus";
import { workingDays, workingHours } from "../../assets/data";
import ComponentsHelper from "../../utils/ComponentsHelper";
import newEvent from "./newEvent.html";
import selectComponent from "../selectComponent/selectComponent";
import Store from "../../utils/store";

import "./EventCreationForm.scss";

export default class NewEvent extends HTMLElement {

  constructor() {
    super();

        this.data = {
            participants: Store.users,
            days: workingDays,
            hours: workingHours
        };
  }

  connectedCallback() {

    this.appendChild(ComponentsHelper.parseElement(newEvent))

    this.buttonCancel = this.querySelector(".button-cancel");
    this.buttonSubmit = this.querySelector(".button-submit");
    this.participants = this.querySelector("#select-participants");
    this.days = this.querySelector("#select-days");
    this.time = this.querySelector("#select-time");
    this.name = this.querySelector("#name");

    this.buttonSubmit.onclick = () => this.createEvent();
    this.buttonCancel.onclick = () => this.closeTab();

    let multiSelect = new selectComponent(this.data.participants.map(item => item.data));
    this.participants.appendChild(multiSelect);
    multiSelect.classList.add("new-event__input");


    ComponentsHelper.elementMultiplier("option", ["data-value"], this.days, this.data.days)
    this.days.querySelectorAll("option").forEach(item => {
      item.innerText = item.dataset.value;
    })

    ComponentsHelper.elementMultiplier("option", ["data-value"], this.time, this.data.hours) 
    this.time.querySelectorAll("option").forEach(item => {
      item.innerText = `${item.dataset.value}:00`;
    })

  }

  createEvent() {
    let object = {};
    object.name = this.name.value;
    object.day = this.days.value;
    object.time = + this.time.  value.split(":")[0];
    object.participants = this.querySelector(".select-multiply__value").innerText.split(",");


    if (this.checkFields(object)) {
      if (!this.checkIfExist(Store.events, object)) {
        console.log("free cell")

        Store.pushEvent(object);
        object = {};

        EventBus.publish("refreshEvents");
        this.closeTab();
      }
    }
  }

  checkFields(data) {
    this.clearErrors();
    let error = 0;
    if (data.name === "") {
      this.showError("Name cannot be empty.");
      error += 1;
    }
    if (data.participants.length === 0 || data.participants[0].includes("Choose members")) {
      this.showError("Please, choose members");
      error += 1;
    }

    if (error > 0) {
      return false;
    }
    return true;
  }

  checkIfExist(data, object) {
    let event = data[object.day][object.time];
    
    if(event) {
      console.log(event)
      this.showError("This time is already taken.");
      return true;
    } else {
      return false;
    }
  }

  showError(text) {
    let span = document.createElement("span");
    span.classList.add("error-message");
    span.innerText = text;

    this.insertAdjacentElement("afterbegin", span);
  }

  clearErrors() {
    const errors = this.querySelectorAll(".error-message");
    errors.forEach((item) => {
      item.remove();
    });
  }

  closeTab() {
    EventBus.publish("resetForm");

    window.location.hash = ""
  }
}