import axios from 'axios';

const API_URL = 'http://localhost:8080';

export async function login(userValues) {
    return await axios.post(`${API_URL}/login`, userValues);
}