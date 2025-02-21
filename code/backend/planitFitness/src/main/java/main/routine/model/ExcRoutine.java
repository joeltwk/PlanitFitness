package main.routine.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.exercise.model.Exercise;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "exc_rout")
public class ExcRoutine {
    @EmbeddedId
    private ExcRoutineId excRoutineId;

    @MapsId("routineID")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    @MapsId("exerciseID")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    public boolean isEmpty() {
        return (this.routine == null) || (this.exercise == null);
    }
}
