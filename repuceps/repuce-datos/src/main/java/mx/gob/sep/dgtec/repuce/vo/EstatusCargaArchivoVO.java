package mx.gob.sep.dgtec.repuce.vo;


public class EstatusCargaArchivoVO {

	/**
	 * Nombre del archivo a subir
	 */
	private String nomArchivo;
	
	/**
	 * Estatus de respuesta de la carga del archivo
	 */
	private String nomRespuesta;

	public EstatusCargaArchivoVO(String nomArchivo, String nomRespuesta) {
		super();
		this.nomArchivo = nomArchivo;
		this.nomRespuesta = nomRespuesta;
	}
	
	public String getNomArchivo() {
		return nomArchivo;
	}

	public void setNomArchivo(String nomArchivo) {
		this.nomArchivo = nomArchivo;
	}

	public String getNomRespuesta() {
		return nomRespuesta;
	}

	public void setNomRespuesta(String nomRespuesta) {
		this.nomRespuesta = nomRespuesta;
	}

	@Override
	public String toString() {
		return "EstatusCargaArchivoVO [nomArchivo=" + nomArchivo
				+ ", nomRespuesta=" + nomRespuesta + "]";
	}

}