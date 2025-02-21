package main.workout.repository;

import main.workout.model.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SetRepository extends JpaRepository<Set, Integer> {
    @Query("SELECT s FROM Set s WHERE s.workout.workoutID = :workoutID")
    List<Set> findAllSetsByWorkoutID (@Param("workoutID") int workoutID);

    @Query("SELECT s FROM Set s WHERE s.workout.workoutID = :workoutID and s.exercise" +
            ".exerciseID = :exerciseID")
    List<Set> findAllSetByExercise (@Param("workoutID") int workoutID,
                                    @Param("exerciseID") int exerciseID);

    @Query("SELECT s FROM Set s WHERE s.workout.workoutID = :workoutID and s.exercise" +
            ".exerciseID = :exerciseID and s.setNumber = :setNumber")
    Set findSetBySetNumber (@Param("workoutID") int workoutID,
                            @Param("exerciseID") int exerciseID,
                            @Param("setNumber") int setNumber);

    @Query("SELECT s FROM Set s WHERE s.workout.workoutID = :workoutID and s.exercise" +
            ".exerciseID = :exerciseID")
    Page<Set> findAllSetInPages (@Param("workoutID") int workoutID,
                                 @Param("exerciseID") int exerciseID,
                                 Pageable pageable);
}
