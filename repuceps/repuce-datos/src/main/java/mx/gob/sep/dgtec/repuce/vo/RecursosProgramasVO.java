package mx.gob.sep.dgtec.repuce.vo;

import java.math.BigDecimal;

public class RecursosProgramasVO {
	
	private String categoriaPrograma;
	private Integer tipoPrograma;
	private String nomPrograma;
	private BigDecimal recabado;
	private String recabadoLetra;
    private BigDecimal ejercido;
    private String ejercidoLetra;
    
	public String getCategoriaPrograma() {
		return categoriaPrograma;
	}
	public void setCategoriaPrograma(String categoriaPrograma) {
		this.categoriaPrograma = categoriaPrograma;
	}
	
	public Integer getTipoPrograma() {
		return tipoPrograma;
	}
	public void setTipoPrograma(Integer tipoPrograma) {
		this.tipoPrograma = tipoPrograma;
	}
	public BigDecimal getRecabado() {
		return recabado;
	}
	public void setRecabado(BigDecimal recabado) {
		this.recabado = recabado;
	}
	public BigDecimal getEjercido() {
		return ejercido;
	}
	public void setEjercido(BigDecimal ejercido) {
		this.ejercido = ejercido;
	}
	public String getNomPrograma() {
		return nomPrograma;
	}
	public void setNomPrograma(String nomPrograma) {
		this.nomPrograma = nomPrograma;
	}
	public String getRecabadoLetra() {
		return recabadoLetra;
	}
	public void setRecabadoLetra(String recabadoLetra) {
		this.recabadoLetra = recabadoLetra;
	}
	public String getEjercidoLetra() {
		return ejercidoLetra;
	}
	public void setEjercidoLetra(String ejercidoLetra) {
		this.ejercidoLetra = ejercidoLetra;
	}

}
