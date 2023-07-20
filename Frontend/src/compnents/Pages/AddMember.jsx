import React, { useState,  useEffect, useRef } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import AddToBoard from '../../JS functions/AddToBoard';
import HomePage from '../Home-nav-items/HomePage';
import LoggedInUsersControl from '../Controllers/LoggedInUsersControl';
import BoardsDisplaySection from './BasicSectionLayout/BoardsDisplaySection';
import { websiteUrl } from '../../JS functions/websiteUrl';



const labelTitle = "Add Members";
const inputLabel = "Members' Emails:";
const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Add Members to";
const inputPlaceholderText = "Input emails of members to be added, each separated with a comma.";
const pageName = "add-member";
const pageTitle = "Add Members Via Email";


export default function AddMember() {
  const [boards, setBoards] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaRefValue, setTextareaRefValue] = useState(null);
  const textareaRef = useRef(null);

  // Function to handle textarea value changes
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };


  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      try {
        const url = `${websiteUrl}/start`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ true: true }),
          signal: abortController.signal, // Pass the signal to the fetch call
        });

        const dataRaw = await response.json();

        if (!dataRaw) {
          console.log("No data seen");
          return;
        }

        if (dataRaw.error) {
          if (dataRaw.error.code === "ENOTFOUND") {
            console.log("No internet network");
            return;
          }
        }

        const data = dataRaw.boards;
        setBoards(data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    setTextareaRefValue(textareaRef.current)
  }, [boards]);

  return (
<>   
<LoggedInUsersControl>
   <HomePage/> 
    <section className='main-section-cont' id='mainContentCont'>

      <h1>{pageTitle}</h1>

      <section className='inner-main-cont' id='innerMainContentCont'>

        <section className="memberDetailsCont">
              <label htmlFor='memberDetailTextArea'><p>{inputLabel}</p></label>
              <textarea
              value={textareaValue}
            onChange={handleTextareaChange}
                ref={textareaRef}
                id="memberDetailTextArea"
                cols="40"
                rows="10"
                placeholder={inputPlaceholderText}></textarea>
              <p className="error">error</p>
        </section>

          <SelectAll 
          labelTitle={labelTitle} 
          selectInstructionText={selectInstructionText} 
           action={ (e)=> {
            e.preventDefault();
            console.log(textareaRefValue)
            AddToBoard(boards,textareaValue, textareaRefValue)
          } }
          />

          <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle}/> 
          
         {boards.map((board, index) => {
          return  ( <BoardsDisplaySection key={index} board={board} indexNo={index}/>)
         })}

         </section>    
      
     </section>

    <ProgressBar pageName={pageName}/>
    
</LoggedInUsersControl>
 </>

  )
}




