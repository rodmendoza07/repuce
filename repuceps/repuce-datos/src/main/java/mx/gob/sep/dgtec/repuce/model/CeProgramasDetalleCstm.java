package mx.gob.sep.dgtec.repuce.model;

public class CeProgramasDetalleCstm {
	
    private Integer idDetalle;
    private Short idObjetivo;
    private String objetivo;
    private String meta;
    private String avance;
    private String seguimiento;
    
	public Integer getIdDetalle() {
		return idDetalle;
	}
	public void setIdDetalle(Integer idDetalle) {
		this.idDetalle = idDetalle;
	}
	public Short getIdObjetivo() {
		return idObjetivo;
	}
	public void setIdObjetivo(Short idObjetivo) {
		this.idObjetivo = idObjetivo;
	}
	public String getObjetivo() {
		return objetivo;
	}
	public void setObjetivo(String objetivo) {
		this.objetivo = objetivo;
	}
	public String getMeta() {
		return meta;
	}
	public void setMeta(String meta) {
		this.meta = meta;
	}
	public String getAvance() {
		return avance;
	}
	public void setAvance(String avance) {
		this.avance = avance;
	}
	public String getSeguimiento() {
		return seguimiento;
	}
	public void setSeguimiento(String seguimiento) {
		this.seguimiento = seguimiento;
	}	
    
}