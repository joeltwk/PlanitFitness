package main.exercise.controller;

import main.exercise.DTO.ExerciseEditDTO;
import main.exercise.DTO.ExerciseInputDTO;
import main.exercise.model.Exercise;
import main.exercise.service.ExerciseService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/all/{username}")
    public ResponseEntity<Page<Exercise>> getAllExercise(@PathVariable("username") String username,
                                                         @RequestParam(value = "page",
                                                                defaultValue ="0") int page,
                                                         @RequestParam(value = "size",
                                                         defaultValue = "10") int size,
                                                         @RequestParam(value = "filter"
                                                                 ,
                                                                 defaultValue =
                                                                         "exerciseName") String filter) {
        return ResponseEntity.ok().body(this.exerciseService.getAllExercises(username,
                page, size, filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExercise(@PathVariable("id") int id) {
        return ResponseEntity.ok().body(this.exerciseService.getExercise(id));
    }

    /** accepts json payload with the following format
     * {username: "username",
     * exerciseName: "exercise name",
     * category: "category"}
     */
    @PostMapping("/create")
    public ResponseEntity<?>createExercise(@RequestBody ExerciseInputDTO exerciseInput) {
        if (this.exerciseService.createExercise(exerciseInput)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON input");
    }

    /** accepts json payload with the following format
     * {exerciseName: "exercise name",
     * category: "category"}
     */
    @PostMapping("{id}/edit")
    public ResponseEntity<?>editExercise(@RequestBody ExerciseEditDTO exerciseEditDTO
            , @PathVariable("id") int id) {
        if(this.exerciseService.editExercise(exerciseEditDTO, id)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to edit, " +
                "check input");
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?>deleteExercise(@PathVariable("id") int id) {
        if(this.exerciseService.deleteExercise(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to delete"
        );
    }
}
