package org.wormsim.frontend.models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PasswordForm {

    @NotNull
    @Size(min=8,max=30)
    private String password;

    @NotNull
    @Size(min=8,max=30)
    private String confirmPassword;

    public PasswordForm() {}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Boolean passwordsMatch() {
        return password != null && confirmPassword != null && password.equals(confirmPassword);
    }
}
