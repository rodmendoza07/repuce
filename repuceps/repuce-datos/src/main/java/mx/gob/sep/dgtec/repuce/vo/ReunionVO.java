package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;
import mx.gob.sep.dgtec.repuce.model.CeAsistenteCstm;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.model.UbicacionCct;


public class ReunionVO {

	private CCct cCct;
	private UbicacionCct ubicacionCct; 
	private CeInfGral ceInfGral;
	private CeSesion ceSesion;
	private CCctViewVO cctViewVO;
	private List<String> nomConsejeros;
	private List<CeAsistenteCstm> asistentes;
	

	private List<CeActSesionCstm> actividades;
	
	public ReunionVO(){
		
	}
	
	public CeInfGral getCeInfGral() {
		return ceInfGral;
	}


	public void setCeInfGral(CeInfGral ceInfGral) {
		this.ceInfGral = ceInfGral;
	}


	public CeSesion getCeSesion() {
		return ceSesion;
	}


	public void setCeSesion(CeSesion ceSesion) {
		this.ceSesion = ceSesion;
	}


	public List<CeActSesionCstm> getActividades() {
		return actividades;
	}


	public void setActividades(List<CeActSesionCstm> actividades) {
		this.actividades = actividades;
	}

	public CCct getCCct(){
		return cCct;
	}

	public void setCCct(CCct cCct) {
		this.cCct = cCct;
	}

	public CCct getcCct() {
		return cCct;
	}

	public void setcCct(CCct cCct) {
		this.cCct = cCct;
	}

	public UbicacionCct getUbicacionCct() {
		return ubicacionCct;
	}

	public void setUbicacionCct(UbicacionCct ubicacionCct) {
		this.ubicacionCct = ubicacionCct;
	}

	public CCctViewVO getCctViewVO() {
		return cctViewVO;
	}

	public void setCctViewVO(CCctViewVO cctViewVO) {
		this.cctViewVO = cctViewVO;
	}

	public List<String> getNomConsejeros() {
		return nomConsejeros;
	}

	public void setNomConsejeros(List<String> nomConsejeros) {
		this.nomConsejeros = nomConsejeros;
	}

	public List<CeAsistenteCstm> getAsistentes() {
		return asistentes;
	}

	public void setAsistentes(List<CeAsistenteCstm> asistentes) {
		this.asistentes = asistentes;
	}

	
}
