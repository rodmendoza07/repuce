package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;
import java.util.List;


public class CeProgramaSeguimientoC1415Cstm extends CeProgramaC1415Cstm{
	       
	private Integer idDetalle; 
	private Short idObjetivo; 
	private String seguimiento;
	private String avance;
	private String objetivo; 
	private String meta;
	private BigDecimal monto2Sesion;
	private String montoStr2Sesion;
	private Integer cambioMonto;
	
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
	public String getSeguimiento() {
		return seguimiento;
	}
	public void setSeguimiento(String seguimiento) {
		this.seguimiento = seguimiento;
	}	
	public String getAvance() {
		return avance;
	}
	public void setAvance(String avance) {
		this.avance = avance;
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
	public BigDecimal getMonto2Sesion() {
		return monto2Sesion;
	}
	public void setMonto2Sesion(BigDecimal monto2Sesion) {
		this.monto2Sesion = monto2Sesion;
	}
	public String getMontoStr2Sesion() {
		return montoStr2Sesion;
	}
	public void setMontoStr2Sesion(String montoStr2Sesion) {
		this.montoStr2Sesion = montoStr2Sesion;
	}
	public Integer getCambioMonto() {
		return cambioMonto;
	}
	public void setCambioMonto(Integer cambioMonto) {
		this.cambioMonto = cambioMonto;
	}	

    	
}