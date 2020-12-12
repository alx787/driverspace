package ru.ath.alx.driverspace.restdata;

public class WlnMarsRequest {
    private String userid;
    private String token;
    private String invnomer;
    private String datebeg;
    private String dateend;

    public WlnMarsRequest() {
    }

    public WlnMarsRequest(String userid, String token, String invnomer, String datebeg, String dateend) {
        this.userid = userid;
        this.token = token;
        this.invnomer = invnomer;
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

    public String getInvnomer() {
        return invnomer;
    }

    public void setInvnomer(String invnomer) {
        this.invnomer = invnomer;
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
        return "WlnTrackRequest{" +
                "userid='" + userid + '\'' +
                ", token='" + token + '\'' +
                ", invnomer='" + invnomer + '\'' +
                ", datebeg='" + datebeg + '\'' +
                ", dateend='" + dateend + '\'' +
                '}';
    }
}
