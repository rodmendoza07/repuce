package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;


public class CeProgramaC1415Cstm {
	   
    private Integer cCct;
	private Short cSesion;
    private Short idPrograma;
    private Short tipoPrograma;
    private String nomPrograma;
    private String nomOtroPrograma;
    private BigDecimal monto;
    private String montoStr;
    private BigDecimal recibido;
    private String recibidoStr;
    	    
    
	public Integer getcCct() {
		return cCct;
	}
	public void setcCct(Integer cCct) {
		this.cCct = cCct;
	}
	public Short getcSesion() {
		return cSesion;
	}
	public void setcSesion(Short cSesion) {
		this.cSesion = cSesion;
	}	
	public Short getIdPrograma() {
		return idPrograma;
	}
	public void setIdPrograma(Short idPrograma) {
		this.idPrograma = idPrograma;
	}	
	public Short getTipoPrograma() {
		return tipoPrograma;
	}
	public void setTipoPrograma(Short tipoPrograma) {
		this.tipoPrograma = tipoPrograma;
	}
	public String getNomPrograma() {
		return nomPrograma;
	}
	public void setNomPrograma(String nomPrograma) {
		this.nomPrograma = nomPrograma;
	}
	public BigDecimal getMonto() {
		return monto;
	}
	public void setMonto(BigDecimal monto) {
		this.monto = monto;
	}
	public String getMontoStr() {
		return montoStr;
	}
	public void setMontoStr(String montoStr) {
		this.montoStr = montoStr;
	}
	public String getNomOtroPrograma() {
		return nomOtroPrograma;
	}
	public void setNomOtroPrograma(String nomOtroPrograma) {
		this.nomOtroPrograma = nomOtroPrograma;
	}
	public BigDecimal getRecibido() {
		return recibido;
	}
	public void setRecibido(BigDecimal recibido) {
		this.recibido = recibido;
	}
	public String getRecibidoStr() {
		return recibidoStr;
	}
	public void setRecibidoStr(String recibidoStr) {
		this.recibidoStr = recibidoStr;
	}    	
    
}