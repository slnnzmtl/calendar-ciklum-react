import Store from "./store";

export function onDragStart(event) {
  event
  .target
  .id = Math.random();
  
  event
  .dataTransfer
  .setData('text/plain', event.target.id);
}

export function onDragOver(event) {
  event.preventDefault();
}

export function onDrop(event, {day, time}) {
  const id = event
    .dataTransfer
    .getData('text');

  event
    .dataTransfer
    .clearData();

  const draggableElement = document.getElementById(id);
  const dropzone = {
    element: event.target,
    data: {day, time}
  };

  putElement(draggableElement, dropzone);
}

function putElement(element, dropzone) {

  console.log(element)
  console.log(dropzone)

  const drop = {};
  const { events } = Store;

  // drop.day = dropzone.data.day;
  // drop.time = dropzone.data.time;
  

  // if (dropzoneCheck(events, dropzone)) {
  //   dropzone.appendChild(element);

  //   element.data.day = drop.day;
  //   element.data.time = drop.time;

  //   Store.updatePosition(element.data.id, drop);
  // }
}

function dropzoneCheck(events, drop) {
  let result = true;
  if (drop.tagName === "TABLE-CELL") { 
    
    events.forEach(item => {

      if (item.data.day === drop.data.day &&
          item.data.time === drop.data.time) {
        result = false;
      }
    });
    return result;
  }
}

window.onDragStart = onDragStart;
window.onDragOver = onDragOver;
window.onDrop = onDrop;
