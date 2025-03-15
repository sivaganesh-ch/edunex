import React, { useEffect, useState } from "react";
// import TableComponent from "../common-table/TableComponent";
// import CommonTable from "../common-table/commonTable";
import CommonTableCard from "../common-table/CommonTableCard";

const StudentsList = ({ allUsersList }) => {
  console.log("UsersList: ", allUsersList);

  const usersListConfig = [
    // {
    //   name: "dateTime",
    //   label: "Registered Date-Time",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "_id",
      label: "User-Id",
      options: {
        display: false,
      },
    },
    {
      name: "userRollNumber",
      label: "Student Roll.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (rollNo) => <p className="text-center">{rollNo}</p>,
      },
    },
    {
      name: "userName",
      label: "Student Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "userBranch",
      label: "Branch",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "userSEM",
      label: "SEM",
      options: {
        display: false,
        filter: true,
        sort: true,
      },
    },
    {
      name: "userEmail",
      label: "Email-Id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "userMobileNumber",
      label: "Mobile.No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "totalEnrolledCourses",
      label: "Total Courses Enrolled",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (totalEnrolledCourses) => (
          <p className="text-center">{totalEnrolledCourses}</p>
        ),
      },
    },
  ];

  return (
    // <TableComponent
    //     location={"UsersList"}
    //     title={"Registered"}
    //     config={usersListConfig}
    //     data={usersListData}
    // />
    <CommonTableCard
      title={"REGISTERED USERS"}
      rowClickable={true}
      location={"UsersList"}
      columns={usersListConfig}
      data={allUsersList}
    />
  );
};

export default StudentsList;
