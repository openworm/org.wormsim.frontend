package org.wormsim.frontend.models;

import com.stormpath.sdk.account.Account;

public class User {

    private String email;
    private String password;
    private String firstName;
    private String lastName;

    private Account account;

    public User() {}

    public User(Account account) {
        this.account = account;
        this.email = account.getEmail();
        this.firstName = account.getGivenName();
        this.lastName = account.getSurname();
    }

    public void save() {
        account.setEmail(this.email);
        account.setGivenName(this.firstName);
        account.setSurname(this.lastName);
        account.save();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
