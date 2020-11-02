package ru.ath.alx.driverspace.util;

import ru.ath.alx.driverspace.model.User;
import ru.ath.alx.driverspace.service.UserService;

import java.security.SecureRandom;

public class AuthUtil {

    public static String generateToken() {

        SecureRandom random = new SecureRandom();

        String randomString = "";
        long longToken = 0;

        while (randomString.length() < 64) {
            longToken = Math.abs( random.nextLong() );
            randomString = randomString + Long.toString(longToken, 16);
        }

        if (randomString.length() > 64) {
            randomString = randomString.substring(0, 63);
        }

        return randomString;
    }


    public static boolean checkUserIdToken(UserService userService, String userid, String token) {

        if (userid == null || userid.equals("")) {
            return false;
        }

        if (token == null || token.equals("")) {
            return false;
        }


        User user = null;

        try {
            user = userService.findByIdAndToken(Integer.valueOf(userid), token);
        } catch (Exception e) {
            return false;
        }

        if (user == null) {
            return false;
        }

        return true;

    }
}
