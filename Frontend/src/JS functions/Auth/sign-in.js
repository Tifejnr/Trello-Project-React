import axios from "axios";
import displayErrorMessage from "../inputs-validations/error-text-style";
const signInEndPoint = "http://localhost:3000/api/sign-in";

export default async function signInUser(signInParams) {
  try {
    const response = await axios.post(signInEndPoint, signInParams);
    const data = await response.data;
    console.log(data);
    if (!data.signedIn) return false;
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.invalidLoginDetails;
    displayErrorMessage(errorMessage);
    return false;
  }
}
