// all the dom elements

class App {
  _searchTextEl = document.querySelector(".search_text");
  _formEl = document.querySelector("form");
  _cityNameEl = document.querySelector(".city_name");
  _temperatureEl = document.querySelector(".temperature");
  _humidityEl = document.querySelector(".humidity_text");
  _windSpeedEl = document.querySelector(".wind_speed_text");
  _weatherImgEl = document.querySelector(".weather_icon");
  _hiddenBlockEl = document.querySelectorAll(".hidden_block");
  _data;

  init() {}

  formEventHandler() {
    // prettier-ignore
    this._formEl.addEventListener('submit', function(e){
        
        e.preventDefault()

        const data = new FormData(this._formEl)
      
        const dataObj = Object.fromEntries(data)
  
        this._networkApi(dataObj.city)

    }.bind(this))
  }

  _networkApi(city) {
    const url = API_URL + "?units=metric&q=" + city + "&appid=" + API_KEY;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("an error has occurred");
        return response.json();
      })
      .then((data) => {
        console.log(data);

        this._data = {
          title: `${
            data.weather[0].main[0].toLowerCase() +
            data.weather[0].main.slice(1).toLowerCase()
          }`,
          city: data.name,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          wind: data.wind.speed,
        };

        this._toggleWindow();

        this._changeMarkup();
      })
      .catch((err) => {
        alert("can not find any result ");
      });
  }

  _toggleWindow() {
    this._hiddenBlockEl.forEach((el) => {
      if (el.classList.contains("hidden")) el.classList.remove("hidden");
    });
  }

  _changeMarkup() {
    this._clear();
    this._cityNameEl.innerText = this._data.city;
    this._temperatureEl.innerText = this._data.temp;
    this._humidityEl.innerHTML = this._data.humidity;
    this._windSpeedEl.textContent = this._data.wind;

    const imgArr = ["clear", "clouds", "drizzle", "mist", "rain", "snow"];
    if (imgArr.some((ele) => ele == this._data.title))
      this._weatherImgEl.setAttribute("src", `./img/${this._data.title}.png`);
    else this._weatherImgEl.setAttribute("src", `./img/clouds.png`);
  }

  _clear() {
    this._cityNameEl.innerText = "";
    this._humidityEl.innerText = "";
    this._windSpeedEl.innerText = " ";
    this._temperatureEl.innerHTML = " ";
  }
}

const app = new App();
app.formEventHandler();
