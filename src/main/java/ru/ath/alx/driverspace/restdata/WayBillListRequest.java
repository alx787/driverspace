package ru.ath.alx.driverspace.restdata;

// класс прототип запроса от клиента списка путевых листов
//
//{
//    "userid":"1",
//    "token":"1",
//    "datebeg":"2020-01-01",
//    "dateend":"2020-01-08",
//    "onlyopen":"0",
//    "page":"1"
//}

public class WayBillListRequest {

    private String userid;
    private String token;
    private String datebeg;
    private String dateend;
    private String onlyopen;
    private int page;
    private String invnomer;

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

    public String getInvnomer() {
        return invnomer;
    }

    public void setInvnomer(String invnomer) {
        this.invnomer = invnomer;
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
                ", invnomer=" + invnomer +
                '}';
    }
}
