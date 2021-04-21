import axios from 'axios'

export default axios.create({
  baseURL: "https://api.airtable.com/v0",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer key7XQ8Is5o6z82BJ"
  }
})