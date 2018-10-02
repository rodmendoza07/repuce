package mx.gob.sep.dgtec.repuce.vo;

import java.math.BigDecimal;



public class ProgramasFederalesVO {
	private Integer cCct;
	private Integer	cSesion;
	private Integer cPrograma;
	private Integer tipoPrograma;	
	private String programastr;
	private String nomOtroPrograma;
	private Integer montodecimal;
	//private BigDecimal montodecimal;
	private String montostr;
	private Integer recibidodecimal;
	private String recibidostr;
	private Integer iddetalle;
	private Integer idobjetivo;
	private String objetivo;
	private String meta;
	private String objetivoPrograma;
	private String avance;
	private String descripcionAvance; 
	private String seguimiento;
	
	public String getProgramastr() {
		return programastr;
	}
	public void setProgramastr(String programastr) {
		this.programastr = programastr;
	}
	
	public String getMontostr() {
		return montostr;
	}
	public void setMontostr(String montostr) {
		this.montostr = montostr;
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
	public Integer getIddetalle() {
		return iddetalle;
	}
	public void setIddetalle(Integer iddetalle) {
		this.iddetalle = iddetalle;
	}
	public Integer getIdobjetivo() {
		return idobjetivo;
	}
	public void setIdobjetivo(Integer idobjetivo) {
		this.idobjetivo = idobjetivo;
	}
	public Integer getcCct() {
		return cCct;
	}
	public void setcCct(Integer cCct) {
		this.cCct = cCct;
	}
	public Integer getcSesion() {
		return cSesion;
	}
	public void setcSesion(Integer cSesion) {
		this.cSesion = cSesion;
	}
	public Integer getcPrograma() {
		return cPrograma;
	}
	public void setcPrograma(Integer cPrograma) {
		this.cPrograma = cPrograma;
	}
	public Integer getTipoPrograma() {
		return tipoPrograma;
	}
	public void setTipoPrograma(Integer tipoPrograma) {
		this.tipoPrograma = tipoPrograma;
	}

	public String getObjetivoPrograma() {
		return objetivoPrograma;
	}
	public void setObjetivoPrograma(String objetivoPrograma) {
		this.objetivoPrograma = objetivoPrograma;
	}


	public String getNomOtroPrograma() {
		return nomOtroPrograma;
	}
	public void setNomOtroPrograma(String nomOtroPrograma) {
		this.nomOtroPrograma = nomOtroPrograma;
	}
	public String getAvance() {
		return avance;
	}
	public void setAvance(String avance) {
		this.avance = avance;
	}
	public String getDescripcionAvance() {
		return descripcionAvance;
	}
	public void setDescripcionAvance(String descripcionAvance) {
		this.descripcionAvance = descripcionAvance;
	}
	public String getSeguimiento() {
		return seguimiento;
	}
	public void setSeguimiento(String seguimiento) {
		this.seguimiento = seguimiento;
	}
	
	public String getRecibidostr() {
		return recibidostr;
	}
	public void setRecibidostr(String recibidostr) {
		this.recibidostr = recibidostr;
	}
	public Integer getRecibidodecimal() {
		return recibidodecimal;
	}
	public void setRecibidodecimal(Integer recibidodecimal) {
		this.recibidodecimal = recibidodecimal;
	}
	public Integer getMontodecimal() {
		return montodecimal;
	}
	public void setMontodecimal(Integer montodecimal) {
		this.montodecimal = montodecimal;
	}
			
}