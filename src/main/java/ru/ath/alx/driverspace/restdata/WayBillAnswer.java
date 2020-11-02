package ru.ath.alx.driverspace.restdata;

public class WayBillAnswer {

    private String status;
    private String message;
    private String fio;
    private WayBill content;

    public WayBillAnswer() {
    }

    public WayBillAnswer(String status, String message, String fio, WayBill content) {
        this.status = status;
        this.message = message;
        this.fio = fio;
        this.content = content;
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

    public WayBill getContent() {
        return content;
    }

    public void setContent(WayBill content) {
        this.content = content;
    }
}
