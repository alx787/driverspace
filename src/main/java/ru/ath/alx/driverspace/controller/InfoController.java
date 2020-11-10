package ru.ath.alx.driverspace.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.ath.alx.driverspace.model.User;
import ru.ath.alx.driverspace.params.Params;
import ru.ath.alx.driverspace.restdata.AuthRequest;
import ru.ath.alx.driverspace.restdata.InfoDriver;
import ru.ath.alx.driverspace.service.UserService;
import ru.ath.alx.driverspace.util.AuthUtil;
import ru.ath.alx.driverspace.util.WebRequestUtil;

@Controller
@RequestMapping("/info")
public class InfoController {
    private static final Logger log = Logger.getLogger(InfoController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private Params params;

    @RequestMapping(value = "/getdriver", method = RequestMethod.POST)
    public @ResponseBody
    InfoDriver infoDriver(@RequestBody AuthRequest authRequest) {

        int id = 0;
        String token = "";

        if (authRequest.getTabnomer() == null || authRequest.getTabnomer().equals("") || authRequest.getPassword() == null || authRequest.getPassword().equals("")) {
            return new InfoDriver("error", "не заполнены обязательные поля", "", null);
        }

        try {
            id = Integer.valueOf(authRequest.getTabnomer());
        } catch (NumberFormatException e) {
//            e.printStackTrace();
            return new InfoDriver("error", "неправильный id", "", null);
        }

        User user = userService.findByIdAndToken(id, authRequest.getPassword());

        if (user == null) {
            return new InfoDriver("error", "пользователь не найден", "", null);
        }

        String urlParams = "/getdriver/" + user.getTabnomer();

        // ответ от автотранспорта
        String atAnswer = WebRequestUtil.sendRequest(params.getAtUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "get",  null);

        log.warn(atAnswer);

        ObjectMapper objectMapper = new ObjectMapper();
        InfoDriver infoDriver = null;
        try {
            infoDriver = objectMapper.readValue(atAnswer, InfoDriver.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();

            return new InfoDriver("error", "ошибка ответа сервера", "", null);
        }

        return infoDriver;


    }


}
