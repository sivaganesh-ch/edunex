import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [hideFiltersButton, setHideFiltersButton] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSeection, getSectionId);
    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };

      console.log(cpyFilters);
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    console.log("JSON Str: ", JSON.stringify(cpyFilters));
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters , sort) {
    
    // console.log(filters)
    const generateQuery = () => {
      // console.log("Condition: ", Object.keys(filters).length !== 0 && filters.category.length!==0)
      if(Object.keys(filters).length !== 0 && filters.category.length!==0){
        console.log("Check this: ", filters)
        return new URLSearchParams({
          ...filters,
          sortBy: sort,
        });
      }
      else {
        let initialFilter = {category:"cloud-computing"}
        return new URLSearchParams({
          ...initialFilter,
          sortBy: sort,
        });
      }
    }

    const query = generateQuery();

    console.log("query", query)
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  console.log(loadingState, "loadingState");

  return (
    <div className="container mx-auto p-4">
      <span className="flex flex-wrap justify-between">
        <h1 className="text-3xl font-bold mb-4">All Courses</h1>
        <Button onClick={()=>setHideFiltersButton(!hideFiltersButton)}>Filters</Button>
      </span>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className={`${hideFiltersButton? "hidden" : "visible"} w-full md:w-64 space-y-4`}>
          <div className="flex flex-wrap w-full border-b md:border-none">
            {Object.keys(filterOptions).map((ketItem, ketIndex) => (
              <div key={ketIndex} className="p-4 md:border-b w-max">
                <h3 className="font-bold mb-3">{ketItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[ketItem].map((option, index) => (
                    <Label key={index} className="flex font-medium items-center gap-3">
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[ketItem] &&
                          filters[ketItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(ketItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1 md:px-8">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black dark:text-yellow-600 font-bold">
              {studentViewCoursesList.length} Results
            </span>
          </div>
          <div className="space-y-4">
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((courseItem) => (
                <Card
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className="cursor-pointer animate-trans-left hover:scale-105 card-appear"
                  key={courseItem?._id}
                >
                  <CardContent className="flex flex-wrap gap-4 p-4">
                    <div className="w-full max-w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem?.image}
                        className="w-ful h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem?.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-zinc-200 mb-1">
                        Created By{" "}
                        <span className="font-bold text-yellow-600">
                          {courseItem?.instructorName}
                        </span>
                      </p>
                      <p className="text-[16px] text-gray-600 dark:text-zinc-200 mt-3 mb-2">
                        {`${courseItem?.curriculum?.length} ${
                          courseItem?.curriculum?.length <= 1
                            ? "Lecture"
                            : "Lectures"
                        } - ${courseItem?.level.toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg text-yellow-600 animate-pulse">
                        ${courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : loadingState ? (
              <Skeleton />
            ) : (
              <h1 className="font-extrabold text-4xl animate-bounce dark:text-yellow-600">No Courses Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
