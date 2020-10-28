package ru.ath.alx.driverspace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.ath.alx.driverspace.dao.UserDao;
import ru.ath.alx.driverspace.model.User;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public List<User> findAll() {
        return userDao.findAll();
    }

    public void create(User user) {
        userDao.create(user);
    }

    public User findByIdAndToken(int id, String token) {
        return userDao.findByIdAndToken(id, token);
    }

    public User findByTabnom(String tabnomer) {
        return userDao.findByTabnom(tabnomer);
    }

    public void update(User user) {
        userDao.update(user);
    }
}
