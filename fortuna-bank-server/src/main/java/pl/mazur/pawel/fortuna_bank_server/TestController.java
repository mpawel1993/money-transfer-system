package pl.mazur.pawel.fortuna_bank_server;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/test")
public class TestController {

    private  int i = 0;

    @GetMapping("/demo")
    public String getDemo(){

        SecurityContextHolder.getContext().getAuthentication().getDetails();

        i++;
        System.out.println("demo : " + i);
        return "demo";
    }
}
