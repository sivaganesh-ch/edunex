import React, { useContext } from "react";
import { InstructorContext } from "@/context/instructor-context";
import CommonTableCard from "@/components/instructor-view/common-table/CommonTableCard";

const BarChartReferTable = () => {
  const { barChartClickedData } = useContext(InstructorContext);

  const usersListConfig = [
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
  ];

  console.log("Clicked Data: ", barChartClickedData);

  return (
    <CommonTableCard
      title={barChartClickedData.title}
      rowClickable={true}
      location={"UsersList"}
      columns={usersListConfig}
      data={barChartClickedData.data || []}
    />
  );
};

export default BarChartReferTable;
