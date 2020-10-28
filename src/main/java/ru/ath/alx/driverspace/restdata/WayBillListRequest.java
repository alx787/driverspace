package ru.ath.alx.driverspace.restdata;

public class WayBillListRequest {

    private String userid;
    private String token;
    private String datebeg;
    private String dateend;
    private String onlyopen;
    private int page;

    public WayBillListRequest() {
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

    public String getDatebeg() {
        return datebeg;
    }

    public void setDatebeg(String datebeg) {
        this.datebeg = datebeg;
    }

    public String getDateend() {
        return dateend;
    }

    public void setDateend(String dateend) {
        this.dateend = dateend;
    }

    public String getOnlyopen() {
        return onlyopen;
    }

    public void setOnlyopen(String onlyopen) {
        this.onlyopen = onlyopen;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    @Override
    public String toString() {
        return "WayBillListRequest{" +
                "userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                ", datebeg='" + datebeg + '\'' +
                ", dateend='" + dateend + '\'' +
                ", onlyopen='" + onlyopen + '\'' +
                ", page=" + page +
                '}';
    }
}
