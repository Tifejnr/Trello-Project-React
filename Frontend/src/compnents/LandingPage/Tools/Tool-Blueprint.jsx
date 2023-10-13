import React from "react";
import ToolVideo from "../videos/templates/toolVideo";
const videoSrc =
  "../../../assets/videos/adding-to-boards/collab-for-trello-way-of-adding.mp4";

export default function ToolBlueprint(props) {
  return (
    <section className="each-tool-section">
      <h2>
        <span>{props.indexNo + 1}.</span> {props.toolDetails.heading}
      </h2>

      <article>
        <p></p>
        <p>{props.toolDetails.overview}</p>
      </article>

      <article>
        <p>Classic way of doing it in Trello</p>
        <ToolVideo videoSrc={videoSrc} />
        <ul>
          <h3>Drawbacks</h3>
          <li>
            <p>
              Desired boards can't be selected on a single page, hence the need
              to navigate multiple boards one after the other.
            </p>
          </li>
          <li>
            <p>
              Boring as hell, especially when you need to repeat it for large
              amount of boards.
            </p>
          </li>
          <li>
            <p>
              Time wasting, it takes around 7 seconds to add a member to a
              board, Our tool takes around 0.3 seconds to do the same.
            </p>
          </li>
          <li>
            <p>
              Increased screen time which can cause eye strain, and reduced
              productivity.
            </p>
          </li>
        </ul>
      </article>

      <article>
        <p>Collab for Trello way of doing it</p>
        <ToolVideo videoSrc={videoSrc} />
        <ul>
          <h3>Drawbacks</h3>
          <li>
            <p>
              Desired boards can't be selected on a single page, hence the need
              to navigate multiple boards one after the other.
            </p>
          </li>
          <li>
            <p>
              Boring as hell, especially when you need to repeat it for large
              amount of boards.
            </p>
          </li>
          <li>
            <p>
              Time wasting, it takes around 7 seconds to add a member to a
              board, Our tool takes around 0.3 seconds to do the same.
            </p>
          </li>
          <li>
            <p>
              Increased screen time which can cause eye strain, and reduced
              productivity.
            </p>
          </li>
        </ul>
      </article>
    </section>
  );
}
