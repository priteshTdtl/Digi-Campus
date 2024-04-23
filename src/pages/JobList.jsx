// JobList.jsx
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Sidebar from "../components/sidebar";

function JobList() {
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        fetchJobList();
    }, []);

    const fetchJobList = async () => {
        try {
            const response = await fetch("http://54.68.156.170:8000/job_list/");
            if (response.ok) {
                const data = await response.json();
                setJobList(data);
            } else {
                console.error("Failed to fetch job list");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="container-fluid dashboard-area d-flex">
                <div className="main-content p-4">
                <div className="p-5">
                    <h2 className="d-flex justify-content-center mb-5">
                        Job Openings
                    </h2>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {jobList.map((job) => (
                                <JobCard key={job.job_id} job={job} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobList;
