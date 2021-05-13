import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Event")
  }
  async getHtml() {
    return `
      <h1>Event</h1>
    `
  }
}