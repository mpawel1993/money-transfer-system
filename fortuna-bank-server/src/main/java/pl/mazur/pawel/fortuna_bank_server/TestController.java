package pl.mazur.pawel.fortuna_bank_server;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import pl.mazur.pawel.fortuna_bank_server.api.KeyCloakUser;
import pl.mazur.pawel.fortuna_bank_server.entity.UserEntity;
import pl.mazur.pawel.fortuna_bank_server.repository.UserEntityRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final UserEntityRepository userEntityRepository;

    private  int i = 0;

    @GetMapping("/demo")
    public String getDemo(@RequestHeader("Authorization") String token) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        var kkUser = restTemplate.exchange(
                "http://192.168.1.102:8080/realms/fortuna-bank-mobile-app-realm/protocol/openid-connect/userinfo",
                HttpMethod.GET,
                entity,
                KeyCloakUser.class
        ).getBody();
        var usr = UserEntity.builder()
                .keyCloakId(kkUser.sub())
                .username(kkUser.username())
                .emailVerified(kkUser.emailVerified())
                .preferredUsername(kkUser.preferredUsername())
                .givenName(kkUser.givenName())
                .familyName(kkUser.familyName())
                .email(kkUser.email())
                .build();

        userEntityRepository.save(usr);
        i++;
        System.out.println("demo : " + i);
        return "demo";
    }
}
