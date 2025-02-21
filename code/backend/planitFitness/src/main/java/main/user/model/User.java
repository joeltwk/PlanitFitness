package main.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private int userID;
    @Column(name = "username")
    private String username;
    @Column(name = "user_password")
    private String password;

    public User (String username, String password) {
        this.username = username;
        this.password = password;
    }

    @JsonIgnore
    public boolean isEmpty() {
        return ((this.username == null) || (this.password == null));
    }
}


