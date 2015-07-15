package org.wormsim.frontend.stormpath;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.wormsim.frontend.models.User;

import com.stormpath.sdk.account.Account;
import com.stormpath.sdk.account.AccountList;
import com.stormpath.sdk.api.ApiKeys;
import com.stormpath.sdk.application.Application;
import com.stormpath.sdk.application.ApplicationList;
import com.stormpath.sdk.application.Applications;
import com.stormpath.sdk.client.Client;
import com.stormpath.sdk.client.Clients;
import com.stormpath.sdk.resource.ResourceException;

public class ClientFactory {
	
	@Autowired
	public UserManager userFactory;

	private static final String APP_NAME = "Wormsim";
	private static final String APIKEY_FILEPATH = System.getProperty("user.home") + "/.stormpath/apiKey.properties";
	private static final Client CLIENT;
	private static final Application APPLICATION;

	static {
		CLIENT = Clients.builder().setApiKey(ApiKeys.builder().setFileLocation(APIKEY_FILEPATH).build()).build();
		ApplicationList applications = CLIENT.getApplications(Applications.where(Applications.name().eqIgnoreCase(APP_NAME)));

		APPLICATION = applications.iterator().next();
	}

	private static ClientFactory _instance;

	private ClientFactory() {
	}

	public static ClientFactory getInstance() {
		if (_instance == null) {
			_instance = new ClientFactory();
		}
		return _instance;
	}

	public Account createAccount(String email, String password, String firstName, String lastName) {
		Account account = CLIENT.instantiate(Account.class);
		account.setGivenName(firstName);
		account.setSurname(lastName);
		account.setEmail(email);
		account.setPassword(password);
		account.getCustomData().put(User.TUTORIAL_LOADED, "false");
		return APPLICATION.createAccount(account);
	}

	public Account createLandingPageAccount(String email) {
		Application landingPageApp;
		ApplicationList applications = CLIENT.getApplications(Applications.where(Applications.name().eqIgnoreCase("LandingPage")));

		landingPageApp = applications.iterator().next();
		Account account = CLIENT.instantiate(Account.class);
		account.setGivenName("landingpage");
		account.setSurname("landingpage");
		account.setEmail(email);

		account.setPassword(getEncryptedPass());
		Account returnedAccount = landingPageApp.createAccount(account);

		return returnedAccount;
	}

	private String getEncryptedPass() {
		String encryptedString = "";
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
			String pass = "Paro" + Math.random();
			messageDigest.update(pass.getBytes());
			encryptedString = new String(messageDigest.digest());
		} catch (NoSuchAlgorithmException e) {
			
		}
		return encryptedString+"Parolamea12";
	}

	public Account getAccount(String email) throws AccountNotFoundException {
		Map<String, Object> queryParams = new HashMap<>();
		queryParams.put("email", email);
		AccountList accounts = APPLICATION.getAccounts(queryParams);

		if (accounts.iterator().hasNext()) {
			return accounts.iterator().next();
		} else {
			throw new AccountNotFoundException("Account not found for email " + email);
		}
	}

	public void triggerPasswordReset(String email) throws ResourceException {
		APPLICATION.sendPasswordResetEmail(email);
	}

	public void resetPassword(String token, String newPassword) {
		try {
			Account account = APPLICATION.resetPassword(token, newPassword);
			userFactory.login(account.getEmail(), newPassword);
		} catch (AccountNotFoundException e) {
			// ignore
		}
	}
}
