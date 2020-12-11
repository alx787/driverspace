package ru.ath.alx.driverspace.restdata;

public class InfoVehicle {
    private String model;
    private String marka;
    private String regnomer;
    private String invnomer;

    public InfoVehicle() {
    }

    public InfoVehicle(String model, String marka, String regnomer, String invnomer) {
        this.model = model;
        this.marka = marka;
        this.regnomer = regnomer;
        this.invnomer = invnomer;
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

    public String getInvnomer() {
        return invnomer;
    }

    public void setInvnomer(String invnomer) {
        this.invnomer = invnomer;
    }

    @Override
    public String toString() {
        return "InfoVehicle{" +
                "model='" + model + '\'' +
                ", marka='" + marka + '\'' +
                ", regnomer='" + regnomer + '\'' +
                ", invnomer='" + invnomer + '\'' +
                '}';
    }
}
