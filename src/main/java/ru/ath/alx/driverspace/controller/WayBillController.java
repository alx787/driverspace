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
import ru.ath.alx.driverspace.restdata.*;
import ru.ath.alx.driverspace.service.UserService;
import ru.ath.alx.driverspace.util.AuthUtil;
import ru.ath.alx.driverspace.util.WebRequestUtil;

@Controller
@RequestMapping("/pl")
public class WayBillController {

    private static final Logger log = Logger.getLogger(WayBillController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private Params params;



//    @RequestMapping(value = "/getlist/{userid}/{token}/{datebeg}/{dateend}/{onlyopen}/{page}", method = RequestMethod.GET)
//    public @ResponseBody
//    WayBillList getWayBillList(@PathVariable("userid") String userid,
//                                     @PathVariable("datebeg") String datebeg,
//                                     @PathVariable("dateend") String dateend,
//                                     @PathVariable("onlyopen") String onlyopen,
//                                     @PathVariable("page") String page) {
    @RequestMapping(value = "/getlist", method = RequestMethod.POST)
    public @ResponseBody
    WayBillListAnswer getWayBillList(@RequestBody WayBillListRequest wayBillListRequest) {

        // 1 - получаем запрос, проводим авторизацию
        // 2 - проверяем заполнено ли все
        // 3 - отправляем запрос в ат
        // 4 - формируем ответ


        // подготовим объект ответ
        WayBillListAnswer answer = new WayBillListAnswer();


        // 1 - получаем запрос, проводим авторизацию
        String errmsg = "";


        if (!AuthUtil.checkUserIdToken(userService, wayBillListRequest.getUserid(), wayBillListRequest.getToken())) {
            errmsg = errmsg + "ошибка авторизации при запросе списка путевых листов, неверный идентификатор пользователья или токен авторизации\n";
        }

        User user = userService.findByIdAndToken(Integer.valueOf(wayBillListRequest.getUserid()), wayBillListRequest.getToken());

        // 2 - проверяем заполнено ли все
        if (wayBillListRequest.getDatebeg() == null || wayBillListRequest.getDatebeg().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        if (wayBillListRequest.getDateend() == null || wayBillListRequest.getDateend().equals("")) {
            errmsg = errmsg + "не заполнена дата начала\n";
        }

        if (wayBillListRequest.getOnlyopen() == null || wayBillListRequest.getOnlyopen().equals("")) {
            errmsg = errmsg + "не заполнен признак открытого/закрытого путевого листа\n";
        }

        if (wayBillListRequest.getPage() == 0) {
            errmsg = errmsg + "не заполнен номер страницы\n";
        }


        // если ошибка на входе
        if (!errmsg.equals("")) {
            log.warn("======================");
            log.warn(errmsg);
            log.warn(wayBillListRequest.toString());
            log.warn("======================");

            answer.setStatus("error");
            answer.setMessage(errmsg);

            return answer;
        }


        // 3 - отправляем запрос в ат
        String urlParams = "/getlistpl/"
                            + user.getTabnomer()
                            + "/" + wayBillListRequest.getDatebeg()
                            + "/" + wayBillListRequest.getDateend()
                            + "/" + wayBillListRequest.getOnlyopen()
                            + "/" + String.valueOf(wayBillListRequest.getPage());

        // ответ от автотранспорта
        String atAnswer = WebRequestUtil.sendRequest(params.getAtUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "get",  null);


//        log.warn(params.getAtUrl());
//        log.warn(params.getAtHttpUser());
//        log.warn(params.getAtHttpPass());
        log.warn(atAnswer);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            answer = objectMapper.readValue(atAnswer, WayBillListAnswer.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();

            answer.setStatus("error");
            answer.setMessage("ошибка получения ответа при преобразовании");

            log.warn("======================");
            log.warn("ошибка получения ответа при преобразовании");
            log.warn(atAnswer);
            log.warn("======================");

            return answer;

        }


        if (answer.getStatus().equals("ok")) {
            return answer;
        }


        answer.setStatus("error");
        answer.setMessage("непонятная ошибка");

        log.warn("======================");
        log.warn("непонятная ошибка");
        log.warn(answer.toString());
        log.warn("======================");

        return answer;


//        JsonNode jsonNode = null;
//
//        try {
//            jsonNode = objectMapper.readTree(atAnswer);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            answer.setStatus("error");
//            answer.setMessage("ошибка, некорректный ответ сервера");
//            return answer;
//        }

    }



    @RequestMapping(value = "/getone", method = RequestMethod.POST)
    public @ResponseBody
    WayBillAnswer getWayBill(@RequestBody WayBillRequest wayBillRequest) {

        // 1 - получаем запрос, проводим авторизацию
        // 2 - проверяем заполнено ли все
        // 3 - отправляем запрос в ат
        // 4 - формируем ответ


        // подготовим объект ответ
        WayBillAnswer answer = new WayBillAnswer();


        // 1 - получаем запрос, проводим авторизацию

        String errmsg = "";

        if (!AuthUtil.checkUserIdToken(userService, wayBillRequest.getUserid(), wayBillRequest.getToken())) {
            errmsg = errmsg + "ошибка авторизации при запросе списка путевых листов, неверный идентификатор пользователья или токен авторизации\n";
        }

        if (wayBillRequest.getNumpl() <= 0) {
            errmsg = errmsg + "ошибка, номер путевого листа должен быть больше нуля\n";
        }

        // если ошибка на входе
        if (!errmsg.equals("")) {
            log.warn("======================");
            log.warn(errmsg);
            log.warn(wayBillRequest.toString());
            log.warn("======================");

            answer.setStatus("error");
            answer.setMessage(errmsg);

            return answer;
        }


        // 3 - отправляем запрос в ат
        String urlParams = "/getonepl/" + String.valueOf(wayBillRequest.getNumpl());

        // ответ от автотранспорта
        String atAnswer = WebRequestUtil.sendRequest(params.getAtUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "get",  null);

        log.warn(atAnswer);



        ObjectMapper objectMapper = new ObjectMapper();
        try {
            answer = objectMapper.readValue(atAnswer, WayBillAnswer.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();

            answer.setStatus("error");
            answer.setMessage("ошибка получения ответа при преобразовании");

            log.warn("======================");
            log.warn("ошибка получения ответа при преобразовании");
            log.warn(atAnswer);
            log.warn("======================");

            return answer;

        }


        if (answer.getStatus().equals("ok")) {
            return answer;
        }


        answer.setStatus("error");
        answer.setMessage("непонятная ошибка");

        log.warn("======================");
        log.warn("непонятная ошибка");
        log.warn(answer.toString());
        log.warn("======================");

        return answer;

    }


    @RequestMapping(value = "/setpl", method = RequestMethod.POST)
    public @ResponseBody
    WayBillSetAnswer setWayBill(@RequestBody WayBillSetRequest wayBillSetRequest) {


        String errmsg = "";

        if (!AuthUtil.checkUserIdToken(userService, wayBillSetRequest.getUserid(), wayBillSetRequest.getToken())) {
            errmsg = errmsg + "ошибка авторизации, неверный идентификатор пользователья или токен авторизации\n";

            log.warn("======================");
            log.warn(errmsg);
            log.warn("======================");

            return new WayBillSetAnswer("error", errmsg);
        }



        ObjectMapper objectMapper = new ObjectMapper();

        String pl = "";

        try {
            pl = objectMapper.writeValueAsString(wayBillSetRequest.getWayBill());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            errmsg = errmsg + "ошибка при пробразовании путевого листа в json при передаче в автотранспорт\n";

            log.warn("======================");
            log.warn(errmsg);
            log.warn("======================");

            return new WayBillSetAnswer("error", errmsg);

        }


        // 3 - отправляем запрос в ат
        String urlParams = "/setpl";

        // ответ от автотранспорта
        String atAnswer = WebRequestUtil.sendRequest(params.getAtUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "post",  pl);

        log.warn(atAnswer);


        try {
            WayBillSetAnswer answer = objectMapper.readValue(atAnswer, WayBillSetAnswer.class);

            return answer;

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }


        return new WayBillSetAnswer("error", "что то пошло не так");

    }


}

//{
//    "rownum" : "",
//    "uid" : "",
//    "number" : "709297",
//    "date" : "",
//    "route" : "",
//    "vehicle" : "",
//    "datebegin" : "",
//    "dateend" : "",
//    "breaklen" : "",
//    "speedometerbegin" : "1111.2",
//    "speedometerend" : "1111.34",
//    "refuel" : "0",
//    "closed" : "",
//    "parts" : [
//        {
//            "datebegin": "2020-01-01 08:08:00",
//            "dateend": "2020-01-01 08:08:00",
//            "break": "40"
//        },
//        {
//            "datebegin": "2020-01-01 08:08:00",
//            "dateend": "2020-01-01 08:08:00",
//            "break": "40"
//        }
//
//    ]
//}