import axios from "axios"

const API_URL = "http://localhost:5000/api/users"

//Register user
const register = async (UserData) => {
  const response = await axios.post(API_URL, UserData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (UserData) => {
  const response = await axios.post(API_URL + "/login", UserData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => localStorage.removeItem("user")

const authService = {
  register,
  logout,
  login,
}

export default authService
