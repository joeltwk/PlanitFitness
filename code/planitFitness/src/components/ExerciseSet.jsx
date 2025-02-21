import React, { useEffect, useRef, useState } from "react";
import { addNewSet, getAllSets } from "../services/WorkoutService";
import SingleSet from "./SingleSet";

function ExerciseSet ({ workout, exercise }) {
    const [ exerciseSetsData, setExerciseSetsData ] = useState({});
    const [ currentSetPage, setCurrentSetPage] = useState(0);

    const getAllExerciseSets = async (page = 0, size = 4) => {
        try {
            // console.log(page)
            setCurrentSetPage(page);
            console.log(currentSetPage);
            const {data} = await getAllSets(workout.workoutID, exercise.exerciseID, page, size);
            console.log(data)
            setExerciseSetsData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const addSetModalRef = useRef();
    const toggleAddSetModal = (show) => show ? addSetModalRef.current.showModal() : addSetModalRef.current.close();

    const [newSetValues, setNewSetValues] = useState({
        weight: '',
        reps: ''
      });

    const onAddNewSetChange = (event) => {
        setNewSetValues({ ...newSetValues, [event.target.name]: event.target.value})
    } 

    const handleNewSet = async (event) => {
        event.preventDefault();
        try {
            const response = await addNewSet(workout.workoutID, exercise.exerciseID, newSetValues);
            getAllExerciseSets(currentSetPage);
            toggleAddSetModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllExerciseSets();
    }, []);

    return (
        <>
        <div className="exerciseSetContainer">
            <div className="exerciseSetHeader">
                <div className="exerciseSetTitle">
                    <h1>{exercise.exerciseName}</h1>
                    <p>{exercise.category}</p>
                </div>
                <div className="addSetBtn">
                    <button onClick={() => toggleAddSetModal(true)}>Add Set</button>
                </div>
            </div>
            <div className="exerciseSetDetails">
                {exerciseSetsData?.content?.length === 0 && <p>No Sets Added</p>}

                {exerciseSetsData?.content?.length > 0 && exerciseSetsData.content.map(set =>
                    <SingleSet set={set} getAllExerciseSets={getAllExerciseSets} key={set.exerciseSetID}/>
                )}
            </div>
            {exerciseSetsData?.content?.length > 0 && exerciseSetsData?.totalPages > 1 &&
                <div className="setPagination">
                    <a onClick={() => getAllExerciseSets(currentSetPage - 1)} className={0 === currentSetPage ? 'disabled setPageNumbers' : 'setPageNumbers'}>&laquo;</a>
                    
                    { exerciseSetsData &&[...Array(exerciseSetsData.totalPages).keys()].map((page, index) => 
                        <a onClick={() => getAllExerciseSets(page)} className={currentSetPage === page ? 'active setPageNumbers' : 'setPageNumbers'} key={page}>{page + 1}</a>)}
                    
                    <a onClick={() => getAllExerciseSets(currentSetPage + 1)} className={exerciseSetsData.totalPages === currentSetPage + 1 ? 'disabled setPageNumbers' : 'setPageNumbers'}>&raquo;</a>
                </div>
            }
        </div>

        {/* add set modal */}
        <dialog ref={addSetModalRef} className="modal" id="modal">
        <div className="modal_header">
          <h3>Add Set</h3>
        </div>
        <div className="divier"></div>
        <div className="modal__body">
          <form onSubmit={handleNewSet}>
            <div className="exercise_details">
              <div className="input_box">
                <span className="details">Weight</span>
                <input type="number" value={newSetValues.weight} onChange={onAddNewSetChange} name="weight" required />
              </div>
              <div className="input_box">
                <span className="details">Reps</span>
                <input type="number" value={newSetValues.reps} onChange={onAddNewSetChange} name="reps" required />
              </div>
            </div>
            <div className="form_footer">
              <button type="button" onClick={() => toggleAddSetModal(false)} className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
        </>
    )
}

export default ExerciseSet;