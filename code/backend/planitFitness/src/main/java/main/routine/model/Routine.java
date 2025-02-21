package main.routine.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.exercise.model.Exercise;
import main.user.model.User;
import org.hibernate.validator.constraints.CodePointLength;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Routine {
    @Id
    @Column(name = "routine_id")
    private int routineID;
    @Column(name = "routine_name")
    private String routineName;
    @Column(name = "routine_desc")
    private String routineDesc;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userID;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "exc_rout",
            joinColumns=@JoinColumn(name="routine_id", referencedColumnName="routine_id"),
            inverseJoinColumns=@JoinColumn(name="exercise_id",
                    referencedColumnName="exercise_id"))
    private List<Exercise> exerciseList;

}
