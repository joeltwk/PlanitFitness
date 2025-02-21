package main.routine.service;

import main.exception.ResourceNotFoundException;
import main.exercise.model.Exercise;
import main.exercise.repository.ExerciseRepository;
import main.routine.DTO.RoutineInputDTO;
import main.routine.model.ExcRoutine;
import main.routine.model.ExcRoutineId;
import main.routine.model.Routine;
import main.routine.repository.ExcRoutineRepository;
import main.routine.repository.RoutineRepository;
import main.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class RoutineService {
    private final RoutineRepository routineRepository;
    private final ExcRoutineRepository excRoutineRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserService userService;

    public RoutineService(RoutineRepository routineRepository,
                          ExcRoutineRepository excRoutineRepository,
                          ExerciseRepository exerciseRepository,
                          UserService userService) {
        this.routineRepository = routineRepository;
        this.excRoutineRepository = excRoutineRepository;
        this.exerciseRepository = exerciseRepository;
        this.userService = userService;
    }

    public Page<Routine> findAllRoutineById(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("routineName"));
        return this.routineRepository.findAllRoutineByID(username, pageable);
    }

    public boolean createRoutine(RoutineInputDTO routineInputDTO) {
        if (!routineInputDTO.isEmpty()) {
            Routine routine = new Routine();
            routine.setRoutineName(routineInputDTO.getRoutineName());
            routine.setRoutineDesc(routineInputDTO.getRoutineDesc());
            routine.setUserID(userService.getUserIDByUsername(routineInputDTO.getUsername()));
            this.routineRepository.save(routine);
            return true;
        }
        return false;
    }

    public Routine findRoutineByID(int routineID) {
        Routine routine = routineRepository.findById(routineID)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Routine not found with id: " + routineID
                ));
        return routine;
    }

    public boolean addExercise(int routineId, int exerciseID){
        //create new intermediate table
        ExcRoutine excRoutine = new ExcRoutine();
        // get exercise to be added
        Exercise exercise =
                exerciseRepository.findById(exerciseID)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Unable to find exercise with id: " + exerciseID
                        ));
        //routine for exercise to be added to
        Routine routine =
                routineRepository.findById(routineId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Unable to find routine with id: " + routineId
                        ));
        //set intermediate class's composite id
        ExcRoutineId id = new ExcRoutineId();
        id.setExerciseID(exerciseID);
        id.setRoutineID(routineId);
        //set intermediate class
        excRoutine.setExcRoutineId(id);
        excRoutine.setExercise(exercise);
        excRoutine.setRoutine(routine);
        //save intermediate class
        excRoutineRepository.save(excRoutine);
        return true;

    }

    public boolean editRoutine(RoutineInputDTO routineInputDTO, int routineID) {
        if (!routineInputDTO.isEmpty()) {
            Routine routine = this.routineRepository.findById(routineID)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Routine not found with id " + routineID
                    ));
            routine.setRoutineName(routineInputDTO.getRoutineName());
            routine.setRoutineDesc(routineInputDTO.getRoutineDesc());
            this.routineRepository.save(routine);
            return true;
        }
        return false;
    }

    public boolean deleteRoutineExercise(int routineID, int exerciseID) {
        ExcRoutine excRoutine = this.excRoutineRepository.findExcRoutine(routineID,
                exerciseID);
        if(!excRoutine.isEmpty()) {
            this.excRoutineRepository.delete(excRoutine);
            return true;
        }
        return false;
    }

    public boolean deleteRoutine(int routineID) {
        this.routineRepository.deleteById(routineID);
        return true;
    }

    public Routine findRoutineByName(String routineName) {
        return this.routineRepository.findRoutineByName(routineName);
    }

    public Exercise findExerciseInRoutine(int routineID, int exerciseID) {
        ExcRoutine excRoutine = this.excRoutineRepository.findExcRoutine(routineID,
                exerciseID);
        if (!excRoutine.isEmpty()) {
            return excRoutine.getExercise();
        } else {
            throw new ResourceNotFoundException(
                    "Exercise with ID " + exerciseID + " not found in routine with ID " + routineID
            );
        }
    }
}
