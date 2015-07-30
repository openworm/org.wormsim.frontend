package org.wormsim.frontend.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.geppetto.core.auth.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.wormsim.frontend.models.User;
import org.wormsim.frontend.stormpath.ClientFactory;
import org.wormsim.frontend.stormpath.UserManager;
import org.wormsim.frontend.validators.SimpleEmailValidator;

@Controller
public class Application
{

	@Autowired
	IAuthService authService;


	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home(HttpServletRequest response, HttpServletRequest req)
	{
		User user = (User) authService.getUser();
		if(user != null)
		{
			boolean auth = false;
			for(Cookie c : req.getCookies())
			{
				if(c.getName().equals(authService.getSessionId()))
				{
					auth = authService.isAuthenticated(c.getValue()) && c.getValue().equals(user.getName());
					break;
				}
			}
			if(auth)
			{
				if(user.getWormName() == null || user.getWormName().isEmpty())
				{
					return new ModelAndView("redirect:/wormInfo", getUserMap());
				}
				else
				{
					return new ModelAndView("userhome", getUserMap());
				}
			}
		}

		return new ModelAndView("home", getUserMap());
	}

	@RequestMapping(value = "/wormInfo", method = RequestMethod.GET)
	public ModelAndView setWormInfo()
	{
		return new ModelAndView("setWormInfo", getUserMap());
	}

	@RequestMapping(value = "/setWormInfo", method = RequestMethod.POST)
	public void ajaxSetWormInfo(HttpServletRequest req, HttpServletResponse res)
	{
		boolean callSucceeded = true;
		try
		{
			User currentUser = (User) authService.getUser();

			String name = req.getParameter("name"), color = req.getParameter("color");
			if(name != null && !name.isEmpty())
			{
				currentUser.setWormName(name);
			}
			if(color != null && !color.isEmpty())
			{
				currentUser.setWormColor(color);
			}

			currentUser.save();
			setColorCookie(req,res,currentUser.getWormColor());
		}
		catch(Exception e)
		{
			callSucceeded = false;
		}
		try
		{
			res.getWriter().print(!callSucceeded ? "success" : "fail");
			res.getWriter().flush();
		}
		catch(Exception ex)
		{

		}
	}

	@RequestMapping(value = "/ajaxSetLandingPageEmail", method = RequestMethod.POST)
	public void ajaxSetLandingPageEmail(HttpServletRequest req, HttpServletResponse res)
	{

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
			catch(Exception e)
			{
				displayMsg = "Error: Email may be in use.";
			}
		}
		else
		{
			displayMsg = "Error: Invalid email!";
		}

		try
		{
			res.getWriter().print((displayMsg));
		}
		catch(IOException e)
		{
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/ajaxSetTutorialFinished", method = RequestMethod.POST)
	public void ajaxSetTutorialFinished(HttpServletRequest req, HttpServletResponse res)
	{
		String tutorialLoaded = (req.getParameter("tutorialLoaded"));
		User user = (User) authService.getUser();
		user.tutorialLoaded = (tutorialLoaded);
		user.save();
		setColorCookie(req,res,user.getWormColor());
		try
		{
			res.getWriter().print("ok");
			res.getWriter().flush();
		}
		catch(Exception ex)
		{

		}
	}

	@RequestMapping(value = "/ajaxGetTutorialFinished", method = RequestMethod.POST)
	public void ajaxGetTutorialFinished(HttpServletRequest req, HttpServletResponse res)
	{
		try
		{
			User user = (User) authService.getUser();
			res.getWriter().print(user.tutorialLoaded);
			res.getWriter().flush();
		}
		catch(Exception ex)
		{
			System.out.println(ex.getMessage());
		}
	}

	private Map<String, User> getUserMap()
	{
		Map<String, User> modelMap = new HashMap<>();
		modelMap.put("user", (User) authService.getUser());
		return modelMap;
	}
	
	/**
	 * @param response
	 */
	private void setColorCookie(HttpServletRequest request, HttpServletResponse response, String color)
	{
		for(Cookie c : request.getCookies())
		{
			if(c.getName().equals("WSCC"))
			{
				c.setValue(color);
				return;
			}
		}
		response.addCookie(new Cookie("WSCC", color));
	}

}
