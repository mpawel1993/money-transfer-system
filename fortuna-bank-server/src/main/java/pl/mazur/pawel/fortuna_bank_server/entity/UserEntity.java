package pl.mazur.pawel.fortuna_bank_server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Builder
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
    private boolean emailVerified;
    private String preferredUsername;
    private String givenName;
    private String familyName;
    private String email;
}