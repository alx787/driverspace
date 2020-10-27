package ru.ath.alx.driverspace.model;

import javax.persistence.*;

@Entity
//@Table(name = "users", schema = "drvspacedb", catalog = "")
@Table(name = "users", schema = "drvspacedb")
public class User {
    private int id;
    private String tabnomer;
    private String name;
    private String uid;
    private String token;
    private String comment;

    public User() {
    }

    public User(int id, String tabnomer, String name, String uid, String token, String comment) {
        this.id = id;
        this.tabnomer = tabnomer;
        this.name = name;
        this.uid = uid;
        this.token = token;
        this.comment = comment;
    }

    public User(String tabnomer, String name, String uid, String token, String comment) {
        this.tabnomer = tabnomer;
        this.name = name;
        this.uid = uid;
        this.token = token;
        this.comment = comment;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "tabnomer", nullable = false)
    public String getTabnomer() {
        return tabnomer;
    }

    public void setTabnomer(String tabnomer) {
        this.tabnomer = tabnomer;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "uid", nullable = false, length = 36)
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "token", nullable = false, length = 100)
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Basic
    @Column(name = "comment", nullable = false, length = 100)
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User that = (User) o;

        if (id != that.id) return false;
        if (tabnomer != null ? !tabnomer.equals(that.tabnomer) : that.tabnomer != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (token != null ? !token.equals(that.token) : that.token != null) return false;
        if (comment != null ? !comment.equals(that.comment) : that.comment != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (tabnomer != null ? tabnomer.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (token != null ? token.hashCode() : 0);
        result = 31 * result + (comment != null ? comment.hashCode() : 0);
        return result;
    }
}
