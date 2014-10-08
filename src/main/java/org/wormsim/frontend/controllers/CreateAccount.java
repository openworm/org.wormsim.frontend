package org.wormsim.frontend.controllers;

import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.wormsim.frontend.models.User;
import org.wormsim.frontend.stormpath.UserFactory;

@Controller
public class CreateAccount {

    @Autowired
    BundleContext bundleContext;

    public CreateAccount() {}

    @RequestMapping(value="/signup", method= RequestMethod.GET)
    public String signup(ModelMap model) {
        return "signup";
    }

    @RequestMapping(value="/signup", method=RequestMethod.POST)
    public ModelAndView dosignup(@ModelAttribute User user, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            ModelAndView model = new ModelAndView("signupresult","result",bindingResult);
            return model;
        }

        try {
            UserFactory.create(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName());
            UserFactory.login(user.getEmail(), user.getPassword());
            return new ModelAndView("home");
        }catch (Exception e) {
            //TODO: handle signup failure
            ModelAndView model = new ModelAndView("signupresult","message",e.getMessage());
            return model;
        }

    }
}
