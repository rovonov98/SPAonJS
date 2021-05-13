import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle("Home")
  }
  async getHtml() {
    function setItems() {
      return ''
    }
    return `
      <h1>Home</h1>
      <div>
      ${ setItems() }
      </div>
    `
  }
}