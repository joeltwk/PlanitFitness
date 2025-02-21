import axios from 'axios';

const API_URL = 'http://localhost:8080/exercise';

export async function saveExercise(exercise) {
    return await axios.post(`${API_URL}/create`, exercise);
}

export async function getExercises(username, page = 0, size = 10, filter ='exerciseName') {
    return await axios.get(`${API_URL}/all/${username}?page=${page}&size=${size}&filter=${filter}`)
}

export async function getExercise(id) {
    return await axios.get(`${API_URL}/${id}`)
}

export async function deleteExercise(id) {
    return await axios.delete(`${API_URL}/${id}/delete`)
}

export async function editExercise(id, exercise) {
    return await axios.post(`${API_URL}/${id}/edit`, exercise)
}