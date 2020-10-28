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
import ru.ath.alx.driverspace.restdata.WayBillList;
import ru.ath.alx.driverspace.restdata.WayBillListAnswer;
import ru.ath.alx.driverspace.restdata.WayBillListRequest;
import ru.ath.alx.driverspace.service.UserService;
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

        User user = null;

        try {
            user = userService.findByIdAndToken(Integer.valueOf(wayBillListRequest.getUserid()), wayBillListRequest.getToken());
        } catch (Exception e) {
            answer.setStatus("error");
            answer.setMessage("ошибка авторизации при запросе списка путевых листов, неверный идентификатор пользователья или токен авторизации");
            return answer;
        }

        if (user == null) {
            answer.setStatus("error");
            answer.setMessage("ошибка авторизации, пользователь не найден");
            return answer;
        }

        // 2 - проверяем заполнено ли все
        if (wayBillListRequest.getDatebeg() == null || wayBillListRequest.getDatebeg().equals("")) {
            answer.setStatus("error");
            answer.setMessage("не заполнена дата начала");
            return answer;
        }

        if (wayBillListRequest.getDateend() == null || wayBillListRequest.getDateend().equals("")) {
            answer.setStatus("error");
            answer.setMessage("не заполнена дата окончания");
            return answer;
        }

        if (wayBillListRequest.getOnlyopen() == null || wayBillListRequest.getOnlyopen().equals("")) {
            answer.setStatus("error");
            answer.setMessage("не заполнен признак открытого/закрытого путевого листа");
            return answer;
        }

        if (wayBillListRequest.getPage() == 0) {
            answer.setStatus("error");
            answer.setMessage("не заполнен номер страницы");
            return answer;
        }



        // 3 - отправляем запрос в ат
        String urlParams = "/getpl/"
                            + user.getTabnomer()
                            + "/" + wayBillListRequest.getDatebeg()
                            + "/" + wayBillListRequest.getDateend()
                            + "/" + wayBillListRequest.getOnlyopen()
                            + "/" + String.valueOf(wayBillListRequest.getPage());

        // ответ от автотранспорта
        String atAnswer = WebRequestUtil.sendRequest(params.getAtUrl() + urlParams, params.getAtHttpUser(), params.getAtHttpPass(), "get",  null);





        log.warn(params.getAtUrl());
        log.warn(params.getAtHttpUser());
        log.warn(params.getAtHttpPass());
        log.warn(atAnswer);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;

        try {
            jsonNode = objectMapper.readTree(atAnswer);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            answer.setStatus("error");
            answer.setMessage("ошибка, некорректный ответ сервера");
            return answer;
        }

        if (jsonNode == null) {
            answer.setStatus("error");
            answer.setMessage("ошибка, пустой ответ от сервера");
            return answer;
        }

        String status = jsonNode.get("status").asText();
        if (status.equals("error")) {
            answer.setStatus("error");
            answer.setMessage(jsonNode.get("content").asText());
            return answer;
        }



        if (status.equals("ok")) {
            try {
                return objectMapper.readValue(atAnswer, WayBillListAnswer.class);
            } catch (JsonProcessingException e) {
                answer.setStatus("error");
                answer.setMessage("ошибка получения ответа при преобразовании");
                return answer;
            }
        }

        return null;
    }


}
