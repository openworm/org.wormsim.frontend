package org.wormsim.frontend.stormpath;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.wormsim.frontend.models.User;

public class UserManager {

    public static User create(String email, String password, String firstName, String lastName) {
    	return new User(ClientFactory.getInstance().createAccount(email, password, firstName, lastName));
    }

    public static User login(String email, String password) throws AccountNotFoundException {
        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(email, password);
        token.setRememberMe(true);
        currentUser.login(token);
        User user = new User(ClientFactory.getInstance().getAccount(email));
        return user;
    }

    public static void logout() {
        SecurityUtils.getSubject().logout();
    }
}