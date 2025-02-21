package main.workout.controller;

import jakarta.ws.rs.Path;
import main.workout.DTO.AddRoutineDTO;
import main.workout.DTO.AddSetDTO;
import main.workout.DTO.FullWorkoutDetailsDTO;
import main.workout.DTO.WorkoutDateDTO;
import main.workout.model.Set;
import main.workout.model.Workout;
import main.workout.service.WorkoutService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workout")
public class WorkoutController {
    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/all/{username}")
    public ResponseEntity<Page<Workout>> getAllWorkouts(@PathVariable (value =
            "username") String username,
                                                        @RequestParam (value = "page",
                                                                defaultValue = "0") int page,
                                                        @RequestParam (value = "size",
                                                        defaultValue = "8") int size) {
        return ResponseEntity.ok().body(workoutService.findAllWorkoutsByID(username,
                page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FullWorkoutDetailsDTO> getWorkout(@PathVariable(value = "id") int id){
        return ResponseEntity.ok().body(this.workoutService.getFullWorkoutByID(id));
    }

    @PostMapping("/{id}/setComplete")
    public ResponseEntity<?> setComplete(@PathVariable(value = "id") int id) {
        if(workoutService.setComplete(id)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to set complete"
        );
    }

//    @PostMapping("/create")
//    public ResponseEntity<?> addWorkout()

    @PostMapping("/{username}/{routineID}/create")
    public ResponseEntity<?> createWorkout(@PathVariable(value = "routineID") int routineID,
                                        @PathVariable(value = "username") String username){
        if (this.workoutService.createWorkout(username, routineID)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to create workout"
        );
    }

    /** accepts json payload with the following format
     *
     * {workoutDate: "yyyy-mm-dd"}
     */
    @PostMapping("/{id}/editDate")
    public ResponseEntity<?> editDate(@PathVariable(value = "id") int id,
                                      @RequestBody WorkoutDateDTO workoutDateDTO){
        if(this.workoutService.editDate(id, workoutDateDTO)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to edit date"
        );
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deleteWorkout(@PathVariable(value = "id") int id) {
        if(this.workoutService.deleteWorkout(id)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to delete"
        );
    }

    /** accepts json payload with the following format
     * {weight: 90,
     * reps: 8}
     */
    @PostMapping("/{workoutID}/{exerciseID}/add")
    public ResponseEntity<?> addSet(@PathVariable(value = "workoutID") int workoutID,
                                    @PathVariable(value = "exerciseID") int exerciseID,
                                    @RequestBody AddSetDTO addSetDTO) {
        if(this.workoutService.addSet(workoutID, exerciseID, addSetDTO)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to add set, check input"
        );
    }

    @DeleteMapping("{workoutID}/{exerciseID}/{setNumber}/delete")
    public ResponseEntity<?> deleteSet(@PathVariable(value = "workoutID") int workoutID,
                                       @PathVariable(value = "exerciseID") int exerciseID,
                                       @PathVariable(value = "setNumber") int setNumber) {
        if(this.workoutService.deleteSet(workoutID, exerciseID, setNumber)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to delete set"
        );
    }

    @GetMapping("all/{workoutID}/{exerciseID}")
    public ResponseEntity<Page<Set>> getAllSets(@PathVariable(value = "workoutID") int workoutID,
                                                @PathVariable(value = "exerciseID") int exerciseID,
                                                @RequestParam(value = "page",
                                                        defaultValue = "0") int page,
                                                @RequestParam(value = "size",
                                                        defaultValue = "4") int size) {
        return ResponseEntity.ok().body(this.workoutService.getSets(workoutID,
                exerciseID, page, size));
    }

    @PostMapping("{setID}/edit")
    public ResponseEntity<?> editSet (@PathVariable(value = "setID") int setID,
                                      @RequestBody AddSetDTO addSetDTO) {
        if(this.workoutService.editSet(setID, addSetDTO)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("unable to edit set");
    }
}
