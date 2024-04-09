import {
  API_KEY,
  API_URL,
  REVERSE_GEOCODING_KEY,
  REVERSE_GEOCODING_URL,
} from "./config.js";

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
  //
  async getGeoCodingJSON(lat, lon) {
    //https://us1.locationiq.com/v1/reverse?key=pk.86d66879e780ff43ff016d3cca896c9a&lat=51.50344025&lon=-0.12770820958562096&format=json&
    const url = `${REVERSE_GEOCODING_URL}?key=${REVERSE_GEOCODING_KEY}&lat=${lat}&lon=${lon}&format=json`;

    try {
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (!response.ok) throw new Error("can not do reverse geo coding");

      const city = data.address.city;
      return city;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // public method that returns  weather data
  getWeatherData() {
    return this._weatherData;
  }
}

export default new WeatherReport();
