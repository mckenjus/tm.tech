import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../style.css";


const Modal = ({show, setShow, person}) => {
    const [player, setPlayer] = useState([]);
  const handleClose = e => {
      e.preventDefault()
      setShow(false)
  };

  useEffect (() => {
      
    axios.get(`https://project.trumedianetworks.com/api/nfl/player/${person}`, {
      headers: {
          'tempToken': '8bb59da2-9ef7-4be0-b33c-3c78ffb2d892',
        }
      })
      .then((res) => {
       
  
      if (res.data) {
  
        setPlayer(res.data);
      }else{
        console.log('error')
      }
    })
    .catch(error => {
      console.log('error', error);
    });
    
  }, [person]);

  useEffect(() => {
    document.body.addEventListener("keydown", handleClose);
    return function cleanup() {
      document.body.removeEventListener("keydown", handleClose);
    };
}, []);
const statList = player.map((stat,i) => { 
    return ( 
    <tr key={i}>
    <td>{stat.week}</td>
    <td>{stat.PsYds}</td>
    <td>{stat.Cmp}/{stat.Att}</td>
    <td>{((stat.Cmp / stat.Att)*100).toFixed(0)}</td>
    <td>{(stat.PsYds / stat.Att).toFixed(2)}</td>
    <td>{stat.PsTD}</td>
    <td>{stat.Int}</td>
    <td>{stat.Sack}</td>
    <td>{stat.Rush}</td>
    <td>{stat.RshYds}</td>
    <td>{(stat.RshYds / stat.Rush || 0).toFixed(2)}</td>
    <td>{stat.RshTD}</td>
</tr> )
});
    return (
        <div className="modal">
        <div className="modal-content">
            
            <table>
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Passing Yards</th>
                        <th>Comp/Att</th>
                        <th>Cmp %</th>
                        <th>Yards/Attempt</th>
                        <th>Pass TDs</th>
                        <th>Ints</th>
                        <th>Sacks</th>
                        <th>Rushing attempts</th>
                        <th>Rush Yards</th>
                        <th>Avg. Rush Yards</th>
                        <th>Rush Tds</th>
                    </tr>
                </thead>
                <tbody>
                    {statList}
                </tbody>
            </table>
          
            <button onClick={e=>handleClose(e)} className="button">
              Close
            </button>
            
        </div>
      </div>
  );
};

export default Modal;
