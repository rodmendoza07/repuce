package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeAccionCstm;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeComIntegrantes;
import mx.gob.sep.dgtec.repuce.model.CeComitesCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompromisosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEvaluaciones;
import mx.gob.sep.dgtec.repuce.model.CeEventosCstm;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadCstm;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2;
import mx.gob.sep.dgtec.repuce.model.CeProgramaDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaSeguimientoC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionCstm;
import mx.gob.sep.dgtec.repuce.model.ConsejeroC1415;

public class SegundaSesionC1415VO extends ReunionVO{

	private List<CeProgramaDetalleC1415Cstm> federalSeguimiento;
	private List<CeProgramaDetalleC1415Cstm> federalActual;
	private List<CeProgramaDetalleC1415Cstm> estatalSeguimiento;
	private List<CeProgramaDetalleC1415Cstm> estatalActual;
	private List<CeProgramaDetalleC1415Cstm> municipalSeguimiento;
	private List<CeProgramaDetalleC1415Cstm> municipalActual;
	private List<CeProgramaDetalleC1415Cstm> oscSeguimiento;
	private List<CeProgramaDetalleC1415Cstm> oscActual;
	private List<CeProgramaSeguimientoC1415Cstm> detalleSeguimiento;
	private List<CeProgramasParticipacionCstm> programaRecursos;
	private List<CeAccionCstm> acciones;
	private List<CeNormalidadCstm> normalidad;
	private List<CeEvaluaciones> evaluacion;
	private List<CeCompromisosCstm> compromiso;
	private List<CeComitesCstm> comiteSeguimiento;
	private List<CeComitesCstm> comiteActual;
	private List<CeEventosCstm> eventos;
	private List<CeEstimulosCstm> estimulos;
	private List<CeAsunto> asunto;	
	private CePreguntas2 preguntas2;
	private List<ConsejeroC1415> consejeros;
	private List<CeComitesCstm> comiteActa;
	private List<ProgramasFederalesVO> programasFederalesActa2Sesion;
	private List<ProgramasFederalesVO> programasEstatalesActa2Sesion;
	private List<ProgramasFederalesVO> programasMunicipalesActa2Sesion;
	private List<ProgramasFederalesVO> programasOSCActa2Sesion;
	private List<IntegranteC1617VO> integrantes;
	private List<IntegranteCA1617VO> integrantesActa;
	private List<CeComIntegrantes> integrantesComites;
	private ValidacionSegundaSesionVO valida;
//	private List<Comites1SesionVO> comitesActa;
//	private List<Categorias1SesionVO> categoriasActa;
//	private List<ProgramasFederalesVO> programas;
	
	public SegundaSesionC1415VO(){
		super();
	}

	public List<CeProgramaDetalleC1415Cstm> getFederalSeguimiento() {
		return federalSeguimiento;
	}

	public void setFederalSeguimiento(
			List<CeProgramaDetalleC1415Cstm> federalSeguimiento) {
		this.federalSeguimiento = federalSeguimiento;
	}

	public List<CeProgramaDetalleC1415Cstm> getFederalActual() {
		return federalActual;
	}

	public void setFederalActual(List<CeProgramaDetalleC1415Cstm> federalActual) {
		this.federalActual = federalActual;
	}

	public List<CeProgramaDetalleC1415Cstm> getEstatalSeguimiento() {
		return estatalSeguimiento;
	}

	public void setEstatalSeguimiento(
			List<CeProgramaDetalleC1415Cstm> estatalSeguimiento) {
		this.estatalSeguimiento = estatalSeguimiento;
	}

	public List<CeProgramaDetalleC1415Cstm> getEstatalActual() {
		return estatalActual;
	}

	public void setEstatalActual(List<CeProgramaDetalleC1415Cstm> estatalActual) {
		this.estatalActual = estatalActual;
	}

	public List<CeProgramaDetalleC1415Cstm> getMunicipalSeguimiento() {
		return municipalSeguimiento;
	}

	public void setMunicipalSeguimiento(
			List<CeProgramaDetalleC1415Cstm> municipalSeguimiento) {
		this.municipalSeguimiento = municipalSeguimiento;
	}

	public List<CeProgramaDetalleC1415Cstm> getMunicipalActual() {
		return municipalActual;
	}

	public void setMunicipalActual(List<CeProgramaDetalleC1415Cstm> municipalActual) {
		this.municipalActual = municipalActual;
	}

	public List<CeProgramaDetalleC1415Cstm> getOscSeguimiento() {
		return oscSeguimiento;
	}

	public void setOscSeguimiento(List<CeProgramaDetalleC1415Cstm> oscSeguimiento) {
		this.oscSeguimiento = oscSeguimiento;
	}
	
	public List<CeProgramaDetalleC1415Cstm> getOscActual() {
		return oscActual;
	}

	public void setOscActual(List<CeProgramaDetalleC1415Cstm> oscActual) {
		this.oscActual = oscActual;
	}
	
	public List<CeProgramaSeguimientoC1415Cstm> getDetalleSeguimiento() {
		return detalleSeguimiento;
	}

