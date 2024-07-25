import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout.js'; 
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.js';
import Header from './components/header/Header.js';
import Trailer from './components/trailer/Trailer.js';
import Reviews from './components/reviews/Reviews.js';

function App() {

  const [movies, setMovies]     = useState([]);
  const [movie, setMovie]       = useState([]);
  const [reviews, setReviews]     = useState([]);

  useEffect( () => {
    getMovies();
  }, []);

  const getMovies = async () => {

    try{

      const response = await api.get("/movies");
      
      // Verifica di un array
      if (Array.isArray(response.data)) {
        setMovies(response.data);
      } else {
        console.error('La risposta non è un array:', response.data);
      }
    }
    catch(error){
      console.error('Errore nel recupero dei film:', error);
    }


  }

  const getMovieData = async (movieId) => {

    try {

      const response = await api.get(`/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);
      
    } 
    catch (error) {

      console.error('Errore nel recupero del film:', error);
      
    }

  }


  return (

    <div className="App">

      <Header/>

      <Routes>
        <Route path = "/" element = {<Layout/>}>

          <Route path = '/' element = {<Home movies = {movies} />}> </Route>

          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />

          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          
        </Route>
      </Routes>
      
    </div>

  );
}


export default App;
