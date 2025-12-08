// const BASE_URL = process.env.REACT_BASE_URL
const BASE_URL= `http://localhost:4000/api/v1`

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API : BASE_URL + "/auth/reset-password-token",
    FORGETPASSWORD_API : BASE_URL + "/auth/reset-password"
}

// Course Endpoints
export const CourseEndPoints = {
    CREATE_COURSE_API : BASE_URL + "/course/CreateCourse",
    COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",
    GET_ALL_COURSE_API : BASE_URL + "/course/ShowAllCourse",
    EDIT_COURSE_API : BASE_URL  + "/course/editCourse",
    DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
    CREATE_SECTION_API : BASE_URL + "/course/addSection",
    UPDATE_SECTION_API : BASE_URL  + "/course/updateSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    CREATE_SUBSECTION_API : BASE_URL + "/course/AddSubSection",
    UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
    COURSE_CATEGORIES_API : BASE_URL + "/course/ShowAllCategories",
    GET_ALL_INSTRUCTOR_COURSES_API : BASE_URL + "/course/getInstructorCourses",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED : BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETIOIN_API : BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API : BASE_URL + "/course/"


}

export const Categories = {
    CATEGORIES_API : BASE_URL + "/course/ShowAllCategories"
}

export const contactusformEndpoint = {
    CONTACTUSFORM_API : BASE_URL + "/reach/contactus-form"
}

// setting page api 
export const SettingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/UpdateProfile",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API : BASE_URL + "profile/deleteProfile"
}