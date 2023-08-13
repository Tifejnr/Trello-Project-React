import { isAnyCheckboxChecked } from "../../../JS functions/Utilis/Validations/Checkbox";
import { validateInput } from "../../../JS functions/Utilis/Validations/Input";
import { findBoardIdByName } from "../../../JS functions/Utilis/FindBoardId/byName";
import memberIdSearch from "./MemberIds/multi-boards-check";

const emailMeans = "Email";
const usernameMeans = "Username";
const fullNameMeans = "Full name";

let nameAddingObjArray;

export default async function validateAddToBoard(executionParams) {
  const boardsCollection = executionParams.boardsCollection;
  const boardIdsObj = executionParams.boardIdsObj;
  const emailInputs = executionParams.textAreaValue;
  const textareaInputs = executionParams.textAreaValue;
  const checkboxesArray = executionParams.checkboxesArray;
  const meansOfExceution = executionParams.meansOfExceution;
  const executionBtnClicked = executionParams.executionBtnClicked;

  const usernamesIntoArray = textareaInputs.split(/\s*,\s*/);
  const fullNamesIntoArray = textareaInputs.split(/\s*,\s*/);
  const usernamesAtRemoved = usernamesIntoArray.map((username) => {
    return username.slice(1);
  });
  const isUsernameInput = usernamesIntoArray.some((input) =>
    input.startsWith("@")
  );

  //validating checkbox to ensure at least one is checked
  if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  //validating if it's username means or fullname means
  if (meansOfExceution == usernameMeans || meansOfExceution == fullNameMeans) {
    const paramsForGettingMemberIds = {
      usernameMeans,
      meansOfExceution,
      textareaInputs,
      fullNamesIntoArray,
      usernamesAtRemoved,
      executionBtnClicked,
      boardIdsObj,
      isUsernameInput,
    };

    const response = await memberIdSearch(paramsForGettingMemberIds);

    if (response.usernameValError) return response;
    if (response.fullNameValError) return response;
    if (response.errorNameAddingObjArray) return response;

    nameAddingObjArray = response.nameAddingObjArray;

    console.log(nameAddingObjArray);
  }

  //validating if it's email means entered
  if (meansOfExceution == emailMeans) {
    const response = validateInput(emailInputs);
    if (response.inputValError) return response;
  }

  const boardDetailsObj = checkboxesArray.map((checkbox, index) => {
    if (!checkbox.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const boardName = boardEl.textContent;

    const foundBoard = findBoardIdByName(boardsCollection, boardName);

    if (!foundBoard) return console.log("board not found");
    const boardId = foundBoard.id;

    const neededObj = {
      boardId,
      boardName,
    };

    return neededObj;
  });

  if (!boardDetailsObj) return "";

  const validationComplete = {
    boardDetailsObj,
    nameAddingObjArray,
  };

  return validationComplete;
}
