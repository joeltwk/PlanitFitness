import axios from 'axios';

const API_URL = 'http://localhost:8080/workout';

export async function getWorkouts(username, page = 0, size = 10) {
    return await axios.get(`${API_URL}/all/${username}?page=${page}&size=${size}`)
}

export async function createWorkout(username, routineID) {
    return await axios.post(`${API_URL}/${username}/${routineID}/create`)
}

export async function getAllSets(workoutID, exerciseID, page = 0, size = 4) {
    return await axios.get(`${API_URL}/all/${workoutID}/${exerciseID}?page=${page}&size=${size}`)
}

export async function addNewSet(workoutID, exerciseID, newSet) {
    return await axios.post(`${API_URL}/${workoutID}/${exerciseID}/add`, newSet)
}

export async function editSet(setID, newSet) {
    return await axios.post(`${API_URL}/${setID}/edit`, newSet)
}

export async function deleteSet(workoutID, exerciseID, setNumber) {
    return await axios.delete(`${API_URL}/${workoutID}/${exerciseID}/${setNumber}/delete`)
}

export async function setComplete(workoutID) {
    return await axios.post(`${API_URL}/${workoutID}/setComplete`)
}

export async function deleteWorkout(workoutID) {
    return await axios.delete(`${API_URL}/${workoutID}/delete`)
}