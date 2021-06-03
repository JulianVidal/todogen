let cities, words, actions, places;
console.log(document)
document.getElementById("button").addEventListener("click", () => {
  main()
})

document.addEventListener("keyup", e => {
  if (e.key == ' ') {
    const theme = document.documentElement.getAttribute("theme") == "dark" ? "light" : "dark";
    document.documentElement.setAttribute("theme", theme)
  }
})

Promise.all([
  fetch("./cities.json").then(res => res.json()).then(json => json.map(el => el.name)),
  fetch("./common.json").then(res => res.json()).then(json => json.commonWords),
  fetch("./actions.json").then(res => res.json()),
  fetch("./places.json").then(res => res.json())
])
.then(data => {
  [cities, words, actions, places] = data
  main()
})

function main() {
  let string = '';

  string += pickRandom(actions) + pickRandom(cities) + "'s" + pickRandom(places)

  const el = document.getElementById("text")
  el.innerHTML = string;
}

function pickRandom(array) {return ' ' + array[Math.floor(Math.random() * array.length)]}