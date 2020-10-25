package ru.ath.alx.driverspace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.ath.alx.driverspace.model.User;
import ru.ath.alx.driverspace.service.UserService;

import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAllUsers() {
        return userService.findAll();
    }
}
