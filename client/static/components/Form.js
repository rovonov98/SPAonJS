import EventList from './EventList.js'

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
        placeholder: "December 17, 1995 03:24:00"
      },
      {
        type: "text",
        isRequired: false,
        id: "eventEnd",
        description: "Дата окончания",
        placeholder: "December 17, 1995 03:24:00"
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
    const inputFields = inputs.map((input) => {
      return `
        <div class="input-container">
          <span>${ input.description }</span>
          <input 
            class="input input-add" 
            id=${ input.id }
            type=${ input.type } ${ input.isRequired ? "required" : "" }
            placeholder=${ input.placeholder }
          />
        </div>
      `
    }).join("")

    this.getForm = `
      <form class="input-list section">
        ${ inputFields }
        <button class="button" type="submit">Добавить</button>
      </form>
    `
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
  }
  function onChangeHandler(event) {
    eventObject[event.target.id] = event.target.value
    console.log(eventObject)
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