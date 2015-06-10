package org.wormsim.frontend.validators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SimpleEmailValidator {
    public static boolean isValidEmailAddress(String email) 
    {
        String ePattern = "^.+@.+\\..+$";
        Pattern p = Pattern.compile(ePattern);
        Matcher m = p.matcher(email);
        return m.matches();
    }
}
