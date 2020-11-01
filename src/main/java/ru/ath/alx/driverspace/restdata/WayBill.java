package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class WayBill {

    private String rownum;
    private String uid;
    private String number;
    private String date;
    private String route;
    private String vehicle;
    private String datebegin;
    private String dateend;
    private String breaklen;
    private String speedometerbegin;
    private String speedometerend;
    private String refuel;
    private String closed;

    private List<WayBillPart> parts;

    public WayBill() {
    }

    public WayBill(String rownum, String uid, String number, String date, String route, String vehicle, String datebegin, String dateend, String breaklen, String speedometerbegin, String speedometerend, String refuel, String closed, List<WayBillPart> parts) {
        this.rownum = rownum;
        this.uid = uid;
        this.number = number;
        this.date = date;
        this.route = route;
        this.vehicle = vehicle;
        this.datebegin = datebegin;
        this.dateend = dateend;
        this.breaklen = breaklen;
        this.speedometerbegin = speedometerbegin;
        this.speedometerend = speedometerend;
        this.refuel = refuel;
        this.closed = closed;
        this.parts = parts;
    }

    public String getRownum() {
        return rownum;
    }

    public void setRownum(String rownum) {
        this.rownum = rownum;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
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

    public String getSpeedometerbegin() {
        return speedometerbegin;
    }

    public void setSpeedometerbegin(String speedometerbegin) {
        this.speedometerbegin = speedometerbegin;
    }

    public String getSpeedometerend() {
        return speedometerend;
    }

    public void setSpeedometerend(String speedometerend) {
        this.speedometerend = speedometerend;
    }

    public String getRefuel() {
        return refuel;
    }

    public void setRefuel(String refuel) {
        this.refuel = refuel;
    }

    public String getClosed() {
        return closed;
    }

    public void setClosed(String closed) {
        this.closed = closed;
    }

    public List<WayBillPart> getParts() {
        return parts;
    }

    public void setParts(List<WayBillPart> parts) {
        this.parts = parts;
    }

    @Override
    public String toString() {
        return "WayBill{" +
                "rownum='" + rownum + '\'' +
                ", uid='" + uid + '\'' +
                ", number='" + number + '\'' +
                ", date='" + date + '\'' +
                ", route='" + route + '\'' +
                ", vehicle='" + vehicle + '\'' +
                ", datebegin='" + datebegin + '\'' +
                ", dateend='" + dateend + '\'' +
                ", breaklen='" + breaklen + '\'' +
                ", speedometerbegin='" + speedometerbegin + '\'' +
                ", speedometerend='" + speedometerend + '\'' +
                ", refuel='" + refuel + '\'' +
                ", closed='" + closed + '\'' +
                ", parts=" + parts +
                '}';
    }
}
