package main.user.service;

import main.user.model.User;
import main.user.repository.UserRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User getUserIDByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

}
