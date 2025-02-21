import React, { useRef, useState} from "react";
import { deleteSet, editSet } from "../services/WorkoutService";

function SingleSet ({ set, getAllExerciseSets }) {
    const editSetModalRef = useRef();
    const toggleEditSetModal = (show) => show ? editSetModalRef.current.showModal() : editSetModalRef.current.close();

    const [currentSetValues, setCurrentSetValues] = useState({
        weight: set.weight,
        reps: set.reps
      });

    const onEditSetChange = (event) => {
        setCurrentSetValues({ ...currentSetValues, [event.target.name]: event.target.value})
    } 

    const handleEditSet = async (event) => {
        event.preventDefault();
        console.log(set);
        try {
            const response = await editSet(set.exerciseSetID, currentSetValues);
            getAllExerciseSets();
            toggleEditSetModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteSet = async () => {
        try {
            console.log(set);
            const response = await deleteSet(set.workout.workoutID, set.exercise.exerciseID, set.setNumber);
            getAllExerciseSets();
            toggleEditSetModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
        <div className="setBlock" onClick={() => toggleEditSetModal(true)}>
            <div className="setNumberContainer">
                <p>Set: {set.setNumber}</p>
            </div>
            <div className="setDetails">
                <div className="setWeight">
                    <p className="setDetailsHeader">Weight</p>            
                    <h1 className="setDetailsText">{set.weight}</h1>
                </div>
                <div className="setReps">
                    <p className="setDetailsHeader">Reps</p>
                    <h1 className="setDetailsText">{set.reps}</h1>
                </div>
            </div>
        </div>

        {/* add set modal */}
        <dialog ref={editSetModalRef} className="modal" id="modal">
            <div className="modal_header">
            <h3>Edit Set {set.setNumber}</h3>
            </div>
            <div className="divier"></div>
            <div className="modal__body">
            <form onSubmit={handleEditSet}>
                <div className="exercise_details">
                <div className="input_box">
                    <span className="details">Weight</span>
                    <input type="number" value={currentSetValues.weight} onChange={onEditSetChange} name="weight" required />
                </div>
                <div className="input_box">
                    <span className="details">Reps</span>
                    <input type="number" value={currentSetValues.reps} onChange={onEditSetChange} name="reps" required />
                </div>
                </div>
                <div className="form_footer">
                <button type="button" onClick={() => toggleEditSetModal(false)} className="generic-btn">Cancel</button>
                <button type="submit" className="generic-btn">Save</button>
                <button type="button" onClick={() => handleDeleteSet()} className="generic-btn">Delete</button>

                </div>
            </form>
            </div>
         </dialog>
    </>
    )
}

export default SingleSet;