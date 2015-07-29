package org.wormsim.frontend.service;

import org.geppetto.core.auth.IAuthService;
import org.geppetto.core.data.model.IUser;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService {

    public static final String NOBODY = "_____";

	public AuthService() {}
      
    private IUser user=null;
    
    private static String cn="WSIDUS";

    @Override
    public String authFailureRedirect() {
    	// go back to root
        return "/../";
    }

	@Override
	public boolean isDefault() {
		return false;
	}
	
	/**
	 * @param user
	 */
	@Override
	public void setUser(IUser user)
	{
		this.user=user;
	}

	@Override
	public IUser getUser() {
		return this.user;
	}

	@Override
	public Boolean isAuthenticated(String sessionValue)
	{
		return !sessionValue.isEmpty() && !sessionValue.equals(NOBODY);
	}
	

	@Override
	public String getSessionId()
	{
		return cn;
	}
}
