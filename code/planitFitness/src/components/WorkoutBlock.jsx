import React, { useEffect, useRef, useState } from 'react';
import Workout from './Workout';
import { createWorkout } from '../services/WorkoutService';
import WorkRout from './WorkRout';
import { getRoutines } from '../services/RoutineService';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

function getDay() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date();
    return `${weekday[today.getDay()]}`;
}

function WorkoutBlock({ userValues, workoutData, currentWorkoutPage, getAllWorkouts}) {
    const [currentDate, setCurrentDate] = useState(getDate()); 
    const [currentDay, setCurrentDay] = useState(getDay()); 

    const createWorkoutModalRef = useRef();
    const toggleCreateWorkoutModalRef = (show) => show ? createWorkoutModalRef.current.showModal() : createWorkoutModalRef.current.close();

    const handleCreateWorkout = async (event) => {
        event.preventDefault();
        try {
            const response = await createWorkout(userValues.username, selectedRoutine.routineID)
            toggleCreateWorkoutModalRef(false);
            getAllWorkouts();
        } catch (error) {
            console.log(error);
        }
    }

    const [routineData, setRoutineData] = useState({});
    const [currentRoutinePage, setCurrentRoutinePage] = useState(0);

    const getAllRoutines = async (page = 0, size = 8) => {
        try {
          setCurrentRoutinePage(page);
          const {data} = await getRoutines(userValues.username, page, size);
          setRoutineData(data);
        } catch (error) {
          console.log(error)    
        }
      }
    
    useEffect(() => {
        getAllRoutines();
    }, [])


    const [selectedRoutine, setSelectedRoutine] = useState({
        routineID: '',
        routineName: '',
        routineDesc: '',
        exerciseList: ''
    });
    const handleSelectedRoutine = (routine) => {
        setSelectedRoutine({ routineID: routine.routineID, routineName: routine.routineName, routineDesc: routine.routineDesc, exerciseList: routine.exerciseList});

    }

    return (
        <div className="block workoutBlock">
            <div className="blockHeader">
                <h1>Workout Completed</h1>
                <div className="dayDate">
                    <p className="day">{currentDay}</p>
                    <p className="date">{currentDate}</p>
                </div>
            </div>

            <div className="section">
                {workoutData?.content?.length === 0 && <div>No Workouts</div>}
  
                {workoutData?.content?.length > 0 && workoutData.content.map(workout => <Workout workout={workout} getAllWorkouts={getAllWorkouts} key={workout.workoutID}/>)}

            </div>

            {workoutData?.content?.length > 0 && workoutData?.totalPages > 1 &&
                <div className="pagination">
                    <a onClick={() => getAllWorkout(currentWorkoutPage - 1)} className={0 === currentWorkoutPage ? 'disabled' : ''}>&laquo;</a>
                    
                    { workoutData &&[...Array(workoutData.totalPages).keys()].map((page, index) => 
                        <a onClick={() => getAllWorkout(page)} className={currentWorkoutPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                    
                    <a onClick={() => getAllWorkout(currentWorkoutPage + 1)} className={workoutData.totalPages === currentWorkoutPage + 1 ? 'disabled' : ''}>&raquo;</a>
                </div>
            }
            <div className="startWorkoutContainer">
                <button className="greyButton" onClick={() => {toggleCreateWorkoutModalRef(true); getAllRoutines();}}>Start workout</button>
            </div>

            {/* create workout Modal */}
            <dialog ref={createWorkoutModalRef} className="modal routineDetailCard" id="modal">
                <div className="modal_header">
                    <h3>Start Workout</h3>
                    <p className="modalDescription">{currentDay}</p>
                    <p className="modalDescription">{currentDate}</p>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <div className="routineModalContainer">
                        <div className="routineList">
                            <h3 className="routineCardExerciseHeader">Routine selected</h3>
                            <div className='routineExerciseContainer'>
                                        <div className="exerciseTitle">
                                            <div className="exerciseTitleDetails">
                                                <p className="routineDetailExerciseName">{selectedRoutine.routineName}</p>
                                            </div>
                                        </div>
                                        <p className="routineDetailExerciseCategory">{selectedRoutine.routineDesc}</p>
                                        <p className='lineBreak'>_______________</p>

                                        {selectedRoutine.exerciseList.length === 0 && <p className='routineDetailExerciseCategory'> No exercises</p>}

                                        {selectedRoutine.exerciseList.length > 0 && selectedRoutine.exerciseList.map((exercise, index) => 
                                            <div className="selectedRoutineExercises" key={exercise.exerciseID}>
                                                <div className="exerciseName">
                                                    <p>{index + 1}</p>
                                                    <p>{exercise.exerciseName}</p>
                                                </div>
                                                <div className="exerciseCategory">
                                                    <p>{exercise.category}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                        </div>
                        <div className="AddExToRoutContainer">
                            <h3 className="routineCardExerciseHeader">Add Routine</h3>
                            <div className="addExToRoutList">
                                {routineData?.content?.length === 0 && <div>No Exercises</div>}

                                
                                {routineData?.content?.length > 0 && routineData.content.map(routine => <WorkRout routine={routine} handleSelectedRoutine={handleSelectedRoutine} key={routine.routineID} />)}
                            </div>
                        

                            {routineData?.content?.length > 0 && routineData?.totalPages > 1 &&
                                <div className="exToRoutPagination">
                                    <a onClick={() => getAllRoutines(currentRoutinePage - 1)} className={0 === currentRoutinePage ? 'disabled exToRoutPageNumbers' : 'exToRoutPageNumbers'}>&laquo;</a>
                                    
                                    { data &&[...Array(data.totalPages).keys()].map((page, index) => 
                                        <a onClick={() => getAllRoutines(page)} className={currentRoutinePage === page ? 'exToRoutActive exToRoutPageNumbers' : 'exToRoutPageNumbers'} key={page}>{page + 1}</a>)}
                                    
                                    <a onClick={() => getAllRoutines(currentRoutinePage + 1)} className={routineData.totalPages === currentRoutinePage + 1 ? 'disabled exToRoutPageNumbers' : 'exToRoutPageNumbers'}>&raquo;</a>
                                </div>
                            }
                        </div>
                    </div>
                    <form onSubmit={handleCreateWorkout}>
                    <div className="exercise_details">
                    </div>
                    <div className="form_footer">
                    <button type="button" onClick={() => toggleCreateWorkoutModalRef(false)} className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save</button>
                    </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default WorkoutBlock