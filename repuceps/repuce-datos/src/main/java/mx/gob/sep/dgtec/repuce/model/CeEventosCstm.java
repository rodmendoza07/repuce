package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;

public class CeEventosCstm {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_eventos.c_cct
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_eventos.c_sesion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private Short cSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_eventos.c_evento
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private Integer cEvento;
    
    private String nomEvento;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_eventos.fecha_horarios_programados
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private String fechaHorariosProgramados;
    private String fechaHorariosProgramados2;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_eventos.fuente_recursos
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private Integer fuenteRecursos;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_eventos.c_cct
     *
     * @return the value of ce_eventos.c_cct
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private String nomOtroEvento;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_eventos.c_cct
     *
     * @return the value of ce_eventos.c_cct
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private String nomOtroFr;
    
    private Integer cumplioEvento;
    private BigDecimal montoR;
    private String montoStrR;
    private BigDecimal montoG;
    private String montoStrG;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_eventos.c_cct
     *
     * @return the value of ce_eventos.c_cct
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_eventos.c_cct
     *
     * @param cCct the value for ce_eventos.c_cct
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_eventos.c_sesion
     *
     * @return the value of ce_eventos.c_sesion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public Short getcSesion() {
        return cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_eventos.c_sesion
     *
     * @param cSesion the value for ce_eventos.c_sesion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_eventos.c_evento
     *
     * @return the value of ce_eventos.c_evento
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public Integer getcEvento() {
        return cEvento;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_eventos.c_evento
     *
     * @param cEvento the value for ce_eventos.c_evento
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setcEvento(Integer cEvento) {
        this.cEvento = cEvento;
    }
        
    public String getNomEvento() {
		return nomEvento;
	}

	public void setNomEvento(String nomEvento) {
		this.nomEvento = nomEvento;
	}

	/**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_eventos.fecha_horarios_programados
     *
     * @return the value of ce_eventos.fecha_horarios_programados
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
        
    public String getFechaHorariosProgramados() {
        return fechaHorariosProgramados;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_eventos.fecha_horarios_programados
     *
     * @param fechaHorariosProgramados the value for ce_eventos.fecha_horarios_programados
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setFechaHorariosProgramados(String fechaHorariosProgramados) {
        this.fechaHorariosProgramados = fechaHorariosProgramados == null ? null : fechaHorariosProgramados.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_eventos.fuente_recursos
     *
     * @return the value of ce_eventos.fuente_recursos
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public Integer getFuenteRecursos() {
        return fuenteRecursos;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_eventos.fuente_recursos
     *
     * @param fuenteRecursos the value for ce_eventos.fuente_recursos
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setFuenteRecursos(Integer fuenteRecursos) {
        this.fuenteRecursos = fuenteRecursos;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_eventos
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
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
        CeEventosCstm other = (CeEventosCstm) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getcEvento() == null ? other.getcEvento() == null : this.getcEvento().equals(other.getcEvento()))
            && (this.getFechaHorariosProgramados() == null ? other.getFechaHorariosProgramados() == null : this.getFechaHorariosProgramados().equals(other.getFechaHorariosProgramados()))
            && (this.getFuenteRecursos() == null ? other.getFuenteRecursos() == null : this.getFuenteRecursos().equals(other.getFuenteRecursos()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_eventos
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getcEvento() == null) ? 0 : getcEvento().hashCode());
        result = prime * result + ((getFechaHorariosProgramados() == null) ? 0 : getFechaHorariosProgramados().hashCode());
        result = prime * result + ((getFuenteRecursos() == null) ? 0 : getFuenteRecursos().hashCode());
        return result;
    }

	public String getNomOtroEvento() {
		return nomOtroEvento;
	}

	public void setNomOtroEvento(String nomOtroEvento) {
		this.nomOtroEvento = nomOtroEvento;
	}

	public String getNomOtroFr() {
		return nomOtroFr;
	}

	public void setNomOtroFr(String nomOtroFr) {
		this.nomOtroFr = nomOtroFr;
	}

	public Integer getCumplioEvento() {
		return cumplioEvento;
	}

	public void setCumplioEvento(Integer cumplioEvento) {
		this.cumplioEvento = cumplioEvento;
	}

	public BigDecimal getMontoR() {
		return montoR;
	}

	public void setMontoR(BigDecimal montoR) {
		this.montoR = montoR;
	}

	public String getMontoStrR() {
		return montoStrR;
	}

	public void setMontoStrR(String montoStrR) {
		this.montoStrR = montoStrR;
	}

	public BigDecimal getMontoG() {
		return montoG;
	}

	public void setMontoG(BigDecimal montoG) {
		this.montoG = montoG;
	}

	public String getMontoStrG() {
		return montoStrG;
	}

	public void setMontoStrG(String montoStrG) {
		this.montoStrG = montoStrG;
	}

	public String getFechaHorariosProgramados2() {
		return fechaHorariosProgramados2;
	}

	public void setFechaHorariosProgramados2(String fechaHorariosProgramados2) {
		this.fechaHorariosProgramados2 = fechaHorariosProgramados2;
	}
}