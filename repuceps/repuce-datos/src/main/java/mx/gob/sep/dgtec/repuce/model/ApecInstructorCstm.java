package mx.gob.sep.dgtec.repuce.model;

import java.util.List;

import mx.gob.sep.dgtec.repuce.vo.CCctLight;


public class ApecInstructorCstm extends ApecInstructor{
	
	private String nomNiveleduc;
	
	private List<CCctLight> ccts;

	public List<CCctLight> getCcts() {
		return ccts;
	}

	public void setCcts(List<CCctLight> ccts) {
		this.ccts = ccts;
	}

	public String getNomNiveleduc() {
		return nomNiveleduc;
	}

	public void setNomNiveleduc(String nomNiveleduc) {
		this.nomNiveleduc = nomNiveleduc;
	}
	
	
}