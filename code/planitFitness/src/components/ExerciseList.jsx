import React from "react";
import Exercise from "./Exercise";

function ExerciseList({ data, currentPage, getAllExercise }) {
    return (
        <main className="main">
            {data?.content?.length === 0 && <div>No Exercises</div>}

            <ul className="exercise_list">
                {data?.content?.length > 0 && data.content.map(exercise => <Exercise exercise={exercise} key={exercise.exerciseID} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className="pagination">
                <a onClick={() => getAllExercise(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>
                
                { data &&[...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={getAllExercise(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                
                <a onClick={() => getAllExercise(currentPage + 1)} className={totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>
            }
        </main>
    )
}

export default ExerciseList;