import { useRef, useEffect , useState } from "react";
import useStore from "../../Hooks/Zustand/usersStore";

const memberNotInAnyBoardMessage = "Does not belong to any boards."
let allBoardMemberBelongsArray=[];

export default function MemberInfoDisplay(props) {
  const checkboxRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const memberCheckboxesArray = useStore((state) => state.memberCheckboxesArray);
  const pushMemberCheckboxesArray = useStore((state) => state.pushMemberCheckboxesArray);

  useEffect(() => {
    const checkboxEle = checkboxRef.current;
    pushMemberCheckboxesArray(checkboxEle);
  }, []);

  const memberDetailObj = props.memberDetailObj;
  const memberId = memberDetailObj.id;
  const boardIdsMapMemberId = props.boardIdsMapMemberId;
  const boardsCollection = props.boardsCollection;


    //getting all board names that each memeber belongs to
function getBoardsForMember(memberId, boardIdsMapMemberId) {
  if (boardIdsMapMemberId[memberId]) {
    return boardIdsMapMemberId[memberId];
  } else {
    return []; // Return an empty array if the memberId is not found in boardIdsMapMemberId
  }
}

const memberBoardsArray = getBoardsForMember(memberId, boardIdsMapMemberId);

if (memberBoardsArray.length > 0) {
  allBoardMemberBelongsArray = memberBoardsArray.map((boardId) => {
    const isMemberPartOfBoard = boardsCollection.find(
      (boardDetail) => boardDetail.id === boardId
    );

    let boardName

    if (!isMemberPartOfBoard)  return  (boardName = memberNotInAnyBoardMessage);

     boardName = isMemberPartOfBoard.name;
    return boardName;
  });

  // Now, allBoardMemberBelongsArray contains the names of boards the member belongs to
  // console.log(`Board names for member ${memberDetailObj.username}:`, allBoardMemberBelongsArray);
} else {
  // console.log(`Member ${memberDetailObj.username, memberDetailObj.fullName} does not belong to any boards.`);
}

   //setting toggling when clicked
  const handleToggle= ()=> {
     setIsClicked((prevState)=>!prevState)
  }

   const rotateOnToggle = {
    transform: isClicked ? "rotate(180deg)" : "0deg"
  };

 const openBoardsListStyle= {
        maxHeight: isClicked ?  "100%" : "0",
        marginTop: isClicked ? '1rem' : "0rem",
        overflow: isClicked ?  'visible' : "hidden",
  } 

return (
    <form className="eachMemberListCont">
      <section className='member-info-container'>
        <input
          type="checkbox"
          name="select-member"
          title="Check to select member"
          ref={checkboxRef}
          className="inputs board-checkbox"
          id={`checkMembers${props.indexNo}`}
        />
        <article onClick={handleToggle} title="Click to see member boards">
          <p id={`fullname${props.indexNo}`}>{memberDetailObj.fullName}</p>
          <p id={`username${props.indexNo}`}>@{memberDetailObj.username}</p>

         <ul style={openBoardsListStyle}>
          <h3>Member Boards</h3>
            {allBoardMemberBelongsArray.length > 0 ?  (
              Array.from(allBoardMemberBelongsArray).map((boardName, index)=> {
                return <li key= {index}>{boardName}</li>
              })
            ) : <li>{memberNotInAnyBoardMessage}</li>
          } 
          </ul>
        </article>
      </section>
    </form>
  )
}
