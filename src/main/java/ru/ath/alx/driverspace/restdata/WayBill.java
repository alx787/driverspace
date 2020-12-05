package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class WayBill {

    private String rownum;
    private String uid;
    private String number;
    private String date;
    private String route;
    private String klient;
    private String vehicle;
    private String regnomer;
    private String datebegin;
    private String dateend;
    private String breaklen;
    private String speedometerbegin;
    private String speedometerend;

    private String fueltype; // топливо
    private String fuelcard; // номер топливной карты

    private String refuelcnt; // заправка получено по чекам
    private String refueloutside; // сторон - сторонняя заправка (налили в другой а/к)
    private String refuelissued; // выдано по спец условию из резерва

    private String fueltype2; // топливо
    private String fuelcard2; // номер топливной карты

    private String refuelcnt2; // заправка
    private String refuelissued2; // выдано по спец условию из резерва


    private String closed;

    private List<WayBillPart> parts;

    public WayBill() {
    }

    public WayBill(String rownum, String uid, String number, String date, String route, String klient, String vehicle, String regnomer, String datebegin, String dateend, String breaklen, String speedometerbegin, String speedometerend, String fueltype, String fuelcard, String refuelcnt, String refueloutside, String refuelissued, String fueltype2, String fuelcard2, String refuelcnt2, String refuelissued2, String closed, List<WayBillPart> parts) {
        this.rownum = rownum;
        this.uid = uid;
        this.number = number;
        this.date = date;
        this.route = route;
        this.klient = klient;
        this.vehicle = vehicle;
        this.regnomer = regnomer;
        this.datebegin = datebegin;
        this.dateend = dateend;
        this.breaklen = breaklen;
        this.speedometerbegin = speedometerbegin;
        this.speedometerend = speedometerend;
        this.fueltype = fueltype;
        this.fuelcard = fuelcard;
        this.refuelcnt = refuelcnt;
        this.refueloutside = refueloutside;
        this.refuelissued = refuelissued;
        this.fueltype2 = fueltype2;
        this.fuelcard2 = fuelcard2;
        this.refuelcnt2 = refuelcnt2;
        this.refuelissued2 = refuelissued2;
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

    public String getKlient() {
        return klient;
    }

    public void setKlient(String klient) {
        this.klient = klient;
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public String getRegnomer() {
        return regnomer;
    }

    public void setRegnomer(String regnomer) {
        this.regnomer = regnomer;
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

    public String getFueltype() {
        return fueltype;
    }

    public void setFueltype(String fueltype) {
        this.fueltype = fueltype;
    }

    public String getFuelcard() {
        return fuelcard;
    }

    public void setFuelcard(String fuelcard) {
        this.fuelcard = fuelcard;
    }

    public String getRefuelcnt() {
        return refuelcnt;
    }

    public void setRefuelcnt(String refuelcnt) {
        this.refuelcnt = refuelcnt;
    }

    public String getRefueloutside() {
        return refueloutside;
    }

    public void setRefueloutside(String refueloutside) {
        this.refueloutside = refueloutside;
    }

    public String getRefuelissued() {
        return refuelissued;
    }

    public void setRefuelissued(String refuelissued) {
        this.refuelissued = refuelissued;
    }

    public String getFueltype2() {
        return fueltype2;
    }

    public void setFueltype2(String fueltype2) {
        this.fueltype2 = fueltype2;
    }

    public String getFuelcard2() {
        return fuelcard2;
    }

    public void setFuelcard2(String fuelcard2) {
        this.fuelcard2 = fuelcard2;
    }

    public String getRefuelcnt2() {
        return refuelcnt2;
    }

    public void setRefuelcnt2(String refuelcnt2) {
        this.refuelcnt2 = refuelcnt2;
    }

    public String getRefuelissued2() {
        return refuelissued2;
    }

    public void setRefuelissued2(String refuelissued2) {
        this.refuelissued2 = refuelissued2;
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
                ", klient='" + klient + '\'' +
                ", vehicle='" + vehicle + '\'' +
                ", regnomer='" + regnomer + '\'' +
                ", datebegin='" + datebegin + '\'' +
                ", dateend='" + dateend + '\'' +
                ", breaklen='" + breaklen + '\'' +
                ", speedometerbegin='" + speedometerbegin + '\'' +
                ", speedometerend='" + speedometerend + '\'' +
                ", fueltype='" + fueltype + '\'' +
                ", fuelcard='" + fuelcard + '\'' +
                ", refuelcnt='" + refuelcnt + '\'' +
                ", refueloutside='" + refueloutside + '\'' +
                ", refuelissued='" + refuelissued + '\'' +
                ", fueltype2='" + fueltype2 + '\'' +
                ", fuelcard2='" + fuelcard2 + '\'' +
                ", refuelcnt2='" + refuelcnt2 + '\'' +
                ", refuelissued2='" + refuelissued2 + '\'' +
                ", closed='" + closed + '\'' +
                ", parts=" + parts +
                '}';
    }
}
