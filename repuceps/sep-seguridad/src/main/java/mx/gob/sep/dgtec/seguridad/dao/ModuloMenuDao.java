package mx.gob.sep.dgtec.seguridad.dao;

import java.util.List;

import mx.gob.sep.dgtec.seguridad.modelo.ModuloMenu;

/**
 * Servicios de acceso a datos para la entidad de modelo {@link ModuloMenu}
 * 
 */
public interface ModuloMenuDao {

	/**
	 * Devuelve todas las entidades {@link ModuloMenu} que existan en la fuente de datos.
	 * 
	 * @return List<ModuloMenu>
	 */
	List<ModuloMenu> consultarTodos();
	
	/**
	 * Obtiene un único {@link ModuloMenu} dado su id.
	 * 
	 * @param id el identificador único de la entidad {@link ModuloMenu}
	 * @return Un único objeto tipo {@link ModuloMenu}
	 */
	ModuloMenu consultarModulo(Long id);
}
