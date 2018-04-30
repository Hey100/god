import React from 'react';
import '../test.css';

export default function Test() {
	return <div className="contain">

      <div className="header">
				<div className="nav-left">
					<button type="button" className="button title" >WEB PAGE</button>
				</div>
				<div className="nav-right">
					<button type="button" className="button" >LINK</button>
					<button type="button" className="button" >LINK</button>
					<input type="text" className="input" placeholder="text..." />
				</div>
      </div>

			<div className="section1">
				<div className="half" id="s1l">
					<p>
						SECTION 1 - LEFT
					</p>
				</div>
				<div className="half" id="s1r">
					<p>
						SECTION 1 - RIGHT
					</p>
				</div>
      </div>
			
			<div className="section2">
				<div className="half" id="s2l">
					<p>
						SECTION 2 - LEFT
					</p>
				</div>
				<div className="half" id="s2r">
					<p>
						SECTION 2 - RIGHT
					</p>
				</div>
      </div>
			
			<div className="section3">
				<div className="half" id="s3l">
					<p>
						SECTION 3 - LEFT
					</p>
				</div>
				<div className="half" id="s3r">
					<p>
						SECTION 3 - RIGHT
					</p>
				</div>
      </div>
 
      <div className="footer">
				<p>Footer</p>
      </div>
    </div>;
}