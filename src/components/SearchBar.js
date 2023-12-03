import { useState, useEffect } from "react";
import { Box, styled, InputBase, List, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ handleSearch }) {
  let [tex, setText] = useState("");

  let [city, setCity] = useState("");

  const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const apiKey = "b9eaae7a7163779b65d7f19afa3c5020";

  function handleClick() {
    //will check first if text is accurate city or not
    setCity(tex);
  }

  useEffect(() => {
    let URL = `${apiUrl}${city}&limit=5&appid=${apiKey}`;

    if (city) {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          handleSearch(data[0]);
        });
    }
  }, [city]);

  return (
    <Box sx={{ marginLeft: "40px" }}>
      <TextField
        placeholder="Enter the Location"
        value={tex}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button type="submit" onClick={handleClick}>
        <SearchIcon />
      </Button>
    </Box>
  );
}
