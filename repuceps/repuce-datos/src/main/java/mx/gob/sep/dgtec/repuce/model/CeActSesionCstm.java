package mx.gob.sep.dgtec.repuce.model;

public class CeActSesionCstm extends CeActSesion{
	
	private String nomActividad;

	public CeActSesionCstm(){
		super();
	}
	
	public CeActSesionCstm(Short cActividad, String nomActividad){
		setcActividad(cActividad);
		setNomActividad(nomActividad);
	}
	
	public String getNomActividad() {
		return nomActividad;
	}

	public void setNomActividad(String nomActividad) {
		this.nomActividad = nomActividad;
	}
	
	@Override
	public int hashCode() {
	    return getcActividad();
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
        
        CeActSesionCstm other = (CeActSesionCstm) that;
		return this.getcActividad() == null ? other.getcActividad() == null : 
        	this.getcActividad().equals(other.getcActividad());
    }

}