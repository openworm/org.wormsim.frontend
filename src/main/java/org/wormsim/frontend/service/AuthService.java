package org.wormsim.frontend.service;

import org.geppetto.core.auth.IAuthService;
import org.springframework.stereotype.Service;
import org.wormsim.frontend.stormpath.UserFactory;

@Service
public class AuthService implements IAuthService {

    public AuthService() {}

    @Override
    public Boolean isAuthenticated() {
        return UserFactory.current() != null;
    }

    @Override
    public String authFailureRedirect() {
        return "/org.wormsim.frontend";
    }
}
