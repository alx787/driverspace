package ru.ath.alx.driverspace.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.ath.alx.driverspace.restdata.WayBillList;

import java.util.List;

@Controller
@RequestMapping("/pl")
public class WayBillController {

    private static final Logger log = Logger.getLogger(WayBillController.class);

    @RequestMapping(value = "/getlist/{userid}/{datebeg}/{dateend}/{onlyopen}/{page}", method = RequestMethod.GET)
    public @ResponseBody
    WayBillList getWayBillList(@PathVariable("userid") String userid,
                               @PathVariable("datebeg") String datebeg,
                               @PathVariable("dateend") String dateend,
                               @PathVariable("onlyopen") String onlyopen,
                               @PathVariable("page") String page) {
        
        return null;
    }


}
