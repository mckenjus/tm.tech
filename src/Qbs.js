import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom'
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";


import './style.css' 






const Qbcompare = () => {
  const [isLoading, setIsLoading] =useState(true);
  const [players, setPlayers] = useState ([]);
  const [show, setShow] = useState(false);
  const [person, setPerson] =useState();

  useEffect (() => {
    axios.get('https://project.trumedianetworks.com/api/nfl/players', {
      headers: {
          'tempToken': 'd818a26a-a42d-4fc5-8ab7-44020a0dad5e',
        }
      })
      .then((res) => {
        setIsLoading(false)
        
  
      if (res.data) {
  
        setPlayers(res.data);
      }else{
        console.log('error')
      }
    })
    .catch(error => {
      setIsLoading(false)
      console.log('error', error);
    });
    
  }, []);

  const handleClick = (e) => {
    e.preventDefault()
    setPerson(e.target.id)
    setShow(true) 
    

  };

  const playerList = players.map(player => {
  return (
    <div key={player.playerId} className="players" >
      <p className="playername" onClick={(e) => handleClick(e)} id={player.playerId}>{player.fullName}</p>
        <div className="playerimage">
          <img src={player.playerImage}></img> 
        </div>
    </div>
    )
})
  const content = isLoading  ? <div>Loading</div> : <div><pre>{playerList}</pre></div>
  
  
  return (
  <>
     <h1>{content}</h1>
      {show && <Modal show={show} setShow={setShow} person={person}/>}

  </>
  )


}

export default Qbcompare;

