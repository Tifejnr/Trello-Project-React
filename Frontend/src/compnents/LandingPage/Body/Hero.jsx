import React from 'react'
import { Link } from 'react-router-dom';

export default function Hero() {
  
  return (
<>
    <section className='hero-container'> 
     <div className='hero-inner-container'>
      <h1>Automate Team Members Management in Trello!</h1>
      <h3>Save time and stress of manual addition and removal of trello team members from multiple boards and workspaces</h3>
       
        <section className='call-to-action-cont'>
          <Link  to="/register" className='oauth-button'>
              <h2>Start for free <span className='floating-arrow'>&#8594;</span> </h2>
          </Link>
          <ul>
            <li><p> 5 free credits for trial</p></li>
            <li> <p>No credit card required</p> </li>       
          </ul>
        </section>
      </div>
    </section>
</>
  )
}
