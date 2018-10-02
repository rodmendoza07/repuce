package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeAccion;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeComites;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadCstm;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2;
import mx.gob.sep.dgtec.repuce.model.CeProgramaC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeTema;
import mx.gob.sep.dgtec.repuce.model.ConsejeroC1415;



public class PrimeraSesionC1415VO extends ReunionVO{

	private List<CeProgramaDetalleC1415Cstm> federales;
	private List<CeProgramaDetalleC1415Cstm> estatales;
	private List<CeProgramaDetalleC1415Cstm> municipales;
	private List<CeProgramaDetalleC1415Cstm> oscs;
	private List<CeActividadDetalleC1415Cstm> categorias;
	private List<CeAccion> acciones;
	private List<CeAsunto> asuntos;
	private List<CeTema> temas;
	private List<CeComites> comites;
	private List<ConsejeroC1415> consejeros;
	private List<ProgramasFederalesVO> programasFederalesActa;
	private List<ProgramasFederalesVO> programasEstatalesActa;
	private List<ProgramasFederalesVO> programasMunicipalesActa;
	private List<ProgramasFederalesVO> programasOSCActa;
	private List<Comites1SesionVO> comitesActa;
	private List<Categorias1SesionVO> categoriasActa;
	private List<ProgramasFederalesVO> programas;
	private List<CeNormalidadCstm> normalidad;
	private CePreguntas2 preguntas2;
//	private List<CeRecurso> recursos;
//	private List<CeComiteCstm> comites;
//	private List<ComiteVO> integrantesComites;
//	private CePlaneacionCstm planeacion;
	
	public PrimeraSesionC1415VO(){
		super();
	}

	
	public List<CeNormalidadCstm> getNormalidad() {
		return normalidad;
	}


	public void setNormalidad(List<CeNormalidadCstm> normalidad) {
		this.normalidad = normalidad;
	}


	public List<CeProgramaDetalleC1415Cstm> getFederales() {
		return federales;
	}

	public void setFederales(List<CeProgramaDetalleC1415Cstm> federales) {
		this.federales = federales;
	}

	public List<CeProgramaDetalleC1415Cstm> getEstatales() {
		return estatales;
	}

	public void setEstatales(List<CeProgramaDetalleC1415Cstm> estatales) {
		this.estatales = estatales;
	}

	public List<CeProgramaDetalleC1415Cstm> getMunicipales() {
		return municipales;
	}

	public void setMunicipales(List<CeProgramaDetalleC1415Cstm> municipales) {
		this.municipales = municipales;
	}

	public List<CeProgramaDetalleC1415Cstm> getOscs() {
		return oscs;
	}

	public void setOscs(List<CeProgramaDetalleC1415Cstm> oscs) {
		this.oscs = oscs;
	}

	public List<CeAccion> getAcciones() {
		return acciones;
	}

	public void setAcciones(List<CeAccion> acciones) {
		this.acciones = acciones;
	}	

	public List<CeTema> getTemas() {
		return temas;
	}

	public void setTemas(List<CeTema> temas) {
		this.temas = temas;
	}

	public List<CeAsunto> getAsuntos() {
		return asuntos;
	}

	public void setAsuntos(List<CeAsunto> asuntos) {
		this.asuntos = asuntos;
	}

	public List<CeActividadDetalleC1415Cstm> getCategorias() {
		return categorias;
	}

	public void setCategorias(List<CeActividadDetalleC1415Cstm> categorias) {
		this.categorias = categorias;
	}

	public List<ConsejeroC1415> getConsejeros() {
		return consejeros;
	}

	public void setConsejeros(List<ConsejeroC1415> consejeros) {
		this.consejeros = consejeros;
	}

	public List<ProgramasFederalesVO> getProgramasFederalesActa() {
		return programasFederalesActa;
	}

	public void setProgramasFederalesActa(List<ProgramasFederalesVO> programasFederalesActa) {
		this.programasFederalesActa = programasFederalesActa;
	}

	public List<ProgramasFederalesVO> getProgramasEstatalesActa() {
		return programasEstatalesActa;
	}

	public void setProgramasEstatalesActa(List<ProgramasFederalesVO> programasEstatalesActa) {
		this.programasEstatalesActa = programasEstatalesActa;
	}

	public List<ProgramasFederalesVO> getProgramasMunicipalesActa() {
		return programasMunicipalesActa;
	}

	public void setProgramasMunicipalesActa(List<ProgramasFederalesVO> programasMunicipalesActa) {
		this.programasMunicipalesActa = programasMunicipalesActa;
	}

	public List<ProgramasFederalesVO> getProgramasOSCActa() {
		return programasOSCActa;
	}

	public void setProgramasOSCActa(List<ProgramasFederalesVO> programasOSCActa) {
		this.programasOSCActa = programasOSCActa;
	}

	public List<Comites1SesionVO> getComitesActa() {
		return comitesActa;
	}

	public void setComitesActa(List<Comites1SesionVO> comitesActa) {
		this.comitesActa = comitesActa;
	}

	public List<Categorias1SesionVO> getCategoriasActa() {
		return categoriasActa;
	}

	public void setCategoriasActa(List<Categorias1SesionVO> categoriasActa) {
		this.categoriasActa = categoriasActa;
	}

	public List<CeComites> getComites() {
		return comites;
	}

	public void setComites(List<CeComites> comites) {
		this.comites = comites;
	}

	public List<ProgramasFederalesVO> getProgramas() {
		return programas;
	}

	public void setProgramas(List<ProgramasFederalesVO> programas) {
		this.programas = programas;
	}


	
	public CePreguntas2 getPreguntas2() {
		return preguntas2;
	}


	public void setPreguntas2(CePreguntas2 preguntas2) {
		this.preguntas2 = preguntas2;
	}

	
//	public void setProgramas(List<CeProgramaCstm> programas) {
//		this.programas = programas;
//	}
//
//	public List<CeRecurso> getRecursos() {
//		return recursos;
//	}
//
//	public void setRecursos(List<CeRecurso> recursos) {
//		this.recursos = recursos;
//	}
//
//	public List<CeComiteCstm> getComites() {
//		return comites;
//	}
//
//	public void setComites(List<CeComiteCstm> comites) {
//		this.comites = comites;
//	}
//
//	public List<ComiteVO> getIntegrantesComites() {
//		return integrantesComites;
//	}
//
//	public void setIntegrantesComites(List<ComiteVO> integrantesComites) {
//		this.integrantesComites = integrantesComites;
//	}
//
//	public CePlaneacionCstm getPlaneacion() {
//		return planeacion;
//	}
//
//	public void setPlaneacion(CePlaneacionCstm planeacion) {
//		this.planeacion = planeacion;
//	}

}
