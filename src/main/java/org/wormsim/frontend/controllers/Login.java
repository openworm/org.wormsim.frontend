package org.wormsim.frontend.controllers;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.wormsim.frontend.models.User;

import org.wormsim.frontend.stormpath.UserFactory;

import java.util.HashMap;
import java.util.Map;


@Controller
public class Login {

    @Autowired
    BundleContext bundleContext;

    public Login() {
    }

    @RequestMapping(value="/logout", method=RequestMethod.GET)
    public String logout() {
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.logout();
        return "home";
    }

    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String login(ModelMap model) {
        return "login";
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    @ResponseBody
    public ModelAndView dologin(@ModelAttribute User user, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            Map<String, BindingResult> modelMap = new HashMap<>();
            modelMap.put("result", bindingResult);
            ModelAndView model = new ModelAndView("loginresult", modelMap);
            return model;
        }

        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken token =
                new UsernamePasswordToken( user.getEmail(), user.getPassword() );

        try {
            currentUser.login(token);
        } catch(Exception e) {
            Map<String, User> modelMap = new HashMap<>();
            modelMap.put("user",user);

            return new ModelAndView("loginresult", modelMap);
        }

        Map<String, Subject> modelMap = new HashMap<>();
        modelMap.put("subject", currentUser);
        return new ModelAndView("home", modelMap);
    }

    @RequestMapping(value="/signup", method=RequestMethod.GET)
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
            return new ModelAndView("home");
        }catch (Exception e) {
            ModelAndView model = new ModelAndView("signupresult","message",e.getMessage());
            return model;
        }

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