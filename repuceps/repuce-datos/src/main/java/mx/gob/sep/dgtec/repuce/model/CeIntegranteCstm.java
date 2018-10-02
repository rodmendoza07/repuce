package mx.gob.sep.dgtec.repuce.model;



public class CeIntegranteCstm  extends CeIntegrante{
    
	/**
	 * Descripcion del cargo del integrante del consejo escolar
	 */
	private String nomCargo;

	/**
	 * Descripcion del nivel educativo del integrante del consejo escolar
	 */
    private String nomNiveleduc;

    /**
     * Descripcion del nivel educativo del hijo del miembro del 
     * consejo escolar, si es que cuenta con alguno, 'No' de lo
     * contrario.
     */
    private String nomNivel;

    /**
     * Descripcion de la calidad del integrante del consejo escolar
     */
    private String nomCalidad;

    /**
     * Estatus del integrante el cual puede ser:
     * 0 Dado de baja
     * 1 Integrante de constitución original
     * 2 Integrante que reemplaza 
     */
    private Short estatusInt;

	public String getNomCargo() {
		return nomCargo;
	}

	public void setNomCargo(String nomCargo) {
		this.nomCargo = nomCargo;
	}

	public String getNomNiveleduc() {
		return nomNiveleduc;
	}

	public void setNomNiveleduc(String nomNiveleduc) {
		this.nomNiveleduc = nomNiveleduc;
	}

	public String getNomNivel() {
		return nomNivel;
	}

	public void setNomNivel(String nomNivel) {
		this.nomNivel = nomNivel;
	}

	public String getNomCalidad() {
		return nomCalidad;
	}

	public void setNomCalidad(String nomCalidad) {
		this.nomCalidad = nomCalidad;
	}

	public Short getEstatusInt() {
		return estatusInt;
	}

	public void setEstatusInt(Short estatusInt) {
		this.estatusInt = estatusInt;
	}
	
	@Override
	public int hashCode() {
	    return getCscIntegrante();
	}
	
    @Override
    public boolean equals(Object that) {
    	if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        
        CeIntegranteCstm other = (CeIntegranteCstm) that;
		return this.getCscIntegrante() == null ? other.getCscIntegrante() == null : 
        	this.getCscIntegrante().equals(other.getCscIntegrante());
    }

}