package main.user.controller;

import main.exception.ResourceNotFoundException;
import main.user.service.LoggedUserManagementService;
import main.user.service.LoginProcessor;
import main.user.model.User;
import main.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    private final UserRepository userRepository;
    private final LoginProcessor loginProcessor;
    private final LoggedUserManagementService lms;

    public UserController(UserRepository userRepository,
                          LoginProcessor loginProcessor,
                          LoggedUserManagementService lms) {
        this.userRepository = userRepository;
        this.loginProcessor = loginProcessor;
        this.lms = lms;
    }
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp (@RequestBody User user) {
        if(!user.isEmpty()) {
            this.userRepository.save(user);
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON payload");
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByID(@PathVariable(value = "username") String username)
        throws ResourceNotFoundException {
            User user = userRepository.findByUsername(username);
            return ResponseEntity.ok().body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody User user) {
        if(loginProcessor.login(user)) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid login " +
                    "details");
        }
    }

    @GetMapping("/home")
    public String home() {
        return lms.getUsername();
    }
}
