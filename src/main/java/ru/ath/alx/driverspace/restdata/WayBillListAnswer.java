package ru.ath.alx.driverspace.restdata;

public class WayBillListAnswer {
    private String status;
    private String message;
    private WayBillList content;

    public WayBillListAnswer() {
    }

    public WayBillListAnswer(String status, String message, WayBillList content) {
        this.status = status;
        this.message = message;
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

    public WayBillList getContent() {
        return content;
    }

    public void setContent(WayBillList content) {
        this.content = content;
    }
}
