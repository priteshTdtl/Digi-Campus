import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/sidebar";

export default function AddQuestion() {
  const navigate = useNavigate();

  const adjustSettings = () => {
    // Navigate to adjust settings page
    navigate("/adjust-setting");
  };

  const editQuestions = () => {
    // Navigate to edit questions page
    navigate("/add-Edt-Queston");
  };

  const publishAndDistribute = () => {
    // Navigate to publish & distribute page
    navigate("/publish-distribute");
  };

  const viewResults = () => {
    // Navigate to view results page
    navigate("/view-results");
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div>
            <h2 className="exam-name"> Dashboard</h2>
            <div className="card-container">
              <div className="row">
                <div className="col-3">
                  <Card className="card">
                    {/* <Card.Body> */}
                    <Card.Title className="card-title">
                      Adjust Settings
                    </Card.Title>
                    <p>
                      Change the test name, description and what happens after
                      the test is graded.
                    </p>
                    <Button
                      variant="primary"
                      className="card-button"
                      onClick={adjustSettings}
                    >
                      Settings
                    </Button>
                    {/* </Card.Body> */}
                  </Card>
                </div>
                <div className="col-3">
                  <Card className="card">
                    {/* <Card.Body> */}
                    <Card.Title className="card-title">
                      Add Questions
                    </Card.Title>
                    <p>It's not much of a test if it doesn't have questions.</p>
                    <Button
                      variant="primary"
                      className="card-button"
                      onClick={editQuestions}
                    >
                      Add Questions
                    </Button>
                    {/* </Card.Body> */}
                  </Card>
                </div>
                <div className="col-3">
                  <Card className="card">
                    {/* <Card.Body> */}
                    <Card.Title className="card-title">
                      Publish & Distribute
                    </Card.Title>
                    <p>
                      Publish your test, distribute it to your students and
                      start collecting results.
                    </p>
                    <Button
                      variant="primary"
                      className="card-button"
                      onClick={publishAndDistribute}
                    >
                      Visit
                    </Button>
                    {/* </Card.Body> */}
                  </Card>
                </div>
                <div className="col-3">
                  <Card className="card">
                    {/* <Card.Body> */}
                    <Card.Title className="card-title">View Results</Card.Title>
                    <p className="p-color">
                      See how well your students did on the test.
                      Best Of Luck !
                    </p>
                    <Button
                      variant="primary"
                      className="card-button"
                      onClick={viewResults}
                    >
                      Results
                    </Button>
                    {/* </Card.Body> */}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
