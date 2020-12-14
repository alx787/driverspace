package ru.ath.alx.driverspace.restdata;

public class WlnSpeedingDetail {
    private String begintime;
    private String beginx;
    private String beginy;
    private String duration;
    private String speedmax;
    private String speedlimit;
    private String speedingcount;

    public WlnSpeedingDetail() {
    }

    public WlnSpeedingDetail(String begintime, String beginx, String beginy, String duration, String speedmax, String speedlimit, String speedingcount) {
        this.begintime = begintime;
        this.beginx = beginx;
        this.beginy = beginy;
        this.duration = duration;
        this.speedmax = speedmax;
        this.speedlimit = speedlimit;
        this.speedingcount = speedingcount;
    }

    public String getBegintime() {
        return begintime;
    }

    public void setBegintime(String begintime) {
        this.begintime = begintime;
    }

    public String getBeginx() {
        return beginx;
    }

    public void setBeginx(String beginx) {
        this.beginx = beginx;
    }

    public String getBeginy() {
        return beginy;
    }

    public void setBeginy(String beginy) {
        this.beginy = beginy;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getSpeedmax() {
        return speedmax;
    }

    public void setSpeedmax(String speedmax) {
        this.speedmax = speedmax;
    }

    public String getSpeedlimit() {
        return speedlimit;
    }

    public void setSpeedlimit(String speedlimit) {
        this.speedlimit = speedlimit;
    }

    public String getSpeedingcount() {
        return speedingcount;
    }

    public void setSpeedingcount(String speedingcount) {
        this.speedingcount = speedingcount;
    }

    @Override
    public String toString() {
        return "WlnSpeedingDetail{" +
                "begintime='" + begintime + '\'' +
                ", beginx='" + beginx + '\'' +
                ", beginy='" + beginy + '\'' +
                ", duration='" + duration + '\'' +
                ", speedmax='" + speedmax + '\'' +
                ", speedlimit='" + speedlimit + '\'' +
                ", speedingcount='" + speedingcount + '\'' +
                '}';
    }
}
