import React from "react";
import { TwitterIcon, YoutubeIcon, FacebookIcon } from "mdi-react";
import { Link } from 'react-router-dom';

import "./styles/footer.css";
import "./styles/global.css";
import "./styles/media.css";

const Footer = () => {
	return <div className="foot">
      <div className="foot__list">
        <ul className="foot__list-elem">
          <li>
            <a href="/">
              <TwitterIcon size={34} color="#FFF" />
            </a>
          </li>
          <li>
            <a href="/">
              <FacebookIcon size={34} color="#FFF" />
            </a>
          </li>
          <li>
            <a href="/">
              <YoutubeIcon size={34} color="#FFF" />
            </a>
          </li>
        </ul>
        <ul className="foot__list-elem">
          <li>
            <a href="/">Contact us</a>
          </li>
          <li>
            <a href="/">About us</a>
          </li>
          <li>
            <a href="/">Terms</a>
          </li>
          <li>
						<Link to={"/help"}>Help Center</Link>
          </li>
          <li>
					<a href="https://www.freepik.com/alekksall">
              Illustrations by Alekksall
            </a>
          </li>
        </ul>
      </div>
      <div className="foot__dec">
        <p className="foot__dec-elem">
          © 2018 Pooli™ is a
          registered trademark of Pooli, Inc. All Rights
          Reserved. Product name, logo, brands, and other trademarks featured
          or referred to within Pooli are the property of their
          respective trademark holders. This site may be compensated through
          third party advertisers.
        </p>
        <p className="foot__dec-elem">
          Average 2016 Federal tax refund in CA based on data provided by the
          IRS. Average 2016 State tax refund in CA based on data provided by
          the State of California Franchise Tax Board.Average 2016 Federal tax
          refund in GA based on data provided by the IRS. Average 2016 State
          tax refund in GA based on data provided by the Georgia Department of
          Revenue.* If you receive a larger federal tax refund amount using
          the same Tax Return Information when filing an amended return
          through another online tax preparation service, then you may be
          eligible to receive a $25 gift card from Pooli Tax. To
          qualify for this guarantee: (i) you must have filed your original
          2017 federal income tax return through Pooli Tax on or
          before April 16, 2018; (ii) you must be entitled to a federal tax
          refund from the IRS; (iii) you must have filed an amended federal
          income tax return using the same Tax Return Information through
          another online tax preparation service; (iv) your amended return
          must have been accepted by the IRS; (v) you must submit your
          complete Max Refund Guarantee claim to Pooli Tax no
          later than December 31, 2018; and (vi) the larger refund cannot be
          attributed to claims you make on your tax return that are contrary
          to law. For complete details, see Max Refund Guarantee FAQs.
        </p>
      </div>
    </div>;
};

export default Footer;
