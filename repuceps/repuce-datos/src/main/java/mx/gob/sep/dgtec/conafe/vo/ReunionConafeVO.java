package mx.gob.sep.dgtec.conafe.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorCstm;
import mx.gob.sep.dgtec.repuce.model.ApecIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPromotor;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;


public class ReunionConafeVO {
	
	private ApecCstm apec;
	
	private List<CCctLight> centrosConafe;

	private CLocalidadConafe localidad;
	
    private ApecReunion reunion;
    
    private List<ApecReunionInstructorCtsm> instructores;
  
    private List<ApecReunionIntegranteCstm>integrantes;
    
    // list se refiere a la tabla que se usara y promotores es el nombre que se debe utizar vblake
    
    private List<ApecPromotor>promotores;  
	
	public ApecCstm getApec() {
		return apec;
	}

	public void setApec(ApecCstm apec) {
		this.apec = apec;
	}
    
    public List<CCctLight> getCentrosConafe() {
		return centrosConafe;
	}

	public void setCentrosConafe(List<CCctLight> centrosConafe) {
		this.centrosConafe = centrosConafe;
	}

	public CLocalidadConafe getLocalidad() {
		return localidad;
	}

	public void setLocalidad(CLocalidadConafe localidad) {
		this.localidad = localidad;
	}

	public ApecReunion getReunion() {
		return reunion;
	}

	public void setReunion(ApecReunion reunion) {
		this.reunion = reunion;
	}

	

	public List<ApecReunionInstructorCtsm> getInstructores() {
		return instructores;
	}

	public void setInstructores(List<ApecReunionInstructorCtsm> instructores) {
		this.instructores = instructores;
	}

	public List<ApecReunionIntegranteCstm> getIntegrantes() {
		return integrantes;
	}

	public void setIntegrantes(List<ApecReunionIntegranteCstm> integrantes) {
		this.integrantes = integrantes;
	}

	public List<ApecPromotor> getPromotores() {
		return promotores;
	}

	public void setPromotores(List<ApecPromotor> promotores) {
		this.promotores = promotores;
	}

 


	
    
}
