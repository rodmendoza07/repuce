package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventoCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;


public class CuartaSesionVO extends ReunionVO{

	private List<CeProgramaCstm> programas;
	private List<CeMejoraCctCstm> mejoras;
	private List<CeComiteCstm> comites;
	private List<CeEventoCstm> eventos;
	private CePlaneacionCstm planeacion;
	private List<CeRecurso> recursos;

	
	public CuartaSesionVO(){
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


	public List<CeComiteCstm> getComites() {
		return comites;
	}


	public void setComites(List<CeComiteCstm> comites) {
		this.comites = comites;
	}


	public List<CeEventoCstm> getEventos() {
		return eventos;
	}


	public void setEventos(List<CeEventoCstm> eventos) {
		this.eventos = eventos;
	}


	public CePlaneacionCstm getPlaneacion() {
		return planeacion;
	}


	public void setPlaneacion(CePlaneacionCstm planeacion) {
		this.planeacion = planeacion;
	}


	public List<CeRecurso> getRecursos() {
		return recursos;
	}


	public void setRecursos(List<CeRecurso> recursos) {
		this.recursos = recursos;
	}
	
	
}
