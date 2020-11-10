package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class InfoDriver {
    String status;
    String message;
    String fio;
    List<InfoVehicle> vehicles;

    public InfoDriver() {
    }

    public InfoDriver(String status, String message, String fio, List<InfoVehicle> vehicles) {
        this.status = status;
        this.message = message;
        this.fio = fio;
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

    public List<InfoVehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<InfoVehicle> vehicles) {
        this.vehicles = vehicles;
    }

    @Override
    public String toString() {
        return "InfoDriver{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", fio='" + fio + '\'' +
                ", vehicles=" + vehicles +
                '}';
    }
}
