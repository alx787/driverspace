package ru.ath.alx.driverspace.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.ath.alx.driverspace.model.User;
import ru.ath.alx.driverspace.params.Params;
import ru.ath.alx.driverspace.restdata.AuthAnswer;
import ru.ath.alx.driverspace.restdata.AuthRequest;
import ru.ath.alx.driverspace.service.UserService;
import ru.ath.alx.driverspace.util.AuthUtil;
import ru.ath.alx.driverspace.util.WebRequestUtil;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {

    private static final Logger log = Logger.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private Params params;


    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAllUsers() {
        log.warn("====");
        return userService.findAll();
    }

//    @RequestMapping(value = "/auth", method = RequestMethod.POST)
//    public @ResponseBody
//    void authorization(@RequestBody String jsonText) {
//        log.warn("====");
//        log.warn(jsonText);
//    }

    // авторизация
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public @ResponseBody
    AuthAnswer authorization(@RequestBody AuthRequest authRequest) {

        // 1 - получаем запрос, проверяем заполнены ли все поля
        // 2 - посылаем запрос в 1с, получаем оттуда ответ есть ли такой сотрудник-пользователь
        // 3 - если ответ положительный то генерируем токен и записываем все в базу, посылаем ответ с ид и токеном

        // 1 - получаем запрос, проверяем заполнены ли все поля
        if ((authRequest.getTabnomer() == null) || (authRequest.getTabnomer().equals(""))) {
            return new AuthAnswer("error", "", "", "пустой табельный номер недопустим");
        }

        if ((authRequest.getPassword() == null) || (authRequest.getPassword().equals(""))) {
            return new AuthAnswer("error", "", "", "пустой пароль недопустим");
        }

        log.warn("====authRequest");
        log.warn(authRequest.toString());


        // 2 - посылаем запрос в 1с, получаем оттуда ответ есть ли такой сотрудник-пользователь
//        String url = "http://192.168.100.203/avto_test/hs/serv/auth";
//        String url = params.getAtUrl();
        String data = "{\"tabnomer\": \"" + authRequest.getTabnomer() + "\",\"password\": \"" + authRequest.getPassword() + "\"}";

        // ответ от автотранспорта
        String atAnswer = WebRequestUtil.sendRequest(params.getAtUrl() + "/auth", params.getAtHttpUser(), params.getAtHttpPass(), "post",  data);
//        String atAnswer = "{\"status\": \"ok\", \"fio\": \"Сайфутдинов Расим Рашидович\"}";


        // ответ клиенту

        // разберем ответ 1с
        if (atAnswer == null || atAnswer.equals("")) {
            return new AuthAnswer("error", "", "", "нет ответа от сервера");
        }


        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(atAnswer);
        } catch (JsonProcessingException e) {
//            e.printStackTrace();
            log.warn("====atAnswer");
            log.warn(atAnswer);
            return new AuthAnswer("error", "", "", "неразборчивый ответ от сервера 1");
        }

        if (jsonNode == null) {
            return new AuthAnswer("error", "", "", "неразборчивый ответ от сервера 2");
        }

        String status = jsonNode.get("status").asText();
        if (status.equals("error")) {
//            return new AuthAnswer("error", "", "", jsonNode.get("content").asText());
            return new AuthAnswer("error", "", "", jsonNode.get("message").asText());
        }

        //
        if (status.equals("ok")) {
            // 3 если ответ положительный то генерируем токен и записываем все в базу, посылаем ответ с ид и токеном
            // {"status": "ok","fio": "Сайфутдинов Расим Рашидович", "uid": "16715896-1abb-11da-b885-000d6191187a"}

            // сначала ищем по таб номеру
            User user = userService.findByTabnom(authRequest.getTabnomer());
            if (user == null) {
                // создаем новый если не нашли
                user = new User(authRequest.getTabnomer(), jsonNode.get("fio").asText(), jsonNode.get("uid").asText(), "", "");
                userService.create(user);
            } else {
                // если нашли обновим поля
                user.setName(jsonNode.get("fio").asText());
                user.setUid(jsonNode.get("uid").asText());
                userService.update(user);
            }

            // генерим токен
            user.setToken(AuthUtil.generateToken());

            // дата для комментария
            Date dTime = new Date();
            // шаблон форматирования
            SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd - HH:mm:ss");
            // настроим шаблон чтобы он не донастроил формат с учетом временных зон
//            format.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
            format.setTimeZone(java.util.TimeZone.getDefault());
            // строковое представление

            user.setComment("регистрация " + format.format(dTime));

            userService.update(user);

            log.warn(params.getAtUrl());


            return new AuthAnswer("ok", String.valueOf(user.getId()), user.getToken(), "");

        }

//        log.warn("====atAnswer");
//        log.warn(atAnswer);

        AuthAnswer authAnswer = new AuthAnswer("error", "", "", "неразборчивый ответ от сервера 3");
        return authAnswer;
    }



    // проверка авторизованности пользователя
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public @ResponseBody
    AuthAnswer checkauth(@RequestBody AuthRequest authRequest) {

        if (!AuthUtil.checkUserIdToken(userService, authRequest.getTabnomer(), authRequest.getPassword())) {
            return new AuthAnswer("error", "", "","ошибка авторизации, пользователь не найден");
        }

        return new AuthAnswer("ok", "", "","");
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
