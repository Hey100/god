import React from "react";

const Welcome = () => {
  return <div className="section1">
      <div className="half" id="s1l">
        <h1 className="text-1">Welcome to Collective Capital</h1>
        <h2 className="text-2">
          Zombie ipsum reversus ab viral inferno, nam rick grimes malum
          cerebro. De carne lumbering animata corpora quaeritis.
        </h2>
        <button type="button" className="big-btn">
          JOIN
        </button>
      </div>
      <div className="half" id="s1r">
        <img src="https://i.imgur.com/gLUEreC.png" alt="" />
      </div>
    </div>;
};

export default Welcome;