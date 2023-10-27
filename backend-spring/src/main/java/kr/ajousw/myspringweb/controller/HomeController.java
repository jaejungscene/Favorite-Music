package kr.ajousw.myspringweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class HomeController {
    @GetMapping(value = "/")
    public String homePage(){
        System.out.println("index.html");
        return "index.html";
    }
}
