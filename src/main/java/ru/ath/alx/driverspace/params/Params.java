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
    private String atHttpUser;
    private String atHttpPass;
    private String wlnUrl;

    public String getAtUrl() {
        return atUrl;
    }

    public void setAtUrl(String aturl) {
        this.atUrl = aturl;
    }

    public String getAtHttpUser() {
        return atHttpUser;
    }

    public void setAtHttpUser(String atHttpUser) {
        this.atHttpUser = atHttpUser;
    }

    public String getAtHttpPass() {
        return atHttpPass;
    }

    public void setAtHttpPass(String atHttpPass) {
        this.atHttpPass = atHttpPass;
    }

    public String getWlnUrl() {
        return wlnUrl;
    }

    public void setWlnUrl(String wlnUrl) {
        this.wlnUrl = wlnUrl;
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

                this.atUrl = prop.getProperty("aturl");
                this.atHttpUser = prop.getProperty("atuser");
                this.atHttpPass = prop.getProperty("atpassword");
                this.wlnUrl = prop.getProperty("wlnurl");

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

    }
}
