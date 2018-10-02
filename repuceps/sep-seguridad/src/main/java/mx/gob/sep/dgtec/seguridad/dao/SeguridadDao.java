package mx.gob.sep.dgtec.seguridad.dao;

import java.util.List;

import mx.gob.sep.dgtec.seguridad.modelo.RolSeguridad;
import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;

/**
 * Servicios de acceso a datos para roles y usuario de seguridad.
 * 
 * @author Yomerito
 *
 */
public interface SeguridadDao {

	List<UsuarioSeguridad> consultarUsarios();
	
	List<RolSeguridad> consultarRoles();
	
	UsuarioSeguridad consultarUsuarioConRoles(String username);
}
