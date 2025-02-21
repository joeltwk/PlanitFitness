package main.routine.controller;

import jakarta.ws.rs.Path;
import main.routine.DTO.ExcRoutineDTO;
import main.routine.DTO.RoutineInputDTO;
import main.routine.model.ExcRoutine;
import main.routine.model.Routine;
import main.routine.repository.RoutineRepository;
import main.routine.service.RoutineService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/routine")
public class RoutineController {
    private final RoutineService routineService;

    public RoutineController (RoutineService routineService) {
        this.routineService = routineService;
    }

    @GetMapping("/all/{username}")
    public ResponseEntity<Page<Routine>> findAllRoutine(@PathVariable(value = "username") String username,
                                                        @RequestParam(value = "page", defaultValue ="0") int page,
                                                        @RequestParam(value = "size",
                                                                defaultValue ="10") int size) {
        return ResponseEntity.ok().body(routineService.findAllRoutineById(username,
                page, size));
    }

    /** accepts json payload with the following format
     * {username: "username",
     * routineName: "routine name",
     * routineDesc: "routine description"}
     */
    @PostMapping("/create")
    public ResponseEntity<?> createRoutine(@RequestBody RoutineInputDTO routineInputDTO) {
        if (this.routineService.createRoutine(routineInputDTO)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON payload" +
                " for routine");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Routine> findRoutine(@PathVariable(value = "id") int routineID) {
        return ResponseEntity.ok().body(routineService.findRoutineByID(routineID));
    }

    @PostMapping("/{routineID}/{exerciseID}/add")
    public ResponseEntity<?> addExercise(@PathVariable(value = "routineID") int routineID,
                                         @PathVariable(value = "exerciseID") int exerciseID) {
        if (routineService.addExercise(routineID, exerciseID)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON payload" +
                " for adding exercise");
    }

    /** accepts json payload with the following format
     * {username: "username",
     * routineName: "routine name",
     * routineDesc: "routine description"}
     */
    @PostMapping("/{id}/edit")
    public ResponseEntity<?>editRoutine(@PathVariable(value = "id") int routineID,
                                        @RequestBody RoutineInputDTO routineInputDTO) {
        if (this.routineService.editRoutine(routineInputDTO, routineID)) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to update, check input"
        );
    }

    @DeleteMapping("/{routineID}/{exerciseID}/delete")
    public ResponseEntity<?>deleteRoutineExercise(@PathVariable(value = "routineID") int routineID,
                                                  @PathVariable(value = "exerciseID") int exerciseID) {
        if(this.routineService.deleteRoutineExercise(routineID, exerciseID)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to delete exercise from routine"
        );
    }

    @DeleteMapping("/{routineID}/delete")
    public ResponseEntity<?>deleteRoutine(@PathVariable(value = "routineID") int routineID) {
        if(this.routineService.deleteRoutine(routineID)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Unable to delete routine");
    }
}
