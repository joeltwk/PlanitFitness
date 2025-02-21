package main.exercise.service;

import main.exception.ResourceNotFoundException;
import main.exercise.DTO.ExerciseEditDTO;
import main.exercise.DTO.ExerciseInputDTO;
import main.exercise.model.Exercise;
import main.exercise.repository.ExerciseRepository;
import main.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final UserService userService;

    public ExerciseService(ExerciseRepository exerciseRepository,
                           UserService userService) {
        this.exerciseRepository = exerciseRepository;
        this.userService = userService;
    }

    public Page<Exercise> getAllExercises(String username, int page,
                                          int size, String filter) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(filter));
        return exerciseRepository.findAllExerciseByUserID(username, pageable);
    }

    public Exercise getExercise(int id) {
        Exercise exercise = this.exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Exercise not found with id: " + id
                ));
        return exercise;
    }

    public boolean createExercise(ExerciseInputDTO exerciseInputDTO) {
        if(!exerciseInputDTO.isEmpty()) {
            Exercise exercise = new Exercise();
            exercise.setExerciseName(exerciseInputDTO.getExerciseName());
            exercise.setCategory(exerciseInputDTO.getCategory());
            exercise.setUser(userService.getUserIDByUsername(exerciseInputDTO.getUsername()));
            this.exerciseRepository.save(exercise);
            return true;
        }
        return false;
    }

    public boolean editExercise(ExerciseEditDTO exerciseEditDTO, int id){
        if(!exerciseEditDTO.isEmpty()) {
            Exercise exercise = this.exerciseRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Exercise not found with id: " + id
                    ));
            exercise.setExerciseName(exerciseEditDTO.getExerciseName());
            exercise.setCategory(exerciseEditDTO.getCategory());
            this.exerciseRepository.save(exercise);
            return true;
        }
        return false;
    }

    public boolean deleteExercise(int id) {
        this.exerciseRepository.deleteById(id);
        return true;
    }
}
