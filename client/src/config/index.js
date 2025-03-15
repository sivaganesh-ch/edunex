export const roleTypeOptions = [
  { id:"user", label:"User" },
  { id:"instructor", label:"Instructor" },
  { id:"admin", label:"Admin" },
]

export const degreeTypeOptions = [
  { id:"B-Tech", label:"B-Tech"},
  { id:"M-Tech", label:"M-Tech"},
  { id:"Others", label:"Others"},
]

export const signUpFormControls = [
  {
    name: "role",
    label: "Register As",
    placeholder: "Select Login Type",
    type: "text",
    componentType: "select",
    options: roleTypeOptions,
  },
  {
    name: "collegeName",
    label: "College Name",
    placeholder: "Enter your College Name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your Full Name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userRollNumber",
    label: "Roll Number",
    placeholder: "Enter your Roll Number",
    type: "text",
    componentType: "input",
  },
  {
    name: "userBranch",
    label: "Branch Name",
    placeholder: "Enter your Branch Name (CSE,ECE,AIML,...)",
    type: "text",
    componentType: "input",
  },
  {
    name: "userRegisteredSEM",
    label: "Semester",
    placeholder: "Enter your Current Semester (1-8)",
    type: "Number",
    componentType: "input",
  },
  {
    name: "userDegree",
    label: "Degree Type",
    placeholder: "Enter your Roll Number",
    type: "text",
    options: degreeTypeOptions,
    componentType: "select",
  },
  {
    name: "userMobileNumber",
    label: "Mobile Number",
    placeholder: "Enter your Mobile Number",
    type: "Number",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your Email-Id",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "role",
    label: "Login As",
    placeholder: "Select Login Type",
    type: "text",
    componentType: "select",
    options: roleTypeOptions,
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your Email-Id",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  role: "",
  userEmail: "",
  password: "",
};

export const initialUserSignUpFormData = {
  role: "",
  collegeName: "",
  userName: "",
  userRollNumber: "",
  userBranch: "",
  userRegisteredSEM: "",
  userDegree: "",
  userMobileNumber: "",
  userEmail: "",
  password: "",
};

export const initialOtherSignUpFormData = {
  role: "",
  userName: "",
  userBranch: "",
  userEmail: "",
  password: "",
};

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "telugu", label: "Telugu" },
  { id: "hindi", label: "Hindi" },
];

export const courseLevelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export const courseCategories = [
  { id: "web-development", label: "Web Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
];

export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

export const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};
