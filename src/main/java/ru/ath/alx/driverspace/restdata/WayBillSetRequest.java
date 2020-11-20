package ru.ath.alx.driverspace.restdata;

public class WayBillSetRequest {
    private String userid;
    private String token;

    // закрыть пл
    // private String withClose;

    private WayBill wayBill;

    public WayBillSetRequest() {
    }

    public WayBillSetRequest(String userid, String token, WayBill wayBill) {
        this.userid = userid;
        this.token = token;
        this.wayBill = wayBill;
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

    public WayBill getWayBill() {
        return wayBill;
    }

    public void setWayBill(WayBill wayBill) {
        this.wayBill = wayBill;
    }

    @Override
    public String toString() {
        return "WayBillSetRequest{" +
                "userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                ", wayBill=" + wayBill +
                '}';
    }
}
