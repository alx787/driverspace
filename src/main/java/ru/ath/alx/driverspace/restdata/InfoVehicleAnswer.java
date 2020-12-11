package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class InfoVehicleAnswer {
    private String status;
    private String message;
    private List<InfoVehicle> vehicles;

    public InfoVehicleAnswer() {
    }

    public InfoVehicleAnswer(String status, String message, List<InfoVehicle> vehicles) {
        this.status = status;
        this.message = message;
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

    public List<InfoVehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<InfoVehicle> vehicles) {
        this.vehicles = vehicles;
    }

    @Override
    public String toString() {
        return "InfoVehicleAnswer{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", vehicles=" + vehicles +
                '}';
    }
}
