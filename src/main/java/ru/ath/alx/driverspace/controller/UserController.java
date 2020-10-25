package ru.ath.alx.driverspace.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.ath.alx.driverspace.model.User;
import ru.ath.alx.driverspace.service.UserService;

import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {

    private static final Logger log = Logger.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAllUsers() {
        log.warn("====");
        return userService.findAll();
    }

    // тестовый метод, потом надо будет убрать
//    @RequestMapping(value = "/create/{tabnomer}/{name}", method = RequestMethod.GET)
//    public @ResponseBody
//    User createUser(@PathVariable("tabnomer") String tabnomer, @PathVariable("name") String name) {
//        User user = new User(tabnomer, name, "", "");
//        userService.create(user);
//        return user;
//    }

}
