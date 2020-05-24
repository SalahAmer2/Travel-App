# Travel App

This project is a travel application where you enter the location _(city)_ your travelling to and the date you are leaving and returning. If the trip is within a week, you will get the current weather forecast _(temperature and weather description)_. If it is within more than a week, you will get a predicted forecast _(highest and lowest temperature and weather description)_. The **Weatherbit API** is used in the app to get the weather forecast _(temperature and weather description)_, but it only takes in coordinates of the location for it to the get weather data so the app also uses the **Geonames API** to get those coordinates. After getting all this data the uses the **Pixabay API** to get an image of the location entered. When you submit _(save the trip)_ the info a trip card is made with all the details. You can make as many trip cards as you want and you can delete them too. You get an error message with animations when you enter invalid dates and there's a drop animation for when you delete trip cards _(the trip cards drop when you delete them)_. You get a **_"My Trips"_** title above all the trips when there's trips saved if there are no trips the title won't be there.

## How To Run

To install app packages, run:

```bash
npm install
```

To build, run:

```bash
npm run build
```

To use dev environment, run:

```bash
npm run dev
```

To run the server, run:

```bash
npm run start
```