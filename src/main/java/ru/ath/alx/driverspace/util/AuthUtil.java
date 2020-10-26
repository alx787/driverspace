package ru.ath.alx.driverspace.util;

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
}
