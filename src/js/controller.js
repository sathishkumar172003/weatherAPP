// responsible for controlling views and models

// coordinate the work of both views and models.

import modelObj from "./model.js";
import viewObj from "./view.js";

//

const handleEvent = async function (city) {
  try {
    await modelObj.getJSON(city);
    const data = modelObj.getWeatherData();
    // call the view and pass the data;
    console.log(data);
    viewObj.render(data);
  } catch (e) {
    alert(e);
  }
};

// get the coordinates of the user
const getLocationOfUser = function () {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const city = await modelObj.getGeoCodingJSON(lat, lng);

      await handleEvent(city);
    },
    function (err) {
      alert("user didnot give permission");
    }
  );
};

const confirmUser = function () {
  const userChoice = window.confirm(
    "Do you want to fetch weather for your current location"
  );
  if (userChoice) {
    getLocationOfUser();
  }
};

const init = function () {
  viewObj.formEventHandler(handleEvent);
  confirmUser();
};

init();
