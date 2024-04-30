import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Sidebar from "../components/sidebar";

const columns = [
    {
        name: "Applied Job",
        selector: (row) => row.job,
        sortable: true,
    },
    {
        name: "Job Status",
        selector: (row) => row.status,
        sortable: true,
    },
    {
        name: "Last Update",
        selector: (row) => row.update,
        sortable: true,
    },

];

const data = [
    {
        job: "SDE I",
        status: "Applied",
        update: "20 Apr 2024",
    },
    {
        job: "Web Developer",
        status: "Under Review",
        update: "15 March 2024",
    },
    {
        job: "Business Analyst",
        status: "Selected",
        update: "10 June 2024",
    },
];
function AppliedJob() {
    return (
        <>
            <Sidebar />
            <div className="container-fluid dashboard-area d-flex">
                <div className="main-content p-4">
                    <div className="row pt-3">
                        <div className="col-12 text-start ">
                            <h3>Welcome to your Jobs Applied</h3>
                            <p>
                                Below are your options for managing your profile and
                                reviewing the status of jobs you have applied to.
                            </p>
                            <h5>General Options</h5>
                        </div>
                    </div>
                    <div className="row mb-3 dashbtnm">
                        <div className="col-sm-2  text-start ">
                            <Link to="/update-profile" className="btn btn-outline-dark btn-block p-3" > Update Profile </Link>
                        </div>
                        <div className="col-sm-2  text-start">
                            <Link to="/job-list" className="btn btn-outline-dark  btn-block p-3" > View Opportunities </Link>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={data}
                        striped
                        highlightOnHover
                        pagination
                        customStyles={{
                            headRow: {
                                style: {
                                    backgroundColor: "#f0f0f0",
                                    fontWeight: "bold",
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default AppliedJob