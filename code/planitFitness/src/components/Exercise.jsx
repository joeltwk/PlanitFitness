import React, { useRef, useState } from "react";
import { deleteExercise, editExercise } from "../services/ExerciseService";
// import { Link } from 'react-router-dom'

function Exercise({ exercise, currentPage, getAllExercises }) {
    const [exerciseValues, setExerciseValues] = useState({
        exerciseName: exercise.exerciseName,
        category: exercise.category
      });

    const onAddExerciseChange = (event) => {
    setExerciseValues({ ...exerciseValues, [event.target.name]: event.target.value});
    console.log(exerciseValues);
    };

    const handleEditExercise = async (event) => {
        event.preventDefault();
        try {
            const response = await editExercise(exercise.exerciseID, exerciseValues);
            toggleEditExerciseModal(false);
            getAllExercises(currentPage);
        } catch (error) {
            console.log(error);
        }
    }

    const exerciseEditModalRef = useRef();
    const toggleEditExerciseModal = (show) => show ? exerciseEditModalRef.current.showModal() : exerciseEditModalRef.current.close();
    const exerciseDelModalRef = useRef();
    const toggleDelExerciseModal = (show) => show ? exerciseDelModalRef.current.showModal() : exerciseDelModalRef.current.close();

    const handleDeleteExercise = async (event) => {
        event.preventDefault();
        try {
            const response = await deleteExercise(exercise.exerciseID);
            toggleDelExerciseModal(false);
            getAllExercises(currentPage);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="card">
            <div className="info">
                <h1 className="cardName">{exercise.exerciseName}</h1>
                <p className="cardDescription">{exercise.category}</p>
            </div>
            <div className="btns">
                <p className="editBtn" onClick={() => toggleEditExerciseModal(true)}>edit</p>
                <p className="deleteBtn" onClick={() => toggleDelExerciseModal(true)}>delete</p>
            </div>
        </div>

        {/* exercise delete card modal */}
        <dialog ref={exerciseDelModalRef} className="modal" id="modal">
        <div className="modal_header">
            <h3>Delete exercise?</h3>
            <p>{exercise.exerciseName}</p>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
            <form onSubmit={handleDeleteExercise}>
            <div className="exercise_details">
            </div>
            <div className="form_footer">
                <button type="button" onClick={() => toggleDelExerciseModal(false)} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">Delete</button>
            </div>
            </form>
        </div>
        </dialog>

        {/* exercise edit modal */}
        <dialog ref={exerciseEditModalRef} className="modal" id="modal">
        <div className="modal_header">
            <h3>Edit exercise</h3>
            <p className="modalName">{exercise.exerciseName}</p>
            <p className="modalDescription">{exercise.category}</p>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
            <form onSubmit={handleEditExercise}>
            <div className="exercise_details">
                <div className="input_box">
                    <span className="details">Name</span>
                    <input type="text" value={exerciseValues.exerciseName} onChange={onAddExerciseChange} name="exerciseName" maxLength="20" required />
                </div>
                <div className="input_box">
                    <span className="details">Category</span>
                    <input type="text" value={exerciseValues.category} onChange={onAddExerciseChange} name="category" maxLength="20" required />
                </div>
            </div>
            <div className="form_footer">
                <button type="button" onClick={() => toggleEditExerciseModal(false)} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">Save</button>
            </div>
            </form>
        </div>
        </dialog>
    </>
    )
}

export default Exercise;