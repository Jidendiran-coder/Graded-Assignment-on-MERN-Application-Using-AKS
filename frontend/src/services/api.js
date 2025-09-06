
import axios from "axios";
import { API_BASE } from "../config";

// Hello Service APIs
export const getHello = () => axios.get(`${API_BASE.HELLO}/`);
export const getHelloHealth = () => axios.get(`${API_BASE.HELLO}/health`);

// Profile Service APIs
export const addUser = (user) => axios.post(`${API_BASE.PROFILE}/addUser`, user);
export const fetchUsers = () => axios.get(`${API_BASE.PROFILE}/fetchUser`);
