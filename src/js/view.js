class View {
  _searchTextEl = document.querySelector(".search_text");
  _formEl = document.querySelector("form");
  _cityNameEl = document.querySelector(".city_name");
  _temperatureEl = document.querySelector(".temperature");
  _humidityEl = document.querySelector(".humidity_text");
  _windSpeedEl = document.querySelector(".wind_speed_text");
  _weatherImgEl = document.querySelector(".weather_icon");
  _hiddenBlockEl = document.querySelectorAll(".hidden_block");
  _data;

  render(data) {
    this._data = data;
    this._toggleWindow();
    this._clear();
    this._changeMarkup();
  }

  formEventHandler(handler) {
    // prettier-ignore
    this._formEl.addEventListener('submit', async function(e){
        
        e.preventDefault()

        const data = new FormData(this._formEl)
      
        const dataObj = Object.fromEntries(data)
  
        await handler(dataObj.city)

    }.bind(this))
  }

  _toggleWindow() {
    this._hiddenBlockEl.forEach((el) => {
      if (el.classList.contains("hidden")) el.classList.remove("hidden");
    });
  }

  _changeMarkup() {
    this._cityNameEl.innerText = this._data.city;
    this._temperatureEl.innerText = this._data.temp;
    this._humidityEl.innerHTML = this._data.humidity;
    this._windSpeedEl.textContent = this._data.wind;

    const imgArr = ["clear", "clouds", "drizzle", "mist", "rain", "snow"];
    if (imgArr.some((ele) => ele == this._data.title))
      this._weatherImgEl.setAttribute(
        "src",
        `./src/img/${this._data.title}.png`
      );
    else this._weatherImgEl.setAttribute("src", `./src/img/clouds.png`);
  }

  _clear() {
    this._cityNameEl.innerText = "";
    this._humidityEl.innerText = "";
    this._windSpeedEl.innerText = " ";
    this._temperatureEl.innerHTML = " ";
  }
}

export default new View();
