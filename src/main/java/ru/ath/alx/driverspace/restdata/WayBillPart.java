package ru.ath.alx.driverspace.restdata;

public class WayBillPart {
    private String datebegin;
    private String dateend;
    private String breaktime;

    public WayBillPart() {
    }

    public WayBillPart(String datebegin, String dateend, String breaktime) {
        this.datebegin = datebegin;
        this.dateend = dateend;
        this.breaktime = breaktime;
    }

    public String getDatebegin() {
        return datebegin;
    }

    public void setDatebegin(String datebegin) {
        this.datebegin = datebegin;
    }

    public String getDateend() {
        return dateend;
    }

    public void setDateend(String dateend) {
        this.dateend = dateend;
    }

    public String getBreaktime() {
        return breaktime;
    }

    public void setBreaktime(String breaktime) {
        this.breaktime = breaktime;
    }
}
