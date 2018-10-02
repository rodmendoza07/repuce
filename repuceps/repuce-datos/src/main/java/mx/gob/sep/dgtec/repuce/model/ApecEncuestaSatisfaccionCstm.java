package mx.gob.sep.dgtec.repuce.model;

import java.util.List;

public class ApecEncuestaSatisfaccionCstm extends ApecEncuestaSatisfaccion{
	private String nombreActividad;
	private String respuesta;
	private Integer tipoRespuesta;
	private List<CRespuesta> respuestas;
	
	
	public List<CRespuesta> getRespuestas() {
		return respuestas;
	}
	public void setRespuestas(List<CRespuesta> respuestas) {
		this.respuestas = respuestas;
	}
	public String getNombreActividad() {
		return nombreActividad;
	}
	public void setNombreActividad(String nombreActividad) {
		this.nombreActividad = nombreActividad;
	}
	public String getRespuesta() {
		return respuesta;
	}
	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}
	public Integer getTipoRespuesta() {
		return tipoRespuesta;
	}
	public void setTipoRespuesta(Integer tipoRespuesta) {
		this.tipoRespuesta = tipoRespuesta;
	}
	

	
}
