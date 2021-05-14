import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Event")
    this.setData = function() {
      return JSON.parse(localStorage.getItem("events")).filter((event) => {
        return event.id == params.id
      })[0]
    }
  }
  async getHtml() {
    const error = "Нет данных"
    return `
      <section class="section">
        <div class="event-item">Заголовок: ${ this.setData()?.eventType || error }</div>
        <div class="event-item">Дата начала: ${this.setData()?.eventStart || error }</div>
        <div class="event-item">Дата окончания: ${ this.setData()?.eventEnd || error }</div>
        <div class="event-item">Заголовок: ${ this.setData()?.eventHeading || error }</div>
        <div class="event-item">Описание: ${ this.setData()?.eventDescription || error }</div>
        <div class="event-item">Статус: ${ this.setData()?.eventStatus || error }</div>
        <div class="event-item">Участники: ${ this.setData()?.eventParticipantsList || error}</div>
      </section>
    `
  }
}