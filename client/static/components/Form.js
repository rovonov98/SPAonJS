import EventList from './EventList.js'
import Filter from './Filter.js'

export default class Form {
  constructor() {
    const inputs = [
      {
        type: "text",
        isRequired: true,
        id: "eventType",
        description: "Тип",
        placeholder: "Тип"
      },
      {
        type: "text",
        isRequired: true,
        id: "eventStart",
        description: "Дата начала",
        placeholder: "December 17, 1995"
      },
      {
        type: "text",
        isRequired: false,
        id: "eventEnd",
        description: "Дата окончания",
        placeholder: "December 18, 1995"
      },
      {
        type: "text",
        isRequired: false,
        id: "eventHeading",
        description: "Заголовок",
        placeholder: "Заголовок"
      },
      {
        type: "text",
        isRequired: false,
        id: "eventDescription",
        description: "Описание",
        placeholder: "Описание"
      },
      {
        type: "text",
        isRequired: false,
        id: "eventStatus",
        description: "Статус",
        placeholder: "Статус"
      },
      {
        type: "text",
        isRequired: false,
        id: "eventParticipantsList",
        description: "Список участников",
        placeholder: "Список участников"
      }
    ]
    const inputFields = function(className) {
      return inputs.map((input) => {
        return `
          <div class="input-container">
            <span>${ input.description }</span>
            <input 
              class="input input-${ className? className : 'add' }" 
              id="${ className ? className + input.id : input.id }"
              type="${ input.type }"
              placeholder="${ input.placeholder }"
              ${ input.isRequired ? "required" : "" }
            />
          </div>
        `
      }).join("")
    }

    this.getForm = function(className, id) {
      return `
        <form class="${  className ? className + '-input' : 'input' }-list section">
          ${ inputFields(className) }
          <button ${ id? "id = change-button-" + id : ""  }  class="button" type="submit">${ className ? 'Подтвердить' : 'Добавить' }</button>
        </form>
      `
    }
  }
}

export function addFormLogic() {
  const form = document.querySelector(".input-list")
  const inputs = Array.from(document.querySelectorAll(".input-add"))
  const eventObject = {
    id: null,
    eventType: null,
    eventStart: null,
    eventEnd: null,
    eventHeading: null,
    eventDescription: null,
    eventStatus: null,
    eventParticipantsList: null
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    eventObject.id = Date.now().toString(36) + Math.random().toString(36).substr(2)
    const events = JSON.parse(localStorage.getItem("events"))
    events.push({ ...eventObject })
    localStorage.setItem("events", JSON.stringify(events))
    const eventList = new EventList
    eventList.update()
    const filter = new Filter
    filter.update()
  }
  function onChangeHandler(event) {
    eventObject[event.target.id] = event.target.value
  }

  form.addEventListener("submit", (event) => {
    onSubmitHandler(event)
  })
  inputs.map((input) => {
    input.addEventListener("input", (event) => {
      onChangeHandler(event)
    })
  })
}