	public void setDetalleSeguimiento(
			List<CeProgramaSeguimientoC1415Cstm> detalleSeguimiento) {
		this.detalleSeguimiento = detalleSeguimiento;
	}

	public List<CeProgramasParticipacionCstm> getProgramaRecursos() {
		return programaRecursos;
	}

	public void setProgramaRecursos(List<CeProgramasParticipacionCstm> programaRecursos) {
		this.programaRecursos = programaRecursos;
	}

	public List<CeAccionCstm> getAcciones() {
		return acciones;
	}

	public void setAcciones(List<CeAccionCstm> acciones) {
		this.acciones = acciones;
	}
		
	public List<CeNormalidadCstm> getNormalidad() {
		return normalidad;
	}

	public void setNormalidad(List<CeNormalidadCstm> normalidad) {
		this.normalidad = normalidad;
	}

	

	public List<CeComitesCstm> getComiteSeguimiento() {
		return comiteSeguimiento;
	}

	public void setComiteSeguimiento(List<CeComitesCstm> comiteSeguimiento) {
		this.comiteSeguimiento = comiteSeguimiento;
	}

	public List<CeComitesCstm> getComiteActual() {
		return comiteActual;
	}

	public void setComiteActual(List<CeComitesCstm> comiteActual) {
		this.comiteActual = comiteActual;
	}
	
	public List<CeEventosCstm> getEventos() {
		return eventos;
	}

	public void setEventos(List<CeEventosCstm> eventos) {
		this.eventos = eventos;
	}

	public List<CeAsunto> getAsunto() {
		return asunto;
	}

	public void setAsunto(List<CeAsunto> asunto) {
		this.asunto = asunto;
	}

	public List<CeEstimulosCstm> getEstimulos() {
		return estimulos;
	}

	public void setEstimulos(List<CeEstimulosCstm> estimulos) {
		this.estimulos = estimulos;
	}

	public List<CeCompromisosCstm> getCompromiso() {
		return compromiso;
	}

	public void setCompromiso(List<CeCompromisosCstm> compromiso) {
		this.compromiso = compromiso;
	}

	public List<CeEvaluaciones> getEvaluacion() {
		return evaluacion;
	}

	public void setEvaluacion(List<CeEvaluaciones> evaluacion) {
		this.evaluacion = evaluacion;
	}

	public CePreguntas2 getPreguntas2() {
		return preguntas2;
	}

	public void setPreguntas2(CePreguntas2 preguntas2) {
		this.preguntas2 = preguntas2;
	}

	public List<ConsejeroC1415> getConsejeros() {
		return consejeros;
	}

	public void setConsejeros(List<ConsejeroC1415> consejeros) {
		this.consejeros = consejeros;
	}

	public List<CeComitesCstm> getComiteActa() {
		return comiteActa;
	}

	public void setComiteActa(List<CeComitesCstm> comiteActa) {
		this.comiteActa = comiteActa;
	}

	public List<ProgramasFederalesVO> getProgramasFederalesActa2Sesion() {
		return programasFederalesActa2Sesion;
	}

	public void setProgramasFederalesActa2Sesion(
			List<ProgramasFederalesVO> programasFederalesActa2Sesion) {
		this.programasFederalesActa2Sesion = programasFederalesActa2Sesion;
	}

	public List<ProgramasFederalesVO> getProgramasEstatalesActa2Sesion() {
		return programasEstatalesActa2Sesion;
	}

	public void setProgramasEstatalesActa2Sesion(
			List<ProgramasFederalesVO> programasEstatalesActa2Sesion) {
		this.programasEstatalesActa2Sesion = programasEstatalesActa2Sesion;
	}

	public List<ProgramasFederalesVO> getProgramasMunicipalesActa2Sesion() {
		return programasMunicipalesActa2Sesion;
	}

	public void setProgramasMunicipalesActa2Sesion(
			List<ProgramasFederalesVO> programasMunicipalesActa2Sesion) {
		this.programasMunicipalesActa2Sesion = programasMunicipalesActa2Sesion;
	}

	public List<ProgramasFederalesVO> getProgramasOSCActa2Sesion() {
		return programasOSCActa2Sesion;
	}

	public void setProgramasOSCActa2Sesion(List<ProgramasFederalesVO> programasOSCActa2Sesion) {
		this.programasOSCActa2Sesion = programasOSCActa2Sesion;
	}

	public List<IntegranteC1617VO> getIntegrantes() {
		return integrantes;
	}

	public void setIntegrantes(List<IntegranteC1617VO> integrantes) {
		this.integrantes = integrantes;
	}

	public List<CeComIntegrantes> getIntegrantesComites() {
		return integrantesComites;
	}

	public void setIntegrantesComites(List<CeComIntegrantes> integrantesComites) {
		this.integrantesComites = integrantesComites;
	}

	public List<IntegranteCA1617VO> getIntegrantesActa() {
		return integrantesActa;
	}

	public void setIntegrantesActa(List<IntegranteCA1617VO> integrantesActa) {
		this.integrantesActa = integrantesActa;
	}

	public ValidacionSegundaSesionVO getValida() {
		return valida;
	}

	public void setValida(ValidacionSegundaSesionVO valida) {
		this.valida = valida;
	}



	
			
}
