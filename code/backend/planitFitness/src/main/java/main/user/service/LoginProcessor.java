package main.user.service;

import main.user.model.User;
import main.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

@Service
@RequestScope
public class LoginProcessor {
    private final UserRepository userRepository;
    private final LoggedUserManagementService lms;

    public LoginProcessor (UserRepository userRepository,
                           LoggedUserManagementService lms) {
        this.userRepository = userRepository;
        this.lms = lms;
    }
    public boolean login(User user) {
        User currUser = this.userRepository.findByUsername(user.getUsername());
        if (currUser.isEmpty()) {
            return false;
        } else if (currUser.getPassword().equals(user.getPassword())) {
            lms.setUsername(currUser.getUsername());
            lms.setUserID(currUser.getUserID());
            lms.setUser(currUser);
            System.out.println(lms.getUserID());
            return true;
        }
        return false;
        }
}
