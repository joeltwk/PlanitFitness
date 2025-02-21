package main.workout.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class SetId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "workout_id")
    private int workoutID;

    @Column(name = "exercise_id")
    private int exerciseID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SetId entity = (SetId) o;
        return Objects.equals(this.workoutID, entity.workoutID) &&
                Objects.equals(this.exerciseID, entity.exerciseID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(workoutID, exerciseID);
    }
}
