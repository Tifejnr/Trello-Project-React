
import NavLogo from "../Main-nav-bar/NavLogo"
import GetStartedIcon from "./GetStartedIcon"
import trelloIcon from "../../assets/SVGs/trello-icon.svg"
import forwardArrow from "../../assets/SVGs/thin-long-arrow-right-icon.svg"
import { changeTabTitle } from "../utilis/changeTabTitle"
import AuthNav from "../Auth/AuthNav"

const oauthPageTabTitle= "Authorize account – Collab for Trello"


export default function OauthPage() {

  changeTabTitle( oauthPageTabTitle)

  return (
   <>

   <AuthNav />

  <main className="auth-page-main-cont">
       <h1>AUTHORIZE ACCESS</h1>
       <h5><b>5</b> free credits for trial</h5>

       <section className="authorize-image-desc">
          <article>
            <img src= {trelloIcon} className='trello-icon' />
              <h3>Trello</h3>
          </article>

          <picture id="linking-arrow-cont" >
              <img src={forwardArrow} alt="" />
          </picture>

          <picture>
            <NavLogo/>
          </picture>

       </section>

       <section>
        <p>
         To get started, please click the button below to connect Collab for Trello with Trello in order to perform automations on your behalf. 
        </p>
       </section>

       <section>
         <GetStartedIcon/>
       </section>

  </main> 
   </>
  )
}
