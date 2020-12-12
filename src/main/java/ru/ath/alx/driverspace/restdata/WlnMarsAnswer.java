package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class WlnMarsAnswer {
    private String status;
    private String count;
    private String message;
    private List<WlnMarsPoint> content;

    public WlnMarsAnswer() {
    }

    public WlnMarsAnswer(String status, String count, String message, List<WlnMarsPoint> content) {
        this.status = status;
        this.count = count;
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

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public List<WlnMarsPoint> getContent() {
        return content;
    }

    public void setContent(List<WlnMarsPoint> content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "WlnMarsAnswer{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", count='" + count + '\'' +
                ", content=" + content +
                '}';
    }
}
