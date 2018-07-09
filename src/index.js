import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ActorQuiz from './ActorQuiz';
import AddActorForm from './AddActorForm'
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
const actors=[

  {
      name: 'Matt Damon',
      imageUrl: 'actors/Matt_Damon.jpg',
      imageSource: 'Wikimedia Commons',
      movies: ['Contagion ','Invictus ']
  },
  {
      name: 'Johnny Depp',
      imageUrl: 'actors/JohnnyDepp.jpg',
      imageSource: 'Wikimedia Commons',
      movies: ['The Tourist' ,'Dark Shadows']
  },
  {
      name: 'Kristen Stewart',
      imageUrl: 'actors/Kristen_Stewart.jpg',
      imageSource: 'Wikimedia Commons',
      movies: ['The Runaways']
  },
  {
      name: 'Angelina Jolie',
      imageUrl: 'actors/Angelina_Jolie.jpg',
      imageSource: 'Wikimedia Commons',
      movies: ['A Mighty Heart','Wanted']
  },
  {
      name: 'Emma Stone',
      imageUrl: 'actors/Emma_Stone.jpg',
      imageSource: 'Wikimedia Commons',
      movies: [' Zombieland ','The Amazing Spider-Man']
  },
  {
      name: 'Robert Pattinson',
      imageUrl: 'actors/Robert_Pattinson.jpg',
      imageSource: 'Wikimedia Commons',
      movies: ['The Rover','Queen of the Desert']
  },
  {
      name: 'Emma Watson',
      imageUrl: 'actors/Emma_Watson.jpg',
      imageSource: 'Wikimedia Commons',
      movies: ['Beauty and the Beast','Regression']
  },
  {
      name: 'Leonardo DiCaprio',
      imageUrl: 'actors/Leonardo_DiCaprio.jpg',
      imageSource: 'Wikimedia Commons',
      movies: [' Catch Me If You Can','Shutter Island']
  }


];

function getTurnData(actors){
    const allMovies = actors.reduce(function(p,c,i){
      return p.concat(c.movies);
    },[]);
    const fourRandomMovies = shuffle(allMovies).slice(0,4);
    const answer = sample(fourRandomMovies);

    return {
      movies: fourRandomMovies,
      actor: actors.find((actor)=>
          actor.movies.some((title)=>
            title===answer))
    }
}

function resetState(){
  return{
      turnData: getTurnData(actors),
      highlight: ''

  };
}

let state = resetState();

function onAnswerSelected(answer){
  const isCorrect = state.turnData.actor.movies.some((movie) => movie ===answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}



function App(){
  return <ActorQuiz{...state}
   onAnswerSelected={onAnswerSelected}
   onContinue={() => {
     state= resetState();
     render();
   }}/> ;

}

const ActorWrapper= withRouter(({history}) =>
  <AddActorForm onAddActor={(actor)=>{
      actors.push(actor);
      history.push('/');
  }}/>
);

function render(){
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
      <Route exact path="/" component ={App} />
      <Route path="/add" component={ActorWrapper} />
    </React.Fragment>
    </BrowserRouter> , document.getElementById('root'));
}
render();
registerServiceWorker();
