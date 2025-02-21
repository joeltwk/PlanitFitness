package main.exercise.DTO;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ExerciseInputDTO {
    private String username;
    private String exerciseName;
    private String category;


    public boolean isEmpty() {
        return exerciseName.isEmpty() || username.isEmpty() || category.isEmpty();
    }
}
