import AbstractView from "./AbstractView.js"
import Form from "./../components/Form.js"
import EventList from "./../components/EventList.js"
import Filter from "./../components/Filter.js"

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle("Home")
  }
  async getHtml() {
    const form = new Form
    const eventList = new EventList
    const filter = new Filter
    return `
      ${ form.getForm }
      ${ filter.getFilter() }
      ${ eventList.getItems() }
    `
  }
}