import { addFormLogic } from "./Form.js"
import { addFilterLogic } from "./Filter.js"
import { addEventListLogic } from "./EventList.js"

export default function(view) {
  if (view.includes("/events/")) return
  else {
    addFormLogic()
    addFilterLogic()
    addEventListLogic()
  }
}