import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input from "./BasicSectionLayout/Input";
import SearchBoards from "./BasicSectionLayout/SearchBoards";
import SelectAll from "./BasicSectionLayout/SelectAll";
import HomeNavBar from "../Home-nav-items/HomeNavBar";
import BoardsDisplaySection from "./BasicSectionLayout/BoardsDisplaySection";
import { websiteUrl } from "../../JS functions/websiteUrl";
import useStore from "../Hooks/Zustand/usersStore";
import ProgressExceution from "../ProgressBar/ProgressExceution.jsx";
import validateAddToBoard from "./Validations/validateAddToBoard";
import { changeTabTitle } from "../utilis/changeTabTitle";
import SelectMeans from "./BasicSectionLayout/mean-of-execution/SelectMeans";
import getWorkspacesName from "./getWorkspacesName";
import getAllBoardsId from "./Validations/getBoardIdOnly/getAllBoardsId";



//email means
const emailMeansInputLabel = "Members' Emails:";
const emailMeansInputPlaceholderText =
  "Input emails of members to be added, each separated with a comma.";

//username means
const usernameMeansInputLabel = "Members' Usernames:";
const usernameMeansInputPlaceholderText =
  "Input usernames of members to be added, each separated with a comma.";

//fullname means
const fullnameMeansInputLabel = "Members' Fullnames:";
const fullnameMeansInputPlaceholderText =
  "Input fullnames of members to be added, each separated with a comma.";

const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Add Members to";


const pageName = "add-member";
const pageTitle = "Add Members Via";
const action = "adding";
const addToBoardsTabTitle= "Add Members to Boards – CollabforTrello"
const timeInterval= 1;
const emailMeans = "Email";
const usernameMeans= "Username"
const fullNameMeans= "Fullname"
const unknowMeansYet="..."
const addMemberTitle= "Add Members"

const insufficietCreditsMess= "Please buy credits to use this tool";
const checkboxMustBeCheckedMess= "Please check at least a board below";

