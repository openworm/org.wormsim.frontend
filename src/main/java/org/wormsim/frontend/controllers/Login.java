package org.wormsim.frontend.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.subject.Subject;
import org.geppetto.core.auth.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.wormsim.frontend.models.User;
import org.wormsim.frontend.service.AuthService;
import org.wormsim.frontend.stormpath.UserManager;

@Controller
public class Login
{

	@Autowired
	IAuthService authService;

	public Login()
	{
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView logout(HttpServletRequest request, HttpServletResponse response)
	{
		Subject currentUser = SecurityUtils.getSubject();
		currentUser.logout();
		authService.setUser(null);
		removeSessionCookie(request, response);
		return new ModelAndView("redirect:/");
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView dologin(@Valid @ModelAttribute User user, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response)
	{
		Map<String, String> messageMap = new HashMap<>();

		if(bindingResult.hasErrors())
		{
			return new ModelAndView("login");
		}

		// TODO: Better exception handling
		try
		{
			authService.setUser(UserManager.login(user.getEmail(), user.getPassword()));
			setSessionCookie(request, response);
			Application.setColorCookie(request, response, ((User) authService.getUser()).getWormColor());
			Application.setWormNameCookie(request, response, ((User) authService.getUser()).getWormName());
		}
		catch(AuthenticationException e)
		{
			response.setStatus(400);
			messageMap.put("error", "Invalid email or password");
			authService.setUser(null);
			removeSessionCookie(request, response);
			return new ModelAndView("login", messageMap);
		}
		catch(Exception e)
		{
			response.setStatus(400);
			messageMap.put("error", e.getMessage());
			authService.setUser(null);
			removeSessionCookie(request, response);
			return new ModelAndView("login", messageMap);
		}

		return new ModelAndView("redirect:/");
	}

	/**
	 * @param response
	 */
	private void setSessionCookie(HttpServletRequest request, HttpServletResponse response)
	{
		for(Cookie c : request.getCookies())
		{
			if(c.getName().equals(authService.getSessionId()))
			{
				c.setValue(authService.getUser().getName());
				return;
			}
		}
		response.addCookie(new Cookie(authService.getSessionId(), authService.getUser().getName()));
	}

	/**
	 * @param request
	 */
	private void removeSessionCookie(HttpServletRequest request, HttpServletResponse response)
	{
		for(Cookie c : request.getCookies())
		{
			if(c.getName().equals(authService.getSessionId()))
			{
				c.setValue(AuthService.NOBODY);
				c.setMaxAge(0);
				response.addCookie(c);
			}
		}
	}
}