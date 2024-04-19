// import React, { Component } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import "../index.css";

// export default class CollegeLogin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       passwordVisible: false
//     };
//   }

//   togglePasswordVisibility = () => {
//     this.setState(prevState => ({
//       passwordVisible: !prevState.passwordVisible
//     }));
//   };

//   render() {
//     const { passwordVisible } = this.state;

//     return (
//       <div className="auth-wrapper">
//         <div className="auth-inner admin-login-inner">
//           <form>
//             <h3>College Login</h3>
//             <div className="mb-3">
//               <label>Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter email"
//               />
//             </div>
//             <div className="mb-3 password-input">
//               <label>Password</label>
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 className="form-control"
//                 placeholder="Enter password"
//               />
//               {/* Toggle button to show/hide password */}
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={this.togglePasswordVisibility}
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <div className="mb-3">
//               <button type="submit" className="btn btn-primary btn-block">
//                 Submit
//               </button>
//             </div>
//             <p className="forgot-password text-right mb-3">
//               Forgot <a href="#">password?</a>
//             </p>

//           </form>
//         </div>
//       </div>
//     );
//   }
// }
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import "../index.css";

const CollegeLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner admin-login-inner">
        <form>
          <h3>College Login</h3>
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
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
          <p className="forgot-password mb-3">
            <Link to="/adminLogin" className="back-to-login">
              <MdKeyboardBackspace fontSize={25} />
            </Link>{" "}
            <a href="#">Forgot password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CollegeLogin;
