package mx.gob.sep.dgtec.repuce.vo;

import java.util.Date;

public class SesionVO {

	private Short cSesion;
	
	private Short cActividad;
	
	private String nomSesion;

    private String numActividad;

    private Double pctSesion;
    
    private Date fchSesion;

    private String nomActividad;

    private String nomOtraActividad;
    
    private String observaciones;
    
	public Short getcSesion() {
		return cSesion;
	}

	public void setcSesion(Short cSesion) {
		this.cSesion = cSesion;
	}

	public Short getcActividad() {
		return cActividad;
	}

	public void setcActividad(Short cActividad) {
		this.cActividad = cActividad;
	}

	public String getNomSesion() {
		return nomSesion;
	}

	public void setNomSesion(String nomSesion) {
		this.nomSesion = nomSesion;
	}

	public String getNumActividad() {
		return numActividad;
	}

	public void setNumActividad(String numActividad) {
		this.numActividad = numActividad;
	}

	public Double getPctSesion() {
		return pctSesion;
	}

	public void setPctSesion(Double pctSesion) {
		this.pctSesion = pctSesion;
	}

	public Date getFchSesion() {
		return fchSesion;
	}

	public void setFchSesion(Date fchSesion) {
		this.fchSesion = fchSesion;
	}

	public String getNomActividad() {
		return nomActividad;
	}

	public void setNomActividad(String nomActividad) {
		this.nomActividad = nomActividad;
	}

	public String getNomOtraActividad() {
		return nomOtraActividad;
	}

	public void setNomOtraActividad(String nomOtraActividad) {
		this.nomOtraActividad = nomOtraActividad;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}


}