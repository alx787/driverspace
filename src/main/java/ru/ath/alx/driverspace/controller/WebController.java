package ru.ath.alx.driverspace.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.ath.alx.driverspace.model.User;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;


// контроллер пока не нужен

@Controller
@RequestMapping("/")
public class WebController {

    private static final Logger log = Logger.getLogger(WebController.class);

//    private static List<User> userList = new ArrayList<User>();
//
//    static {
//        userList.add(new User("1", "alx", "", "", ""));
//        userList.add(new User("2", "srg", "", "", ""));
//        userList.add(new User("3", "den", "", "", ""));
//    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(Model model, HttpServletRequest request) {

//        // получаем контекст и передаем в шаблон
//        log.warn(request.getContextPath());
//        model.addAttribute("appUrl", request.getContextPath());

        return "index";
    }

    @RequestMapping(value = "/exit", method = RequestMethod.GET)
    public String exit(Model model, HttpServletRequest request) {
        return "exit";
    }

    @RequestMapping(value = "/mainpage", method = RequestMethod.GET)
    public String mainpage(Model model, HttpServletRequest request) {
        return "mainpage";
    }

    @RequestMapping(value = "/pllist", method = RequestMethod.GET)
    public String pllist(@RequestParam(value = "datebeg", required = false) String datebeg,
                         @RequestParam(value = "dateend", required = false) String dateend,
                         @RequestParam(value = "page", required = false) String page,
                         @RequestParam(value = "onlyopen", required = false) String onlyopen,
                         @RequestParam(value = "vehicle", required = false) String vehicle,
                         Model model,
                         HttpServletRequest request) {
//        @ModelAttribute("model") ModelMap model,

        if (datebeg == null) {
            model.addAttribute("datebeg", "");
        } else {
            model.addAttribute("datebeg", datebeg);
        }

        if (dateend == null) {
            model.addAttribute("dateend", "");
        } else {
            model.addAttribute("dateend", dateend);
        }

        if (page == null) {
            model.addAttribute("page", "");
        } else {
            model.addAttribute("page", page);
        }

        if (onlyopen == null) {
            model.addAttribute("onlyopen", "");
        } else {
            model.addAttribute("onlyopen", onlyopen);
        }

        if (vehicle == null) {
            model.addAttribute("vehicle", "-");
        } else {
            model.addAttribute("vehicle", vehicle);
        }
        return "pllist";
    }

    // pledit?numpl=100
    @RequestMapping(value = "/pledit", method = RequestMethod.GET)
    public String pledit(@RequestParam("numpl") String numpl,
                         @RequestParam("datebeg") String datebeg,
                         @RequestParam("dateend") String dateend,
                         @RequestParam("onlyopen") String onlyopen,
                         @RequestParam("vehicle") String vehicle,
                         @RequestParam("page") String page,
                         Model model, HttpServletRequest request) {
        model.addAttribute("numpl", numpl);
        model.addAttribute("datebeg", datebeg);
        model.addAttribute("dateend", dateend);
        model.addAttribute("onlyopen", onlyopen);
        model.addAttribute("vehicle", vehicle);
        model.addAttribute("page", page);
        return "pledit";
    }
}
