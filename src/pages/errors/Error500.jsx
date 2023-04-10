import React from "react";

function Error500() {
  return (
    <div className="mt-20 p-5 text-center items-center justify-center max-w-7xl">
      <h2 className="font-bold text-xl">Error500: Developer Fail</h2>
      <h4 className="font-bold text-lg">Why?</h4>
      <ul className="flex flex-col gap-5 mt-5">
        <li>
          😡 Maybe you are using an incorrect format when you upload and image,
          try png or jpeg 😡
        </li>
        <li>👀 Our developers are really tired this week 👀</li>
        <li>
          ❤️ If you want to help us with a better server, you can send a
          donation. ❤️
        </li>
      </ul>
      <iframe
        src="https://giphy.com/embed/l46Czzp0KEHSO7OdG"
        style={{width: "80vw", height: "80vw", maxWidth:"400px", maxHeight:"400px"}}
        frameBorder="0"
        className="giphy-embed mt-10 mx-auto"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Error500;
