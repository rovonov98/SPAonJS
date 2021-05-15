import AbstractView from "./AbstractView.js"
import Form from '../components/Form.js'

export default class Event extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Event")
    this.setData = function() {
      return JSON.parse(localStorage.getItem("events")).filter((event) => {
        return event.id === params.id
      })[0]
    }
  }
  async getHtml(id) {
    const error = "Нет данных"
    const data = this.setData(id)
    const form = new Form
    return `
      <section class="section">
        <div class="event-item">Заголовок: ${ data.eventType || error }</div>
        <div class="event-item">Дата начала: ${data.eventStart || error }</div>
        <div class="event-item">Дата окончания: ${ data.eventEnd || error }</div>
        <div class="event-item">Заголовок: ${ data.eventHeading || error }</div>
        <div class="event-item">Описание: ${ data.eventDescription || error }</div>
        <div class="event-item">Статус: ${ data.eventStatus || error }</div>
        <div class="event-item">Участники: ${ data.eventParticipantsList || error}</div>
        <button id="toggle-button-${ data.id }" class="button">Изменить</button>
        <div id="form-change-${ data.id }" class="change-input-list-wrapper display-none">
          ${ form.getForm("change", data.id,) }
        </div>
      </section>
    `
  }
}

export function addEventViewLogic(params) {
  const changeForm = document.querySelector(".change-input-list")
  const toggleButton = document.querySelector(`#toggle-button-${ params.id }`)
  const formContainer = document.querySelector(".change-input-list-wrapper")
  const changeInputs = Array.from(document.querySelectorAll(".input-change"))
  let toggle = false
  const eventObject = {
    id: params.id,
    eventType: null,
    eventStart: null,
    eventEnd: null,
    eventHeading: null,
    eventDescription: null,
    eventStatus: null,
    eventParticipantsList: null
  }

  function changeHandler(event) {
    eventObject[event.target.id.replace("change", "")] = event.target.value
  }
  function submitHandler(event) {
    event.preventDefault()
    const events = JSON.parse(localStorage.getItem("events"))
    function findIndex(item) {
      return item.id === eventObject.id
    }
    events[events.findIndex(findIndex)] = { ...eventObject }
    localStorage.setItem("events", JSON.stringify(events))
    document.location.reload()
  }

  changeInputs.map((input) => {
    input.addEventListener("input", function(event) {
      changeHandler(event)
    })
  })
  toggleButton.addEventListener("click", function() {
    formContainer.classList.toggle("display-none")
  })
  changeForm.addEventListener("submit", function(event) {
    submitHandler(event)
  })
}