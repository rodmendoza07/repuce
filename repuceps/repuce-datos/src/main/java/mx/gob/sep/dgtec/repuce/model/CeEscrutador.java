package mx.gob.sep.dgtec.repuce.model;

public class CeEscrutador {
    private Integer cCct;
    private Short cSesion;
    private Short cscEscrutador;
    private String paternoEscrutador;
    private String maternoEscrutador;
    private String nombreEscrutador;
    
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

	public Short getCscEscrutador() {
		return cscEscrutador;
	}

	public void setCscEscrutador(Short cscEscrutador) {
		this.cscEscrutador = cscEscrutador;
	}

	public String getPaternoEscrutador() {
		return paternoEscrutador;
	}

	public void setPaternoEscrutador(String paternoEscrutador) {
		this.paternoEscrutador = paternoEscrutador;
	}

	public String getMaternoEscrutador() {
		return maternoEscrutador;
	}

	public void setMaternoEscrutador(String maternoEscrutador) {
		this.maternoEscrutador = maternoEscrutador;
	}

	public String getNombreEscrutador() {
		return nombreEscrutador;
	}

	public void setNombreEscrutador(String nombreEscrutador) {
		this.nombreEscrutador = nombreEscrutador;
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
        CeEscrutador other = (CeEscrutador) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getCscEscrutador() == null ? other.getCscEscrutador() == null : this.getCscEscrutador().equals(other.getCscEscrutador()))
            && (this.getPaternoEscrutador() == null ? other.getPaternoEscrutador() == null : this.getPaternoEscrutador().equals(other.getPaternoEscrutador()))
            && (this.getMaternoEscrutador() == null ? other.getMaternoEscrutador() == null : this.getMaternoEscrutador().equals(other.getMaternoEscrutador()))
            && (this.getNombreEscrutador() == null ? other.getNombreEscrutador() == null : this.getNombreEscrutador().equals(other.getNombreEscrutador()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getCscEscrutador() == null) ? 0 : getCscEscrutador().hashCode());
        result = prime * result + ((getPaternoEscrutador() == null) ? 0 : getPaternoEscrutador().hashCode());
        result = prime * result + ((getMaternoEscrutador() == null) ? 0 : getMaternoEscrutador().hashCode());
        result = prime * result + ((getNombreEscrutador() == null) ? 0 : getNombreEscrutador().hashCode());        
        return result;
    }
}