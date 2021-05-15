import Home from "./views/Home.js"
import Event from "./views/EventView.js"
import AddLogic  from "./Logic/Logic.js"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const addSpa = () => {
  document.body.addEventListener("click", event => {
    if (!event.target.href) {
      event = event.target.parentNode
      if (!event.target.href) {
        event = event.target.parentNode
      }
    }
    if (event.target.matches("[data-link]")) {
    event.preventDefault
    navigateTo(event.target.href)
    }
  })
}

const getParams = match => {
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]]
  }))
}

const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/events", view: Event },
    { path: "/events/:id", view: Event },
  ]
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    }
  })
  let match = potentialMatches.find(potentialMatch => {
    return potentialMatch.result !== null
  })
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    }
  }

  const view = new match.route.view(getParams(match))

  document.querySelector("#app").innerHTML = await view.getHtml()
  AddLogic(match.route.path, getParams(match))
  addSpa()
}

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
  // addSpa()
  router()
})