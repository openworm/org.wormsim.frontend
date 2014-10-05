package org.wormsim.frontend.stormpath;

import org.wormsim.frontend.models.User;

public class UserFactory {

    public static User create(String email, String password, String firstName, String lastName) {
        return new User(ClientFactory.createAccount(email, password, firstName, lastName));
    }
}
