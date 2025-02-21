import React, { useRef, useState } from "react";
import { addExerciseToRoutine } from "../services/RoutineService";

function ExToRout ({exercise, routine, getAllRoutines}) {
    const addExToRoutConfirmationModalRef = useRef();
    const toggleAddExToRoutConfirmationModal = (show) => show ? addExToRoutConfirmationModalRef.current.showModal() : addExToRoutConfirmationModalRef.current.close();

    const handleAddExerciseToRoutine = async (event) => {
        event.preventDefault();
        try {
            const response = await addExerciseToRoutine(routine.routineID, exercise.exerciseID)
            toggleAddExToRoutConfirmationModal(false);
            getAllRoutines();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <div className="exToRouteDetails" onClick={() => toggleAddExToRoutConfirmationModal(true)}>
            <p className="exToRoutDetailsHeader">{exercise.exerciseName}</p>
            <p className="exToRoutDetailsDescription">{exercise.category}</p>
        </div>

        {/* exercise add to routine confirmation modal */}
        <dialog ref={addExToRoutConfirmationModalRef} className="modal" id="modal">
        <div className="modal_header">
            <h3>Add exercise?</h3>
            <p>{exercise.exerciseName}</p>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
            <form onSubmit={handleAddExerciseToRoutine}>
            <div className="exercise_details">
            </div>
            <div className="form_footer">
                <button type="button" onClick={() => toggleAddExToRoutConfirmationModal(false)} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">Add</button>
            </div>
            </form>
        </div>
        </dialog>
        </>
    )
}

export default ExToRout;