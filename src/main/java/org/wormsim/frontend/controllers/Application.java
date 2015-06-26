package org.wormsim.frontend.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.osgi.framework.BundleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.wormsim.frontend.models.User;
import org.wormsim.frontend.stormpath.ClientFactory;
import org.wormsim.frontend.stormpath.UserFactory;
import org.wormsim.frontend.validators.SimpleEmailValidator;

@Controller
public class Application {

	@Autowired
	BundleContext bundleContext;

	public Application() {
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home() {

		User user = UserFactory.current();
		if (user != null && (user.getWormName() == null || user.getWormName().isEmpty())) {
			return new ModelAndView("redirect:/wormInfo", getUserMap());
		} else if (user != null) {
			return new ModelAndView("userhome", getUserMap());
		} else {
			return new ModelAndView("home", getUserMap());
		}

	}

	@RequestMapping(value = "/wormInfo", method = RequestMethod.GET)
	public ModelAndView setWormInfo() {
		return new ModelAndView("setWormInfo", getUserMap());
	}

	@RequestMapping(value = "/setWormInfo", method = RequestMethod.POST)
	public void ajaxSetWormInfo(HttpServletRequest req, HttpServletResponse res) {
		boolean callSucceeded = true;
		try {
			User currentUser = UserFactory.current();

			String name = req.getParameter("name"), color = req
					.getParameter("color");
			if (name != null && !name.isEmpty()) {
				currentUser.setWormName(name);
			}
			if (color != null && !color.isEmpty()) {
				currentUser.setWormColor(color);
			}

			currentUser.save();
			UserFactory.setSessionUser(currentUser);
		} catch (Exception e) {
			callSucceeded = false;
		}
		try {
			res.getWriter().print(!callSucceeded ? "success" : "fail");
			res.getWriter().flush();
		} catch (Exception ex) {

		}
	}

	@RequestMapping(value = "/ajaxSetLandingPageEmail", method = RequestMethod.POST)
	public void ajaxSetLandingPageEmail(HttpServletRequest req, HttpServletResponse res) {

		boolean emailValid = false;
		String displayMsg = "Success: You are signed up!";

		// get email from request
		String email = req.getParameter("email");

		// validate
		emailValid = SimpleEmailValidator.isValidEmailAddress(email);

		if(emailValid)
		{
			try
			{
				ClientFactory.getInstance().createLandingPageAccount(email);
			}
			catch (Exception e)
			{
				displayMsg = "Error: Email may be in use.";
			}
		}
		else
		{
			displayMsg = "Error: Invalid email!";
		}

		try {
			res.getWriter().print((displayMsg));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/ajaxSetTutorialFinished", method = RequestMethod.POST)
	public void ajaxSetTutorialFinished(HttpServletRequest req,
			HttpServletResponse res) {
		String tutorialLoaded = ( req.getParameter("tutorialLoaded") );
		System.out.println(tutorialLoaded);
		User user = UserFactory.current();
		user.tutorialLoaded = (tutorialLoaded);
		user.save();
		try {
			res.getWriter().print("ok");
			res.getWriter().flush();
		} catch (Exception ex) {

		}
	}

	@RequestMapping(value = "/ajaxGetTutorialFinished", method = RequestMethod.POST)
	public void ajaxGetTutorialFinished(HttpServletRequest req, HttpServletResponse res) {
		try {
			res.getWriter().print(UserFactory.current().tutorialLoaded);
			res.getWriter().flush();
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
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
