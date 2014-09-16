package org.wormsim.frontend.controllers;

import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Application {

    @Autowired
    BundleContext bundleContext;

    public Application() {}

    @RequestMapping(value="/", method=RequestMethod.GET)
    public String home() {
        return "home";
    }
}