import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function TodayWeather({ latitude, longitude }) {
  let [name, setName] = useState("");

  let [main, setMain] = useState({});

  let [weather, setWeather] = useState({});

  let [wind, setWind] = useState({});

  useEffect(() => {
    const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
    const apiKey = "b9eaae7a7163779b65d7f19afa3c5020";
    // console.log("I am changed");
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.weather) {
          setName(data.name);
          setMain(data.main);
          setWeather(data.weather[0]);
          setWind(data.wind); //name, main, weather, wind
        }
      });
  }, [latitude, longitude]);

  if (name) {
    return (
      <Box
        width="300px"
        borderRadius="6px"
        boxShadow="10px -2px 20px 2px rgb(0 0 0 / 30%)"
        color="#fff"
        backgroundColor="#333"
        margin="20px auto 0 auto"
        padding="0 20px 20px 20px"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <p
              style={{
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: 1,
                margin: 0,
                letterSpacing: "1px",
              }}
            >
              {name}
            </p>

            <p
              style={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeigh: 1,
                margin: 0,
              }}
            >
              {weather.description}, {weather.icon}
            </p>
          </Box>
          <img
            style={{
              width: "100px",
            }}
            alt="weather"
            src={`icons/${weather.icon}.png`}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <p
            style={{
              fontWeight: 600,
              fontSize: "60px",
              weight: "auto",
              letterSpacing: "-5px",
              margin: "10px 0",
            }}
          >
            {main.temp}°C
          </p>
          <Box
            style={{
              width: "100%",
              paddingLeft: "20px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  textAlign: "left",
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Details
              </span>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  textAlign: "left",
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Feels like
              </span>
              <span
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                {main.feels_like} C
              </span>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  textAlign: "left",
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Wind
              </span>
              <span
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                {wind.speed} m/s
              </span>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  textAlign: "left",
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Humidity
              </span>
              <span
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                {main.humidity}%
              </span>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  textAlign: "left",
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Pressure
              </span>
              <span
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                {main.pressure} hPa
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <>Loading</>;
  }
}
