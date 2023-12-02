import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function WeeklyWeather({ latitude, longitude }) {
  let [data, setData] = useState([]);

  const week_days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
    const apiKey = "b9eaae7a7163779b65d7f19afa3c5020";

    let URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data.list.splice(0, 7));
      });
  }, [latitude, longitude]);

  const dayInWeek = new Date().getDay();
  const forecastDays = week_days
    .slice(dayInWeek, week_days.length)
    .concat(week_days.slice(0, dayInWeek));

  return (
    <>
      <label
        style={{
          fontSize: "23px",
          fontWeight: 700,
          padding: "50px 0px 50px 0px",
        }}
      >
        Next 7 Days Forecast
      </label>
      {data.map((item, idx) => {
        return (
          <Accordion
            style={{
              width: "30%",
            }}
          >
            <AccordionSummary>
              <img
                style={{
                  width: "40px",
                }}
                alt="weather"
                src={`icons/${item.weather[0].icon}.png`}
              />
              <label
                style={{
                  color: "#212121",
                  flex: "1 1",
                  fontWeight: 600,
                  marginLeft: 0,
                }}
              >
                {forecastDays[idx]}
              </label>
              <label
                style={{
                  flex: "1 1",
                  marginRight: "15px",
                  textAlign: "right",
                }}
              >
                {item.weather[0].description}
              </label>
              <label
                style={{
                  color: "#757575",
                }}
              >
                {item.main.temp_min} / {item.main.temp_max}
              </label>
            </AccordionSummary>

            <AccordionDetails>
              <Typography
                style={{
                  display: "flex",
                  height: "30px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label>Pressure</label>
                <label>{item.main.pressure}</label>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  height: "30px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label>Humidity</label>
                <label>{item.main.humidity}</label>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  height: "30px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label>Clouds</label>
                <label>{item.clouds.all}</label>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  height: "30px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label>Wind Speed</label>
                <label>{item.wind.speed} m/s</label>
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
