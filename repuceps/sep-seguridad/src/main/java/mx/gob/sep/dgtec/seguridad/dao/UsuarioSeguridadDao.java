package mx.gob.sep.dgtec.seguridad.dao;

import java.util.List;

import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;

public interface UsuarioSeguridadDao {
	
	List<UsuarioSeguridad> consultarTodos();
	
	UsuarioSeguridad consultar(Long id);
	
	Integer guardar(UsuarioSeguridad usuario);
	
	Integer actualizar(UsuarioSeguridad usuario);
	
	Integer contar();
	
	UsuarioSeguridad consultarUserName(String userName);

}
