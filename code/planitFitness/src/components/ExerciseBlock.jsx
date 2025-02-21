import Exercise from "./Exercise";
import { useRef, useState} from 'react';
import { getExercises, saveExercise } from '../services/ExerciseService';

function ExerciseBlock({ userValues, data, currentPage, getAllExercises }) {
    const exerciseModalRef = useRef();

    const toggleModal = (show) => show ? exerciseModalRef.current.showModal() : exerciseModalRef.current.close();

    const [exerciseValues, setExerciseValues] = useState({
        username: '',
        exerciseName: '',
        category: ''
      });

    const onAddExerciseChange = (event) => {
        setExerciseValues({ ...exerciseValues, username: userValues.username, [event.target.name]: event.target.value});
      };

    const handleNewExercise = async (event) => {
        event.preventDefault();
        try {
          const response = await saveExercise(exerciseValues);
          toggleModal(false);
          getAllExercises(currentPage);
        }
        catch(error) {
          console.log(error)
        }
      };

      const getAllSortedExercises = (event) => {
        console.log(event.target.value);
        getAllExercises(currentPage, 8, event.target.value);
      }
    
    return(
        <div className="block exerciseBlock">
            <div className="blockHeader">
                <div className="blockTitle">
                    <h1>Exercises</h1>
                </div>
                <div className="filterMenu">
                    <label htmlFor="sort" className="sortLabel">Sort by:  </label>
                    <select name="sort" className="sortSelect" id="sort" onChange={getAllSortedExercises}>
                    <option value="exerciseName" className="sortOption">Name</option>
                    <option value="category" className="sortOption">Category</option>
                    </select>
                </div>
            </div>
            
            <div className="section">
                {data?.content?.length === 0 && <div>No Exercises</div>}

                
                {data?.content?.length > 0 && data.content.map(exercise => <Exercise exercise={exercise} currentPage={currentPage} getAllExercises={getAllExercises} key={exercise.exerciseID} />)}
                
            </div>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className="pagination">
                    <a onClick={() => getAllExercises(currentPage - 1)} className={0 === currentPage ? 'disabled pageNumbers' : 'pageNumbers'}>&laquo;</a>
                    
                    { data &&[...Array(data.totalPages).keys()].map((page, index) => 
                        <a onClick={() => getAllExercises(page)} className={currentPage === page ? 'active pageNumbers' : 'pageNumbers'} key={page}>{page + 1}</a>)}
                    
                    <a onClick={() => getAllExercises(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled pageNumbers' : 'pageNumbers'}>&raquo;</a>
                </div>
            }

            <div onClick={() => toggleModal(true)}className="add">
                <h1 className="cardHeader">Create Exercise</h1>
            </div>
            {/* exercise modal */}
      <dialog ref={exerciseModalRef} className="modal" id="modal">
        <div className="modal_header">
          <h3>New Exercise</h3>
        </div>
        <div className="divier"></div>
        <div className="modal__body">
          <form onSubmit={handleNewExercise}>
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
              <button type="button" onClick={() => toggleModal(false)} className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
        </div>
        
    );
}

export default ExerciseBlock