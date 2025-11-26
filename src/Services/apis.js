// const BASE_URL = process.env.REACT_BASE_URL
const BASE_URL= `http://localhost:4000/api/v1`

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup"
}

export const Categories = {
    CATEGORIES_API : BASE_URL + "/course/ShowAllCategories"
}