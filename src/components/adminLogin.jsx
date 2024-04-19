import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default class AdminLogin extends Component {
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
        <div className="auth-inner admin-login-inner">

          {/* Your login form */}
          <form>
            <h3>Admin Login</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3 password-input">
              <label>Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
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
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mb-3">
              Forgot <a href="#">password?</a>
            </p>
            <div className="text-center mb-0 mt-5">
              <Link to="/collegeSignup" className="btn btn-dark mr-3">Register College</Link>
              <Link to="/universitySignup" className="btn btn-dark">Register University</Link>
              <Link to="/collegeLogin" className="btn btn-dark">College Login</Link>
              <Link to="/universityLogin" className="btn btn-dark">University Login</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
