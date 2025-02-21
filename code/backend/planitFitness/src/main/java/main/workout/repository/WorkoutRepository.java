package main.workout.repository;

import main.workout.model.Workout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {
    @Query("SELECT w FROM Workout w WHERE w.userID.userID = :userID")
    Page<Workout> findAllWorkoutsByID (@Param("userID") int userID, Pageable pageable);
}
