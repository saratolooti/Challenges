/* -------------- map setup -------------- */
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = {};

//removing the default zoom btns from map
document.querySelector(".leaflet-control-zoom").style.display = "none";
document.querySelector(".leaflet-control-container").style.opacity = "0";

/* -------------- fetch data -------------- */
let API_Key = "at_W0dfkECAi4i41FkbZpCB8HevhFzaY";

let searchBtn = document.getElementById("submit-btn");
let searchInp = document.getElementById("search");
let value = "192.212.174.101";

searchBtn.addEventListener("click", () => {
  searchOperation();
});

searchInp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchOperation();
});

async function fetchData() {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${API_Key}&domain=${searchInp.value}`
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("here");
    showError();
  }
}

async function searchOperation() {
  let result = await fetchData();

  document.getElementById("display-IP").textContent = result.ip;
  document.getElementById(
    "display-location"
  ).textContent = `${result.location.region},\n${result.location.city}`;
  document.getElementById(
    "display-timezone"
  ).textContent = `UTC ${result.location.timezone}`;
  document.getElementById("display-ISP").textContent = result.isp;

  // rmeove the previous marker
  map.removeLayer(marker);
  drawMap(result.location.lat, result.location.lng);
}

/* -------------- draw map after each search -------------- */
function drawMap(lat, lng) {
  let locationIcon = L.icon({
    iconUrl: "./images/icon-location.svg",

    iconSize: [47, 56.26], // size of the icon
    iconAnchor: [23, 60], // point of the icon which will correspond to marker's location
  });

  map.flyTo([lat, lng], 13);
  marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map);
}

/* -------------- display whenever error occurs -------------- */
function showError() {
  let errorPopup = document.getElementById("popup");
  errorPopup.style.right = "10px";
  errorPopup.textContent = "Inserta a valid Domain or IP!";

  setTimeout(() => {
    errorPopup.style.right = "-500px";
  }, 3000);
}

//getting and displaying actaul Ip of user
searchOperation();
