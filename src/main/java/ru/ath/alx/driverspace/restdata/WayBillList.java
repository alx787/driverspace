package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class WayBillList {

    private String fio;
    private int totalrecs;
    private int totalpages;
    private int currentpage;

    private List<WayBill> lists;
    private List<InfoVehicle> infovehiclelist;

    public WayBillList() {
    }

    public WayBillList(String fio, int totalrecs, int totalpages, int currentpage, List<WayBill> lists, List<InfoVehicle> infovehiclelist) {
        this.fio = fio;
        this.totalrecs = totalrecs;
        this.totalpages = totalpages;
        this.currentpage = currentpage;
        this.lists = lists;
        this.infovehiclelist = infovehiclelist;
    }

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    public int getTotalrecs() {
        return totalrecs;
    }

    public void setTotalrecs(int totalrecs) {
        this.totalrecs = totalrecs;
    }

    public int getTotalpages() {
        return totalpages;
    }

    public void setTotalpages(int totalpages) {
        this.totalpages = totalpages;
    }

    public int getCurrentpage() {
        return currentpage;
    }

    public void setCurrentpage(int currentpage) {
        this.currentpage = currentpage;
    }

    public List<WayBill> getLists() {
        return lists;
    }

    public void setLists(List<WayBill> lists) {
        this.lists = lists;
    }

    public List<InfoVehicle> getInfovehiclelist() {
        return infovehiclelist;
    }

    public void setInfovehiclelist(List<InfoVehicle> infovehiclelist) {
        this.infovehiclelist = infovehiclelist;
    }

    @Override
    public String toString() {
        return "WayBillList{" +
                "fio='" + fio + '\'' +
                ", totalrecs=" + totalrecs +
                ", totalpages=" + totalpages +
                ", currentpage=" + currentpage +
                ", lists=" + lists +
                ", infovehiclelist=" + infovehiclelist +
                '}';
    }
}
