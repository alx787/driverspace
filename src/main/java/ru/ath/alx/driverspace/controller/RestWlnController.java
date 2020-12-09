package ru.ath.alx.driverspace.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.ath.alx.driverspace.params.Params;
import ru.ath.alx.driverspace.restdata.WlnTrackAnswer;
import ru.ath.alx.driverspace.restdata.WlnTrackRequest;
import ru.ath.alx.driverspace.service.UserService;

@Controller
@RequestMapping("/wln")
public class RestWlnController {

    private static final Logger log = Logger.getLogger(RestWlnController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private Params params;


    @RequestMapping(value = "/gettrack", method = RequestMethod.POST)
    public @ResponseBody
    WlnTrackAnswer getTrack(@RequestBody WlnTrackRequest infoDriverRequest) {
        return new WlnTrackAnswer();
    }


}
