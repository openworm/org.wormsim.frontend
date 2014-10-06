package org.wormsim.frontend.controllers;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.wormsim.frontend.models.User;
import org.wormsim.frontend.models.WormInfo;
import org.wormsim.frontend.stormpath.UserFactory;

import java.util.HashMap;
import java.util.Map;

@Controller
public class Application {

    @Autowired
    BundleContext bundleContext;

    public Application() {
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView home() {
        Map<String, User> modelMap = new HashMap<>();
        modelMap.put("user", UserFactory.current());
        return new ModelAndView("home", modelMap);
    }

    @RequestMapping(value = "/wormInfo", method = RequestMethod.GET)
    @RequiresAuthentication
    public String setWormInfo() {
        return "setWormInfo";
    }

    @RequestMapping(value = "/wormInfo", method = RequestMethod.POST)
    @ResponseBody
    @RequiresAuthentication
    public ModelAndView doSetWormInfo(@ModelAttribute WormInfo wormInfo, BindingResult bindingResult) {
        User currentUser = UserFactory.current();
        currentUser.setWormName(wormInfo.getWormName());
        currentUser.setWormColor(wormInfo.getWormColor());
        currentUser.save();

        //TODO: redirect to org.geppetto.frontend if worminfo is set successfully (use bundleContext)
        return new ModelAndView("redirect:/");
    }


}