import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import Sidebar from "./sidebar"; // Import Sidebar component
import "../index.css";

const SamplePage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 p-0">
                    {/* Render Sidebar component */}
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    {/* Your existing content */}
                    <div className="auth-wrapper">
                        <div className="auth-inner admin-login-inner">
                            <form>
                                <h3>Sample Login </h3>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SamplePage;
