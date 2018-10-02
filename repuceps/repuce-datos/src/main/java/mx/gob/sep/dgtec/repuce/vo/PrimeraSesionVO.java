package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;


public class PrimeraSesionVO extends ReunionVO{

	private List<CeProgramaCstm> programas;
	private List<CeRecurso> recursos;
	private List<CeComiteCstm> comites;
	private List<ComiteVO> integrantesComites;
	private CePlaneacionCstm planeacion;
	
	public PrimeraSesionVO(){
		super();
	}

	public List<CeProgramaCstm> getProgramas() {
		return programas;
	}

	public void setProgramas(List<CeProgramaCstm> programas) {
		this.programas = programas;
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

	public List<ComiteVO> getIntegrantesComites() {
		return integrantesComites;
	}

	public void setIntegrantesComites(List<ComiteVO> integrantesComites) {
		this.integrantesComites = integrantesComites;
	}

	public CePlaneacionCstm getPlaneacion() {
		return planeacion;
	}

	public void setPlaneacion(CePlaneacionCstm planeacion) {
		this.planeacion = planeacion;
	}

}
