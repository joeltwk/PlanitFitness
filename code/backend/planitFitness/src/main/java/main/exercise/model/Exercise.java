package main.exercise.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.user.model.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Exercise {
    @Id
    @Column(name = "exercise_id")
    private int exerciseID;
    @Column(name = "exercise_name")
    private String exerciseName;
    @Column(name = "category")
    private String category;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
