import React from "react";
import { LockAlertIcon } from "mdi-react";

const Form = () => {
	return <div className="section1" id="form">
      <h1 className="text-1">Find Your Options</h1>
      <form>
        <div className="form-sec">
          <h2 className="text-2">How much would your project requires?</h2>
          <h5>Choose an amount between $1,000 and $10,000</h5>
					<div>
						Amount:
						<input className="input" type="text" name="lastname" placeholder="$" />
					</div>
        </div>

        <div className="form-sec">
          <div style={{ textAlign: "end" }}>
            <h2 className="text-2">
              Please provide a few details about yourself
            </h2>
            First name: (use legal name)
            <input className="input" type="text" name="firstname" />
            <br />
            Last name:
            <input className="input" type="text" name="lastname" />
            <br />
            Suffix: (if applicable)
            <select name="suffix" className="input">
              <option value="" selected="selected" />
              <option value="i">I</option>
              <option value="ii">II</option>
              <option value="iii">III</option>
              <option value="iv">IV</option>
              <option value="v">V</option>
              <option value="vi">VI</option>
              <option value="vii">VII</option>
              <option value="viii">VIII</option>
              <option value="ix">IX</option>
              <option value="Jr">JR</option>
              <option value="Sr">SR</option>
            </select>
            <br />
            Date of birth:
            <input className="input" type="text" name="dateofbirth" />
            <br />
            Street Address:
            <input className="input" type="text" name="street" />
            <br />
            Apartment/Suite:
            <input className="input" type="text" name="apt" />
            <br />
            City:
            <input className="input" type="text" name="city" />
            <br />
            State:
            <select name="state" className="input">
              <option value="" selected="selected" />
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
            <input className="input" type="text" name="zip" />
            <br />
            Phone Number:
            <input className="input" type="text" name="phone" />
            <br />
          </div>
          <input type="checkbox" name="authorize" value="authorize" />
          &nbsp;I authorize Upstart to send me account notifications via text message
          <br />
        </div>

        <div className="form-sec">
          <h2 className="text-2">What is your highest level of education?</h2>
          <h5>Include degrees in which you are currently enrolled</h5>
          Degree Program:
          <select name="degree" className="input">
            <option value="" selected="selected" />
            <option label="Less than high school" value="Less than high school">
              Less than high school
            </option>
            <option label="High school diploma" value="High school diploma">
              High school diploma
            </option>
            <option label="Associate" value="Associate">
              Associate
            </option>
            <option label="Certificate Program" value="Certificate Program">
              Certificate Program
            </option>
            <option label="Bachelor's" value="Bachelor's">
              Bachelor's
            </option>
            <option label="PharmD" value="PharmD">
              PharmD
            </option>
            <option label="Masters" value="Masters">
              Masters
            </option>
            <option label="MBA" value="MBA">
              MBA
            </option>
            <option label="PhD" value="PhD">
              PhD
            </option>
            <option label="JD" value="JD">
              JD
            </option>
            <option label="DDS" value="DDS">
              DDS
            </option>
            <option label="MD" value="MD">
              MD
            </option>
          </select>
        </div>

        <div className="form-sec">
          <h2 className="text-2">What is your primary source of income?</h2>
          <h5>Do not include income from your spouce or household</h5>
          Income Type:
          <select className="input">
            <option value="?" selected="selected" />
            <option label="Employed - Salary" value="employed_salary">
              Employed - Salary
            </option>
            <option label="Employed - Hourly" value="employed_hourly">
              Employed - Hourly
            </option>
            <option label="Employed - Independent Contractor" value="employed_contractor">
              Employed - Independent Contractor
            </option>
            <option label="Starting New Job Within 6 Months" value="job_offer">
              Starting New Job Within 6 Months
            </option>
            <option label="Self Employed - Sole Proprietor" value="self_employed_sole_proprietor">
              Self Employed - Sole Proprietor
            </option>
            <option label="Self Employed - Partnership/LLC" value="self_employed_partnership">
              Self Employed - Partnership/LLC
            </option>
            <option label="Other" value="other">
              Other
            </option>
            <option label="None" value="none">
              None
            </option>
          </select>
        </div>

        <div className="form-sec">
          <h2 className="text-2">How much do you have in savings?</h2>
          Checking &amp; Savings:
          <input className="input" type="text" name="savings" placeholder="$" />
          <br />
          Investment Accounts: (if applicable)
          <input className="input" type="text" name="investments" placeholder="$" />
          <br />
        </div>

        <div className="form-sec">
          <h2 className="text-2">
            Have you taken out any new loans in the past 3 months?
          </h2>
          <input type="radio" name="loans" value="yes" /> YES
          <br />
          <input type="radio" name="loans" value="no" /> NO
          <br />
        </div>

        <div className="form-sec">
          <h2 className="text-2">
            What feature of Collective Capital is most important to you?
          </h2>
					
					<div>
						<input type="radio" name="feature" value="interest" /> Interest Rate
          </div>
					<div>
						<input type="radio" name="feature" value="monthly" /> Monthly Payment
          </div>
					<div>
						<input type="radio" name="feature" value="invesment" /> Investment Size
          </div>
					<div>
						<input type="radio" name="feature" value="easy" /> Easy to use site
					</div>
					<div>
						<input type="radio" name="feature" value="speed" /> Receive money quickly
					</div>
					<div>
						<input type="radio" name="feature" value="length" /> Repayment lenght
          </div>
					<div>	
						<input type="radio" name="feature" value="other" />
						<input className="input" type="text" placeholder="something else" />
          </div>
        </div>

        <div className="form-sec">
          <h2 className="text-2">Save Your Information</h2>
          Email Address:
          <input className="input" type="text" name="email" />
          <br />
          Password:
          <input className="input" type="text" name="password" />
          <br />
          <h5>
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