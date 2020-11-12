package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class InfoDriverAnswer {
    String status;
    String message;
    String fio; // фио водителя
    String plcnt; // количество путевок путевках
    String probeg; // пробег
    String rashod; // расход топлива
    String fastspeed; // количество превышений скорости
    List<InfoVehicle> vehicles; // машины закрепленные за водителем

    public InfoDriverAnswer() {
    }

    public InfoDriverAnswer(String status, String message, String fio, String plcnt, String probeg, String rashod, String fastspeed, List<InfoVehicle> vehicles) {
        this.status = status;
        this.message = message;
        this.fio = fio;
        this.plcnt = plcnt;
        this.probeg = probeg;
        this.rashod = rashod;
        this.fastspeed = fastspeed;
        this.vehicles = vehicles;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    public String getPlcnt() {
        return plcnt;
    }

    public void setPlcnt(String plcnt) {
        this.plcnt = plcnt;
    }

    public String getProbeg() {
        return probeg;
    }

    public void setProbeg(String probeg) {
        this.probeg = probeg;
    }

    public String getRashod() {
        return rashod;
    }

    public void setRashod(String rashod) {
        this.rashod = rashod;
    }

    public String getFastspeed() {
        return fastspeed;
    }

    public void setFastspeed(String fastspeed) {
        this.fastspeed = fastspeed;
    }

    public List<InfoVehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<InfoVehicle> vehicles) {
        this.vehicles = vehicles;
    }

    @Override
    public String toString() {
        return "InfoDriverAnswer{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", fio='" + fio + '\'' +
                ", plcnt='" + plcnt + '\'' +
                ", probeg='" + probeg + '\'' +
                ", rashod='" + rashod + '\'' +
                ", fastspeed='" + fastspeed + '\'' +
                ", vehicles=" + vehicles +
                '}';
    }
}
