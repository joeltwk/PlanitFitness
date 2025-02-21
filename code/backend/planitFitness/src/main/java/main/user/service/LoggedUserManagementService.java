package main.user.service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.user.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
@SessionScope
@NoArgsConstructor
@Getter
@Setter
public class LoggedUserManagementService {
    private int userID;
    private String username;
    private User user;
}
