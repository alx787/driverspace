package ru.ath.alx.driverspace.util;

import org.apache.log4j.Logger;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class WebRequestUtil {

    private static final Logger log = Logger.getLogger(WebRequestUtil.class);

    public static String sendRequest(String url, String httpuser, String httppass, String reqmethod, String data) {

//        HttpsURLConnection connection = null;
        HttpURLConnection connection = null;
        StringBuilder result = new StringBuilder();

        boolean wasError = false;

        try {
//            connection = (HttpsURLConnection) new URL(url).openConnection();
            connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestProperty("charset", "UTF-8");


            // авторизация
            //String auth = user + ":" + password;
            if (httpuser != null && httppass != null) {
                if (!httpuser.equals("") || !httppass.equals("")) {

//                    String authString = "wsuser:111";
                    String authString = httpuser + ":" + httppass;
                    byte[] authByte = authString.getBytes(StandardCharsets.UTF_8);
                    String authEncoded = Base64.getEncoder().encodeToString(authByte);
//                    byte[] authEncoded = Base64.getEncoder().encode(authByte);

                    connection.setRequestProperty("Authorization", "Basic " + authEncoded);

                }
            }


            if (reqmethod.equals("post")) {
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setRequestMethod("POST");


                connection.setDoOutput(true);

                if (data != null) {
                    OutputStream os = connection.getOutputStream();
                    byte[] input = data.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

            }

            else {
                // get
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                connection.setRequestMethod("GET");
            }


            //log.warn(connection.toString());

            int responseCode = connection.getResponseCode();

//            if (responseCode == HttpsURLConnection.HTTP_OK) {
            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream inputStream = connection.getInputStream();
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
                BufferedReader reader = new BufferedReader(inputStreamReader);
                String line = reader.readLine();
                while (line != null) {
                    result.append(line);
                    line = reader.readLine();
                }

            } else {
                log.warn("error code " + String.valueOf(responseCode) + " - " + connection.getResponseMessage());
                wasError = true;
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
            log.warn("ошибка - неверно сформированный url");
            wasError = true;

        } catch (IOException e) {
            e.printStackTrace();
            log.warn("ошибка - ошибка ввода вывода");
            wasError = true;

        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }


        if (wasError) {
            return null;
        }

        return result.toString();
    }


}
