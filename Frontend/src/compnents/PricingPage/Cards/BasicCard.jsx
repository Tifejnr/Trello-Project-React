import React, {useState,useRef} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import checkMark from "../../../assets/SVGs/check-mark.svg";
import getCheckoutLink from '../checkoutUrl/fetchUrl';



export default function BasicCard(props) {
  const planNameRef = useRef(null);
  const navigate = useNavigate();

    const planCheckout = async () => {
    if (!planNameRef.current) return console.log("plan name ref not found")
      const planName = planNameRef.current.innerHTML;
      const response = await getCheckoutLink(planName); 
      console.log(response)

      if (response.unauthorizedToken)  return ( navigate('/register'))

      if (response.invalidJWT)  return ( navigate('/sign-in'))

      const checkoutUrl = response.checkoutUrl

    // Redirect the user to the specified link
  if (checkoutUrl)  window.location.href = checkoutUrl
  };

  return (
<div className="col-sm-4">
            <div className="card text-center">
              <picture className="title">
                <h2 ref={planNameRef}> {props.planObjs.planName} </h2>
              </picture>
              <div className="price">
                <h4>${props.planObjs.planPrice}</h4>

                <p>
                 <b>Right choice</b> if tools usage is <b>{props.planObjs.suitabilityTimeUsage}</b> 
                </p>
              </div>
              <div className="option">
                <ul>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p> {props.planObjs.planCreditsAmount} Credits</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p><b>${props.planObjs.perCreditInfo}</b> per credit</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p>No Expiration</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p>Access to All Tools</p>
                  </li>
                </ul>
              </div>
              <button className='getPlanBtn' onClick={planCheckout} >Get Plan</button>
            </div>
    </div>
  )
}
