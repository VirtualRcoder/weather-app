import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./components/SearchBar";
import TodayWeather from "./components/TodayWeather";
import WeeklyWeather from "./components/WeeklyWeather";
import { useEffect, useState } from "react";
import { Box, styled, InputBase, List, TextField, Button } from "@mui/material";

function App() {
  let [latitude, setLatitude] = useState("");
  let [longitude, setLongitude] = useState("");

  const handleSearch = (location) => {
    try {
      setLatitude(location.lat);
      setLongitude(location.lon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <Box
      paddingTop="2vh"
      paddingBottom="42vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="Black"
    >
      <SearchBar handleSearch={handleSearch} />
      <TodayWeather latitude={latitude} longitude={longitude} />
      <WeeklyWeather latitude={latitude} longitude={longitude} />
    </Box>
  );
}

export default App;
