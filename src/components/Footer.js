import React from "react";
import "../styles.css";
import { TwitterIcon, YoutubeIcon, FacebookIcon } from "mdi-react";
const Footer = () => {
  return <div className="container-fluid footer">
      <div className="row justify-content-center m-0 pt-5">
        <div className="col-sm-10 d-flex flex-row justify-content-between">
          <ul className="d-flex flex-row footer-list">
            <li><a className="link" href="#"><TwitterIcon size={34} color='#FFF'/></a></li>
            <li><a className="link" href="#"><FacebookIcon size={34} color='#FFF'/></a></li>
            <li><a className="link" href="#"><YoutubeIcon size={34} color='#FFF'/></a></li>
          </ul>
          <ul className="d-flex flex-row footer-list">
            <li><a className="link" href="#">Contact us</a></li>
            <li><a className="link" href="#">About us</a></li>
            <li><a className="link" href="#">Terms</a></li>
            <li><a className="link" href="#">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="row m-0 pb-5 pt-2">
        <div className="col-sm-4 offset-sm-2">
          <p className="small">
            © 2007–2018 Collective Capital, Inc. Collective Capital™ is a
            registered trademark of Collective Capital, Inc. All Rights
            Reserved. Product name, logo, brands, and other trademarks
            featured or referred to within Collective Capital are the property
            of their respective trademark holders. This site may be
            compensated through third party advertisers.iPhone is a trademark
            of Apple Inc., registered in the U.S. and other countries. App
            Store is a service mark of Apple Inc.Android is a trademark of
            Google Inc.The Equifax logo is a registered trademark owned by
            Equifax in the United States and other countries. Collective
            Credit Mortgage, Inc. NMLS ID# 1588622 | Licenses | NMLS Consumer
            Access Collective Capital Offers, Inc. NMLS ID# 1628077 | Licenses
            | NMLS Consumer Access
          </p>
        </div>
        <div className="col-sm-4">
					<p className="small">
						Average 2016 Federal tax refund in CA based on data provided by the
						IRS. Average 2016 State tax refund in CA based on data provided by
						the State of California Franchise Tax Board.Average 2016 Federal tax
						refund in GA based on data provided by the IRS. Average 2016 State
						tax refund in GA based on data provided by the Georgia Department of
						Revenue.* If you receive a larger federal tax refund amount using
						the same Tax Return Information when filing an amended return
						through another online tax preparation service, then you may be
						eligible to receive a $25 gift card from Collective Capital Tax. To
						qualify for this guarantee: (i) you must have filed your original
						2017 federal income tax return through Collective Capital Tax on or before
						April 16, 2018; (ii) you must be entitled to a federal tax refund
						from the IRS; (iii) you must have filed an amended federal income
						tax return using the same Tax Return Information through another
						online tax preparation service; (iv) your amended return must have
						been accepted by the IRS; (v) you must submit your complete Max
						Refund Guarantee claim to Collective Capital Tax no later than December
						31, 2018; and (vi) the larger refund cannot be attributed to claims
						you make on your tax return that are contrary to law. For complete
						details, see Max Refund Guarantee FAQs.
					</p>
				</div>
      </div>
    </div>;
};

export default Footer;
