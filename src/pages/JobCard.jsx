// JobCard.jsx
import React, { useState } from "react";

function JobCard({ job }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        
          <h5 className="card-title">{job.job_title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{job.company_name}</h6>
          <p className="card-text"><strong>Date:</strong> {job.date}</p>
          <p className="card-text"><strong>Vacancies:</strong> {job.vacancies}</p>
          <p className="card-text"><strong>Location:</strong> {job.location}</p>
          <button className="btn btn-primary" onClick={toggleModal}>View Description</button>
        </div>
      

      {/* Modal */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{job.job_title} Description</h5>
                <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>{job.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCard;
