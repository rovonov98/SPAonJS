const router = async () => {
  const routes = [
    { path: "/", view: () => {}},
    { path: "/", view: () => {}},
    { path: "/", view: () => {}}
  ]
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  router()
})