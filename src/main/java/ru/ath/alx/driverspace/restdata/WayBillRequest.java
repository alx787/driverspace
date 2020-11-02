package ru.ath.alx.driverspace.restdata;

public class WayBillRequest {
    private String userid;
    private String token;
    private int numpl;

    public WayBillRequest() {
    }

    public WayBillRequest(String userid, String token, int numpl) {
        this.userid = userid;
        this.token = token;
        this.numpl = numpl;
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

    public int getNumpl() {
        return numpl;
    }

    public void setNumpl(int numpl) {
        this.numpl = numpl;
    }

    @Override
    public String toString() {
        return "WayBillRequest{" +
                "userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                ", numpl=" + numpl +
                '}';
    }
}
