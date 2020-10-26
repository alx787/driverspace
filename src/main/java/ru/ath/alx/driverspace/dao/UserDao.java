package ru.ath.alx.driverspace.dao;

import ru.ath.alx.driverspace.model.User;

import java.util.List;

public interface UserDao {
    List<User> findAll();
    User create(User user);
    User findById(int id);
    User findByTabnom(String tabnomer);
    void update(User user);
//    void delete(User user);
}
