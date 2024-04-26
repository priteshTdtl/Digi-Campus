import React, { Component } from "react";
import "../style/AdminDash.css";
import { FiUsers } from "react-icons/fi";
import { ImUserTie } from "react-icons/im";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import Sidebar from "../components/sidebar";
import Chart from "chart.js/auto";
class AdminDash extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.buildChart();
  }

  buildChart() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Total Students",
            data: [10, 20, 30, 25, 50, 45, 60],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
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
                <div
                  className="icon"
                  style={{ backgroundColor: "#0000", marginLeft: "25em" }}
                >
                  <FiUsers style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Placed Students</h5>
                <div
                  className="icon"
                  style={{ backgroundColor: "#0000", marginLeft: "25em" }}
                >
                  <FaUserCheck style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Unplaced Students</h5>
                <div
                  className="icon"
                  style={{ backgroundColor: "#0000", marginLeft: "25em" }}
                >
                  <FaUserXmark style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Total Companies</h5>
                <div
                  className="icon"
                  style={{ backgroundColor: "#0000", marginLeft: "25em" }}
                >
                  <ImUserTie style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">Total Job Openings</h5>
                <div
                  className="icon"
                  style={{ backgroundColor: "#0000", marginLeft: "25em" }}
                >
                  <AiOutlineSchedule
                    style={{ color: "#ffffff", fontSize: "4em" }}
                  />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-body admin admincardhover">
                <h5 className="card-title headline">
                  Total Interviews Scheduled
                </h5>
                <div
                  className="icon"
                  style={{ backgroundColor: "#0000", marginLeft: "25em" }}
                >
                  <MdWork style={{ color: "#ffffff", fontSize: "4em" }} />
                </div>
                <p className="card-text score display-4">10</p>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <canvas
              id="myChart"
              ref={this.chartRef}
              width="400"
              height="400"
            ></canvas>
          </div>
        </div>
      </>
    );
  }
}

export default AdminDash;
