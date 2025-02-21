import {useEffect, useRef, useState} from 'react';
import Navbar from "./components/Navbar";
import WorkoutBlock from "./components/WorkoutBlock";
import RoutineBlock from "./components/RoutineBlock";
import ExerciseBlock from "./components/ExerciseBlock";
import LoginBlock from "./components/LoginBlock";
import { getExercises, saveExercise } from './services/ExerciseService';
import { getRoutines, saveRoutine } from './services/RoutineService';
import { getWorkouts } from './services/WorkoutService';
import LoadingPage from './components/LoadingPage';
// import { Routes, Route } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false
  });

  const [userValues, setUserValues] = useState({
    username: '',
    password: ''
  });

  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const [routineData, setRoutineData] = useState({});
  const [currentRoutinePage, setCurrentRoutinePage] = useState(0);

  const [workoutData, setWorkoutData] = useState({});
  const [currentWorkoutPage, setCurrentWorkoutPage] = useState(0);

  const getAllExercises = async (page = 0, size = 8, filter = 'exerciseName') => {
    try {
      setCurrentPage(page);
      const {data} = await getExercises(userValues.username, page, size, filter);
      setData(data);
    } catch (error) {
      console.log(error)
    }
  }

  const getAllRoutines = async (page = 0, size = 8) => {
    try {
      setCurrentRoutinePage(page);
      const {data} = await getRoutines(userValues.username, page, size);
      setRoutineData(data);
    } catch (error) {
      console.log(error)
    }
  }

  const getAllWorkouts = async (page = 0, size = 8) => {
    try {
      setCurrentWorkoutPage(page);
      const {data} = await getWorkouts(userValues.username, page, size);
      setWorkoutData(data);
    } catch (error) {
      console.log(error)
    }
  }

  const [showLoading, setShowLoading] = useState(true);

  // const getAllWorkout = async (page = 0, size = 10) 

  useEffect(() => {
    if(loggedIn.loggedIn){
      setTimeout(() => {
          setShowLoading(false);
      }, 1400)
      getAllWorkouts();
      getAllExercises();
      getAllRoutines();
    }
  }, [loggedIn.loggedIn, userValues.username]);

  if (!loggedIn.loggedIn) {
  return (
    <>
    <Navbar />
    <LoginBlock userValues={userValues} setUserValues={setUserValues} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </>
  )
  } else {
    
    return (
      <>
      {showLoading ? 
        ( <LoadingPage></LoadingPage> )
       : (
        <>
        <Navbar username={userValues.username}/>
        <WorkoutBlock userValues={userValues} workoutData={workoutData} currentWorkoutPage={currentWorkoutPage} getAllWorkouts={getAllWorkouts} routineData={routineData} getAllRoutines={getAllRoutines}/>
        <RoutineBlock userValues={userValues} routineData={routineData} currentRoutinePage={currentRoutinePage} getAllRoutines={getAllRoutines} data={data} currentPage={currentPage} getAllExercises={getAllExercises}/>
        <ExerciseBlock userValues={userValues} data={data} currentPage={currentPage} getAllExercises={getAllExercises}/>
        </>
      )}
      </>
    );
  }
}

export default App
