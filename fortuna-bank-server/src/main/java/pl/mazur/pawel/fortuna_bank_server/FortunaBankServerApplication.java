package pl.mazur.pawel.fortuna_bank_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class FortunaBankServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FortunaBankServerApplication.class, args);
	}

}
