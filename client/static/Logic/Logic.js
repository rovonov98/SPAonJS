import { addFormLogic } from "../components/Form.js"
import { addFilterLogic } from "../components/Filter.js"
import { addEventListLogic } from "../components/EventList.js"
import { addEventViewLogic } from "../views/EventView.js"

export default function(view, params) {
  if (view.includes("/events/")) {
    addEventViewLogic(params)
  }
  else {
    addFormLogic()
    addFilterLogic()
    addEventListLogic()
  }
}