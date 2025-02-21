package main.routine.repository;

import main.routine.model.ExcRoutine;
import main.routine.model.ExcRoutineId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExcRoutineRepository extends JpaRepository<ExcRoutine, ExcRoutineId> {
    @Query("SELECT er FROM ExcRoutine er WHERE er.routine.routineID = :routineID and " +
            "er.exercise.exerciseID = :exerciseID")
    public ExcRoutine findExcRoutine(@Param(value = "routineID") int routineID,
                                     @Param(value = "exerciseID") int exerciseID);
}
