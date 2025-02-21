package main.workout.DTO;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.exercise.model.Exercise;
import main.routine.model.Routine;
import main.workout.model.Set;
import main.workout.model.Workout;
import main.workout.serializer.CustomFullWorkoutDetailsSerializer;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonSerialize(using = CustomFullWorkoutDetailsSerializer.class)
public class FullWorkoutDetailsDTO {

    private Workout workout;
    private Routine routine;
    private HashMap<Exercise, List<Set>> exerciseSets = new HashMap<>();
}
