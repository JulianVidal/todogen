let cities, actions, places;
window.onload = () => {
    document.getElementById("button").addEventListener("click", () => {
    document.getElementById("text").classList.remove("animate__flipInX")
    document.getElementById("text").classList.add("animate__flipOutX")
  
    setTimeout(() => {
      document.getElementById("text").innerHTML = 0;
      document.getElementById("text").classList.remove("animate__flipOutX")
      main()
      document.getElementById("text").classList.add("animate__flipInX")
    }, 1000)
  })
}

document.addEventListener("keyup", e => {
  if (e.key == ' ') {
    const theme = document.documentElement.getAttribute("theme") == "dark" ? "light" : "dark";
    document.documentElement.setAttribute("theme", theme)
  }
})

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute("theme", "dark")
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
  document.documentElement.setAttribute("theme", e.matches ? "dark" : "light")
});

Promise.all([
  fetch("./cities.json").then(res => res.json()).then(json => json.map(el => el.name)),
  fetch("./actions.json").then(res => res.json()),
  fetch("./places.json").then(res => res.json())
])
.then(data => {
  [cities, actions, places] = data
  main()
})

function main() {
  let string = '';

  string += pickRandom(actions) + pickRandom(cities) + "'s" + pickRandom(places)

  const el = document.getElementById("text")
  el.innerHTML = string;
}

function pickRandom(array) {return ' ' + array[Math.floor(Math.random() * array.length)]}