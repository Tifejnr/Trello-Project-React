import React from "react";

export default function ToolVideo(props) {
  return (
    <iframe
      width="560"
      height="315"
      src={props.videoUrl}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  );
}