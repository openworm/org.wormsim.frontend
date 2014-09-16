package org.wormsim.frontend.controllers;

import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.wormsim.frontend.models.User;

@Controller
public class Login {

    @Autowired
    BundleContext bundleContext;

    public Login() {}

    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String login(ModelMap model) {
        return "login";
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public String dologin(@ModelAttribute User user, ModelMap model) {
        return "login";
    }


    @RequestMapping(value="/signup", method=RequestMethod.GET)
    public String signup(ModelMap model) {
        return "signup";
    }

    @RequestMapping(value="/signup", method=RequestMethod.POST)
    public String dosignup(@ModelAttribute User user, ModelMap model) {
        return "signup";
    }

    @RequestMapping(value="/reset", method=RequestMethod.GET)
    public String resetpassword(ModelMap model) {
        return "resetpassword";
    }

    @RequestMapping(value="/doreset", method=RequestMethod.POST)
    public String doresetpassword(ModelMap model) {
        return "resetpassword";
    }

}