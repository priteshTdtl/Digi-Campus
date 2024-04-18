import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import "../index.css";

export default class UniversitySignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false
    };
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
  };

  render() {
    const { passwordVisible } = this.state;

    return (
      <div className="auth-wrapper">
        <div className="auth-inner university-signup-inner">
          <form>
            <h3>University Registration</h3>
            <div className="mb-3">
              <label>Name of University</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter university name"
                name="universityName"
              />
            </div>
            <div className="mb-3">
              <label>University Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter university email"
                name="universityEmail"
              />
            </div>
            <div className="mb-3 password-input">
              <label>University Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Enter university password"
                name="universityPassword"
              />
              {/* Toggle button to show/hide password */}
              <button
                type="button"
                className="toggle-password"
                onClick={this.togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mb-3">
              <label>University Phone Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter university phone number"
                name="universityPhoneNumber"
              />
            </div>
            <div className="mb-3">
              <label>University City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter university city"
                name="universityCity"
              />
            </div>
            <div className="mb-3">
              <label>Establishment Year</label>
              <select className="form-control" name="establishmentYear">
                {Array.from({ length: 210 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
