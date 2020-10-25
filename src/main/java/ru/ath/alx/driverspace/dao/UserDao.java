package ru.ath.alx.driverspace.dao;

import ru.ath.alx.driverspace.model.User;

import java.util.List;

public interface UserDao {
    List<User> findAll();
//    User findById(int id);
//    User save(User user);
//    void delete(User user);
}
