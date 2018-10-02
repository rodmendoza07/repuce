package mx.gob.sep.dgtec.repuce.model;

public class CeComiteCstm extends CeComite{

    private String nomComite;
    
	private String nomIntegrantes;
    
    private String proyAnualCom;

    private String clasificacionComite;
    

	public String getNomIntegrantes() {
		return nomIntegrantes;
	}

	public void setNomIntegrantes(String nomIntegrantes) {
		this.nomIntegrantes = nomIntegrantes;
	}

	public String getProyAnualCom() {
		return proyAnualCom;
	}

	public void setProyAnualCom(String proyAnualCom) {
		this.proyAnualCom = proyAnualCom;
	}

	public String getClasificacionComite() {
		return clasificacionComite;
	}

	public void setClasificacionComite(String clasificacionComite) {
		this.clasificacionComite = clasificacionComite;
	}

	public String getNomComite() {
		return nomComite;
	}

	public void setNomComite(String nomComite) {
		this.nomComite = nomComite;
	}

}