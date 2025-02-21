

function WorkRout ({ routine, handleSelectedRoutine }) {
    return(
        <div className="exToRouteDetails" onClick={() => handleSelectedRoutine(routine)}>
            <p className="exToRoutDetailsHeader">{routine.routineName}</p>
            <p className="exToRoutDetailsDescription">{routine.routineDesc}</p>
        </div>
    )
}

export default WorkRout;