package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeAccionCstm;
import mx.gob.sep.dgtec.repuce.model.CeActividadComite;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeComitesCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompromisosCstm;
import mx.gob.sep.dgtec.repuce.model.CeContraloriaComite;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosMunicipal;
import mx.gob.sep.dgtec.repuce.model.CeEvaluaciones;
import mx.gob.sep.dgtec.repuce.model.CeEventosCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadCstm;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CePreguntaRecursosPadres;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2;
import mx.gob.sep.dgtec.repuce.model.CePreguntasEstatal;
import mx.gob.sep.dgtec.repuce.model.CePreguntasMunicipal;
import mx.gob.sep.dgtec.repuce.model.CeProgramaComite;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaSeguimientoC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CeRecursosPadres;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.model.ConsejeroC1415;

public class SegundaAsamblea1415VO extends ReunionVO {
	
	private List<CeProgramaDetalleC1415Cstm> federalActual;
	private List<CeProgramaDetalleC1415Cstm> estatalActual;
	private List<CeProgramaDetalleC1415Cstm> municipalActual;
	private List<CeProgramaDetalleC1415Cstm> oscActual;
	private List<CeProgramaDetalleC1415Cstm> federalSeguimiento;
	private List<CeProgramaDetalleC1415Cstm> estatalSeguimiento;
	private List<CeProgramaDetalleC1415Cstm> municipalSeguimiento;
	private List<CeProgramaDetalleC1415Cstm> oscSeguimiento;
	private List<CeProgramaSeguimientoC1415Cstm> detalleSeguimiento;
	private List<CeProgramasParticipacionCstm> programaRecursos;
	private List<CeAccionCstm> acciones;
	private List<CeNormalidadCstm> normalidad;
	private List<CeEvaluaciones> evaluacion;
	private List<CeCompromisosCstm> compromiso;
	private List<CeActividadDetalleC1415Cstm> categorias;
	private List<CeComitesCstm> comiteSeguimiento;
	private List<CeEventosCstm> eventos;
	private List<CeEstimulosCstm> estimulos;
	private List<CeEstimulosMunicipal> estimulosMunicipal;
	private List<Categorias1SesionVO> categoriasSegundaAsamblea;
	private List<CeAsunto> asunto;	
	private CePreguntas2 preguntas2;
	private CePreguntasEstatal preguntasEstatal;
	private CePreguntasMunicipal preguntasMunicipal;
	private List<CeProgramaComite> programaComite;
	private List<CeActividadComite> actividadComite;
	private CeContraloriaComite contraloriaComite;
	private List<VariablesContraloriaSocialVO> variablesContraloriaSocial;
	private List<ConsejeroC1415> consejeros;
	private List<CeComitesCstm> comiteActa;
	private List<CeRecursosPadresVO> recursosPadres;
	private CePreguntaRecursosPadres preguntaRecursosPadres;
    private List<RecursosProgramasVO> recursosProgramasTotales;
    private List<RecursosFuentesEventosCategoriasVO> recursosFuentesTotales;
    private TotalesFuentesOProgramasVO totalFuentes;
    private TotalesFuentesOProgramasVO totalProgramas;
 
	private List<ProgramasFederalesVO> programasFederalesActa2Asamblea;
	private List<ProgramasFederalesVO> programasEstatalesActa2Asamblea;
	private List<ProgramasFederalesVO> programasMunicipalesActa2Asamblea;
	private List<ProgramasFederalesVO> programasOSCActa2Asamblea;
	private contadorIntegrantesPrimeraAsambleaVO totalIntegrantesPrimerAsamblea;
	
	private Integer comContra;
	
	public SegundaAsamblea1415VO(){
		super();
	}


	public List<CeProgramaDetalleC1415Cstm> getFederalActual() {
		return federalActual;
	}


	public void setFederalActual(List<CeProgramaDetalleC1415Cstm> federalActual) {
		this.federalActual = federalActual;
	}


	public List<CeProgramaDetalleC1415Cstm> getEstatalActual() {
		return estatalActual;
	}


	public void setEstatalActual(List<CeProgramaDetalleC1415Cstm> estatalActual) {
		this.estatalActual = estatalActual;
	}


	public List<CeProgramaDetalleC1415Cstm> getMunicipalActual() {
		return municipalActual;
	}


	public void setMunicipalActual(List<CeProgramaDetalleC1415Cstm> municipalActual) {
		this.municipalActual = municipalActual;
	}


