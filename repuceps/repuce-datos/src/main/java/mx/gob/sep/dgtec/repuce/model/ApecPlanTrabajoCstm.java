package mx.gob.sep.dgtec.repuce.model;



public class ApecPlanTrabajoCstm extends ApecPlanTrabajo{
	
	private String tipoAccion;
	/*private String descripR1;
	private String descripR2;
	private String descripR3;*/
		
	private String respuestaR2;
	private String respuestaR3;
	private CAccion accion;
	
	
	public CAccion getAccion() {
		return accion;
	}
	public void setAccion(CAccion accion) {
		this.accion = accion;
	}
	/*
	public String getDescripR1() {
		return descripR1;
	}
	public void setDescripR1(String descripR1) {
		this.descripR1 = descripR1;
	}
	public String getDescripR2() {
		return descripR2;
	}
	public void setDescripR2(String descripR2) {
		this.descripR2 = descripR2;
	}
	public String getDescripR3() {
		return descripR3;
	}
	public void setDescripR3(String descripR3) {
		this.descripR3 = descripR3;
	}*/
	public String getRespuestaR2() {
		return respuestaR2;
	}
	public void setRespuestaR2(String respuestaR2) {
		this.respuestaR2 = respuestaR2;
	}
	public String getRespuestaR3() {
		return respuestaR3;
	}
	public void setRespuestaR3(String respuestaR3) {
		this.respuestaR3 = respuestaR3;
	}
	public String getTipoAccion() {
		return tipoAccion;
	}
	public void setTipoAccion(String tipoAccion) {
		this.tipoAccion = tipoAccion;
	}
	
}
