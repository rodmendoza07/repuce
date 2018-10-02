package mx.gob.sep.dgtec.conafe.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejas;
import mx.gob.sep.dgtec.repuce.model.ApecNumeroAlumnos;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentarios;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasCstm;


public class SegundaReunionVO extends ReunionConafeVO{

	
	private List<ApecApoyoCstm> apoyosFederales;
	private List<ApecApoyoCstm> apoyosEstatales;
	private List<ApecNecesidadesEducativasCstm> necesidadesEspeciales;	
	private List<ApecPlanTrabajoCstm> planTrabajo;
	private List<ApecApoyoCstm> apoyos;
	private List<ApecSeccionCstm> seccionesReunion;
	private List<ApecSeccionCstm> seccionesReunion2;
	private List<ApecBullyingCstm> bullying;
	private List<ApecBullyingCstm> acoso;
	private List<ApecOpinionesComentarios> opiniones;
	private List<ApecDenunciasQuejas> denuncias;
	private List<ApecNumeroAlumnos> numeroAlumnos;	
	private List<ApecReunionIntegranteCstm>integrantesR2;
	private List<ApecReunionInstructorCtsm>instructoresR2;
	
	
	public List<ApecBullyingCstm> getAcoso() {
		return acoso;
	}
	
	public void setAcoso(List<ApecBullyingCstm> acoso) {
		this.acoso = acoso;
	}
		
	public List<ApecApoyoCstm> getApoyos() {
		return apoyos;
	}
	public void setApoyos(List<ApecApoyoCstm> apoyos) {
		this.apoyos = apoyos;
	}
	
	public List<ApecReunionInstructorCtsm> getInstructoresR2() {
		return instructoresR2;
	}
	public void setInstructoresR2(List<ApecReunionInstructorCtsm> instructoresR2) {
		this.instructoresR2 = instructoresR2;
	}
	public List<ApecReunionIntegranteCstm> getIntegrantesR2() {
		return integrantesR2;
	}
	public void setIntegrantesR2(List<ApecReunionIntegranteCstm> integrantesR2) {
		this.integrantesR2 = integrantesR2;
	}
	public List<ApecApoyoCstm> getApoyosFederales() {
		return apoyosFederales;
	}
	public void setApoyosFederales(List<ApecApoyoCstm> apoyosFederales) {
		this.apoyosFederales = apoyosFederales;
	}
	public List<ApecApoyoCstm> getApoyosEstatales() {
		return apoyosEstatales;
	}
	public void setApoyosEstatales(List<ApecApoyoCstm> apoyosEstatales) {
		this.apoyosEstatales = apoyosEstatales;
	}
	
	public List<ApecPlanTrabajoCstm> getPlanTrabajo() {
		return planTrabajo;
	}
	public void setPlanTrabajo(List<ApecPlanTrabajoCstm> planTrabajo) {
		this.planTrabajo = planTrabajo;
	}
	public List<ApecSeccionCstm> getSeccionesReunion() {
		return seccionesReunion;
	}
	public void setSeccionesReunion(List<ApecSeccionCstm> seccionesReunion) {
		this.seccionesReunion = seccionesReunion;
	}	
	public List<ApecNecesidadesEducativasCstm> getNecesidadesEspeciales() {
		return necesidadesEspeciales;
	}
	public void setNecesidadesEspeciales(
			List<ApecNecesidadesEducativasCstm> necesidadesEspeciales) {
		this.necesidadesEspeciales = necesidadesEspeciales;
	}
	public List<ApecBullyingCstm> getBullying() {
		return bullying;
	}
	public void setBullying(List<ApecBullyingCstm> bullying) {
		this.bullying = bullying;
	}
	
	public List<ApecOpinionesComentarios> getOpiniones() {
		return opiniones;
	}

	public void setOpiniones(List<ApecOpinionesComentarios> opiniones) {
		this.opiniones = opiniones;
	}
	
	public List<ApecDenunciasQuejas> getDenuncias() {
		return denuncias;
	}

	public void setDenuncias(List<ApecDenunciasQuejas> denuncias) {
		this.denuncias = denuncias;
	}
	
	
	public List<ApecNumeroAlumnos> getNumeroAlumnos() {
		return numeroAlumnos;
	}

	public void setNumeroAlumnos(List<ApecNumeroAlumnos> numeroAlumnos) {
		this.numeroAlumnos = numeroAlumnos;
	}

	public List<ApecSeccionCstm> getSeccionesReunion2() {
		return seccionesReunion2;
	}

	public void setSeccionesReunion2(List<ApecSeccionCstm> seccionesReunion2) {
		this.seccionesReunion2 = seccionesReunion2;
	}	
	
}
	
	