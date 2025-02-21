import Routine from './Routine';
import { useRef, useState} from 'react';
import { saveRoutine } from '../services/RoutineService';

function RoutineBlock({ userValues, routineData, currentRoutinePage, getAllRoutines, data, currentPage, getAllExercises}) {
    const routineModalRef = useRef();

    const onAddRoutineChange = (event) => {
        setRoutineValues({ ...routineValues, username: userValues.username, [event.target.name]: event.target.value});
        console.log(routineValues);
      };

    const handleNewRoutine = async (event) => {
        event.preventDefault();
        try {
          const response = await saveRoutine(routineValues);
          toggleModal(false);
          getAllRoutines();
        } catch (error) {
          console.log(error)
        }
      }

    const [routineValues, setRoutineValues] = useState({
        username: '',
        routineName: '',
        routineDesc: ''
    })

    

    const toggleModal = (show) => show ? routineModalRef.current.showModal() : routineModalRef.current.close();
    return(
        <div className="block routineBlock">
            <div className="blockHeader">
                <h1>Routines</h1>
            </div>
            <div className="section">
                {routineData?.content?.length === 0 && <div>No Routines</div>}

                    
                {routineData?.content?.length > 0 && routineData.content.map(routine => <Routine routine={routine} getAllRoutines={getAllRoutines} userValues={userValues} key={routine.routineID} />)}

            </div>

            {routineData?.content?.length > 0 && routineData?.totalPages > 1 &&
                <div className="pagination">
                    <a onClick={() => getAllRoutines(currentRoutinePage - 1)} className={0 === currentRoutinePage ? 'disabled' : ''}>&laquo;</a>
                    
                    { routineData &&[...Array(routineData.totalPages).keys()].map((page, index) => 
                        <a onClick={() => getAllRoutines(page)} className={currentRoutinePage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                    
                    <a onClick={() => getAllRoutines(currentRoutinePage + 1)} className={routineData.totalPages === currentRoutinePage + 1 ? 'disabled' : ''}>&raquo;</a>
                </div>
            }

            <div onClick={() => toggleModal(true)} className="add">
                <h1 className="cardHeader">Create Routine</h1>
            </div>

            {/* create routine modal */}
            <dialog ref={routineModalRef} className="modal" id="modal">
                <div className="modal_header">
                <h3>New Routine</h3>
                </div>
                <div className="divier"></div>
                <div className="modal__body">
                <form onSubmit={handleNewRoutine}>
                    <div className="exercise_details">
                    <div className="input_box">
                        <span className="details">Name</span>
                        <input type="text" value={routineValues.routineName} onChange={onAddRoutineChange} name="routineName" maxLength="20" required />
                    </div>
                    <div className="input_box">
                        <span className="details">Description</span>
                        <input type="text" value={routineValues.routineDesc} onChange={onAddRoutineChange} name="routineDesc" maxLength="40" required />
                    </div>
                    </div>
                    <div className="form_footer">
                    <button type="button" onClick={() => toggleModal(false)} className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
                </div>
            </dialog>
        </div>
    );
}

export default RoutineBlock