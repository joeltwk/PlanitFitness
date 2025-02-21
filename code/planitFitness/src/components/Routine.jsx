import React, { useEffect, useRef, useState } from "react";
import ExToRout from "./ExToRout";
import { deleteRoutine, deleteRoutineExercise, editRoutine } from "../services/RoutineService";
import { getExercises } from "../services/ExerciseService";
// import { Link } from 'react-router-dom'

function Routine({ routine, getAllRoutines, userValues }) {
    const routineCardModalRef = useRef();
    const toggleRoutineCardModal = (show) => show ? routineCardModalRef.current.showModal() : routineCardModalRef.current.close();

    const routineDelModalRef = useRef();
    const toggleDeleteRoutineModal = (show) => show ? routineDelModalRef.current.showModal() : routineDelModalRef.current.close();

    const routineEditModalRef = useRef();
    const toggleEditRoutineModal = (show) => show ? routineEditModalRef.current.showModal() : routineEditModalRef.current.close();

    const [routineValues, setRoutineValues] = useState({
        username: userValues.username,
        routineName: routine.routineName,
        routineDesc: routine.routineDesc
      });

    const onEditRoutineChange = (event) => {
        setRoutineValues({ ...routineValues, username: userValues.username, [event.target.name]: event.target.value});
    console.log(routineValues);
    };

    const handleDeleteRoutine = async (event) => {
        event.preventDefault();
        try {
            const response = await deleteRoutine(routine.routineID)
            toggleDeleteRoutineModal(false);
            getAllRoutines();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditRoutine = async (event) => {
        event.preventDefault();
        try {
            const response = await editRoutine(routine.routineID, routineValues);
            toggleEditRoutineModal(false);
            getAllRoutines();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteRoutineExercise = async (exercise) => {
        // event.preventDefault();
        try {
            const response = await deleteRoutineExercise(routine.routineID, exercise.exerciseID);
            getAllRoutines();
        } catch (error) {
            console.log(error);
        }
    }

    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const getAllExercises = async (page = 0, size = 8, filter = 'exerciseName') => {
        try {
          setCurrentPage(page);
          const {data} = await getExercises(userValues.username, page, size, filter);
          setData(data);
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        getAllExercises();
    }, [data])

    return (
        <div>
            <div className="card cardhover" onClick={() => toggleRoutineCardModal(true)}>
                <div className="info">
                    <h1 className="cardName">{routine.routineName}</h1>
                    <p className="cardDescription">{routine.routineDesc}</p>
                </div>
            </div>

            <dialog ref={routineCardModalRef} className="modal routineDetailCard" id="modal">
                <div className="modal_header">
                    <h3>{routine.routineName}</h3>
                    <p className="modalDescription">{routine.routineDesc}</p>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <div className="routineModalContainer">
                        <div className="exerciseList">
                            <h3 className="routineCardExerciseHeader">Exercises</h3>
                            {routine.exerciseList.length === 0 && <p className="routineDetailExerciseName">No exercises</p>}
                            
                            {routine.exerciseList.length > 0 && routine.exerciseList.map((exercise, index) => 
                                    <div className='routineExerciseContainer' key={exercise.exerciseID}>
                                        <div className="exerciseTitle">
                                            <div className="exerciseTitleDetails">
                                                <p className="routineDetailExerciseNumber">{index + 1}</p>
                                                <p className="routineDetailExerciseName">{exercise.exerciseName}</p>
                                            </div>
                                            <div className="exRouteDeleteContainer">
                                                <p className="routExDeleteBtn" onClick={() => handleDeleteRoutineExercise(exercise)}>delete</p>
                                            </div>
                                        </div>
                                        <p className="routineDetailExerciseCategory">{exercise.category}</p>
                                    </div>
                                )}
                        </div>
                        <div className="AddExToRoutContainer">
                            <h3 className="routineCardExerciseHeader">Add Exercise</h3>
                            <div className="addExToRoutList">
                                {data?.content?.length === 0 && <div>No Exercises</div>}

                                
                                {data?.content?.length > 0 && data.content.map(exercise => <ExToRout exercise={exercise} routine={routine} getAllRoutines={getAllRoutines} key={exercise.exerciseID} />)}
                            </div>
                        

                            {data?.content?.length > 0 && data?.totalPages > 1 &&
                                <div className="exToRoutPagination">
                                    <a onClick={() => getAllExercises(currentPage - 1)} className={0 === currentPage ? 'disabled exToRoutPageNumbers' : 'exToRoutPageNumbers'}>&laquo;</a>
                                    
                                    { data &&[...Array(data.totalPages).keys()].map((page, index) => 
                                        <a onClick={() => getAllExercises(page)} className={currentPage === page ? 'exToRoutActive exToRoutPageNumbers' : 'exToRoutPageNumbers'} key={page}>{page + 1}</a>)}
                                    
                                    <a onClick={() => getAllExercises(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled exToRoutPageNumbers' : 'exToRoutPageNumbers'}>&raquo;</a>
                                </div>
                            }
                        </div>
                    </div>
                    <form>
                    <div className="exercise_details">
                    </div>
                    <div className="form_footer">
                        <button type="button" onClick={() => toggleRoutineCardModal(false)} className="generic-btn">Save</button>
                        <button type="button" onClick={() => toggleEditRoutineModal(true)} className="generic-btn">Edit</button>
                        <button type="button" onClick={() => toggleDeleteRoutineModal(true)} className="generic-btn">Delete</button>
                    </div>
                    </form>
                </div>
            </dialog>

            {/* routine delete modal */}
            <dialog ref={routineDelModalRef} className="modal" id="modal">
            <div className="modal_header">
                <h3>Delete routine?</h3>
                <p>{routine.routineName}</p>
            </div>
            <div className="divider"></div>
            <div className="modal__body">
                <form onSubmit={handleDeleteRoutine}>
                <div className="exercise_details">
                </div>
                <div className="form_footer">
                    <button type="button" onClick={() => toggleDeleteRoutineModal(false)} className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Delete</button>
                </div>
                </form>
            </div>
            </dialog>

            {/* routine edit modal */}
            <dialog ref={routineEditModalRef} className="modal" id="modal">
            <div className="modal_header">
                <h3>Edit routine</h3>
                <p className="modalName">{routine.routineName}</p>
                <p className="modalDescription">{routine.routineDesc}</p>
            </div>
            <div className="divider"></div>
            <div className="modal__body">
                <form onSubmit={handleEditRoutine}>
                <div className="routine_details">
                    <div className="input_box">
                        <span className="details">Name</span>
                        <input type="text" value={routineValues.routineName} onChange={onEditRoutineChange} name="routineName" maxLength="20" required />
                    </div>
                    <div className="input_box">
                        <span className="details">Description</span>
                        <input type="text" value={routineValues.routineDesc} onChange={onEditRoutineChange} name="routineDesc" maxLength="40" required />
                    </div>
                </div>
                <div className="form_footer">
                    <button type="button" onClick={() => toggleDeleteRoutineModal(false)} className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save</button>
                </div>
                </form>
            </div>
            </dialog>
        </div>
    )
}

export default Routine;