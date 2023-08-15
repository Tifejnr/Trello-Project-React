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
import DeleteProgress from "../ProgressBar/DeleteBoards/DeleteProgress";
import validateAddToBoard from "./Validations/validateAddToBoard";
import { changeTabTitle } from "../utilis/changeTabTitle";
import SelectMeans from "./BasicSectionLayout/mean-of-execution/SelectMeans";
import getWorkspacesName from "./getWorkspacesName";
import getAllBoardsId from "./Validations/getBoardIdOnly/getAllBoardsId";



//name means input params
const fullnameMeansInputLabel = "Members' Usernames or Full names:";
const fullnameMeansInputPlaceholderText =
  "Input usernames or fullnames of members to be deleted, each separated with a comma.";

const searchPlaceholderTitle = "Search Boards ...";
const selectInstructionText = "Select Boards to Delete Members from";

const pageTitle = "Delete Members Via";
const action = "Deletion";
const continuousAction = "Deleting"
const proposition= "from"
const addToBoardsTabTitle= "Delete Members from Boards – Collab for Trello"
const timeInterval= 0.2;
const usernameMeans= "Username"
const fullNameMeans= "Full name"
const unknowMeansYet="..."
const addMemberTitle= "Delete Members"
const defaultMeansMessage= "Select Means of Deletion"

const insufficietCreditsMess= "Please buy credits to use this tool";
const checkboxMustBeCheckedMess= "Please check at least a board below";

export default function DeleteMemberBoards() {
  const [boardsCollection, setBoardsCollection] = useState([{}]);
  const [openProgressBar, setOpenProgressBar] = useState(false);
 const [labelTitle, setLabelTitle] = useState(addMemberTitle);
 const [executionBtnClicked , setExecutionBtnClicked ] = useState(false);
 const [textAreaError, setTextAreaError ] = useState("");

  const [clientSignature, setClientSignature] = useState("");
  const [boardDetailsObj, setBoardDetailsObj] = useState([])
  const [boardIdsObj, setBoardIdsObj] = useState([])
  const [selectLabel, setSelectLabel] = useState(defaultMeansMessage);

  const creditsFromServer = useStore((state) => state.creditsFromServer);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const textAreaValue = useStore((state) => state.textAreaValue);
  const textAreaRefEl = useStore((state) => state.textAreaRefEl);
  const  setExecutionErrorBtn = useStore((state) => state.setExecutionErrorBtn);
  const  pushWorkspaceObjDetails = useStore((state) => state.pushWorkspaceObjDetails);
  const  workspaceObjDetails = useStore((state) => state.workspaceObjDetails);



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
    executionBtnClicked,
    action,
    continuousAction,
    proposition
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
   setLabelTitle("Verifying Inputs...") 
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

   if (response.isusernameInput) {   
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

   if (response.stop) {
    const stoppedMessage = "Action Stopped"
    
    console.log("tried here stop")
    return  (
      setExecutionBtnClicked(false), 
      setLabelTitle(addMemberTitle),
      setExecutionErrorBtn(stoppedMessage),
       setTextAreaError(stoppedMessage)
    )
   }


   else if (response.nameAddingObjArray )  {
     setLabelTitle("Starting...") 
      setBoardDetailsObj(response)
      setOpenProgressBar(true)
      }
    }
    

  else {  
  
   if (response.stop) {
    const stoppedMessage = "Action Stopped"

    console.log("tried here stop")
    return  (
      setExecutionBtnClicked(false), 
      setLabelTitle(addMemberTitle),
      setExecutionErrorBtn(stoppedMessage),
       setTextAreaError(stoppedMessage)
    )
   } 
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
   
    
  })

  return (
    <> 
     {
      openProgressBar ? <DeleteProgress executionParams={executionParams} /> 
      :
     <> <HomeNavBar innerText={creditsFromServer==1 ? `Credit:${creditsFromServer}` : 
      
      `Credits:${creditsFromServer}`} pagelink="#" 
      
      />

      <section
        className="main-section-cont"
        id="mainContentCont">
        <h1 id="toolInstruction">{pageTitle} Username or Full name</h1>

      <section className="inner-main-cont" id="innerMainContentCont">
          <Input
            inputLabel={fullnameMeansInputLabel}
            inputPlaceholderText={fullnameMeansInputPlaceholderText}
            textAreaError={textAreaError}
          />   

          <SelectAll
            labelTitle={labelTitle}
            verifying = "Verifying Inputs..."
            executionBtnClicked ={executionBtnClicked}
            selectInstructionText={selectInstructionText}
            action={ async (e)=> {
             e.preventDefault();
      setExecutionBtnClicked(executionBtnClicked=>!executionBtnClicked)
           await validateParams(executionParams);
            } }
          />

          <SearchBoards searchPlaceholderTitle={searchPlaceholderTitle} />

          {boardsCollection.length < 2 && <p className="loading-your-boards-text">Loading your boards and their workspaces...</p>}

          <section className="all-boardnames-container">
            { boardsCollection.length>1 &&  boardsCollection.map((board, index) => {
                return (
                  <BoardsDisplaySection key={index} board={board} indexNo={index} workspaceObjDetails={workspaceObjDetails}/>
                );
              })
            }
          </section>
        </section>
      </section>
    </>
         }
    </>
  );
}
