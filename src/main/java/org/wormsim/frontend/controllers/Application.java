package org.wormsim.frontend.controllers;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class Application {

    @Autowired
    BundleContext bundleContext;

    public Application() {}

    @RequestMapping(value="/", method=RequestMethod.GET)
    public ModelAndView home() {
        Map<String, Subject> modelMap = new HashMap<>();
        modelMap.put("subject", SecurityUtils.getSubject());
        return new ModelAndView("home", modelMap);
    }

    @RequestMapping(value="/create", method=RequestMethod.GET)
    public String create() {
        return "createworm";
    }

}