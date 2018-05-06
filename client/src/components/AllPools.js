
import React,{ Component } from 'react';

class AllPools extends Component {
	render(){
		return <div>
        <h1 className="text-2" style={{ textAlign: "center" }}>
          COMUNITY
        </h1>
        <div className="search-bar">
          Filter by
          <form>
            <select className="nav-input">
              <option>Number of Contributors</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="9">9</option>
              <option value="11">11</option>
              <option value="13">13</option>
            </select>
            <select className="nav-input">
              <option>Category</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
              <option value="Home Improvement">Home Improvement</option>
              <option value="Travel">Travel</option>
            </select>
            <select className="nav-input">
              <option>Interest Rate</option>
              <option value="5">5%</option>
              <option value="7">7%</option>
              <option value="9">9%</option>
              <option value="10">10%</option>
            </select>
          </form>
          or
          <form>
            <input type="text" className="nav-input" placeholder="search" />
          </form>
        </div>
        <div className="results">
          <div className="card" onClick={() => alert("card1")}>
						<div
							className="thumbnail"
 							style={{ 
								backgroundImage: "url(https://tribwxmi.files.wordpress.com/2013/05/mustache-web.jpeg)"
							}} 
							alt=""
						/> 
            <div className="card-content"> 
              <h1>MY MUSTACHE POOL</h1>
              <h1>by. Evil666</h1>
							<div className="meter">
								<span style={{ width: '100%' }}></span>
							</div>
              <h3>$12,000</h3>
              <h3>5% max interest</h3>
              <h3>1 colabs.</h3>
              <h3>21 days to start</h3>
            </div>
          </div>
          <div className="card" onClick={() => alert("card2")}>
						<div
							className="thumbnail"
							style={{ 
								backgroundImage: "url(http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-waterfall.jpg)"
							}}
							alt=""
						/>
            <div className="card-content">
              <h1>CAMPING</h1>
              <h1>by. Fatty BoomBoom</h1>
							<div className="meter">
								<span style={{ width: '80%' }}></span>
							</div>
              <h3>$13,000</h3>
              <h3>8% max interest</h3>
              <h3>5 colabs.</h3>
              <h3>11 days to start</h3>
            </div>
          </div>
          <div className="card" onClick={() => alert("card3")}>
						<div
							className="thumbnail"
							style={{ backgroundImage: "url(http://travel.home.sndimg.com/content/dam/images/travel/fullset/2014/05/08/fc/top-10-hawaiian-beaches-lanikai-beach.rend.hgtvcom.1280.720.suffix/1491584246278.jpeg)" }}
							alt=""
						/>
            <div className="card-content">
              <h1>HAWAII TRIP</h1>
              <h1>by. John Doe</h1>
							<div className="meter">
								<span style={{ 
									width: '40%' }}></span>
							</div>
              <h3>$4,000</h3>
              <h3>11% max interest</h3>
              <h3>2 colabs.</h3>
              <h3>8 days to start</h3>
            </div>
          </div>
          <div className="card" onClick={() => alert("card4")}>
						<div 
							className="thumbnail"
							style={{ backgroundImage: "url(https://si.wsj.net/public/resources/images/ON-CF689_dollah_M_20170811152733.jpg)" }}
							alt=""
						/>
            <div className="card-content">
              <h1>WIN A LOTTO</h1>
              <h1>by. HungarianDude</h1>
							<div className="meter">
								<span style={{ width: '65%' }}></span>
							</div>
              <h3>$8,000</h3>
              <h3>4% max interest</h3>
              <h3>9 colabs.</h3>
              <h3>14 days to start</h3>
            </div>
          </div>
        </div>
      </div>;
	}
}

export default AllPools;