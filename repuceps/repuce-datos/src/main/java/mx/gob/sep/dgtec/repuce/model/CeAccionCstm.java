package mx.gob.sep.dgtec.repuce.model;

public class CeAccionCstm {

    
    private Integer cCct;
    private Short cSesion;
    private Short idAccion;
    private String accion;
    private short avanceAccion;

    private String recomendacion;
    private short avanceRecomendacion;
    
    private Short idRuta;
    private String nomOtraRuta;
    private String nomRuta;
    public Integer getcCct() {
        return cCct;
    }
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    public Short getcSesion() {
        return cSesion;
    }

    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    public Short getIdAccion() {
        return idAccion;
    }

    public void setIdAccion(Short idAccion) {
        this.idAccion = idAccion;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion == null ? null : accion.trim();
    }

    public String getRecomendacion() {
        return recomendacion;
    }
    public void setRecomendacion(String recomendacion) {
        this.recomendacion = recomendacion == null ? null : recomendacion.trim();
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
        CeAccion other = (CeAccion) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getIdAccion() == null ? other.getIdAccion() == null : this.getIdAccion().equals(other.getIdAccion()))
            && (this.getAccion() == null ? other.getAccion() == null : this.getAccion().equals(other.getAccion()))
            && (this.getRecomendacion() == null ? other.getRecomendacion() == null : this.getRecomendacion().equals(other.getRecomendacion()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getIdAccion() == null) ? 0 : getIdAccion().hashCode());
        result = prime * result + ((getAccion() == null) ? 0 : getAccion().hashCode());
        result = prime * result + ((getRecomendacion() == null) ? 0 : getRecomendacion().hashCode());
        return result;
    }

	public short getAvanceAccion() {
		return avanceAccion;
	}

	public void setAvanceAccion(short avanceAccion) {
		this.avanceAccion = avanceAccion;
	}

	public short getAvanceRecomendacion() {
		return avanceRecomendacion;
	}

	public void setAvanceRecomendacion(short avanceRecomendacion) {
		this.avanceRecomendacion = avanceRecomendacion;
	}
	public Short getIdRuta() {
		return idRuta;
	}
	public void setIdRuta(Short idRuta) {
		this.idRuta = idRuta;
	}
	public String getNomOtraRuta() {
		return nomOtraRuta;
	}
	public void setNomOtraRuta(String nomOtraRuta) {
		this.nomOtraRuta = nomOtraRuta;
	}
	public String getNomRuta() {
		return nomRuta;
	}
	public void setNomRuta(String nomRuta) {
		this.nomRuta = nomRuta;
	}
}
