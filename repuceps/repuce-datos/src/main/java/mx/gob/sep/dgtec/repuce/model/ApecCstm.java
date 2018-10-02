package mx.gob.sep.dgtec.repuce.model;

public class ApecCstm extends Apec{
	
	private String nomEntidadfed;
	
	private String nomMunicipio;
	
	private String nomLocalidad;
	
	private Boolean indAulaCompartida;

	public String getNomEntidadFed() {
		return nomEntidadfed;
	}

	public void setNomEntidadFed(String nomEntidadfed) {
		this.nomEntidadfed = nomEntidadfed;
	}

	public String getNomMunicipio() {
		return nomMunicipio;
	}

	public void setNomMunicipio(String nomMunicipio) {
		this.nomMunicipio = nomMunicipio;
	}

	public String getNomLocalidad() {
		return nomLocalidad;
	}

	public Boolean getIndAulaCompartida() {
		return indAulaCompartida;
	}

	public void setIndAulaCompartida(Boolean indAulaCompartida) {
		this.indAulaCompartida = indAulaCompartida;
	}

	public void setNomLocalidad(String nomLocalidad) {
		this.nomLocalidad = nomLocalidad;
	}
	
	
}