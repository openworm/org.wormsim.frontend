package org.wormsim.frontend.models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class LandingPageEmail {
	
	@NotNull
	@Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
	        +"[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"
	        +"(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
	             message="Invalid email")
    public String email;

}
