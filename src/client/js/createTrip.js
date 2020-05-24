const createTrip = (
    cityPhoto,
    date,
    country,
    depDate,
    retDate,
    daysLeft,
    weather,
    low_temp,
    max_temp,
    temp,
    trueOrFalse,
    tripId
) => {

    const entryHolder = document.createElement("div");
    entryHolder.classList.add("entryHolder");
    entryHolder.setAttribute("id", tripId);

    // A button to delete this card
    const deleteBtn = `<button class=deleteXbtn onclick=Client.deleteTrip("${tripId}") >X</button>`;
    entryHolder.innerHTML = deleteBtn;

    const breakLine = document.createElement("br");
    entryHolder.appendChild(breakLine);

    const cityPhotoHere = document.createElement("div");
    entryHolder.appendChild(cityPhotoHere);

    const cityPhotoImg = document.createElement("img");
    cityPhotoImg.setAttribute("alt", "City Photo");
    cityPhotoImg.src = cityPhoto;
    cityPhotoHere.appendChild(cityPhotoImg);

    const dateHolder = createEntries(
        "date",
        "Today's Date: ",
        date    
    );
    entryHolder.appendChild(dateHolder);

    const countryHolder = createEntries(
        "country",
        "Country of Destination: ",
        country
    );
    entryHolder.appendChild(countryHolder);

    const depHolder = createEntries(
        "depDate",
        "Departure date: ",
        depDate
    );
    entryHolder.appendChild(depHolder);

    const retHolder = createEntries(
        "retDate",
        "Return date: ",
        retDate
    );
    entryHolder.appendChild(retHolder);

    const daysLeftHolder = createEntries(
        "daysLeft",
        "Days left: ",
        daysLeft
    );
    entryHolder.appendChild(daysLeftHolder);

    const weatherHolder = createEntries(
        "weather",
        "Weather Description: ",
        weather
    );
    entryHolder.appendChild(weatherHolder);

    if (trueOrFalse) {

        const low_tempHolder = createEntries(
            "low_temp",
            "Lowest Temperature Forecasted: ",
            low_temp + "&#8451;"
        );
        entryHolder.appendChild(low_tempHolder);

        const max_tempHolder = createEntries(
            "max_temp",
            "Highest Temperature Forecasted: ",
            max_temp + "&#8451;"
        );
        entryHolder.appendChild(max_tempHolder);

    } else {

        const tempHolder = createEntries(
            "temp",
            "Temperature: ",
            temp + "&#8451;"
        );
        entryHolder.appendChild(tempHolder);

    }

    return entryHolder;//THIS IS WHAT createTrip RETURNS
};

// Notice that createEntries isn't hoisted but still works even though it's declared below where it's used
// and this is because the createTrip() is called after the whole page is read by the console, 
// it's not called here before it's declared

//Function to make all trip entries
const createEntries = (className, entryName, entryValue) => {
    const entry = document.createElement("div");
    entry.classList.add(className);

    const entryNameDiv = document.createElement("div");
    entryNameDiv.classList.add("entry-name");
    entryNameDiv.innerHTML = entryName;
    entry.appendChild(entryNameDiv);

    const entryValueDiv = document.createElement("div");
    entryValueDiv.classList.add("entry-value");
    entryValueDiv.innerHTML = entryValue;
    entry.appendChild(entryValueDiv);

    return entry;
};

module.exports = { createTrip };