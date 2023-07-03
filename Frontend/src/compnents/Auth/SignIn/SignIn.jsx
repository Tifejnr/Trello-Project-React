import React , {useState} from "react";
import { auth } from "../../../JS functions/FirebaseConfigs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const sendInfoToServer = async (e)=> {
    e.preventDefault();

    try {
    const useCredential = await signInWithEmailAndPassword(auth, email, password)

    console.log(useCredential)

        } catch (error) {
      console.log(error.message)
    }


  }
  return (
   <section>
    <form action="" onSubmit={sendInfoToServer}>
      <h1>Log In</h1>

      <fieldset>
        <label htmlFor="emailId">Email</label>
        <input type="email" placeholder="Please enter an email you can access" id="emailId" value={email}
           onChange={(e)=> setEmail(e.target.value)} 
        />
      </fieldset>
      <fieldset>
        <label htmlFor="passwordId">Password</label>
        <input type="password" placeholder="Minimum of 6 characters" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
   </section>
  );
}
