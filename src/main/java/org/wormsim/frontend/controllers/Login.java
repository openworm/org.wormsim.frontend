package org.wormsim.frontend.controllers;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.subject.Subject;
import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
        return "redirect:/";
    }

    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    @ResponseBody
    public ModelAndView dologin(@Valid @ModelAttribute User user, BindingResult bindingResult, HttpServletResponse response) {

        Map<String, String> messageMap = new HashMap<>();

        if(bindingResult.hasErrors()) {
            return new ModelAndView("login");
        }

        //TODO: Better exception handling
        try {
            UserFactory.login(user.getEmail(), user.getPassword());
        } catch(AuthenticationException e) {
            response.setStatus(400);
            messageMap.put("error", "Invalid email or password");
            return new ModelAndView("login", messageMap);
        } catch(Exception e) {
            response.setStatus(400);
            messageMap.put("error", e.getMessage());
            return new ModelAndView("login", messageMap);
        }

        return new ModelAndView("redirect:/");
    }
}