	public List<CeProgramaDetalleC1415Cstm> getOscActual() {
		return oscActual;
	}


	public void setOscActual(List<CeProgramaDetalleC1415Cstm> oscActual) {
		this.oscActual = oscActual;
	}


	public List<CeProgramaDetalleC1415Cstm> getFederalSeguimiento() {
		return federalSeguimiento;
	}


	public void setFederalSeguimiento(
			List<CeProgramaDetalleC1415Cstm> federalSeguimiento) {
		this.federalSeguimiento = federalSeguimiento;
	}


	public List<CeProgramaDetalleC1415Cstm> getEstatalSeguimiento() {
		return estatalSeguimiento;
	}


	public void setEstatalSeguimiento(
			List<CeProgramaDetalleC1415Cstm> estatalSeguimiento) {
		this.estatalSeguimiento = estatalSeguimiento;
	}


	public List<CeProgramaDetalleC1415Cstm> getMunicipalSeguimiento() {
		return municipalSeguimiento;
	}


	public void setMunicipalSeguimiento(
			List<CeProgramaDetalleC1415Cstm> municipalSeguimiento) {
		this.municipalSeguimiento = municipalSeguimiento;
	}


	public List<CeProgramaDetalleC1415Cstm> getOscSeguimiento() {
		return oscSeguimiento;
	}


