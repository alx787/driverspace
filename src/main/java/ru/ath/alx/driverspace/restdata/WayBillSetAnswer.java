package ru.ath.alx.driverspace.restdata;

public class WayBillSetAnswer {
    private String status;
    private String message;

    public WayBillSetAnswer() {
    }

    public WayBillSetAnswer(String status, String message) {
        this.status = status;
        this.message = message;
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

    @Override
    public String toString() {
        return "WayBillSetAnswer{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
