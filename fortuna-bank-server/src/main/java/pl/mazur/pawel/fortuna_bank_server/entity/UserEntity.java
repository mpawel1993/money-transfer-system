package pl.mazur.pawel.fortuna_bank_server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue
    private Long id;
    private String keyCloakId;
    private String username;
}
