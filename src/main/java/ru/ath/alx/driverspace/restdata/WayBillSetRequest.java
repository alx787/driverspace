package ru.ath.alx.driverspace.restdata;

public class WayBillSetRequest {
    private String userid;
    private String token;
    private String withClose; // закрыть пл 0 или 1

    private WayBill wayBill;

    public WayBillSetRequest() {
    }

    public WayBillSetRequest(String userid, String token, String withClose, WayBill wayBill) {
        this.userid = userid;
        this.token = token;
        this.withClose = withClose;
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

    public String getWithClose() {
        return withClose;
    }

    public void setWithClose(String withClose) {
        this.withClose = withClose;
    }

    @Override
    public String toString() {
        return "WayBillSetRequest{" +
                "userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                ", withClose='" + withClose + '\'' +
                ", wayBill=" + wayBill +
                '}';
    }
}
