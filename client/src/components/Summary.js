import React from 'react';

const Summary = () => {
	return <div className="tab">
      <div id="card-left" className="graphic-container">
        <h2 className="text-1">your CC score:</h2>
        <h1 className="big-btn">80</h1>
      </div>
      <div id="card-right" className="graphic-container">
        <img src="https://i.imgur.com/nBCoH7P.png" alt="" id="graphic" />
        <div className="graphic-info">
          <h2 className="text-2">TOTAL ALLOWED: $7,000</h2>
          <h2 className="text-2">TOTAL USED: $4,564</h2>
          <hr />
          <h2 className="text-2">TOTAL LEFT: $2,436</h2>
        </div>
      </div>
    </div>;
}

export default Summary;