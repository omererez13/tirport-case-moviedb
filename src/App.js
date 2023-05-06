import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=ae304e3f4d3830d95075ae6914b55ddf'
        );
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=ae304e3f4d3830d95075ae6914b55ddf&query=${searchTerm}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const getMoviesRows = () => {
    const rows = [];
    const count = movies.length;
    let currentRow = [];
    for (let i = 0; i < count; i++) {
      if (i > 0 && i % 5 === 0) {
        rows.push(currentRow);
        currentRow = [];
      }
      currentRow.push(movies[i]);
      if (currentRow.length === 5) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    return rows;
  };

  return (
    <div className="MuiTypography-root.MuiTypography-h1">
      <Container maxWidth="lg-12">
        <h1>The Movie</h1>
        <Grid container spacing={3} justify="center" alignItems="center" >
          <Grid item xs={12} sm={4}>
            <TextField
              id="search-term"
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button variant="contained" color="primary" onClick={handleSearch} disabled={searchTerm.length < 2}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} >
          {getMoviesRows().map((row, index) => (
            <Grid container item xs={12} spacing={3} key={index} justify="center" alignItems="center">
              {row.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={movie.id}>
                  <div className="MuiCard-root">
                    <img className="MuiCardMedia-root"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="MuiCard-root:hover">
                      <h3>{movie.title}</h3>
                      <p>{movie.overview}</p>
                    </div>

                  </div>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default App;