package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class WlnTrackContent {

    private String regnom;
    private String wlnid;
    private String invnom;
    private String duration;
    private String motohours;
    private String probeg;
    private String fuelrate;
    private List<WlnTrackDetail> detail;

    public WlnTrackContent() {
    }

    public WlnTrackContent(String regnom, String wlnid, String invnom, String duration, String motohours, String probeg, String fuelrate, List<WlnTrackDetail> detail) {
        this.regnom = regnom;
        this.wlnid = wlnid;
        this.invnom = invnom;
        this.duration = duration;
        this.motohours = motohours;
        this.probeg = probeg;
        this.fuelrate = fuelrate;
        this.detail = detail;
    }

    public String getRegnom() {
        return regnom;
    }

    public void setRegnom(String regnom) {
        this.regnom = regnom;
    }

    public String getWlnid() {
        return wlnid;
    }

    public void setWlnid(String wlnid) {
        this.wlnid = wlnid;
    }

    public String getInvnom() {
        return invnom;
    }

    public void setInvnom(String invnom) {
        this.invnom = invnom;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getMotohours() {
        return motohours;
    }

    public void setMotohours(String motohours) {
        this.motohours = motohours;
    }

    public String getProbeg() {
        return probeg;
    }

    public void setProbeg(String probeg) {
        this.probeg = probeg;
    }

    public String getFuelrate() {
        return fuelrate;
    }

    public void setFuelrate(String fuelrate) {
        this.fuelrate = fuelrate;
    }

    public List<WlnTrackDetail> getDetail() {
        return detail;
    }

    public void setDetail(List<WlnTrackDetail> detail) {
        this.detail = detail;
    }
}
