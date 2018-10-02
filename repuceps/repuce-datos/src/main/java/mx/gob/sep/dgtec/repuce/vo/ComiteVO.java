package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

public class ComiteVO {

	private Short cscIntegrante;
	private Boolean esMiembroCE;
	private String paternoIntegrante;
	private String maternoIntegrante;
	private String nombreIntegrante;
	private String nomCargo;
	private String nomCalidad;
	private String nomComites;
	private List<Integer> comites;
	
	
	public Short getCscIntegrante() {
		return cscIntegrante;
	}
	public void setCscIntegrante(Short cscIntegrante) {
		this.cscIntegrante = cscIntegrante;
	}
	public Boolean getEsMiembroCE() {
		return esMiembroCE;
	}
	public void setEsMiembroCE(Boolean esMiembroCE) {
		this.esMiembroCE = esMiembroCE;
	}
	public String getPaternoIntegrante() {
		return paternoIntegrante;
	}
	public void setPaternoIntegrante(String paternoIntegrante) {
		this.paternoIntegrante = paternoIntegrante;
	}
	public String getMaternoIntegrante() {
		return maternoIntegrante;
	}
	public void setMaternoIntegrante(String maternoIntegrante) {
		this.maternoIntegrante = maternoIntegrante;
	}
	public String getNombreIntegrante() {
		return nombreIntegrante;
	}
	public void setNombreIntegrante(String nombreIntegrante) {
		this.nombreIntegrante = nombreIntegrante;
	}
	public String getNomCargo() {
		return nomCargo;
	}
	public void setNomCargo(String nomCargo) {
		this.nomCargo = nomCargo;
	}
	public String getcCalidad() {
		return nomCalidad;
	}
	public void setcCalidad(String nomCalidad) {
		this.nomCalidad = nomCalidad;
	}
	public List<Integer> getComites() {
		return comites;
	}
	public void setComites(List<Integer> comites) {
		this.comites = comites;
	}
	public String getNomComites() {
		return nomComites;
	}
	public void setNomComites(String nomComites) {
		this.nomComites = nomComites;
	}

	
}
