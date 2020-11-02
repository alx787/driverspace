package ru.ath.alx.driverspace.restdata;

public class WayBillPart {
    private String datebegin;
    private String dateend;
    private String breaklen;

    public WayBillPart() {
    }

    public WayBillPart(String datebegin, String dateend, String breaklen) {
        this.datebegin = datebegin;
        this.dateend = dateend;
        this.breaklen = breaklen;
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

    public String getBreaklen() {
        return breaklen;
    }

    public void setBreaklen(String breaklen) {
        this.breaklen = breaklen;
    }

    @Override
    public String toString() {
        return "WayBillPart{" +
                "datebegin='" + datebegin + '\'' +
                ", dateend='" + dateend + '\'' +
                ", breaklen='" + breaklen + '\'' +
                '}';
    }
}
