package mx.gob.sep.dgtec.repuce.vo;

import java.math.BigDecimal;

public class RecursosFuentesEventosCategoriasVO {

	private String fuente;
    private BigDecimal recabado;
    private String recabadoLetra;
    private BigDecimal ejercido;
    private String ejercidoLetra;
    
	public String getFuente() {
		return fuente;
	}
	public void setFuente(String fuente) {
		this.fuente = fuente;
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
