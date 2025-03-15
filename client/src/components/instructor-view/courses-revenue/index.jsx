import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpenText, Delete, Edit, IndianRupeeIcon } from 'lucide-react';
import React, { useState } from 'react'
// import TableComponent from '../common-table/TableComponent';
// import CommonTable from '../common-table/commonTable';
import CommonTableCard from '../common-table/CommonTableCard';
import { display } from '@mui/system';

const InstructorRevenueOnCourses = ({ listOfCourses, totalStudentsAndProfit }) => {

    // console.log("students ", totalStudentsAndProfit.studentList);

    const cardConfig = [
        {
          icon: BookOpenText,
          label: "Total Provided Courses",
          value: listOfCourses.length || 0,
        },
        {
          icon: IndianRupeeIcon,
          label: "Total Revenue on Courses",
          value: totalStudentsAndProfit.totalProfit+"/-" || 0,
        },
    ];

    const findTotalEarningsOnEachCourse = (students) => {

      let totalEarnings = 0;

      students.forEach((eachStudent) => {
        totalEarnings += parseInt(eachStudent.paidAmount)
      })

      return totalEarnings || 0;
    }
    const RevenueOnEachCourseConfig = [      
      {
        name: "_id",
        label: "Course-Id",
        options: {
          display: false,
          filter: true,
          sort: true,
        }
      },
      {
        name: "title",
        label: "Course Name",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "instructorName",
        label: "Instructor Name",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "category",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "pricing",
        label: "Course Price",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (pricing) => <p className='text-center'>{pricing}</p>
        }
      },
      {
        name: "students",
        label: "Total Enrolled",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (students) =>  <p className='text-center'>{students.length}</p>, 
        }
      },
      {
        name: "students",
        label: "Total Earn on Course",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (students) => (
            <p className='text-center'>
              {findTotalEarningsOnEachCourse(students)}
            </p>
          ),
        }
      },
    ];

    const AllCoursesBuyersData = totalStudentsAndProfit.studentList;
    
    const AllCoursesBuyersConfig = [
      {
        name: "studentId",
        label: "Id",
        options: {
          display: false,
          filter: true,
          sort: true,
        }
      },
      // {
      //   name: "studentRollNo",
      //   label: "Student Roll.No",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   }
      // },
      {
        name: "studentName",
        label: "Student Name",
        options: {
          filter: true,
          sort: true,
        }
      
      },
      {
        name: "courseTitle",
        label: "Course Name",
        options: {
          filter: true,
          sort: true,
        }
      
      },
      {
        name: "studentEmail",
        label: "Email-Id",
        options: {
          filter: true,
          sort: true,
        }
      
      },
      {
        name: "paidAmount",
        label: "Course Price",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (paidAmount) => (
            <p className='text-center'>{paidAmount}</p>
          ),
        }
      
      },
    ];

  return (
    <div className='w-full'>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {cardConfig.map((item, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.label}
                  </CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value|| 0}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <CommonTableCard
            pageLocation={"RevenueOnEachCourses"}
            rowClickable={true}
            title={"Revenue On Each Course"}
            columns={RevenueOnEachCourseConfig}
            data={listOfCourses}
          />
          <CommonTableCard 
            location={"AllCoursesBuyers"}
            rowClickable={true}
            title={"ALL COURSES BUYERS"} 
            columns={AllCoursesBuyersConfig}
            data={AllCoursesBuyersData}
          />
        </div>
    </div>
  )
}

export default InstructorRevenueOnCourses;
