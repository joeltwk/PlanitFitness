package main.routine.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ExcRoutineDTO {
    private int exerciseID;

    public boolean isEmpty() {
        return exerciseID == 0;
    }
}
