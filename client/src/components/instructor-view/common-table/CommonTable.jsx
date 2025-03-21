import React, { useEffect, useState } from 'react';
import { Card ,CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import DataTable from 'react-data-table-component';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';

const CommonTable = ({ location, title, columns, data }) => {

    const [records, setRecords] = useState(data);
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const fetchData = () => {
          setRecords(data);
        }
  
        fetchData();
      }, [data])
    const handleSearch = (e) => {
        let searchInput = e.target.value;

        const newRecords = data.filter((item)=>{
            return searchInput.toLowerCase() ==='' 
            ? item
            : Object.values(item).some((value) =>
              value.toString().toLowerCase().includes(searchInput.toLowerCase())
            )
        })

        setRecords(newRecords);
    }

    const menuItems = [
        {
          // icon: BarChart,
          label: "Dashboard",
          value: "Dashboard",
          // component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
        },
        {
          // icon: Book,
          label: "Create Courses",
          value: "Create Courses",
          // component: <InstructorCourses listOfCourses={instructorCoursesList} />,
        },
      ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                backgroundColor: 'transparent',
                
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                borderRadiusTopRight: "50%"
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    }
  return (
    <div className='w-full last:mb-[-40px]'>
      { location==="UsersList" && popUpVisible &&
        <div className='absolute  z-[2] bg-red-500 '>
        <Card className="bg-black w-full max-w-[300px]">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <nav className="">
            {menuItems.map((menuItem) => (
              <button
                className="w-full justify-start mb-2 dark:text-yellow-600 dark:hover:bg-zinc-500 animate-appear duration-1000"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "clear"
                    ? ""
                    : () => setActiveTab(menuItem.value)
                }
              >
                {/* <menuItem.icon className="mr-2 h-4 w-4" /> */}
                {menuItem.label}
              </button>
            ))}
          </nav>
          <main className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {menuItems.map((menuItem, index) => (
                <div>
                <TabsContent key={index} value={menuItem.value}>
                  {menuItem.component !== null ? menuItem.component : null}
                </TabsContent>
                </div>
              ))}
            </Tabs>
          </main>
        </CardContent>
      </Card>
      </div>}
      <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-xl">
            {
              location==="UsersList"
              ? 

              // <Select
              //   // onValueChange={(value) =>
              //   //   setFormData({
              //   //     ...formData,
              //   //     [getControlItem.name]: value,
              //   //   })
              //   // }
              //   value={title}
              // >
              //   <SelectTrigger className="w-max">
              //     <SelectValue placeholder={title} />
              //   </SelectTrigger>
              //   <SelectContent>
              //     {/* {getControlItem.options && getControlItem.options.length > 0
              //       ? getControlItem.options.map((optionItem) => (
              //           <SelectItem key={optionItem.id} value={optionItem.id}>
              //             {optionItem.label}
              //           </SelectItem>
              //         ))
              //       : null} */}
              //     <SelectItem value={"Registered"}>{"Registered"}</SelectItem>
              //     <SelectItem value={"Enrolled"}>{"Enrolled"}</SelectItem>
              //     <SelectItem value={"Not-Enrolled"}>{"Not-Enrolled"}</SelectItem>
              //   </SelectContent>
              // </Select>

              <select defaultValue={title} className='dark:bg-zinc-800 text-inherit'>
                <option value={"Registered"}>{"Registered"}</option>
                <option value={"Enrolled"}>{"Enrolled"}</option>
                <option value={"Not-Enrolled"}>{"Not-Enrolled"}</option>
              </select>

              :title
            }
            {
              location==="UsersList"? `  Students List (${"2"})` : ""
            }
            </CardTitle>
          </CardHeader>
          <CardHeader>
            <CardTitle className="bg-red-700s">
              <div className="flex w-full justify-between gap-4">
                <input 
                  type="search" 
                  placeholder="Search" 
                  className="p-2 border-2 border-black dark:bg-transparent dark:border-white w-1/2 rounded-md"
                  onChange={handleSearch}
                />
                <span className='p-2 rounded-lg border-2 border-black bg-gray-300 dark:text-yellow-500 dark:bg-black dark:border-white w-full max-w-[150px] text-center'>
                { location==="UsersList"?
                (<button onClick={()=>setPopUpVisible(!popUpVisible)} className='w-full h-full bg-inherit'>
                  Filters
                </button>)
                :
                (<select defaultValue={title} className='w-full h-full bg-inherit'>
                  <option value={"Newest-Oldest"}>{"Newest-Oldest"}</option>
                  <option value={"Oldest-Newest"}>{"Oldest-Newest"}</option>
                </select>)
                }
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
              {/* <Table>
                <TableHeader>
                  <TableRow>
                  {config.map((HeadItem, index) => (
                    <TableHead key={index} 
                      style={index===config.length-1?{"text-align": "center"}:{}}
                    >
                        {HeadItem.label}
                    </TableHead>
                  ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.length > 0
                    ? data.filter((item)=>{
                      return search.toLowerCase() ==='' 
                      ? item
                      : Object.values(item).some((value) =>
                        value.toString().toLowerCase().includes(search.toLowerCase())
                      )
                    }).map((BodyItem, index) => (
                        <TableRow key={index}>
                          {config.map((cell, i) => (
                              <TableCell key={i}
                                style={i===config.length-1?{"text-align": "center"}:{}}
                              >
                                  {BodyItem[cell?.value]}
                              </TableCell>
                          ))}
                        </TableRow>
                      ))
                    : 
                    <TableRow>Data Not Found...!</TableRow>}
                </TableBody>
              </Table> */}
              <DataTable
                columns={columns}
                data={records}
                customStyles={customStyles}
                pagination
                style={{background:"black"}}
              />
          </CardContent>
      </Card>
    </div>
  )
}

export default CommonTable;
