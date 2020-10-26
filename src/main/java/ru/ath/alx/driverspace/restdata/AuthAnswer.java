package ru.ath.alx.driverspace.restdata;

public class AuthAnswer {
    private String status;
    private String userid;
    private String token;
    private String message;

    public AuthAnswer(String status, String userid, String token, String message) {
        this.status = status;
        this.userid = userid;
        this.token = token;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "AuthAnswer{" +
                "status='" + status + '\'' +
                ", userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
