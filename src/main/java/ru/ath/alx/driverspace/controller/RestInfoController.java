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
import ru.ath.alx.driverspace.restdata.InfoDriverAnswer;
import ru.ath.alx.driverspace.restdata.InfoDriverRequest;
import ru.ath.alx.driverspace.service.UserService;
import ru.ath.alx.driverspace.util.WebRequestUtil;

@Controller
@RequestMapping("/info")
public class RestInfoController {
    private static final Logger log = Logger.getLogger(RestInfoController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private Params params;

    @RequestMapping(value = "/getdriver", method = RequestMethod.POST)
    public @ResponseBody
    InfoDriverAnswer infoDriver(@RequestBody InfoDriverRequest infoDriverRequest) {

        int id = 0;
        String token = "";

        if (infoDriverRequest.getUserid() == null || infoDriverRequest.getUserid().equals("") || infoDriverRequest.getToken() == null || infoDriverRequest.getToken().equals("")) {
            return new InfoDriverAnswer("error", "не заполнены обязательные поля", "", "", "", "", null, null);
        }

        try {
            id = Integer.valueOf(infoDriverRequest.getUserid());
        } catch (NumberFormatException e) {
//            e.printStackTrace();
            return new InfoDriverAnswer("error", "неправильный id", "",  "", "", "", null, null);
        }

        User user = userService.findByIdAndToken(id, infoDriverRequest.getToken());

        if (user == null) {
            return new InfoDriverAnswer("error", "пользователь не найден", "", "", "", "", null, null);
        }

        String urlParams = "/getdriver/" + user.getTabnomer() + "/" + infoDriverRequest.getDatebeg() + "/" + infoDriverRequest.getDateend();

        // ответ от автотранспорта
        String atAnswer = WebRequestUtil.sendRequest(params.getAtUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "get",  null);

        log.warn(atAnswer);

        ObjectMapper objectMapper = new ObjectMapper();
        InfoDriverAnswer infoDriverAnswer = null;
        try {
            infoDriverAnswer = objectMapper.readValue(atAnswer, InfoDriverAnswer.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();

            return new InfoDriverAnswer("error", "ошибка ответа сервера", "", "", "", "", null, null);
        }

        return infoDriverAnswer;


    }


}
