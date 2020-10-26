package ru.ath.alx.driverspace.params;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Component
@Scope("singleton")
public class Params {

    private static final Logger log = Logger.getLogger(Params.class);

    private String atUrl;

    public String getAtUrl() {
        return atUrl;
    }

    public void setAtUrl(String aturl) {
        this.atUrl = aturl;
    }

    @PostConstruct
    private void init() {

        InputStream inputStream = null;

        try {
            Properties prop = new Properties();
            String propFileName = "config.properties";

            inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);

            if (inputStream != null) {
                prop.load(inputStream);

                atUrl = prop.getProperty("aturl");

            } else {
                log.warn("файл настроек config.properties не найден");
            }
        } catch (Exception e) {
            log.warn("Exception: " + e);
        } finally {
            try {
                inputStream.close();
            } catch (IOException e) {

            }
        }

//        log.warn(" ======== init ======== ");
//        log.warn(atUrl);
    }
}
