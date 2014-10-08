package org.wormsim.frontend.controllers;

import com.stormpath.sdk.resource.ResourceException;
import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.wormsim.frontend.models.PasswordForm;
import org.wormsim.frontend.models.User;
import org.wormsim.frontend.stormpath.ClientFactory;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ResetPassword {

    @Autowired
    BundleContext bundleContext;

    ResetPassword() {}

    @RequestMapping(value="/user/reset", method= RequestMethod.GET)
    public ModelAndView triggerpasswordreset() {
        Map<String, Boolean> map = new HashMap<>();
        map.put("wasreset", false);
        return new ModelAndView("triggerreset",map);
    }

    @RequestMapping(value="/user/reset", method=RequestMethod.POST)
    public ModelAndView dotriggerpasswordreset(@ModelAttribute User user, BindingResult bindingResult) {

        Map<String, String> messageMap = new HashMap<>();

        if(bindingResult.hasErrors()) {
            messageMap.put("message", "Invalid value for email address");
            return new ModelAndView("triggerreset",messageMap);
        }

        try {
            ClientFactory.triggerPasswordReset(user.getEmail());
            Map<String, Boolean> map = new HashMap<>();
            map.put("wasreset", true);
            return new ModelAndView("triggerreset", map);
        } catch (ResourceException e) {
            messageMap.put("message", "Email not found");
            return new ModelAndView("triggerreset", messageMap);
        }
    }

    @RequestMapping(value="/user/doreset", method=RequestMethod.GET)
    public ModelAndView resetpassword() {
        return new ModelAndView("resetpassword");
    }

    @RequestMapping(value="/user/doreset", method=RequestMethod.POST)
    @ResponseBody
    public ModelAndView doresetpassword(@Valid @ModelAttribute PasswordForm passwordForm, @RequestParam("sptoken") String sptoken, BindingResult bindingResult) {

        Map<String, String> messageMap = new HashMap<>();

        if(passwordForm.getPassword() == null || passwordForm.getPassword().length() < 8) {
            messageMap.put("error", "Password must be at least 8 characters");
            return new ModelAndView("resetpasswordResult", messageMap);
        } else if(passwordForm.getPassword().length() > 30) {
            messageMap.put("error", "Password must be at less than 30 characters");
            return new ModelAndView("resetpasswordResult", messageMap);
        } else if(!passwordForm.passwordsMatch()) {
            messageMap.put("error", "Password fields do not match");
            return new ModelAndView("resetpasswordResult", messageMap);
        }

        //TODO: Figure out how to properly use binding result in the templates
        //if(bindingResult.hasErrors()) {
        //  return new ModelAndView("resetpasswordResult");
        //}

        try {
            ClientFactory.resetPassword(sptoken, passwordForm.getPassword());
        } catch (Exception e) {
            messageMap.put("error", e.getMessage());
            return new ModelAndView("resetpasswordResult", messageMap);
        }

        return new ModelAndView("redirect:/");
    }
}