package ru.ath.alx.driverspace.restdata;

public class AuthRequest {
    private String tabnomer;
    private String password;

    public AuthRequest() {
    }

    public String getTabnomer() {
        return tabnomer;
    }

    public void setTabnomer(String tabnomer) {
        this.tabnomer = tabnomer;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AuthRequest{" +
                "tabnomer='" + tabnomer + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
