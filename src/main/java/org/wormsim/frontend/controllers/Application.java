package org.wormsim.frontend.controllers;

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

import javax.servlet.http.HttpServletResponse;
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

        User user = UserFactory.current();
        if(user != null && (user.getWormName() == null || user.getWormName().isEmpty())) {
            return new ModelAndView("redirect:/wormInfo");
        } else if(user != null) {
            return new ModelAndView("userhome", getUserMap());
        } else {
            return new ModelAndView("home", getUserMap());
        }

    }

    @RequestMapping(value = "/wormInfo", method = RequestMethod.GET)
    public ModelAndView setWormInfo() {
        return new ModelAndView("setWormInfo", getUserMap());
    }

    @RequestMapping(value = "/wormInfo", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView doSetWormInfo(@ModelAttribute WormInfo wormInfo, BindingResult bindingResult) {
        User currentUser = UserFactory.current();
        currentUser.setWormName(wormInfo.getWormName());
        currentUser.setWormColor(wormInfo.getWormColor());
        currentUser.save();
        UserFactory.setSessionUser(currentUser);

        //TODO: redirect to org.geppetto.frontend if worminfo is set successfully (use bundleContext)
        return new ModelAndView("redirect:/");
    }

    @RequestMapping(value = "/simulator", method = RequestMethod.GET)
    public void simulator(HttpServletResponse response) {
        response.setStatus(302);
        response.setHeader("Location", "/org.geppetto.frontend");
    }

    private Map<String, User> getUserMap() {
        Map<String, User> modelMap = new HashMap<>();
        modelMap.put("user", UserFactory.current());
        return modelMap;
    }

}