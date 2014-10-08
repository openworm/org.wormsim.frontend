package org.wormsim.frontend.stormpath;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.wormsim.frontend.models.User;

public class UserFactory {

    public static User create(String email, String password, String firstName, String lastName) {
        return new User(ClientFactory.createAccount(email, password, firstName, lastName));
    }

    public static User login(String email, String password) throws AccountNotFoundException {
        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(email, password);
        token.setRememberMe(true);
        currentUser.login(token);
        User user = new User(ClientFactory.getAccount(email));
        setSessionUser(user);
        return user;
    }

    public static void logout() {
        SecurityUtils.getSubject().logout();
    }

    public static User current() {
        Subject subject = SecurityUtils.getSubject();

        if(subject.isAuthenticated()) {
            Session session = subject.getSession();
            User ourUser = new User();
            //TODO: serialize the user as json, store as single string
            ourUser.setEmail((String)session.getAttribute("email"));
            ourUser.setFirstName((String)session.getAttribute("firstName"));
            ourUser.setLastName((String)session.getAttribute("lastName"));
            ourUser.setLastName((String)session.getAttribute("lastName"));
            ourUser.setWormName((String)session.getAttribute("wormName"));
            ourUser.setWormColor((String)session.getAttribute("wormColor"));
            return ourUser;

        } else {
            return null;
        }
    }

    private static void setSessionUser(User user) {
        Subject subject = SecurityUtils.getSubject();
        if(subject.isAuthenticated()) {
            Session session = subject.getSession();
            session.setAttribute("user", user);
            session.setAttribute("email", user.getEmail());
            session.setAttribute("firstName", user.getFirstName());
            session.setAttribute("lastName", user.getLastName());
            session.setAttribute("wormName", user.getWormName());
            session.setAttribute("wormColor", user.getWormColor());

        }
    }
}