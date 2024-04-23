import React, { Component } from "react";
import "./AdminDash.css";
import { FiUsers } from "react-icons/fi";
import { ImUserTie } from "react-icons/im";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { FaUserCheck}  from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import Sidebar from "../components/sidebar";

class AdminDash extends Component {
  render() {
    return (
      <>
        <Sidebar />
        <div className="container-fluid dashboard-area">
          <div className="row">
            {/* First Row */}
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Total Students</h5>
                <div className="icon" style={{ backgroundColor: "#0000", marginLeft: "25em" }} >
                <FiUsers style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Placed Students</h5>
                <div className="icon" style={{ backgroundColor: "#0000", marginLeft: "25em" }} >
                  <FaUserCheck  style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Unplaced Students</h5>
                <div className="icon" style={{ backgroundColor: "#0000", marginLeft: "25em" }} >
                  <FaUserXmark  style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Total Companies</h5>
                <div className="icon" style={{ backgroundColor: "#0000", marginLeft: "25em" }} >
                  <ImUserTie  style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Total Job Openings</h5>
                <div className="icon" style={{ backgroundColor: "#0000", marginLeft: "25em" }} >
                  <AiOutlineSchedule  style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Total Interviews Scheduled</h5>
                <div className="icon" style={{ backgroundColor: "#0000", marginLeft: "25em" }} >
                  <MdWork  style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminDash;