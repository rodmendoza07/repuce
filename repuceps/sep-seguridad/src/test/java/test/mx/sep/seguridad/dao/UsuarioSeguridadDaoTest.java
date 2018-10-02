package test.mx.sep.seguridad.dao;

import mx.gob.sep.dgtec.seguridad.dao.UsuarioSeguridadDao;
import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioSeguridadDaoTest extends SeguridadDaoTest {
	
	@Autowired
	private UsuarioSeguridadDao usuarioSeguridadDao;
	
	@Test
	public void ejemploTest(){
		Assert.assertNotNull(usuarioSeguridadDao);
	}
	
	/*
	@Test
	public void guardarFormularioTest(){
		UsuarioSeguridad usuario = new UsuarioSeguridad();
		usuario.setUsername("irosass");
		usuario.setPassword("ismael");
		usuario.setNombre("Yo merito");
		usuario.setActivo(true);
		
		Integer id = usuarioSeguridadDao.guardar(usuario);
		
		System.out.print(id);
		Assert.assertEquals(new Integer(1), id);
		System.out.print(usuario);
		Assert.assertNotNull(usuario.getId());
	}*/
	
	@Test
	public void consultarFormularioByIdTest(){
		UsuarioSeguridad usuario = usuarioSeguridadDao.consultar(new Long(1));
		System.out.println(usuario);
		Assert.assertNotNull(usuario);
	}
	
	@Test
	public void contarTest(){
		Integer cuenta = usuarioSeguridadDao.contar();
		
		Assert.assertEquals(new Integer(3), cuenta);
	}
}
