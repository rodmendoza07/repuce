package mx.gob.sep.dgtec.conafe.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejas;
import mx.gob.sep.dgtec.repuce.model.ApecDesercionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecEncuestaSatisfaccionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecInformeFinal;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasCstm;
import mx.gob.sep.dgtec.repuce.model.ApecNumeroAlumnos;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentarios;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionCstm;

public class TerceraReunionVO  extends ReunionConafeVO{

	private List<ApecApoyoCstm> apoyosConafe;
	private List<ApecApoyoCstm> apoyosFederales;
	private List<ApecApoyoCstm> apoyosEstatales;
	private List<ApecNecesidadesEducativasCstm> necesidadesEspeciales;
	private List<ApecBullyingCstm> bullying;
	private List<ApecPlanTrabajoCstm> planTrabajo;
	private List<ApecSeccionCstm> seccionesReunion;
	private List<ApecSeccionCstm> seccionesReunion3;
	private List<ApecDesercionCstm> diagnosticoCierre;
	private List<ApecEncuestaSatisfaccionCstm> encuestaSatisfaccion;
	private List<ApecApoyoCstm> apoyos;
	private List<ApecOpinionesComentarios> opiniones;
	private List<ApecDenunciasQuejas> denuncias;
	private List<ApecNumeroAlumnos> numeroAlumnos;	
	private ApecInformeFinal informeFinal; 
	private List<ApecReunionIntegranteCstm>integrantesR3;
	private List<ApecReunionInstructorCtsm>instructoresR3;
	private InformeFinalOpcionesVO informeFinalOpciones;
	
	
		
	public List<ApecReunionInstructorCtsm> getInstructoresR3() {
		return instructoresR3;
	}
	public void setInstructoresR3(List<ApecReunionInstructorCtsm> instructoresR3) {
		this.instructoresR3 = instructoresR3;
	}
	public List<ApecReunionIntegranteCstm> getIntegrantesR3() {
		return integrantesR3;
	}
	public void setIntegrantesR3(List<ApecReunionIntegranteCstm> integrantesR3) {
		this.integrantesR3 = integrantesR3;
	}
	public List<ApecApoyoCstm> getApoyosConafe() {
		return apoyosConafe;
	}
	public void setApoyosConafe(List<ApecApoyoCstm> apoyosConafe) {
		this.apoyosConafe = apoyosConafe;
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
	
	public List<ApecApoyoCstm> getApoyos() {
		return apoyos;
	}
	public void setApoyos(List<ApecApoyoCstm> apoyos) {
		this.apoyos = apoyos;
	}
	public List<ApecDesercionCstm> getDiagnosticoCierre() {
		return diagnosticoCierre;
	}
	public void setDiagnosticoCierre(List<ApecDesercionCstm> diagnosticoCierre) {
		this.diagnosticoCierre = diagnosticoCierre;
	}
	public List<ApecEncuestaSatisfaccionCstm> getEncuestaSatisfaccion() {
		return encuestaSatisfaccion;
	}
	public void setEncuestaSatisfaccion(
			List<ApecEncuestaSatisfaccionCstm> encuestaSatisfaccion) {
		this.encuestaSatisfaccion = encuestaSatisfaccion;
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
	
	
	public ApecInformeFinal getInformeFinal() {
		return informeFinal;
	}
	public void setInformeFinal(ApecInformeFinal informeFinal) {
		this.informeFinal = informeFinal;
	}
	public InformeFinalOpcionesVO getInformeFinalOpciones() {
		return informeFinalOpciones;
	}
	public void setInformeFinalOpciones(InformeFinalOpcionesVO informeFinalOpciones) {
		this.informeFinalOpciones = informeFinalOpciones;
	}
	public List<ApecSeccionCstm> getSeccionesReunion3() {
		return seccionesReunion3;
	}
	public void setSeccionesReunion3(List<ApecSeccionCstm> seccionesReunion3) {
		this.seccionesReunion3 = seccionesReunion3;
	}


	
	
	
	
}