export default function AddMember() {
  const [boardsCollection, setBoardsCollection] = useState([{}]);
  const [openProgressBar, setOpenProgressBar] = useState(false);
 const [labelTitle, setLabelTitle] = useState(addMemberTitle);
const [selectLabel, setSelectLabel] = useState("Select Means of Addition");
 const [executionBtnClicked , setExecutionBtnClicked ] = useState(false);
 const [textAreaError, setTextAreaError ] = useState("");

  const [clientSignature, setClientSignature] = useState("");
  const [boardDetailsObj, setBoardDetailsObj] = useState([])
  const [boardIdsObj, setBoardIdsObj] = useState([])

  const creditsFromServer = useStore((state) => state.creditsFromServer);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const textAreaValue = useStore((state) => state.textAreaValue);
  const textAreaRefEl = useStore((state) => state.textAreaRefEl);
  const  setExecutionErrorBtn = useStore((state) => state.setExecutionErrorBtn);
  const  pushWorkspaceObjDetails = useStore((state) => state.pushWorkspaceObjDetails);
  const  workspaceObjDetails = useStore((state) => state.workspaceObjDetails);
  const  meansOfExceution = useStore((state) => state.meansOfExceution);
  const setMeansOfExceution = useStore((state) => state.setMeansOfExceution);


  changeTabTitle(addToBoardsTabTitle)

  const executionParams = {
    boardsCollection,
    textAreaValue,
    textAreaRefEl,
    timeInterval,
    clientSignature,
    checkboxesArray,
    boardDetailsObj,
    boardIdsObj,
    meansOfExceution
  };


 async function validateParams(executionParams) {

    if (creditsFromServer <1) return  setExecutionErrorBtn(insufficietCreditsMess) , setLabelTitle(addMemberTitle);
   setExecutionErrorBtn("")

   const response = await validateAddToBoard(executionParams)

  if (response.noCheckboxChecked) {
    return  setExecutionBtnClicked(false), 
    setLabelTitle(addMemberTitle), 
    setExecutionErrorBtn(checkboxMustBeCheckedMess);
  }

  else{
  setExecutionErrorBtn("")
  }

   if (response.inputValError) {
    return setExecutionBtnClicked(false), 
           setLabelTitle(addMemberTitle),
           setExecutionErrorBtn(response.inputValError), 
           setTextAreaError(response.inputValError);
    }

  if (response.usernameValError) {
    return setExecutionBtnClicked(false),  
           setLabelTitle(addMemberTitle),
           setExecutionErrorBtn(response.usernameValError), 
           setTextAreaError(response.usernameValError);
  }

   if (response.fullNameValError) {
    return setExecutionBtnClicked(false), 
           setLabelTitle(addMemberTitle),
           setExecutionErrorBtn(response.fullNameValError), 
           setTextAreaError(response.fullNameValError);
   }

   setTextAreaError("")
   setExecutionErrorBtn("")

   //if it's email means use board id only

  if (meansOfExceution==emailMeans) {
      if (response.boardDetailsObj )  {
   setLabelTitle("Starting...") 
    setBoardDetailsObj(response)
    setOpenProgressBar(true)
   }
  }

   if (meansOfExceution==usernameMeans) {   
     if (response.errorNameAddingObjArray )  {
  const usernamesAtAdded = response.errorNameAddingObjArray.map((username) => {
    return `@${username}`
  });
    let  errorMessage

      if(usernamesAtAdded.length==1) {
        errorMessage = `Username ${usernamesAtAdded[0]} is not found.`
      }

      if(usernamesAtAdded.length>1) {
        errorMessage = `Usernames ${usernamesAtAdded.join(", ")} are not found.`
      }

  return ( setExecutionBtnClicked(false),
      setLabelTitle(addMemberTitle),
      setTextAreaError(errorMessage),
      setExecutionErrorBtn(errorMessage) )
  }

    if (response.nameAddingObjArray )  {
     setLabelTitle("Starting...") 
      setBoardDetailsObj(response)
      setOpenProgressBar(true)
      }
    }
    

   if (meansOfExceution==fullNameMeans) {   
     if (response.errorNameAddingObjArray )  {
      const notFoundNamesArray = response.errorNameAddingObjArray 
      let  errorMessage

      if(notFoundNamesArray.length==1) {
        errorMessage = `Full name ${notFoundNamesArray[0]} is not found.`
      }

      if(notFoundNamesArray.length>1) {
        errorMessage = `Full names ${notFoundNamesArray.join(", ")} are not found.`
      }

  return ( setExecutionBtnClicked(false),
      setLabelTitle(addMemberTitle),
      setTextAreaError(errorMessage),
      setExecutionErrorBtn(errorMessage) )
  }

    if (response.nameAddingObjArray )  {
     setLabelTitle("Starting...") 
      setBoardDetailsObj(response)
      setOpenProgressBar(true)
      }
    }
 } 

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      try {
        const fetcbBoardsUrl = `${websiteUrl}/start`;
        const response = await axios.post(
          fetcbBoardsUrl,
          { signal: abortController.signal } // Pass the signal to the fetch call
        );

        const dataRaw = await response.data;

        if (!dataRaw) {
          console.log("No data seen");
          return;
        }

        const data = dataRaw.boards;
        const signature = dataRaw.sessionSignature;
        const workspaceIdArray = [...new Set(data.map(boardsDetail => boardsDetail.idOrganization).filter(Boolean))];
        setBoardsCollection(data);
        setClientSignature(signature);

    //fetch all board ids for usernames and fullnames method of addition
        const allBoardsId = getAllBoardsId(data)
         setBoardIdsObj(allBoardsId)
     
    //fetch workspace names for each boards
        workspaceIdArray.map(async (workspaceId, index)=> {
        const workspaceName =  await getWorkspacesName(workspaceId)
        const  workspaceDetails= {
          workspaceName,
          workspaceId
        }
        return pushWorkspaceObjDetails(workspaceDetails);
        })

      } catch (error) {
        //handle any error from server or internet
        console.log(error)
        const errorMessage= error.response.data
        //Unauthorized handling
      
      }
    })();

    return () => {
      // Clean up the effect by aborting the fetch request if the component is unmounted
      abortController.abort();
    };
  }, []);

  useEffect(()=> {
     // auto pick means picked previously for users
    const meansChosenAddToBoards = localStorage.getItem('meansChosenAddToBoards');
    if (meansChosenAddToBoards) {
   setMeansOfExceution(meansChosenAddToBoards)
    }
  })


  return (
    <> 
     {
      openProgressBar ? <ProgressExceution executionParams={executionParams} /> :
     <> <HomeNavBar innerText={creditsFromServer==1 ? `Credit:${creditsFromServer}` : 
      
      `Credits:${creditsFromServer}`} pagelink="#" 
      
      />

      <section
        className="main-section-cont"
        id="mainContentCont">
        <h1 id="toolInstruction">{pageTitle} {meansOfExceution? meansOfExceution: unknowMeansYet}</h1>
        <SelectMeans/>

      { meansOfExceution && <section className="inner-main-cont" id="innerMainContentCont">
        { meansOfExceution == emailMeans ? <Input
            inputLabel={emailMeansInputLabel}
            inputPlaceholderText={emailMeansInputPlaceholderText}
            textAreaError={textAreaError}
          /> :  
          
           meansOfExceution == usernameMeans ? 
          <Input
            inputLabel={usernameMeansInputLabel}
            inputPlaceholderText={usernameMeansInputPlaceholderText}
            textAreaError={textAreaError}
          /> :   
          
          meansOfExceution == fullNameMeans ?  
             <Input
            inputLabel={fullnameMeansInputLabel}
            inputPlaceholderText={fullnameMeansInputPlaceholderText}
            textAreaError={textAreaError}
          /> :    ""
        } 
          <SelectAll
            labelTitle={labelTitle}
            executionBtnClicked ={executionBtnClicked}
            selectInstructionText={selectInstructionText}
            action={ async (e)=> {
             e.preventDefault();
           setLabelTitle("Verifying Inputs...") 
      setExecutionBtnClicked(!executionBtnClicked)
           await validateParams(executionParams);
            } }
          />

          <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle} />

          {boardsCollection.length <2 && <p className="loading-your-boards-text">Loading your boards and their workspaces...</p>}

          <section className="all-boardnames-container">
            { boardsCollection.length>1 &&  boardsCollection.map((board, index) => {
                return (
                  <BoardsDisplaySection key={index} board={board} indexNo={index} workspaceObjDetails={workspaceObjDetails}/>
                );
              })
            }
          </section>
        </section>
}
      </section>
         </>
         }
    </>
  );
}
