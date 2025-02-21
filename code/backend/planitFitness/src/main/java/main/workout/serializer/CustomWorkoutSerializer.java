package main.workout.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import main.workout.model.Workout;

import java.io.IOException;

public class CustomWorkoutSerializer extends JsonSerializer<Workout> {
    @Override
    public void serialize(Workout workout, JsonGenerator jgen, SerializerProvider sProvider)
            throws IOException, JsonProcessingException {
        if (workout != null) {
            jgen.writeStartObject();
            jgen.writeStringField("workoutID", Integer.toString(workout.getWorkoutID()));
            jgen.writeStringField("workoutDate", workout.getWorkoutDate().toString());
            if(workout.getRoutine() != null) {
                jgen.writeArrayFieldStart("routine");
                jgen.writeStartObject();
                jgen.writeStringField("routineID", Integer.toString(
                        workout.getRoutine().getRoutineID()));
                jgen.writeStringField("routineName", workout.getRoutine().getRoutineName());
                jgen.writeStringField("routineDesc", workout.getRoutine().getRoutineDesc());
                jgen.writeEndObject();
                jgen.writeEndArray();
            } else {
                jgen.writeStringField("routine", "None");
            }
            jgen.writeStringField("completed", workout.isCompleted() ? "True" : "False");

            jgen.writeEndObject();
        }
    }
}
