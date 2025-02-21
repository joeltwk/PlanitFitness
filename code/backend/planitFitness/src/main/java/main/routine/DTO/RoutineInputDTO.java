package main.routine.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoutineInputDTO {
    private String username;
    private String routineName;
    private String routineDesc;

    public boolean isEmpty() {
        return username.isEmpty() || routineName.isEmpty() || routineDesc.isEmpty();
    }
}
