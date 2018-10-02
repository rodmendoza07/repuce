package mx.gob.sep.dgtec.repuce.vo;

public class CCctLight {
	
	private Integer cCct;
	private String cveCct;
	private String nomCct;
	private String cvePrograma;
	private String nomNivel;
	public Integer getcCct() {
		return cCct;
	}
	public void setcCct(Integer cCct) {
		this.cCct = cCct;
	}
	public String getCveCct() {
		return cveCct;
	}
	public void setCveCct(String cveCct) {
		this.cveCct = cveCct;
	}
	public String getNomCct() {
		return nomCct;
	}
	public void setNomCct(String nomCct) {
		this.nomCct = nomCct;
	}
	public String getCvePrograma() {
		return cvePrograma;
	}
	public void setCvePrograma(String cvePrograma) {
		this.cvePrograma = cvePrograma;
	}
	public String getNomNivel() {
		return nomNivel;
	}
	public void setNomNivel(String nomNivel) {
		this.nomNivel = nomNivel;
	}
	@Override
	public String toString() {
		return nomNivel;
	}
	
	
		
}