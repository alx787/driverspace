package ru.ath.alx.driverspace.dao;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.ath.alx.driverspace.model.User;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<User> findAll() {
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        Query query = session.createQuery("FROM User");
        List<User> users = query.list();
        session.close();
        return users;
    }

//    @Override
//    public User findById(int id) {
//        return null;
//    }
//
//    @Override
//    public User save(User user) {
//        return null;
//    }
//
//    @Override
//    public void delete(User user) {
//
//    }
}
