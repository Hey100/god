import React from "react";
import { LockAlertIcon } from "mdi-react";
import "../styles.css";

const Form = () => {
	return <div className="section1" id="form">
      <form>
        <div className="form-sec">
					<h1 className="text-1">Find Your Options</h1>
          <h2 className="text-2">How much would your project requires?</h2>
          <h5>Choose an amount between $1,000 and $10,000</h5>
					<div>
						Amount:
						<input className="form-in" type="text" name="lastname" placeholder="$" />
					</div>
        </div>

        <div className="form-sec">
          <div style={{ textAlign: "end" }}>
            <h2 className="text-2">
              Please provide a few details about yourself
            </h2>
            First name: (use legal name)
            <input className="form-in" type="text" name="firstname" />
            <br />
            Last name:
            <input className="form-in" type="text" name="lastname" />
            <br />
            Date of birth:
            <input className="form-in" type="text" name="dateofbirth" />
            <br />
            Street Address:
            <input className="form-in" type="text" name="street" />
            <br />
            Apartment/Suite:
            <input className="form-in" type="text" name="apt" />
            <br />
            City:
            <input className="form-in" type="text" name="city" />
            <br />
            State:
            <select name="state" className="form-in">
              <option value="" selected="selected">select</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <br />
            Zip Code:
            <input className="form-in" type="text" name="zip" />
            <br />
            Phone Number:
            <input className="form-in" type="text" name="phone" />
            <br />
          </div>
					<div>
						<input type="checkbox" name="authorize" value="authorize" />
						&nbsp;I authorize Upstart to send me account notifications via text message
					</div>
          <br />
        </div>

        <div className="form-sec">
          <h2 className="text-2">Save Your Information</h2>
          <div>
						Email Address:
						<input className="form-in" type="text" name="email" />
          </div>
          <div>
						Password:
						<input className="form-in" type="text" name="password" />
          </div>
          <h5 style={{ color: 'orange' }}>
            Must contain at least 8 characters, including 1 number and 1
            uppercase letter
          </h5>
        </div>

        <div className="form-sec">
					<div>
						<input type="checkbox" name="accept request" /> By checking the box, clicking "agree and see your rate" below, you confirm:
					</div>
          <ul>
            <li>
              You agree to the <a href="#">
                Electronic Communications Policy and Consent
              </a> and understand that the terms and conditions and other disclosures will be provided to you electronically; and
            </li>
            <li>
              You agree to the <a className="terms" href="#">
                Credit Report and Information Verification Consent
              </a>, the <a className="terms" href="#">
                Upstart Privacy Policy
              </a>, the <a className="terms" href="#">
                Upstart Privacy Notice
              </a>, and the <a className="terms" href="#">
                Upstart Platform Agreement
              </a>.
            </li>
          </ul>
          <input className="big-btn" type="submit" value="Submit" />
          <h5>
            <LockAlertIcon size={34} color="#000" /> Checking your rate won't affect your credit score!
          </h5>
        </div>
      </form>
    </div>;
}

export default Form;