	public void setOscSeguimiento(List<CeProgramaDetalleC1415Cstm> oscSeguimiento) {
		this.oscSeguimiento = oscSeguimiento;
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

	public void setProgramaRecursos(
			List<CeProgramasParticipacionCstm> programaRecursos) {
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

	public List<CeEvaluaciones> getEvaluacion() {
		return evaluacion;
	}

	public void setEvaluacion(List<CeEvaluaciones> evaluacion) {
		this.evaluacion = evaluacion;
	}

	public List<CeCompromisosCstm> getCompromiso() {
		return compromiso;
	}

	public void setCompromiso(List<CeCompromisosCstm> compromiso) {
		this.compromiso = compromiso;
	}

	public List<CeComitesCstm> getComiteSeguimiento() {
		return comiteSeguimiento;
	}

	public void setComiteSeguimiento(List<CeComitesCstm> comiteSeguimiento) {
		this.comiteSeguimiento = comiteSeguimiento;
	}

	public List<CeEventosCstm> getEventos() {
		return eventos;
	}

	public void setEventos(List<CeEventosCstm> eventos) {
		this.eventos = eventos;
	}

	public List<CeEstimulosCstm> getEstimulos() {
		return estimulos;
	}

	public void setEstimulos(List<CeEstimulosCstm> estimulos) {
		this.estimulos = estimulos;
	}

	public List<CeAsunto> getAsunto() {
		return asunto;
	}

	public void setAsunto(List<CeAsunto> asunto) {
		this.asunto = asunto;
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

	
	

	public CePreguntasEstatal getPreguntasEstatal() {
		return preguntasEstatal;
	}

	public void setPreguntasEstatal(CePreguntasEstatal preguntasEstatal) {
		this.preguntasEstatal = preguntasEstatal;
	}

	public CePreguntasMunicipal getPreguntasMunicipal() {
		return preguntasMunicipal;
	}

	public void setPreguntasMunicipal(CePreguntasMunicipal preguntasMunicipal) {
		this.preguntasMunicipal = preguntasMunicipal;
	}

	

	public List<CeEstimulosMunicipal> getEstimulosMunicipal() {
		return estimulosMunicipal;
	}

	public void setEstimulosMunicipal(List<CeEstimulosMunicipal> estimulosMunicipal) {
		this.estimulosMunicipal = estimulosMunicipal;
	}


	public CePreguntaRecursosPadres getPreguntaRecursosPadres() {
		return preguntaRecursosPadres;
	}

	public void setPreguntaRecursosPadres(CePreguntaRecursosPadres preguntaRecursosPadres) {
		this.preguntaRecursosPadres = preguntaRecursosPadres;
	}

	public List<Categorias1SesionVO> getCategoriasSegundaAsamblea() {
		return categoriasSegundaAsamblea;
	}

	public void setCategoriasSegundaAsamblea(
			List<Categorias1SesionVO> categoriasSegundaAsamblea) {
		this.categoriasSegundaAsamblea = categoriasSegundaAsamblea;
	}

	public List<CeActividadDetalleC1415Cstm> getCategorias() {
		return categorias;
	}

	public void setCategorias(List<CeActividadDetalleC1415Cstm> categorias) {
		this.categorias = categorias;
	}


	public List<RecursosProgramasVO> getRecursosProgramasTotales() {
		return recursosProgramasTotales;
	}


	public void setRecursosProgramasTotales(List<RecursosProgramasVO> recursosProgramasTotales) {
		this.recursosProgramasTotales = recursosProgramasTotales;
	}


	public List<ProgramasFederalesVO> getProgramasFederalesActa2Asamblea() {
		return programasFederalesActa2Asamblea;
	}


	public void setProgramasFederalesActa2Asamblea(
			List<ProgramasFederalesVO> programasFederalesActa2Asamblea) {
		this.programasFederalesActa2Asamblea = programasFederalesActa2Asamblea;
	}


	public List<ProgramasFederalesVO> getProgramasEstatalesActa2Asamblea() {
		return programasEstatalesActa2Asamblea;
	}


	public void setProgramasEstatalesActa2Asamblea(
			List<ProgramasFederalesVO> programasEstatalesActa2Asamblea) {
		this.programasEstatalesActa2Asamblea = programasEstatalesActa2Asamblea;
	}


	public List<ProgramasFederalesVO> getProgramasMunicipalesActa2Asamblea() {
		return programasMunicipalesActa2Asamblea;
	}


	public void setProgramasMunicipalesActa2Asamblea(
			List<ProgramasFederalesVO> programasMunicipalesActa2Asamblea) {
		this.programasMunicipalesActa2Asamblea = programasMunicipalesActa2Asamblea;
	}


	public List<ProgramasFederalesVO> getProgramasOSCActa2Asamblea() {
		return programasOSCActa2Asamblea;
	}


	public void setProgramasOSCActa2Asamblea(
			List<ProgramasFederalesVO> programasOSCActa2Asamblea) {
		this.programasOSCActa2Asamblea = programasOSCActa2Asamblea;
	}


	public List<RecursosFuentesEventosCategoriasVO> getRecursosFuentesTotales() {
		return recursosFuentesTotales;
	}


	public void setRecursosFuentesTotales(List<RecursosFuentesEventosCategoriasVO> recursosFuentesTotales) {
		this.recursosFuentesTotales = recursosFuentesTotales;
	}


	public TotalesFuentesOProgramasVO getTotalFuentes() {
		return totalFuentes;
	}


	public void setTotalFuentes(TotalesFuentesOProgramasVO totalFuentes) {
		this.totalFuentes = totalFuentes;
	}


	public TotalesFuentesOProgramasVO getTotalProgramas() {
		return totalProgramas;
	}


	public void setTotalProgramas(TotalesFuentesOProgramasVO totalProgramas) {
		this.totalProgramas = totalProgramas;
	}


	public List<CeRecursosPadresVO> getRecursosPadres() {
		return recursosPadres;
	}


	public void setRecursosPadres(List<CeRecursosPadresVO> recursosPadres) {
		this.recursosPadres = recursosPadres;
	}


	public contadorIntegrantesPrimeraAsambleaVO getTotalIntegrantesPrimerAsamblea() {
		return totalIntegrantesPrimerAsamblea;
	}


	public void setTotalIntegrantesPrimerAsamblea(
			contadorIntegrantesPrimeraAsambleaVO totalIntegrantesPrimerAsamblea) {
		this.totalIntegrantesPrimerAsamblea = totalIntegrantesPrimerAsamblea;
	}


	public List<CeProgramaComite> getProgramaComite() {
		return programaComite;
	}


	public void setProgramaComite(List<CeProgramaComite> programaComite) {
		this.programaComite = programaComite;
	}


	public List<CeActividadComite> getActividadComite() {
		return actividadComite;
	}


	public void setActividadComite(List<CeActividadComite> actividadComite) {
		this.actividadComite = actividadComite;
	}


	public CeContraloriaComite getContraloriaComite() {
		return contraloriaComite;
	}


	public void setContraloriaComite(CeContraloriaComite contraloriaComite) {
		this.contraloriaComite = contraloriaComite;
	}


	public List<VariablesContraloriaSocialVO> getVariablesContraloriaSocial() {
		return variablesContraloriaSocial;
	}


	public void setVariablesContraloriaSocial(
			List<VariablesContraloriaSocialVO> variablesContraloriaSocial) {
		this.variablesContraloriaSocial = variablesContraloriaSocial;
	}


	public Integer getComContra() {
		return comContra;
	}


	public void setComContra(Integer comContra) {
		this.comContra = comContra;
	}


	




	
	
}
