package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventoCstm;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CmSeguimiento;


public class InformeTransparenciaVO extends ReunionVO{

	private List<CeIntegranteCstm> integrantes;
	private List<SesionVO> sesiones;
	private List<CeComiteCstm> comites;
	private List<ProgramaVO> programas;
	private List<CeMejoraCctCstm> mejoras;
	private List<CeRecurso> recursos;
	private List<CctResultEnlace> resultados;
	private List<CeCompEnlaceCstm> compromisos;
	private List<CeMetaEnlace> metas;
	private List<CeEventoCstm> eventos;
	private CmSeguimiento seguimientoMunicipal;
	private CePlaneacionCstm planeacion;
	private Boolean informoSegundaAsamblea;
	private Boolean informoTerceraAsamblea;
	private IndicadorEnlaceVO indicadorEnlace;

	
	public InformeTransparenciaVO(){
		super();
	}


	public List<CeIntegranteCstm> getIntegrantes() {
		return integrantes;
	}


	public void setIntegrantes(List<CeIntegranteCstm> integrantes) {
		this.integrantes = integrantes;
	}


	public List<SesionVO> getSesiones() {
		return sesiones;
	}


	public void setSesiones(List<SesionVO> sesiones) {
		this.sesiones = sesiones;
	}


	public List<CeComiteCstm> getComites() {
		return comites;
	}


	public void setComites(List<CeComiteCstm> comites) {
		this.comites = comites;
	}


	public List<ProgramaVO> getProgramas() {
		return programas;
	}


	public void setProgramas(List<ProgramaVO> programas) {
		this.programas = programas;
	}


	public List<CeMejoraCctCstm> getMejoras() {
		return mejoras;
	}


	public void setMejoras(List<CeMejoraCctCstm> mejoras) {
		this.mejoras = mejoras;
	}


	public List<CeRecurso> getRecursos() {
		return recursos;
	}


	public void setRecursos(List<CeRecurso> recursos) {
		this.recursos = recursos;
	}


	public List<CctResultEnlace> getResultados() {
		return resultados;
	}


	public void setResultados(List<CctResultEnlace> resultados) {
		this.resultados = resultados;
	}


	public List<CeCompEnlaceCstm> getCompromisos() {
		return compromisos;
	}


	public void setCompromisos(List<CeCompEnlaceCstm> compromisos) {
		this.compromisos = compromisos;
	}


	public List<CeMetaEnlace> getMetas() {
		return metas;
	}


	public void setMetas(List<CeMetaEnlace> metas) {
		this.metas = metas;
	}


	public List<CeEventoCstm> getEventos() {
		return eventos;
	}


	public void setEventos(List<CeEventoCstm> eventos) {
		this.eventos = eventos;
	}


	public CmSeguimiento getSeguimientoMunicipal() {
		return seguimientoMunicipal;
	}


	public void setSeguimientoMunicipal(CmSeguimiento seguimientoMunicipal) {
		this.seguimientoMunicipal = seguimientoMunicipal;
	}


	public CePlaneacionCstm getPlaneacion() {
		return planeacion;
	}


	public void setPlaneacion(CePlaneacionCstm planeacion) {
		this.planeacion = planeacion;
	}


	public Boolean getInformoSegundaAsamblea() {
		return informoSegundaAsamblea;
	}


	public void setInformoSegundaAsamblea(Boolean informoSegundaAsamblea) {
		this.informoSegundaAsamblea = informoSegundaAsamblea;
	}


	public Boolean getInformoTerceraAsamblea() {
		return informoTerceraAsamblea;
	}


	public void setInformoTerceraAsamblea(Boolean informoTerceraAsamblea) {
		this.informoTerceraAsamblea = informoTerceraAsamblea;
	}


	public IndicadorEnlaceVO getIndicadorEnlace() {
		return indicadorEnlace;
	}


	public void setIndicadorEnlace(IndicadorEnlaceVO indicadorEnlace) {
		this.indicadorEnlace = indicadorEnlace;
	}

	
}
