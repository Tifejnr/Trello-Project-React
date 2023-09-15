import React from 'react'
import { Link } from 'react-router-dom';
import handlePageRefreshOnLoad from '../../utilis/refreshPageOnLoad';

const registerLink= "/authorize"

export default function Hero() {
  
  return (
<>
    <section className='hero-container'> 
     <div className='hero-inner-container'>
      <h1>Automate trello members addition and removal</h1>
      <h3>Save time and stress of manually adding and removing trello team members from multiple boards and workspaces</h3>
       
        <section className='call-to-action-cont'>
          <Link  to={registerLink} className='oauth-button' onClick={(e)=> {
            e.preventDefault()
            handlePageRefreshOnLoad(registerLink)
          }}>
              <h2>Start for free</h2>
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
