package ru.ath.alx.driverspace.restdata;

public class InfoVehicleRequest {
    private String userid;
    private String token;

    public InfoVehicleRequest() {
    }

    public InfoVehicleRequest(String userid, String token) {
        this.userid = userid;
        this.token = token;
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

    @Override
    public String toString() {
        return "InfoVehicleRequest{" +
                "userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
