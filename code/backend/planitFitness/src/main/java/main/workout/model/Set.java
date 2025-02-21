package main.workout.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.exercise.model.Exercise;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.context.annotation.EnableMBeanExport;

@Entity
@Table(name = "exercise_set")
@Getter
@Setter
@NoArgsConstructor
public class Set {
    @Id
    @Column(name = "exercise_set_id")
    private int ExerciseSetID;

//    @MapsId("workoutID")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "workout_id")
    private Workout workout;

//    @MapsId("exerciseID")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @Column(name = "set_number")
    private int setNumber;

    @Column(name = "weight")
    private int weight;

    @Column(name = "reps")
    private int reps;
}


