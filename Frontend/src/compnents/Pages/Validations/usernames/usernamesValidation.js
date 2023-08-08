import React from "react";
import { commaSeperationRegex } from "../../../../JS functions/Utilis/Validations/commaSeperationRegex";
import atSymbolValidationPrefix from "./atSymbolValidationPrefix";

export default function usernamesValidation(input) {
  let inputValError;
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";
  const isEmptyMessage = "Members' usernames cannot be empty";
  inputValError = isEmptyMessage;
  if (isEmpty)
    return setErrorTextarea(textAreaRef, isEmptyMessage), { inputValError };

  //Check if all are separated by commas
  const inputsSplitted = input.split(",");
  const isValid = commaSeperationRegex(input);

  const ifOneInputError = "You don't need a comma if it's one username";
  inputValError = ifOneInputError;
  if (!isValid && inputsSplitted.length == 2)
    return setErrorTextarea(textAreaRef, ifOneInputError), { inputValError };
  const commaErrorMultipleInputs = "Usernames must be seperated by commas";
  inputValError = commaErrorMultipleInputs;
  if (!isValid)
    return (
      setErrorTextarea(textAreaRef, commaErrorMultipleInputs), { inputValError }
    );

  const isEmailsValid = validateEmail(input);

  const oneOnlyInvalidMessage = "Invalid username";

  inputValError = oneOnlyInvalidMessage;

  if (!isEmailsValid && inputsSplitted.length == 1)
    return (
      setErrorTextarea(textAreaRef, oneOnlyInvalidMessage), { inputValError }
    );

  const invalidEmailMessage = "At least one of the usernames is Invalid";
  inputValError = invalidEmailMessage;
  if (!isEmailsValid)
    return (
      setErrorTextarea(textAreaRef, invalidEmailMessage), { inputValError }
    );

  setSuccess(textAreaRef);
  return true;
}

export { validateInput };