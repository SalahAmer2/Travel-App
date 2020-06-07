const { createTrip } = require("./createTrip");
const { timeDiff } = require("./timeDiff");

// Async POST (will be used to post data to the server)
const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Update DOM elements
const createUI = async (projectData) => {

  const tripDataArray = Object.values(projectData);

  // console.log(tripDataArray);

  const myTripsHolder = document.getElementById("allEntryHolders");

  myTripsHolder.innerHTML = "";

  tripDataArray.forEach(tripData => {
    myTripsHolder.appendChild(
      createTrip(
        tripData.cityPhoto,
        tripData.date,
        tripData.country,
        tripData.depDate,
        tripData.retDate,
        tripData.daysLeft,
        tripData.weather,
        tripData.temp.low_temp,
        tripData.temp.max_temp,
        tripData.temp.temp,
        tripData.temp.trueOrFalse,
        tripData.tripId
      )
    )
  });

  if ($(".entryHolder")[0]) {
    // Display My Trips title if there are any trip cards
    document.getElementById("to-display-or-not").style.display = 'block';
  } else {
    // Hide My Trips title if there's no trip cards
    document.getElementById("to-display-or-not").style.display = 'none';
  }

  savetripBtn.textContent = "Save trip";
}

function deleteTrip(tripId) {
  //1. Delete the trip from the server using the "/deleteTrip"
  //2. Fetch new trip data from the server
  //3. update the UI calling the above createUI() function

  document.getElementById(tripId).classList.add("entryHolder-drop");
  setTimeout(() => {
    postData('/deleteTrip', {
      tripId: tripId
    }).then(projectData => {
      createUI(projectData);
    });
  }, 1000);
}

const init = () => {

  $(document).ready(function () {

    $(".exit").click(() => { //Putting it at a high level to let the click event bubble up the tree from the "x" button to the document element
      document.getElementById("pop-up-1").classList.add("pop-up-swing");
      document.getElementById("pop-up-2").classList.add("pop-up-swing");
      document.getElementById("pop-up-3").classList.add("pop-up-swing");
      setTimeout(() => {
        document.getElementById("pop-up-1").style.display = 'none';
        document.getElementById("pop-up-2").style.display = 'none';
        document.getElementById("pop-up-3").style.display = 'none';
      }, 1000);
    });

  });

  //Function to be triggered after clicking the generate button
  const performAction = (e) => {
    e.preventDefault()

    const city = document.getElementById('city').value;

    const baseURLGeo = "http://api.geonames.org/searchJSON?q=";
    const baseURLWeatherCurrent = "https://api.weatherbit.io/v2.0/current?";
    const baseURLWeatherForecast = "https://api.weatherbit.io/v2.0/forecast/daily?";
    const baseURLPixabay = "https://pixabay.com/api/?";

    // Create a new date instance dynamically with JS
    const d = new Date(); //changed it from let to const
    const newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear(); //changed it from let to const

    const depDateFromUser = document.getElementById("departureDate").value;
    const returnDateFromUser = document.getElementById("returnDate").value;

    const pop_up_1 = document.getElementById("pop-up-1");
    const pop_up_2 = document.getElementById("pop-up-2");
    const pop_up_3 = document.getElementById("pop-up-3");
    
    if (
      (city === "" || city === null) ||
      (depDateFromUser === "" || depDateFromUser === null) ||
      (returnDateFromUser === "" || returnDateFromUser === null)
    ) {
      pop_up_2.classList.remove("pop-up-swing");
      pop_up_2.style.display = 'block';
    } else {

      const savetripBtn = document.getElementById("savetripBtn");

      const daysLeft = timeDiff(newDate, depDateFromUser, returnDateFromUser);

      if (daysLeft === "Error: invalid dates") {
        pop_up_1.classList.remove("pop-up-swing");
        pop_up_1.style.display = 'block';
        return;
      }

      savetripBtn.textContent = "Fetching data. Please wait...";

      postData('/postAndGetFunc', {
        baseURLGeo: baseURLGeo,
        baseURLWeatherCurrent: baseURLWeatherCurrent,
        baseURLWeatherForecast: baseURLWeatherForecast,
        baseURLPixabay: baseURLPixabay,
        newDate: newDate,
        city: city,
        depDateFromUser: depDateFromUser,
        returnDateFromUser: returnDateFromUser
      }).then(projectData => {
        if(projectData){
          createUI(projectData);
          console.log(projectData);
        } else {
          console.log(projectData);
          console.log("else statement triggered");
          savetripBtn.textContent = "Save trip";
          pop_up_3.classList.remove("pop-up-swing");
          pop_up_3.style.display = 'block';
        }
      });
    }
  }

  document.getElementById("savetripBtn").addEventListener("click", performAction);

}

export { init, deleteTrip};