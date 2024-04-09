import { API_KEY, API_URL } from "./config.js";

class WeatherReport {
  // private data that contains the weather data;
  _weatherData;

  // public method that fetches the weather data from api
  async getJSON(city) {
    const url = API_URL + "?units=metric&q=" + city + "&appid=" + API_KEY;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok)
        throw new Error("can not find weather report for the city provided");

      this._weatherData = {
        title: `${
          data.weather[0].main[0].toLowerCase() +
          data.weather[0].main.slice(1).toLowerCase()
        }`,
        city: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };
    } catch (e) {
      throw e;
    }
  }

  // public method that returns  weather data
  getWeatherData() {
    return this._weatherData;
  }
}

export default new WeatherReport();
