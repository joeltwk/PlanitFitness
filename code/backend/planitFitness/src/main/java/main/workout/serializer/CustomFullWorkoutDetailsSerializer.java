package main.workout.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import main.exercise.model.Exercise;
import main.workout.DTO.FullWorkoutDetailsDTO;
import main.workout.model.Set;

import java.io.IOException;

public class CustomFullWorkoutDetailsSerializer extends JsonSerializer<FullWorkoutDetailsDTO> {
    @Override
    public void serialize(FullWorkoutDetailsDTO fullWorkoutDetailsDTO,
                          JsonGenerator jgen, SerializerProvider sProvider) throws IOException, JsonProcessingException {
        if(fullWorkoutDetailsDTO != null) {
            jgen.writeStartObject();
            jgen.writeStringField("workoutID", Integer.toString(fullWorkoutDetailsDTO.getWorkout().getWorkoutID()));
            jgen.writeStringField("workoutDate",
                    fullWorkoutDetailsDTO.getWorkout().getWorkoutDate().toString());
            if(fullWorkoutDetailsDTO.getRoutine() != null) {
                jgen.writeStringField("routineName", fullWorkoutDetailsDTO.getRoutine().getRoutineName());
                jgen.writeStringField("routineDesc", fullWorkoutDetailsDTO.getRoutine().getRoutineDesc());
                jgen.writeArrayFieldStart("exercises");
                jgen.writeStartObject();
                for(Exercise exercise : fullWorkoutDetailsDTO.getExerciseSets().keySet()) {
                    jgen.writeArrayFieldStart(exercise.getExerciseName());
                    for (int i = 0; i < fullWorkoutDetailsDTO.getExerciseSets().get(exercise).size(); i++) {
                        jgen.writeStartObject();
                        jgen.writeStringField("setNumber",
                                Integer.toString(fullWorkoutDetailsDTO.getExerciseSets().get(exercise).get(i).getSetNumber()));
                        jgen.writeStringField("weight",
                                Integer.toString(fullWorkoutDetailsDTO.getExerciseSets().get(exercise).get(i).getWeight()));
                        jgen.writeStringField("reps",
                                Integer.toString(fullWorkoutDetailsDTO.getExerciseSets().get(exercise).get(i).getReps()));
                        jgen.writeEndObject();
                    }
                    jgen.writeEndArray();
                }
                jgen.writeEndObject();
                jgen.writeEndArray();
            } else {
                jgen.writeStringField("exercises", "none");
            }
            jgen.writeStringField("completed",
                    fullWorkoutDetailsDTO.getWorkout().isCompleted() ? "True" : "False");
            jgen.writeEndObject();
        }
    }
}
