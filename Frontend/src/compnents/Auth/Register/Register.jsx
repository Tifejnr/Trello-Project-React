import React , {useContext, useState} from "react";
import { useNavigate, Link} from "react-router-dom";
import validateInputs from "../../../JS functions/inputs-validations/overall-val-func";
import registerUser from "../../../JS functions/Auth/register";
import AuthNav from "../AuthNav";


export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();


const sendInfoToServer = async (e)=> {
    e.preventDefault();
    
  const emailId = document.getElementById("emailId")
  const passwordId = document.getElementById("passwordId")
  try {
   const paramsObj = {
    email,
    emailId,
    password,
    passwordId
    }

if(validateInputs(paramsObj)) {
  const regParam = {
    email,
    password
  }
 const regUser = await registerUser(regParam)

 if (regUser) return (navigate('/authorize'))

 return false
}
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
    <AuthNav/>
<section className="main-container reg-container" id="form">

    <article className="main__title">
        <h2>Get Started</h2>
      </article>
   <section>
    <form action="" className="reg-form"  >

      <fieldset className="input-wrapper">
        <label htmlFor="emailId"><p>Email</p></label>
        <input type="email" placeholder="Please enter an email you can access" id="emailId" value={email}
           onChange={(e)=> setEmail(e.target.value)} 
        />
        <p className="error"></p>
      </fieldset>
      <fieldset className="input-wrapper">
        <label htmlFor="passwordId"><p>Password</p></label>
        <input type="password" placeholder="Minimum of 6 characters" id="passwordId" value={password} 
                 onChange={(e)=> setPassword(e.target.value)} 
        />
        <p className="error" id="regErrorDisplay"></p>
      </fieldset>

       <h3 className="policy-agreement-text">
        By getting started, I agree to Collab for Trello's
          <Link to="#"> Terms of Use </Link> & <Link to="#"> Privacy Policy</Link>
       </h3>

        <button id="create_btn" type="submit" onClick={(e)=> {
          e.preventDefault();
    const data = {
      price: price,
      gallons: gallons,
      miles: miles,
      notes: notes,
      source: params.car_source,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/consumption/`, options);
        }} className="submit-btn">Get Started</button>

        <h5>5 free credits for trial</h5>
    </form>
   </section>

    <aside className="prompt-message">
        <h3>
          Already have an account? <Link to="/sign-in"><b>Login</b></Link>
        </h3>
    </aside>

</section>

 </>
  );
}


