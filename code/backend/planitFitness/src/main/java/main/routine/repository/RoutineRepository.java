package main.routine.repository;

import main.routine.model.Routine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Integer> {
    @Query("SELECT r FROM Routine r WHERE r.userID.username = :username")
    Page<Routine> findAllRoutineByID(@Param("username") String username,
                                     Pageable pageable);

    @Query("SELECT r FROM Routine r WHERE r.routineName = :routineName")
    Routine findRoutineByName(@Param("routineName") String routineName);
}
