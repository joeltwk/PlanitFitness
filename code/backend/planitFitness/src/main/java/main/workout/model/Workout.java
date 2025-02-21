package main.workout.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.routine.model.Routine;
import main.user.model.User;
import main.workout.serializer.CustomWorkoutSerializer;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonSerialize(using = CustomWorkoutSerializer.class)
public class Workout {
    @Id
    @Column(name = "workout_id")
    private int workoutID;
    @Column(name = "workout_date")
    @Temporal(value = TemporalType.DATE)
    private LocalDate workoutDate;
    @Column(name = "completed")
    private boolean completed = false;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userID;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    public void toggleComplete() {
        this.completed = !this.completed;
    }
}
