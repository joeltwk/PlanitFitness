import React, { useEffect, useRef, useState } from "react";
import { getRoutine } from "../services/RoutineService";
import ExerciseSet from "./ExerciseSet";
import { deleteWorkout, setComplete } from "../services/WorkoutService";

function Workout ({workout, getAllWorkouts }) {
    const workoutDetailsModalRef = useRef();
    const toggleWorkoutDetailModal = (show) => show ? workoutDetailsModalRef.current.showModal() : workoutDetailsModalRef.current.close();

    const [routineData, setRoutineData] = useState({
        routineID: '',
        routineName: '',
        routineDesc: '',
        exerciseList: ''
    })

    const getRoutineByID = async () => {
        try {
            const {data} = await getRoutine(workout.routine[0].routineID)
            setRoutineData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSetComplete = async (event) => {
        event.preventDefault();
        try {
            const response = await setComplete(workout.workoutID);
            getAllWorkouts();
            toggleWorkoutDetailModal(false);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteWorkoutModalRef = useRef();
    const toggleDeleteWorkoutModal = (show) => show ? deleteWorkoutModalRef.current.showModal() : deleteWorkoutModalRef.current.close();

    const handleDeleteWorkout = async (event) => {
        event.preventDefault();
        try {
            const response = await deleteWorkout(workout.workoutID);
            getAllWorkouts();
            toggleWorkoutDetailModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        getRoutineByID();
    }, [])

    return (
        <>
        <div className={workout.completed === "True" ? "card cardhover workoutCardComplete" : "card cardhover"} onClick={() => toggleWorkoutDetailModal(true)}>
            <div className="info">
                <h1 className="cardName">{workout.workoutDate}</h1>
                <p className="cardDescription">{workout.completed === "True" ? "Completed" : "Not yet complete"}</p>
            </div>
        </div>

        {/* workout details modal */}
        <dialog ref={workoutDetailsModalRef} className="modal routineDetailCard" id="modal">
                <div className="modal_header">
                    <h3>Workout</h3>
                    <p className="modalDescription">{workout.workoutDate}</p>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <div className="workoutModalContainer">
                        <div className="routineList">
                            <h3 className="routineCardExerciseHeader">Routine selected</h3>
                            <div className='routineExerciseContainer'>
                                        <div className="exerciseTitle">
                                            <div className="exerciseTitleDetails">
                                                <p className="routineDetailExerciseName">{routineData.routineName}</p>
                                            </div>
                                        </div>
                                        <p className="routineDetailExerciseCategory">{routineData.routineDesc}</p>
                                        <p className='lineBreak'>_______________</p>

                                        <p></p>

                                        {routineData.exerciseList.length === 0 && <p className='routineDetailExerciseCategory'> No exercises</p>}

                                        {routineData.exerciseList.length > 0 && routineData.exerciseList.map((exercise, index) => 
                                            <ExerciseSet exercise={exercise} workout ={workout} key={exercise.exerciseID}/>
                                        )}
                                    </div>
                        </div>
                        <div className="AddExToRoutContainer">
                        </div>
                    </div>
                    <form onSubmit={handleSetComplete}>
                    <div className="exercise_details">
                    </div>
                    <div className="form_footer">
                    <button type="button" onClick={() => toggleWorkoutDetailModal(false)} className="generic-btn">Close</button>
                    <button type="button" onClick={() => toggleDeleteWorkoutModal(true)} className="generic-btn">Delete</button>
                    <button type="submit" className="generic-btn">Complete</button>
                    </div>
                    </form>
                </div>
            </dialog>

            {/* workout delete modal */}
            <dialog ref={deleteWorkoutModalRef} className="modal" id="modal">
            <div className="modal_header">
                <h3>Delete workout?</h3>
            </div>
            <div className="divider"></div>
            <div className="modal__body">
                <form onSubmit={handleDeleteWorkout}>
                <div className="exercise_details">
                </div>
                <div className="form_footer">
                    <button type="button" onClick={() => toggleDeleteWorkoutModal(false)} className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Delete</button>
                </div>
                </form>
            </div>
            </dialog>
        </>
    )
}

export default Workout;