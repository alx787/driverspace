package ru.ath.alx.driverspace.restdata;

public class InfoVehicle {
    String model;
    String marka;
    String regnomer;

    public InfoVehicle() {
    }

    public InfoVehicle(String model, String marka, String regnomer) {
        this.model = model;
        this.marka = marka;
        this.regnomer = regnomer;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMarka() {
        return marka;
    }

    public void setMarka(String marka) {
        this.marka = marka;
    }

    public String getRegnomer() {
        return regnomer;
    }

    public void setRegnomer(String regnomer) {
        this.regnomer = regnomer;
    }

    @Override
    public String toString() {
        return "InfoVehicle{" +
                "model='" + model + '\'' +
                ", marka='" + marka + '\'' +
                ", regnomer='" + regnomer + '\'' +
                '}';
    }
}
