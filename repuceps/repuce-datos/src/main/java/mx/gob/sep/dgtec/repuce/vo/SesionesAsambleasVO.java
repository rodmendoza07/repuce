package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;


/**
 * Objeo que encapsula las sesiones y asambleas cargadas por el usuario 
 * @author ismael.rosas
 *
 */
public class SesionesAsambleasVO{
	
	public List<PrimeraAsambleaVO> getActasPrimeraAsamblea() {
		return actasPrimeraAsamblea;
	}

	public void setActasPrimeraAsamblea(List<PrimeraAsambleaVO> actasPrimeraAsamblea) {
		this.actasPrimeraAsamblea = actasPrimeraAsamblea;
	}

	public List<PrimeraSesionVO> getMinutasPrimeraSesion() {
		return minutasPrimeraSesion;
	}

	public void setMinutasPrimeraSesion(List<PrimeraSesionVO> minutasPrimeraSesion) {
		this.minutasPrimeraSesion = minutasPrimeraSesion;
	}

	public List<SegundaSesionVO> getMinutasSegundaSesion() {
		return minutasSegundaSesion;
	}

	public void setMinutasSegundaSesion(List<SegundaSesionVO> minutasSegundaSesion) {
		this.minutasSegundaSesion = minutasSegundaSesion;
	}

	public List<SegundaAsambleaVO> getActasSegundaAsemblea() {
		return actasSegundaAsemblea;
	}

	public void setActasSegundaAsemblea(List<SegundaAsambleaVO> actasSegundaAsemblea) {
		this.actasSegundaAsemblea = actasSegundaAsemblea;
	}

	public List<TerceraSesionVO> getMinutasTerceraSesion() {
		return minutasTerceraSesion;
	}

	public void setMinutasTerceraSesion(List<TerceraSesionVO> minutasTerceraSesion) {
		this.minutasTerceraSesion = minutasTerceraSesion;
	}

	public List<TerceraSesionVO> getMinutasCuartaSesion() {
		return minutasCuartaSesion;
	}

	public void setMinutasCuartaSesion(List<TerceraSesionVO> minutasCuartaSesion) {
		this.minutasCuartaSesion = minutasCuartaSesion;
	}

	public List<SegundaAsambleaVO> getActasTerceraAsemblea() {
		return actasTerceraAsemblea;
	}

	public void setActasTerceraAsemblea(List<SegundaAsambleaVO> actasTerceraAsemblea) {
		this.actasTerceraAsemblea = actasTerceraAsemblea;
	}

	private List<PrimeraAsambleaVO> actasPrimeraAsamblea;
	
	private List<PrimeraSesionVO> minutasPrimeraSesion;

	private List<SegundaSesionVO> minutasSegundaSesion;

	private List<SegundaAsambleaVO> actasSegundaAsemblea;

	private List<TerceraSesionVO> minutasTerceraSesion;

	private List<TerceraSesionVO> minutasCuartaSesion;
	
	private List<SegundaAsambleaVO> actasTerceraAsemblea;
	
	
}
