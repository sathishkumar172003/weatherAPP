// responsible for controlling views and models

// coordinate the work of both views and models.

import modelObj from "./model.js";
import viewObj from "./view.js";

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

const init = function () {
  viewObj.formEventHandler(handleEvent);
};

init();
