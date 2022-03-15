import axios from "axios"

const API_URL = "/api/users"

//Register user
const register = async (UserData) => {
  const response = await axios.post(API_URL, UserData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  register,
}

export default authService
