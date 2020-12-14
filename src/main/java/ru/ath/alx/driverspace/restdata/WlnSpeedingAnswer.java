package ru.ath.alx.driverspace.restdata;

import java.util.List;

public class WlnSpeedingAnswer {
    private String status;
    private String description;
    private String regnom;
    private String invnom;
    private List<WlnSpeedingDetail> content;

    public WlnSpeedingAnswer() {
    }

    public WlnSpeedingAnswer(String status, String description, String regnom, String invnom, List<WlnSpeedingDetail> content) {
        this.status = status;
        this.description = description;
        this.regnom = regnom;
        this.invnom = invnom;
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRegnom() {
        return regnom;
    }

    public void setRegnom(String regnom) {
        this.regnom = regnom;
    }

    public String getInvnom() {
        return invnom;
    }

    public void setInvnom(String invnom) {
        this.invnom = invnom;
    }

    public List<WlnSpeedingDetail> getContent() {
        return content;
    }

    public void setContent(List<WlnSpeedingDetail> content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "WlnSpeedingAnswer{" +
                "status='" + status + '\'' +
                ", description='" + description + '\'' +
                ", regnom='" + regnom + '\'' +
                ", invnom='" + invnom + '\'' +
                ", content=" + content +
                '}';
    }
}

