package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class InfoDriverAnswer {
    private String status;
    private String message;
    private String fio; // фио водителя
    private String probeg; // пробег
    private String rashod; // расход топлива
    private String fastspeed; // количество превышений скорости
    private List<InfoVehicle> vehicles; // машины закрепленные за водителем
    private List<InfoPl> plcnt; // количество путевок путевках

    public InfoDriverAnswer() {
    }

    public InfoDriverAnswer(String status, String message, String fio, String probeg, String rashod, String fastspeed, List<InfoVehicle> vehicles, List<InfoPl> plcnt) {
        this.status = status;
        this.message = message;
        this.fio = fio;
        this.probeg = probeg;
        this.rashod = rashod;
        this.fastspeed = fastspeed;
        this.vehicles = vehicles;
        this.plcnt = plcnt;
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

    public List<InfoPl> getPlcnt() {
        return plcnt;
    }

    public void setPlcnt(List<InfoPl> plcnt) {
        this.plcnt = plcnt;
    }

    @Override
    public String toString() {
        return "InfoDriverAnswer{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", fio='" + fio + '\'' +
                ", probeg='" + probeg + '\'' +
                ", rashod='" + rashod + '\'' +
                ", fastspeed='" + fastspeed + '\'' +
                ", vehicles=" + vehicles +
                ", plcnt=" + plcnt +
                '}';
    }
}
