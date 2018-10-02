package mx.gob.sep.dgtec.repuce.vo;

import java.math.BigDecimal;

public class TotalesFuentesOProgramasVO {

	private BigDecimal totalrecabado;
	private BigDecimal totalejercido;
	private String totalrecabadoLetra;
	private String totalejercidoLetra;
	
	public BigDecimal getTotalrecabado() {
		return totalrecabado;
	}
	public void setTotalrecabado(BigDecimal totalrecabado) {
		this.totalrecabado = totalrecabado;
	}
	public BigDecimal getTotalejercido() {
		return totalejercido;
	}
	public void setTotalejercido(BigDecimal totalejercido) {
		this.totalejercido = totalejercido;
	}
	public String getTotalrecabadoLetra() {
		return totalrecabadoLetra;
	}
	public void setTotalrecabadoLetra(String totalrecabadoLetra) {
		this.totalrecabadoLetra = totalrecabadoLetra;
	}
	public String getTotalejercidoLetra() {
		return totalejercidoLetra;
	}
	public void setTotalejercidoLetra(String totalejercidoLetra) {
		this.totalejercidoLetra = totalejercidoLetra;
	}
	
}
