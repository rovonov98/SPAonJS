export default class Filter {
  constructor() {
    this.setOptions = function() {
      const typeListObj = new Set(JSON.parse(localStorage.getItem("events")).map((event) => event.eventType))
      const typeList = [...typeListObj]
      return typeList.map((type) => {
        return `
          <option class="type-option" value="${ type }">${ type }</option>
        `
      }).join("")
    }
    this.getFilter = function() {
      return `
        <section class="section">
          <form class="filter-form-time section-container">
            <div class="input-container">
              <span>Дата начала</span>
              <input 
                id="filterStart" 
                class="filter-input-time input" 
                type="text" 
                placeholder="December 17, 1995"
                required
              />
            </div>
            <div class="input-container">
              <span>Дата конца</span>
              <input 
                id="filterEnd" 
                class="filter-input-time input" 
                type="text"
                placeholder="December 18, 1995"
                required
              />
            </div>
            <button class="button" type="submit">Фильтр по дате</button>
          </form>
          <form class="section-container filter-form-type">
            <select multiple="multiple" class="input-container type-input" required>
              ${ this.setOptions() }
            </select>
            <button class="button" type="submit">Фильтр по типу</button>
          </form>
        </section>
      `
    }
    this.update = function() {
      document.querySelector(".type-input").innerHTML = this.setOptions()
      addFilterLogic()
    }
  }
}

export function addFilterLogic() {
  const eventList = JSON.parse(localStorage.getItem("events"))

  function timeFilter() {
    const filterInputs = Array.from(document.querySelectorAll(".filter-input-time"))
    const timeForm = document.querySelector(".filter-form-time")
    const timeObject = {
      filterStart: null,
      filterEnd: null
    }
    function submitHandler(event) {
      event.preventDefault()
      eventList.map((item) => {
        const eventElem = document.querySelector(`#${ item.id }`)
        if (
          new Date(item.eventStart) < new Date(timeObject.filterStart) || 
          new Date(item.eventEnd) > new Date(timeObject.filterEnd) ||
          new Date(item.eventStart) > new Date(timeObject.filterEnd)) {
          eventElem.style.display = "none"
        }
        else {
          eventElem.style.display = "block"
        }
      })
    }

    timeForm.addEventListener("submit", function(event) {
      submitHandler(event)
    })
    filterInputs.map((input) => {
      input.addEventListener("input", function(event) {
        timeObject[event.target.id] = event.target.value
      })
    })
  }
  timeFilter()

  function typeFilter() {
    const typeForm = document.querySelector(".filter-form-type")
    const typeSelect = document.querySelector(".type-input")
    
    function submitHandler(event) {
      event.preventDefault()
      const types = Array.from(typeSelect.options).filter((option) => option.selected)
      eventList.map((item) => {
        const eventElem = document.querySelector(`#${ item.id }`)
        const check = types.some((type) => {
          return item.eventType === type.value
        })
        if (!check) eventElem.style.display = "none"
        else eventElem.style.display = "block"
      })
    }

    typeForm.addEventListener("submit", function(event) {
      submitHandler(event)
    })
  }
  typeFilter()
}