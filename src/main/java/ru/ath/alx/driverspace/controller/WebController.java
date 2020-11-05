package ru.ath.alx.driverspace.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.ath.alx.driverspace.model.User;

import java.util.ArrayList;
import java.util.List;


// контроллер пока не нужен

@Controller
@RequestMapping("/")
public class WebController {

    private static List<User> userList = new ArrayList<User>();

    static {
        userList.add(new User("1", "alx", "", "", ""));
        userList.add(new User("2", "srg", "", "", ""));
        userList.add(new User("3", "den", "", "", ""));
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@ModelAttribute("model") ModelMap model) {

        model.addAttribute("userList", userList);

        return "index";
    }
}
