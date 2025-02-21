import axios from 'axios';

const API_URL = 'http://localhost:8080/routine';


export async function getRoutines(username, page = 0, size = 10) {
    const response = await axios.get(`${API_URL}/all/${username}?page=${page}&size=${size}`)
    console.log(response);
    return response;
}

export async function saveRoutine(routine) {
    return await axios.post(`${API_URL}/create`, routine);
}

export async function addExerciseToRoutine(routineID, exerciseID) {
    return await axios.post(`${API_URL}/${routineID}/${exerciseID}/add`)
}

export async function deleteRoutine(routineID) {
    return await axios.delete(`${API_URL}/${routineID}/delete`)
}

export async function editRoutine(routineID, routine) {
    return await axios.post(`${API_URL}/${routineID}/edit`, routine)
}

export async function deleteRoutineExercise(routineID, exerciseID) {
    return await axios.delete(`${API_URL}/${routineID}/${exerciseID}/delete`)
}

export async function getRoutine(routineID) {
    return await axios.get(`${API_URL}/${routineID}`)
}