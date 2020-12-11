package ru.ath.alx.driverspace.restdata;

public class InfoDriverRequest {
    private String userid;
    private String token;
    private String datebeg;
    private String dateend;

    public InfoDriverRequest() {
    }

    public InfoDriverRequest(String userid, String token, String datebeg, String dateend) {
        this.userid = userid;
        this.token = token;
        this.datebeg = datebeg;
        this.dateend = dateend;
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

    @Override
    public String toString() {
        return "InfoDriverRequest{" +
                "userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                ", datebeg='" + datebeg + '\'' +
                ", dateend='" + dateend + '\'' +
                '}';
    }
}
