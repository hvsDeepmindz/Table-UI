/* eslint-disable no-unused-vars */
import React from "react";
import TableDummyData from "../../../Services/Data/TableData";
import Table from "../../../Components/Table/Table";

const DatasetView = () => {
  const columns = [
    { header: "ID", accessor: (row) => row.id },
    { header: "Name", accessor: (row) => row.name },
    { header: "Email", accessor: (row) => row.email },
    { header: "Subject", accessor: (row) => row.subject },
    { header: "Phone", accessor: (row) => row.phone },
    { header: "Address", accessor: (row) => row.address },
    { header: "City", accessor: (row) => row.city },
    { header: "Country", accessor: (row) => row.country },
    { header: "Company", accessor: (row) => row.company },
    { header: "Status", accessor: (row) => row.status },
  ];

  return (
    <>
      <Table
        title={"Dataset Table"}
        columns={columns}
        data={TableDummyData}
        tooltipShow={true}
      />
    </>
  );
};

export default DatasetView;
