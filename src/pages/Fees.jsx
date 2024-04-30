import React from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../components/sidebar";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Branch",
    selector: (row) => row.branch,
    sortable: true,
  },
  {
    name: "Academic Year",
    selector: (row) => row.academicYear,
    sortable: true,
  },
  {
    name: "Total Fees",
    selector: (row) => row.totalFees,
    sortable: true,
  },
  {
    name: "Fees Paid",
    selector: (row) => row.feesPaid,
    sortable: true,
  },
  {
    name: "Fees Paid Date",
    selector: (row) => row.feesPaidDate,
    sortable: true,
  },
  {
    name: "Balance",
    selector: (row) => row.balance,
    sortable: true,
  },
];

const data = [
  {
    name: "Lary",
    branch: "Computer Science",
    academicYear: "2023-2024",
    totalFees: 10000,
    feesPaid: 5000,
    feesPaidDate: "01-08-2022",
    balance: 5000,
  },
  {
    name: "Mary",
    branch: "Electrical Engineering",
    academicYear: "2023-2024",
    totalFees: 12000,
    feesPaid: 6000,
    feesPaidDate: "01-04-2022",
    balance: 6000,
  },
  {
    name: "Gary",
    branch: "Civil Engineering",
    academicYear: "2023-2024",
    totalFees: 15000,
    feesPaid: 8000,
    feesPaidDate: "11-04-2022",
    balance: 7000,
  },
];

export default function Fees() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="row pt-3">
            <div className="col-12 text-center">
              <h2>D Y Patil College of Engineering and Research</h2>
              <p>Pune</p>
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
