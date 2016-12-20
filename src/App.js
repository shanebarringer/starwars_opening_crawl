import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      filmName: '',
      film: ''
    }
  }

  setFilmName = (e) => {
    this.setState({filmName: e.target.value})
  }




  findFilm = (e) => {
    e.preventDefault()
    if (this.state.filmName.length > 1) {
      fetch(`https://swapi.co/api/films/?search=${this.state.filmName}`)
      .then((res) => res.json())
      .then((film) => this.setState({film: film.results[0]}))
    } else {
      fetch(`https://swapi.co/api/films/`)
      .then((res) => res.json())
      .then((data) => {
        let film = data.results.find((result) => result.episode_id === parseInt(this.state.filmName))
        this.setState({film})
      })
    }
  }

  render() {
    return (
      <div className="app">
        <div className='search'>
          { !this.state.film ?
            <form onSubmit={this.findFilm}>
              <h3> Search for a Film by Name <br/>or<br/> Episode Number</h3>
              <input type='text' onChange={this.setFilmName}/>
            </form>
            : <h3>{this.state.film.title}</h3>
          }
        </div>
        <div className="title">
          <div className="titlecontent">
            <p>{this.state.film.opening_crawl}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
