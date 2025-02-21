package main.workout.service;

import main.exception.ResourceNotFoundException;
import main.exercise.model.Exercise;
import main.routine.model.Routine;
import main.routine.service.RoutineService;
import main.user.model.User;
import main.user.service.LoggedUserManagementService;
import main.user.service.UserService;
import main.workout.DTO.AddSetDTO;
import main.workout.DTO.FullWorkoutDetailsDTO;
import main.workout.DTO.WorkoutDateDTO;
import main.workout.model.Set;
import main.workout.model.Workout;
import main.workout.repository.SetRepository;
import main.workout.repository.WorkoutRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final RoutineService routineService;
    private final SetRepository setRepository;
    private final UserService userService;
    private final LoggedUserManagementService lms;

    public WorkoutService(WorkoutRepository workoutRepository,
                          RoutineService routineService,
                          SetRepository setRepository,
                          UserService userService,
                          LoggedUserManagementService lms) {
        this.workoutRepository = workoutRepository;
        this.setRepository = setRepository;
        this.routineService = routineService;
        this.userService = userService;
        this.lms = lms;
    }

    public Page<Workout> findAllWorkoutsByID(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("workoutDate"));
        return workoutRepository.findAllWorkoutsByID(userService.getUserIDByUsername(username).getUserID(), pageable);
    }

    public Workout findWorkoutByID(int id) {
        Workout workout = this.workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Workout not found with ID " + id
                ));
        return workout;
    }

    public FullWorkoutDetailsDTO getFullWorkoutByID(int id) {
        FullWorkoutDetailsDTO fullWorkoutDetailsDTO = new FullWorkoutDetailsDTO();
        Workout workout = findWorkoutByID(id);
        Routine routine = workout.getRoutine();
        List<Set> sets = this.setRepository.findAllSetsByWorkoutID(id);
        for (Set set : sets) {
            if (fullWorkoutDetailsDTO.getExerciseSets().containsKey(set.getExercise())) {
                fullWorkoutDetailsDTO.getExerciseSets().get(set.getExercise()).add(set);
            } else {
                List<Set> setList = new ArrayList<>();
                setList.add(set);
                fullWorkoutDetailsDTO.getExerciseSets().put(set.getExercise(), setList);
            }
        }

        fullWorkoutDetailsDTO.setWorkout(workout);
        fullWorkoutDetailsDTO.setRoutine(routine);
        return fullWorkoutDetailsDTO;
    }

    public boolean setComplete(int id) {
        Workout workout = findWorkoutByID(id);
        workout.toggleComplete();
        this.workoutRepository.save(workout);
        return true;
    }

    public boolean createWorkout(String username, int routineID) {
        Workout workout = new Workout();
        Routine routine = this.routineService.findRoutineByID(routineID);
        User user = this.userService.getUserIDByUsername(username);
        workout.setRoutine(routine);
        workout.setWorkoutDate(LocalDate.now());
        workout.setUserID(user);
        this.workoutRepository.save(workout);
        return true;
    }

    public boolean editDate(int id, WorkoutDateDTO workoutDateDTO) {
        Workout workout = findWorkoutByID(id);
        workout.setWorkoutDate(workoutDateDTO.getWorkoutDate());
        this.workoutRepository.save(workout);
        return true;
    }

    public boolean deleteWorkout(int id) {
        this.workoutRepository.deleteById(id);
        return true;
    }

    public boolean addSet(int workoutID, int exerciseID, AddSetDTO addSetDTO) {
        Workout workout = findWorkoutByID(workoutID);
        Exercise exercise =
                this.routineService.findExerciseInRoutine(workout.getRoutine().getRoutineID(), exerciseID);
        int setNumber =
                this.setRepository.findAllSetByExercise(workoutID, exerciseID).size() + 1;
        Set newSet = new Set();
        newSet.setWorkout(workout);
        newSet.setExercise(exercise);
        newSet.setSetNumber(setNumber);
        newSet.setWeight(addSetDTO.getWeight());
        newSet.setReps(addSetDTO.getReps());
        this.setRepository.save(newSet);
        return true;
    }

    public boolean deleteSet(int workoutID, int exerciseID, int setNumber) {
        Set targetSet = this.setRepository.findSetBySetNumber(workoutID, exerciseID, setNumber);
        if (targetSet != null) {
            this.setRepository.delete(targetSet);
        } else {
            throw new ResourceNotFoundException(
                    "Unable to delete, set not found"
            );
        }
        List<Set> remainingSets = this.setRepository.findAllSetByExercise(workoutID, exerciseID);
        if (!remainingSets.isEmpty()) {
            for(int i = 0; i < remainingSets.size(); i++) {
                Set modifiedSet = remainingSets.get(i);
                modifiedSet.setSetNumber(i + 1);
                this.setRepository.save(modifiedSet);
            }
        }
        return true;
    }

    public Page<Set> getSets (int workoutID, int exerciseID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return this.setRepository.findAllSetInPages(workoutID, exerciseID, pageable);
    }

    public boolean editSet(int setID, AddSetDTO addSetDTO) {
        Set set = this.setRepository.findById(setID).orElseThrow(
                () -> new ResourceNotFoundException(
                        "set not found with id: " + setID
                )
        );

        set.setWeight(addSetDTO.getWeight());
        set.setReps(addSetDTO.getReps());
        this.setRepository.save(set);
        return true;
    }
}
