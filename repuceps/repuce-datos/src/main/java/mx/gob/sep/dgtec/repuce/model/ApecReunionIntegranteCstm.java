package mx.gob.sep.dgtec.repuce.model;

public class ApecReunionIntegranteCstm extends ApecReunionIntegrante {
	private ApecIntegrante integrante;
	private String nomCargo;
	private String nomNiveleduc;
	public ApecIntegrante getIntegrante() {
		return integrante;
	}
	public void setIntegrante(ApecIntegrante integrante) {
		this.integrante = integrante;
	}
	public String getNomCargo() {
		return nomCargo;
	}
	public void setNomCargo(String nomCargo) {
		this.nomCargo = nomCargo;
	}
	public String getNomNiveleduc() {
		return nomNiveleduc;
	}
	public void setNomNiveleduc(String nomNiveleduc) {
		this.nomNiveleduc = nomNiveleduc;
	}
	
	

}
