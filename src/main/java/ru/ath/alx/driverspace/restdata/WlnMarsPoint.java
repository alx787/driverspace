package ru.ath.alx.driverspace.restdata;

public class WlnMarsPoint {
    private String x;
    private String y;
    private String course;
    private String speed;
    private String time;

    public WlnMarsPoint() {
    }

    public WlnMarsPoint(String x, String y, String course, String speed, String time) {
        this.x = x;
        this.y = y;
        this.course = course;
        this.speed = speed;
        this.time = time;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "WlnMarsPoint{" +
                "x='" + x + '\'' +
                ", y='" + y + '\'' +
                ", course='" + course + '\'' +
                ", speed='" + speed + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
