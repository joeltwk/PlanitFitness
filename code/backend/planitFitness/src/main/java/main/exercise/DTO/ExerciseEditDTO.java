package main.exercise.DTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ExerciseEditDTO {
    private String exerciseName;
    private String category;


    public boolean isEmpty() {
        return exerciseName.isEmpty() || category.isEmpty();
    }
}
