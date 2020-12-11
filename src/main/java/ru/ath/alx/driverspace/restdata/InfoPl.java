package ru.ath.alx.driverspace.restdata;

public class InfoPl {
    private String regnomer;
    private String plinfo;

    public InfoPl() {
    }

    public InfoPl(String regnomer, String plinfo) {
        this.regnomer = regnomer;
        this.plinfo = plinfo;
    }

    public String getRegnomer() {
        return regnomer;
    }

    public void setRegnomer(String regnomer) {
        this.regnomer = regnomer;
    }

    public String getPlinfo() {
        return plinfo;
    }

    public void setPlinfo(String plinfo) {
        this.plinfo = plinfo;
    }

    @Override
    public String toString() {
        return "InfoPl{" +
                "regnomer='" + regnomer + '\'' +
                ", plinfo='" + plinfo + '\'' +
                '}';
    }
}
