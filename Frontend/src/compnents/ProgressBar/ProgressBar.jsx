import React, {useEffect, useState, useContext } from 'react'
import { ProgressBarContext } from '../Hooks/Contexts/ProgressBarContext';
// import AddToBoards from '../Pages/AddToBoards';
import useStore from '../Hooks/Zustand/usersStore';

export default function ProgressBar(props) {
  const totalDurationLength= props.totalDurationLength
  const totalRounds= props.totalRounds
  const failureLength = useStore((state) => state.failureLength);
  const sucessLength = useStore((state) => state.sucessLength);
  const userDetails = useStore((state) => state.userDetails);
  const sectionName = useStore((state) => state.sectionName);
  const totalAttemptLength = useStore((state) => state.totalAttemptLength);
  const currentRound = useStore((state) => state.currentRound);

 let percentLoaded =
          (Number(totalAttemptLength) / Number(totalDurationLength)) * 100;


  let updateBarWidth= {width: `${percentLoaded}%`};

  return (
    <div className="loading" id="loading">
      <div className="barHolder">
        <div id="bar" style={updateBarWidth}></div>
      </div>
      <section className="changing-ele-on-bar">
        <h2 id="progressBarTitle" className="title" >Adding {userDetails} to {sectionName}</h2>
        <h2 id="totalRoundsEl" className="title" >Total Rounds : {totalRounds}</h2>
        <h2 id="noOfRounds" className="title" >Current Round: {currentRound}</h2>
        <h3 id="successStatusTitle" className="title successTitle">Succes: {sucessLength}</h3>
        <h3 id="failureTitle" className="title failureTitle">Failure: {failureLength}</h3>
       {
       percentLoaded==100 && <h3 id="completedStatus" className="title">addition Completed</h3>
       } 
      </section>
        <section className="btn-section" id="btnSection"> {

     percentLoaded == 100 ? 
     <a href={`/${props.pageName}`}> <button className="okay-btn" id="okay">Okay</button></a>   
     :
      <a href={`/${props.pageName}`}>
        <button className="cancel-btn" id="cancelBtn">Cancel</button>
      </a>

      }
        </section>
    </div>
  )
}


// function ProgressBarExecution(progressBarParams) {

//   const userDetail= progressBarParams.userDetail
//   const isAddedTo = progressBarParams.isAddedTo 
//   const noOfCheckedCheckbox= progressBarParams.noOfCheckedCheckbox
//   const successLength= progressBarParams.successLength + 1
//   const action= progressBarParams.action
//   let failuresArrayLength= progressBarParams.failuresArrayLength
//   const totalAttemptedArrayLength= progressBarParams.totalAttemptedArrayLength

// if (failuresArrayLength==undefined) {
//   failuresArrayLength= 0
//  }

// const progressBarTitle = document.getElementById("progressBarTitle");
// const successStatusTitle = document.getElementById("successStatusTitle");
// const failureTitle = document.getElementById("failureTitle");
// const mainContentCont = document.getElementById("mainContentCont");
// const BAR = document.getElementById("bar");
// const progressBarContainer = document.getElementById("loading");
// const allForms = document.getElementsByTagName("form");
// progressBarTitle.innerHTML=""

// if (action =="deleting") {
//   progressBarTitle.innerHTML = `Deleting ${userDetail} from ${noOfCheckedCheckbox} Boards... `;
//   successStatusTitle.innerHTML = `Successful ${isAddedTo} Deletions: ${successLength}`;
//   failureTitle.innerHTML = `Failed Deletions: ${failuresArrayLength}`;
// }

// if (action=="adding") {
//   progressBarTitle.innerHTML = `Adding ${userDetail} to ${noOfCheckedCheckbox} Boards... `;
//   successStatusTitle.innerHTML = `Successful ${isAddedTo} Additions: ${successLength}`;
//   failureTitle.innerHTML = `Failed Additions: ${failuresArrayLength}`;

// }
//   hide(mainContentCont);
//   hideForms(allForms);
//   display(progressBarContainer);
//   display(btnSection);

//   let percentLoaded = (Number(totalAttemptedArrayLength) / Number(noOfCheckedCheckbox)) * 100;

//   BAR.style.width = percentLoaded + "%";
// }