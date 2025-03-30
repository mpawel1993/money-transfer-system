package pl.mazur.pawel.fortuna_bank_server.repository;

import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.mazur.pawel.fortuna_bank_server.entity.UserEntity;

@Registered
public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
}
