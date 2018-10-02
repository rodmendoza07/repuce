package test.mx.sep.seguridad.dao;

import java.util.List;

import mx.gob.sep.dgtec.seguridad.dao.SeguridadDao;
import mx.gob.sep.dgtec.seguridad.modelo.RolSeguridad;
import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.mx.sep.seguridad.SeguridadBaseTest;

public class SeguridadDaoTest extends SeguridadBaseTest {
	
	@Autowired
	private SeguridadDao seguridadDao;
	
	@Test
	public void dependenciaTest(){
		Assert.assertNotNull(seguridadDao);
	}
	
	@Test
	public void consultarUsariosTest(){
		List<UsuarioSeguridad> usuarios =
				seguridadDao.consultarUsarios();
		
		Assert.assertFalse(usuarios.isEmpty());
	}
	
	@Test
	public void consultarUsuarioConRolesTest(){
		UsuarioSeguridad usuario =
				seguridadDao.consultarUsuarioConRoles("brian");
		
		Assert.assertNotNull(usuario);
		Assert.assertFalse(usuario.getRoles().isEmpty());
		Assert.assertEquals(2 ,usuario.getRoles().size());
	}

	@Test
	public void consultarRolesAdminTest(){
		List<RolSeguridad> roles =
				seguridadDao.consultarRoles();
		RolSeguridad rolAdmin = new RolSeguridad("ROLE_ADMINISTRADOR",true);
		Assert.assertTrue(roles.contains(rolAdmin));
	}
	
}
