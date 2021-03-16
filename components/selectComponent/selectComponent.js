import "./MultiSelect.scss";
import {subscribe} from "../../utils/eventBus.js";
import selectComponent from "./selectComponent.html";
import ComponentsHelper from "../../utils/ComponentsHelper";

export default class SelectComponent extends HTMLElement {

  constructor(data) {
    super();

    console.log(data)

    this.data = {
      list: data,
      selected: []
    };
  }

  connectedCallback() {

    this.appendChild(ComponentsHelper.parseElement(selectComponent));
    this.classList.add("select-multiply");

    document.onclick = event => this.showDropDown(this, event); 
    this.selectValue = this.querySelector(".select-multiply__value");

    let dropdown = this.querySelector(".select-multiply__dropdown");
    dropdown.appendChild(this.fillOptions(this.data.list));

    this.querySelectorAll(".select-multiply__dropdown-item").forEach(elem => {
      elem.onclick = () => this.choose(elem);
    });

    subscribe("resetForm", () => {
      this.data.selected = [];
    });
  }

  fillOptions(data) {
    let container = document.createDocumentFragment();
    data.forEach(item => {
      let elem = document.createElement("p");
      elem.innerHTML = item.name;
      elem.dataset.name = item.name;
      elem.dataset.value = item.name;
      elem.className = "select-multiply__dropdown-item";

      container.appendChild(elem);
    });
    return container;
  }

  showDropDown(elem, event) {
    let classList = event.target.classList;
    if (classList.contains("select-multiply") || classList.contains("select-multiply__value")) {
      elem.classList.toggle("open");
    } else if (classList.contains("select-multiply__dropdown-item")) {

    } else {
      elem.classList.remove("open");
    } 
  }

  choose(elem) {
    let value = elem.dataset.value;
    let selected = elem.classList.contains("selected");
    let selectAll = this.querySelector("[data-value=all]")

    if (value !== "all") {

      if (!selected) {
        elem.classList.add("selected");
        this.data.selected.push(value);
      } else {
        elem.classList.remove("selected");
        selectAll.classList.remove("selected");

        this.data.selected.forEach((item, index) => {
          if (item === value) {
            this.data.selected.splice(index, 1);
          }
        });
      }

    } else {
      let all = Array.from(elem.parentNode.children);

      if (!selected) {
        this.data.selected = [];

        all.forEach((item, index) => {
          if (index > 0) {
            this.data.selected.push(item.dataset.value);
          }
          
          item.classList.add("selected");
        });
      } else {
        all.forEach(item => {
          item.classList.remove("selected");
        });

        this.data.selected = [];
      }
    }
    this.selectValue.innerText = this.data.selected.length ? this.data.selected.join(",") : "Choose members";    
  }
}
