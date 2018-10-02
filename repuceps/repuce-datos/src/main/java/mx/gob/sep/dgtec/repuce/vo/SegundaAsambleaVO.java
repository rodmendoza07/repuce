package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;

public class SegundaAsambleaVO extends ReunionVO {
	
	private List<CeProgramaCstm> programas;
	private List<CeMejoraCctCstm> mejoras;
	private List<CeRecurso> recursos;
	private List<CeComiteCstm> comites;
	private CePlaneacionCstm planeacion;
	
	private List<CeCompEnlaceCstm> compromisos;
	private List<CeMetaEnlace> metas;
	private List<CctResultEnlace> resultadosEnlace;
	private IndicadorEnlaceVO indicadorEnlace;

	
	public SegundaAsambleaVO(){
		super();
	}

	public List<CeProgramaCstm> getProgramas() {
		return programas;
	}

	public void setProgramas(List<CeProgramaCstm> programas) {
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

	public List<CeComiteCstm> getComites() {
		return comites;
	}


	public void setComites(List<CeComiteCstm> comites) {
		this.comites = comites;
	}


	public CePlaneacionCstm getPlaneacion() {
		return planeacion;
	}


	public void setPlaneacion(CePlaneacionCstm planeacion) {
		this.planeacion = planeacion;
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


	public List<CctResultEnlace> getResultadosEnlace() {
		return resultadosEnlace;
	}


	public void setResultadosEnlace(List<CctResultEnlace> resultadosEnlace) {
		this.resultadosEnlace = resultadosEnlace;
	}

	public IndicadorEnlaceVO getIndicadorEnlace() {
		return indicadorEnlace;
	}

	public void setIndicadorEnlace(IndicadorEnlaceVO indicadorEnlace) {
		this.indicadorEnlace = indicadorEnlace;
	}

	
}
