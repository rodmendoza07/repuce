package test.mx.gob.sep.dgtec.repuce.controllers;

/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.server.MockMvc;
import org.springframework.test.web.server.ResultMatcher;
import org.springframework.test.web.server.request.RequestPostProcessor;
import org.springframework.test.web.server.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/**
 * Basic example that includes Spring Security configuration.
 *
 * <p>Note that currently there are no {@link ResultMatcher}' built specifically
 * for asserting the Spring Security context. However, it's quite easy to put
 * them together as shown below and Spring Security extensions will become
 * available in the near future.
 *
 * <p>This also demonstrates a custom {@link RequestPostProcessor} which authenticates
 * a user to a particular {@link HttpServletRequest}.
 *
 * <p>Also see the Javadoc of {@link GenericWebContextLoader}, a class that
 * provides temporary support for loading WebApplicationContext by extending
 * the TestContext framework.
 *
 * @author Rob Winch
 * @author Rossen Stoyanchev
 * @see SecurityRequestPostProcessors
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
		loader=WebContextLoader.class,
		locations = {"file:src/main/webapp/WEB-INF/spring-config/application-context.xml",
				"file:src/main/webapp/WEB-INF/spring-config/web-context.xml"
		})
@ActiveProfiles("testing")

public class BaseControllerTests {

	protected static String SEC_CONTEXT_ATTR = HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

	@Autowired
	protected FilterChainProxy springSecurityFilterChain;

	@Autowired
	protected WebApplicationContext wac;

	protected MockMvc mockMvc;

	@Before
	public void setup() throws Exception{
		this.mockMvc = MockMvcBuilders.webApplicationContextSetup(this.wac)
				.addFilters(this.springSecurityFilterChain).build();
		mockMvc.perform(post("/j_spring_security_check")
				.param("j_username", "PI")
				.param("j_password", "pipo"));
	}

	@Test
	public void requiresAuthentication() throws Exception {
		mockMvc.perform(get("/mvc/primeraAsamblea/select/40"))
			.andExpect(redirectedUrl("http://localhost/login.jsp"));
	}

	@Test
	public void accessGranted() throws Exception {
		this.mockMvc.perform(get("/catalogos/cargos/1").with(userDeatilsService("PI")))
			.andExpect(status().isOk());
//			.andExpect(forwardedUrl("/WEB-INF/layouts/standardLayout.jsp"));
	}

	/*
	@Test
	public void accessDenied() throws Exception {
		this.mockMvc.perform(get("/mvc/catalogos/cargos/1").with(user("user").roles("DENIED")))
			.andExpect(status().isForbidden());
	}

	@Test
	public void userAuthenticates() throws Exception {
		final String username = "PI";
		mockMvc.perform(post("/j_spring_security_check").param("j_username", username).param("j_password", "pipo"))
			.andExpect(redirectedUrl("/"))
			.andExpect(new ResultMatcher() {
				public void match(MvcResult mvcResult) throws Exception {
					HttpSession session = mvcResult.getRequest().getSession();
					SecurityContext securityContext = (SecurityContext) session.getAttribute(SEC_CONTEXT_ATTR);
					Assert.assertEquals(securityContext.getAuthentication().getName(), username);
				}
			});
	}
	*/
	
	/*
	@Test
	public void userAuthenticateFails() throws Exception {
		final String username = "PI";
		mockMvc.perform(post("/j_spring_security_check").param("j_username", username).param("j_password", "invalid"))
			.andExpect(redirectedUrl("/login.jsp"))
			.andExpect(new ResultMatcher() {
				public void match(MvcResult mvcResult) throws Exception {
					HttpSession session = mvcResult.getRequest().getSession();
					SecurityContext securityContext = (SecurityContext) session.getAttribute(SEC_CONTEXT_ATTR);
					Assert.assertNull(securityContext);
				}
			});
	}
	 */
}