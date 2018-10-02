package mx.gob.sep.dgtec.repuce.servicios;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ConsejoMunCstm;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;

/**
 * Servicio para llevar a cabo la administración de las actas municipales 
 * @author Ismael Rosas Sandoval
 *
 */
public interface ActasMunicipalesService {

	/**
	 * Intenta escribir un archivo al directorio relacionado al parámetro pathId. Si este directorio no
	 * se encuentra o no se tienen permisos de escritura el método lanza una excepción.
	 * 
	 * Si el archivo existe será sustituido.
	 * 
	 * @param nombreArchivo Nombre con que será guardado el archivo.
	 * @param archivo Contenido en bytes del archivo.
	 * @throws ErrorInfraestructura
	 */
	void insertActaMunicipal(String userName, String nombreArchivo, byte[] archivo) 
			throws Exception;
	
	/**
	 * Obtiene la lista de las actas municipales registradas
	 * 
	 * @return Lista de las actas municipales capturadas.
	 */
	List<ConsejoMunCstm> selectActasMunicipales(String userName);
	
	/**
	 * Elimina una acta seleccionada
	 * 
	 * @param El nombre del usuario que intenta la eliminación
	 * @param idEntidad el identificador de la entidad del acta a eliminar
	 * @param idMunicipio el identificador del municipio del acta a eliminar
	 * @return int -1 Sin éxito, 1 Con éxito
	 */
	int deleteActaMunicipal(String userName, Short idEntidad, Integer idMunicipio);
	
}
