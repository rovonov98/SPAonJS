export default class EventList {
  constructor() {
    function createItems() {
      const eventList = JSON.parse(localStorage.getItem("events"))
      const error = "Нет данных"
      return (eventList.sort((a, b) => new Date(a.eventStart) - new Date(b.eventStart))
        .map((event) => {
          return `
            <div class="event-container">
              <a class="link" id="${ event.id }" href="events/${ event.id }"  data-link>
                <div class="event-item">
                  <div>Время: ${ event.eventStart } - ${ event?.eventEnd || error }</div>
                </div>
                <div class="event-item">
                  <div>Тип: ${ event.eventType }</div>
                </div>
                <div class="event-item">
                  <div>Заголовок: ${ event?.eventHeading || error }</div>
                </div>
              </a>
              <div class="event-item buttons">
                <button class="button" id="change-${ event.id }">Изменить</button>
                <button class="delete-button button" id="delete-${ event.id }">Удалить</button>
              </div>
            </div>
          `
      }).join(""))
    }
    this.getItems = function() {
      return `
        <div class="event-list section">
          <div class="container">${ createItems() }</div>
        </div>
      `
    }
    this.update = function() {
      document.querySelector(".event-list").innerHTML = `${ createItems() }`
      addEventListLogic()
    }
  }
}

export function addEventListLogic() {
  const eventList = JSON.parse(localStorage.getItem("events"))
  const listObj = new EventList
  function deleteButtonsHandle() {
    const deleteButtons = Array.from(document.querySelectorAll(".delete-button"))
    function deleteHandler(event) {
      event.stopPropagation()
      const filteredList = eventList.filter((item) => {
        return item.id !== event.target.id.replace("delete-", "")
      })
      localStorage.setItem("events", JSON.stringify(filteredList))
      listObj.update()
    }
    deleteButtons.map((button) => {
      button.addEventListener("click", function(event) {
        deleteHandler(event)
      })
    })
  }
  deleteButtonsHandle()
}
