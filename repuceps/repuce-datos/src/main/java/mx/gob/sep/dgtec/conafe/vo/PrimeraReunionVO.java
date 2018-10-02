package mx.gob.sep.dgtec.conafe.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejas;
import mx.gob.sep.dgtec.repuce.model.ApecInformeFinal;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentarios;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDiagnosticoComCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPoblacionIndigenaCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecNumeroAlumnos;
import mx.gob.sep.dgtec.repuce.model.ApecPrincipalesDificultades;
import mx.gob.sep.dgtec.repuce.model.ApecPrincipalesNecesidades;
import mx.gob.sep.dgtec.repuce.model.ApecActividadesUno;
import mx.gob.sep.dgtec.repuce.model.ApecActividadesTres;
import mx.gob.sep.dgtec.repuce.model.ApecActividadesCuatro;
import mx.gob.sep.dgtec.repuce.model.ApecPromotor;

public class PrimeraReunionVO extends ReunionConafeVO{
	
	
	private List<ApecApoyoCstm> apoyosConafe;
	private List<ApecApoyoCstm> apoyosFederales;
	private List<ApecApoyoCstm> apoyosEstatales;
	private List<ApecNecesidadesEducativasCstm> necesidadesEspeciales; 
	private List<ApecDiagnosticoComCstm> diagnostico;
	private List<ApecPoblacionIndigenaCstm> pobIndigena;
	private List<ApecPlanTrabajoCstm> planTrabajo;
	private List<ApecSeccionCstm> seccionesReunion;
	private List<ApecReunionIntegranteCstm>integrantesR1;
	private List<ApecReunionInstructorCtsm>instructoresR1;
	private List<ApecBullyingCstm> bullying;
	private List<ApecOpinionesComentarios> opiniones;
	private List<ApecDenunciasQuejas> denuncias;
	private List<ApecNumeroAlumnos> numeroAlumnos;		
	private List<ApecPrincipalesDificultades> dificultades;	
	private List<ApecPrincipalesNecesidades> necesidades;
	private ApecActividadesUno actividadesUno;
	private ApecActividadesTres actividadesTres;
	private ApecActividadesCuatro actividadesCuatro;
	private List<ApecPromotor> promotor;
	
	public List<ApecReunionInstructorCtsm> getInstructoresR1() {
		return instructoresR1;
	}

	public void setInstructoresR1(List<ApecReunionInstructorCtsm> instructoresR1) {
		this.instructoresR1 = instructoresR1;
	}

	public List<ApecReunionIntegranteCstm> getIntegrantesR1() {
		return integrantesR1;
	}

	public void setIntegrantesR1(List<ApecReunionIntegranteCstm> integrantesR1) {
		this.integrantesR1 = integrantesR1;
	}

	public List<ApecSeccionCstm> getSeccionesReunion() {
		return seccionesReunion;
	}

	public void setSeccionesReunion(List<ApecSeccionCstm> seccionesReunion) {
		this.seccionesReunion = seccionesReunion;
	}

	public List<ApecPlanTrabajoCstm> getPlanTrabajo() {
		return planTrabajo;
	}

	public void setPlanTrabajo(List<ApecPlanTrabajoCstm> planTrabajo) {
		this.planTrabajo = planTrabajo;
	}

	public List<ApecDiagnosticoComCstm> getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(List<ApecDiagnosticoComCstm> diagnostico) {
		this.diagnostico = diagnostico;
	}

	public List<ApecApoyoCstm> getApoyosConafe() {
		return apoyosConafe;
	}

	public void setApoyosConafe(List<ApecApoyoCstm> apoyosConafe) {
		this.apoyosConafe = apoyosConafe;
	}
	
	
	public List<ApecPoblacionIndigenaCstm> getPobIndigena() {
		return pobIndigena;
	}
	
	public void setPobIndigena(List<ApecPoblacionIndigenaCstm> pobIndigena) {
		this.pobIndigena = pobIndigena;
	}
	public List<ApecBullyingCstm> getBullying() {
		return bullying;
	}

	public void setBullying(List<ApecBullyingCstm> bullying) {
		this.bullying = bullying;
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
	
	public List<ApecPrincipalesDificultades> getDificultades() {
		return dificultades;
	}

	public void setDificultades(List<ApecPrincipalesDificultades> dificultades) {
		this.dificultades = dificultades;
	}
	
	public List<ApecPrincipalesNecesidades> getNecesidades() {
		return necesidades;
	}

	public void setNecesidades(List<ApecPrincipalesNecesidades> necesidades) {
		this.necesidades = necesidades;
	}
	
	public ApecActividadesUno getActividadesUno() {
		return actividadesUno;
	}
	public void setActividadesUno(ApecActividadesUno actividadesUno) {
		this.actividadesUno = actividadesUno;
	}
	
	public ApecActividadesTres getActividadesTres() {
		return actividadesTres;
	}
	public void setActividadesTres(ApecActividadesTres actividadesTres) {
		this.actividadesTres = actividadesTres;
	}
	
	public ApecActividadesCuatro getActividadesCuatro() {
		return actividadesCuatro;
	}
	public void setActividadesCuatro(ApecActividadesCuatro actividadesCuatro) {
		this.actividadesCuatro = actividadesCuatro;
	}
	
	public List<ApecPromotor> getPromotor() {
		return promotor;
	}
	public void setPromotor(List<ApecPromotor> promotor) {
		this.promotor = promotor;
	}


}
