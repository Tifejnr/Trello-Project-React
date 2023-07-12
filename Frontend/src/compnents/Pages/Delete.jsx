import React, { useState,  useEffect } from 'react';
import Input from './BasicSectionLayout/Input'
import SearchBoards from './BasicSectionLayout/SearchBoards'
import SelectAll from './BasicSectionLayout/SelectAll'
import ProgressBar from '../ProgressBar/ProgressBar'
import FetchData from '../../../../../Trello-Project-React/Frontend/src/JS functions/FetchData';
import DeleteMemberFromBoard from '../../../../../Trello-Project-React/Frontend/src/JS functions/DeleteFromBoard';
import MainNav from '../LandingPage/MainNav';

export default function Delete() {
useEffect(() => {
FetchData()

  }, []);

  const labelTitle = "Delete Member"
  const inputLabel= "Trello Username:"
  const searchPlaceholderTitle= "Search Boards ..."
  const selectInstructionText= "Select Boards To Delete Member"
   const inputPlaceholderText= "@..."
   const pageName= "delete-member"

  return (
<>    

   <MainNav/>   
    <section className='main-section-cont' id='mainContentCont'>

      <section className='inner-main-cont' id='innerMainContentCont'>
        <Input inputLabel={inputLabel} inputPlaceholderText={inputPlaceholderText}/>
         <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle}/>   

         <section>
          <SelectAll 
          labelTitle={labelTitle} 
          selectInstructionText={selectInstructionText}
          action={ (e)=> {
            e.preventDefault()
            DeleteMemberFromBoard()
          } }
          />
         </section>    
      </section>
      
     </section>

    <ProgressBar pageName={pageName}/>

 </>

  )
}




