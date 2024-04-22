import DataTable from 'react-data-table-component';
const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true
    },
    {
        name: 'Branch',
        selector: row => row.branch,
        sortable: true
    },
    {
        name: 'Academic Year',
        selector: row => row.academicYear,
        sortable: true
    },
    {
        name: 'Total Fees',
        selector: row => row.totalFees,
        sortable: true
    },
    {
        name: 'Fees Paid',
        selector: row => row.feesPaid,
        sortable: true
    },
    {
        name: 'Balance',
        selector: row => row.balance,
        sortable: true
    }
];

const data = [
    {
        name: 'Lary',
        branch: 'Computer Science',
        academicYear: '2023-2024',
        totalFees: 10000,
        feesPaid: 5000,
        balance: 5000
    },
    {
        name: 'Mary',
        branch: 'Electrical Engineering',
        academicYear: '2023-2024',
        totalFees: 12000,
        feesPaid: 6000,
        balance: 6000
    },
    {
        name: 'Gary',
        branch: 'Civil Engineering',
        academicYear: '2023-2024',
        totalFees: 15000,
        feesPaid: 8000,
        balance: 7000
    },
];

export default function Fees() {
	return (
		<DataTable
            columns={columns}
            data={data}
            striped={true} 
            highlightOnHover={true}
            pagination={true} 
            paginationPerPage={10} 
            paginationRowsPerPageOptions={[5, 10, 20]} 
        />
	);
};