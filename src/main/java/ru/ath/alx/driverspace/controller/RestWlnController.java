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
import ru.ath.alx.driverspace.params.Params;
import ru.ath.alx.driverspace.restdata.*;
import ru.ath.alx.driverspace.service.UserService;
import ru.ath.alx.driverspace.util.AuthUtil;
import ru.ath.alx.driverspace.util.WebRequestUtil;

@Controller
@RequestMapping("/wln")
public class RestWlnController {

    private static final Logger log = Logger.getLogger(RestWlnController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private Params params;

    // получение пробегов - поездок
    // дата должна быть в формате yyyy-MM-dd
    // или dd.MM.yyyy-HH:mm:ss"
    @RequestMapping(value = "/gettrack", method = RequestMethod.POST)
    public @ResponseBody
    WlnTrackAnswer getTrack(@RequestBody WlnTrackRequest wlnTrackRequest) {

        WlnTrackAnswer answer = new WlnTrackAnswer();

        // 1 - получаем запрос, проводим авторизацию
        String errmsg = "";

        if (!AuthUtil.checkUserIdToken(userService, wlnTrackRequest.getUserid(), wlnTrackRequest.getToken())) {
            errmsg = errmsg + "ошибка авторизации при запросе списка путевых листов, неверный идентификатор пользователья или токен авторизации\n";
        }

        // 2 - проверяем заполнено ли все
        if (wlnTrackRequest.getDatebeg() == null || wlnTrackRequest.getDatebeg().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        if (wlnTrackRequest.getDateend() == null || wlnTrackRequest.getDateend().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        // если ошибка на входе
        if (!errmsg.equals("")) {
            log.warn("======================");
            log.warn(errmsg);
            log.warn(wlnTrackRequest.toString());
            log.warn("======================");

            answer.setStatus("error");
            answer.setDescription(errmsg);

            return answer;
        }


        String datebeg = wlnTrackRequest.getDatebeg();
        if (datebeg.length() > 10) {
            datebeg = datebeg + ":00";
        }

        String dateend = wlnTrackRequest.getDateend();
        if (dateend.length() > 10) {
            dateend = dateend + ":00";
        }


        String urlParams = "/track/gettrack/" + wlnTrackRequest.getInvnomer() + "/" + datebeg + "/" + dateend;

//        log.warn(urlParams);

        // ответ от автотранспорта
        String wlnAnswer = WebRequestUtil.sendRequest(params.getWlnUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "post",  null);

//        log.warn(wlnAnswer);

        ObjectMapper objectMapper = new ObjectMapper();
        WlnTrackAnswer wlnTrackAnswer = null;
        try {
            wlnTrackAnswer = objectMapper.readValue(wlnAnswer, WlnTrackAnswer.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();

            return new WlnTrackAnswer("error", "ошибка ответа сервера", "", null);
        }

        return wlnTrackAnswer;
    }


    // получение точек с координатами для построения маршрута
    // дата должна быть в формате yyyy-MM-dd
    // или dd.MM.yyyy-HH:mm:ss"
    @RequestMapping(value = "/getmars", method = RequestMethod.POST)
    public @ResponseBody
    WlnMarsAnswer getMars(@RequestBody WlnMarsRequest wlnMarsRequest) {

        WlnMarsAnswer answer = new WlnMarsAnswer();

        // 1 - получаем запрос, проводим авторизацию
        String errmsg = "";

        if (!AuthUtil.checkUserIdToken(userService, wlnMarsRequest.getUserid(), wlnMarsRequest.getToken())) {
            errmsg = errmsg + "ошибка авторизации при запросе маршрута, неверный идентификатор пользователья или токен авторизации\n";
        }

        // 2 - проверяем заполнено ли все
        if (wlnMarsRequest.getDatebeg() == null || wlnMarsRequest.getDatebeg().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        if (wlnMarsRequest.getDateend() == null || wlnMarsRequest.getDateend().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        // если ошибка на входе
        if (!errmsg.equals("")) {
            log.warn("======================");
            log.warn(errmsg);
            log.warn(wlnMarsRequest.toString());
            log.warn("======================");

            answer.setStatus("error");
            answer.setMessage(errmsg);

            return answer;
        }

        String urlParams = "/track/mars/" + wlnMarsRequest.getInvnomer() + "/" + wlnMarsRequest.getDatebeg() + "/" + wlnMarsRequest.getDateend();

//        log.warn(urlParams);

        // ответ от автотранспорта
        String wlnAnswer = WebRequestUtil.sendRequest(params.getWlnUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "post",  null);

//        log.warn(wlnAnswer);

        ObjectMapper objectMapper = new ObjectMapper();
        WlnMarsAnswer wlnMarsAnswer = null;
        try {
            wlnMarsAnswer = objectMapper.readValue(wlnAnswer, WlnMarsAnswer.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();

            return new WlnMarsAnswer("error", "", "ошибка ответа сервера", null);
        }

        return wlnMarsAnswer;
    }


    // получение превышений скорости
    // дата должна быть в формате yyyy-MM-dd
    // или dd.MM.yyyy-HH:mm:ss"
    @RequestMapping(value = "/getspeeding", method = RequestMethod.POST)
    public @ResponseBody
    WlnSpeedingAnswer getSpeeding(@RequestBody WlnSpeedingRequest wlnSpeedingRequest) {
        WlnSpeedingAnswer answer = new WlnSpeedingAnswer();

        // 1 - получаем запрос, проводим авторизацию
        String errmsg = "";

        if (!AuthUtil.checkUserIdToken(userService, wlnSpeedingRequest.getUserid(), wlnSpeedingRequest.getToken())) {
            errmsg = errmsg + "ошибка авторизации при запросе маршрута, неверный идентификатор пользователья или токен авторизации\n";
        }

        // 2 - проверяем заполнено ли все
        if (wlnSpeedingRequest.getDatebeg() == null || wlnSpeedingRequest.getDatebeg().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        if (wlnSpeedingRequest.getDateend() == null || wlnSpeedingRequest.getDateend().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        // если ошибка на входе
        if (!errmsg.equals("")) {
            log.warn("======================");
            log.warn(errmsg);
            log.warn(wlnSpeedingRequest.toString());
            log.warn("======================");

            answer.setStatus("error");
            answer.setDescription(errmsg);

            return answer;
        }

        String urlParams = "/track/speeding/" + wlnSpeedingRequest.getInvnomer() + "/" + wlnSpeedingRequest.getDatebeg() + "/" + wlnSpeedingRequest.getDateend();

//        log.warn(urlParams);

        // ответ от автотранспорта
        String wlnAnswer = WebRequestUtil.sendRequest(params.getWlnUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "post",  null);

//        log.warn(wlnAnswer);

        ObjectMapper objectMapper = new ObjectMapper();
        WlnSpeedingAnswer wlnSpeedingAnswer = null;
        try {
            wlnSpeedingAnswer = objectMapper.readValue(wlnAnswer, WlnSpeedingAnswer.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();

            return new WlnSpeedingAnswer("error", "ошибка ответа сервера", "", "", null);
        }

        return wlnSpeedingAnswer;

    }



}
