import axios from 'axios'
const UserAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Authorization': localStorage.getItem('user_login_jwt') }
});



export default UserAxios;