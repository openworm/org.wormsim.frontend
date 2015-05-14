package org.wormsim.frontend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Test {

	@RequestMapping(value="/test", method=RequestMethod.GET)
	@ResponseBody
    public ModelAndView login() {
		return new ModelAndView("test");
    }
	
}
