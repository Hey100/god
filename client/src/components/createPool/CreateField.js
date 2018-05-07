import React from 'react';

export default ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div>
      <label>{label}</label>
      {renderInput(input, type, placeholder)}
      <div className="alert" style={{ marginBottom: '10px', color: 'tomato' }}>
        {touched && error}
      </div>
    </div>
  );
};

const renderInput = (input, type, placeholder) => {
  if (input.name === 'participants') {
    return participants(input);
  }
  if (input.name === 'category') {
    return category(input);
  }
  if (input.name === 'amount') {
    return amount(input);
  }
  if (input.name === 'picture') {
    return (
      <input
				name="picture"
				onBlur={() => null}
				onChange={() => null}
				onDragStart={() => null}
				onDrop={() => null}
				onFocus={() => null}
				value=""
        className="form-in"
        style={{ marginBottom: '2px' }}
        type="file"
        accept="image/*"
      />
    );
  }
  if (input.name === 'rate') {
		return rate(input);
	}
  if (input.name === 'description') {
    return description(input);
  } else {
    return (
      <input
        className="form-in"
        {...input}
        style={{ marginBottom: '2px' }}
        type={type}
        placeholder={placeholder}
      />
    );
  }
};
const description = input => {
  return (
    <textarea {...input} cols="30" rows="10"></textarea>
  );
};
const participants = input => {
  return (
    <select {...input} className="form-in">
      <option selected>Number of Contributors</option>
      <option value="5">5</option>
      <option value="7">7</option>
      <option value="9">9</option>
      <option value="11">11</option>
      <option value="13">13</option>
    </select>
  );
};
const category = input => {
  return (
    <select {...input} className="form-in">
      <option selected>Category</option>
      <option value="Sports">Sports</option>
      <option value="Business">Business</option>
      <option value="Home Improvement">Home Improvement</option>
      <option value="Travel">Travel</option>
    </select>
  );
};
const rate = input => {
  return (
    <select {...input} className="form-in">
      <option selected>Interest Rate</option>
      <option value="5">5%</option>
      <option value="7">7%</option>
      <option value="9">9%</option>
      <option value="10">10%</option>
    </select>
  );
};
const amount = input => {
  return (
    <select {...input} className="form-in">
      <option value="Amount" />
      <option value="1000">$1,000</option>
      <option value="2000">$2,000</option>
      <option value="3000">$3,000</option>
      <option value="4000">$4,000</option>
      <option value="5000">$5,000</option>
      <option value="6000">$6,000</option>
      <option value="7000">$7,000</option>
      <option value="8000">$8,000</option>
      <option value="9000">$9,000</option>
      <option value="10000">$10,000</option>
    </select>
  );
};
