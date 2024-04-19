// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// import "../index.css";

// export default class CollegeSignup extends Component {
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
//         <div className="auth-inner College-signup-inner">
//           <form>
//             <h3>College Registration</h3>
//             <div className="mb-3">
//               <label>Name of College</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter College name"
//                 name="universityName"
//               />
//             </div>
//             <div className="mb-3">
//               <label>College Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter College email"
//                 name="universityEmail"
//               />
//             </div>
//             <div className="mb-3 password-input">
//               <label>College Password</label>
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 className="form-control"
//                 placeholder="Enter College password"
//                 name="universityPassword"
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
//               <label>College Phone Number</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 placeholder="Enter College phone number"
//                 name="universityPhoneNumber"
//               />
//             </div>
//             <div className="mb-3">
//               <label>College City</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter College city"
//                 name="universityCity"
//               />
//             </div>
//             <div className="mb-3">
//               <button type="submit" className="btn btn-primary btn-block">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from 'react-router-dom';
import "../index.css";

const CollegeSignup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner College-signup-inner">
        <form>
          <h3>College Registration</h3>
          <div className="mb-3">
            <label>Name of College</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter College name"
              name="universityName"
            />
          </div>
          <div className="mb-3">
            <label>College Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter College email"
              name="universityEmail"
            />
          </div>
          <div className="mb-3 password-input">
            <label>College Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Enter College password"
              name="universityPassword"
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
            <label>College Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter College phone number"
              name="universityPhoneNumber"
            />
          </div>
          <div className="mb-3">
            <label>College City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter College city"
              name="universityCity"
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
          <Link to="/adminLogin" className="back-to-login">
        <MdKeyboardBackspace fontSize={25}/> 
      </Link>
        </form>
      </div>
    </div>
  );
}

export default CollegeSignup;
