import React , {useState} from 'react'
import useStore from '../Hooks/Zustand/usersStore'
import { Link } from 'react-router-dom'
import ToggleLabel from './ToggleLabel'
import handlePageRefreshOnLoad from '../utilis/refreshPageOnLoad'

export default function LandingPageToggle(props) {
// Define state variables to keep track of the toggle state
const isMenuIconShowing = useStore((state) => state.isMenuIconShowing);
const setIsMenuIconShowing = useStore((state) => state.setIsMenuIconShowing);

  // Function to handle the button click and toggle the state
  const handleClick = () => {
    setIsMenuIconShowing(!isMenuIconShowing);
  };

  return (
    <>
     <input type="checkbox" id="nav__checkbox" className="nav__checkbox"  onChange={handleClick}/>
      <section className="mainNavIcons">
          {
          props.noCredits ? "" :
          
        <article className="myProfileIcon"> 
              <Link to={props.pageLink} onClick={(e)=> {
                      e.preventDefault()
                      handlePageRefreshOnLoad(props.pageLink)
                  }}>   
                    <button id="start-for-free-mobile-lp">
                      <p>{props.innerText}</p>
                    </button>
              </Link>

        </article>
         } 
        <ToggleLabel isMenuIconShowing={isMenuIconShowing}/>
      </section>
   </>
  )
}
