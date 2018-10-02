package mx.gob.sep.dgtec.seguridad.servicios;

import java.util.List;

import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;

import org.springframework.security.access.prepost.PostFilter;

public interface UsuarioSeguridadServicio {

	/**
	 * Trabaja con la información del UsuarioSeguridad.
	 * 
	 * Este filtrado se hace por medio de la anotación {@link PostFilter} de
	 * Spring Security.
	 * 
	 * @return List<ModuloMenu> Lista de módulos 
	 */
	@PostFilter("hasPermission(filterObject, 'read')")
	List<UsuarioSeguridad> consultarTodos();
	
	UsuarioSeguridad consultar(Long id);
	
	Integer guardar(UsuarioSeguridad usuario);
	
	Integer actualizar(UsuarioSeguridad usuario);
	
	Integer contar();
	
    String generateRandomPassword();
    
    UsuarioSeguridad consultarUserName(String userName);

}
