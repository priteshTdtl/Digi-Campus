
import React, {Component} from "react";
import "./AdminDash.css";
import { FiUsers } from "react-icons/fi";
import { ImUserTie } from "react-icons/im";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserCheck, FaUserTie } from "react-icons/fa";
import { FaChalkboardUser, FaUserXmark } from "react-icons/fa6";
import Sidebar from "../components/sidebar";

class AdminDash extends Component {

  render() {

    return (
      <>
        <Sidebar />
        <div className="container-fluid dashboard-area d-flex">
          <div className="main-content">
            <div style={{ display: "flex", flex: 1, overflowX: "auto" }}>
              <div style={{ display: "flex", flexDirection: "column", }} className="dashboard mt-sm-5 ml-md-5 " >
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", }} >
                  <div className="mt-3" style={{ display: "flex", flexDirection: "row" }} >
                    <div className="card-body admin ab admincardhover">
                      <h5 className="card-title headline">Total Students</h5>
                      <div  style={{ backgroundColor: "#0000", marginLeft: "180px" }} >
                        <FiUsers style={{ color: "#ffffff", fontSize: "2em" }} />
                      </div>
                      <p className="card-text score display-5">10</p>
                      </div>

                    <div className="card-body admin ab admincardhover">
                      <h5 className="card-title headline">Total Companies</h5>
                      <div style={{ backgroundColor: "#0000", marginLeft: "180px" }} >
                        <ImUserTie style={{ color: "#ffffff", fontSize: "2em" }} />
                      </div>
                      <p className="card-text score display-5">
                        10
                      </p>
                    </div>

                    <div className="card-body admin ab admincardhover">
                      <h5 className="card-title headline">
                        
                        Total Job Openings
                      </h5>
                      <div
                        style={{ backgroundColor: "#0000", marginLeft: "180px" }}
                      >
                        <AiOutlineSchedule
                          style={{ color: "#ffffff", fontSize: "2em" }}
                        />
                      </div>
                      <p className="card-text score display-5">
                        10
                      </p>
                    </div>

                    <div className="card-body admin ab admincardhover">
                      <h5 className="card-title headline">Total Interviews Scheduled</h5>
                      <div
                        style={{ backgroundColor: "#0000", marginLeft: "180px" }}
                      >
                        <MdWork style={{ color: "#ffffff", fontSize: "2em" }} />
                      </div>
                      <p className="card-text score display-3">
                        10
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-3"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginRight: "3rem",
                      // marginTop: "4rem",
                    }}
                  >
                    <div className="card-body  hr  admincardhover">
                      <h5 className="card-title headline">Total No. of HR</h5>
                      <div
                        style={{ backgroundColor: "#0000", marginLeft: "180px" }}
                      >
                        <FaChalkboardUser
                          style={{ color: "#ffffff", fontSize: "2em" }}
                        />
                      </div>
                      <p className="card-text score display-5">10</p>
                    </div>

                    <div className="card-body hr admincardhover">
                      <h5 className="card-title headline">Total Interviewers</h5>
                      <div
                        style={{ backgroundColor: "#0000", marginLeft: "180px" }}
                      >
                        <FaUserTie
                          style={{ color: "#ffffff", fontSize: "2em" }}
                        />
                      </div>
                      <p className="card-text score display-5">
                        10
                      </p>
                    </div>

                    <div className="card-body hr admincardhover">
                      <h5 className="card-title headline">Total Candidates</h5>
                      <div
                        style={{ backgroundColor: "#0000", marginLeft: "180px" }}
                      >
                        <HiMiniUserGroup
                          style={{ color: "#ffffff", fontSize: "2em" }}
                        />
                      </div>
                      <p className="card-text score display-5">
                        10
                      </p>
                    </div>

                    <div className="card-body admin hr admincardhover">
                      <h5 className="card-title headline">Active Users</h5>
                      <div
                        style={{ backgroundColor: "#0000", marginLeft: "180px" }}
                      >
                        <FaUserCheck
                          style={{ color: "#ffffff", fontSize: "2em" }}
                        />
                      </div>
                      <p className="card-text score display-5">
                        10
                      </p>
                    </div>

                    <div className="card-body admin hr admincardhover">
                      <h5 className="card-title headline">Inactive Users</h5>
                      <div
                        style={{ backgroundColor: "#0000", marginLeft: "180px" }}
                      >
                        <FaUserXmark
                          style={{ color: "#ffffff", fontSize: "2em" }}
                        />
                      </div>
                      <p className="card-text score display-5">
                        10
                      </p>
                    </div>
                  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminDash;
