package pl.mazur.pawel.fortuna_bank_server;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TestController {

    @GetMapping("/demo")
    public String getDemo(){
        System.out.println("demo");
        return "demo";
    }
}
