package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;

public class CeEvento {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.c_cct
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.c_sesion
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private Short cSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.c_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private Short cEvento;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.nom_otro_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String nomOtroEvento;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.ind_recurso
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String indRecurso;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.periodo_realizado
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String periodoRealizado;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.actividades
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String actividades;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.objetivo
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String objetivo;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.monto
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private BigDecimal monto;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.monto_str
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String montoStr;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.actividades_fin
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String actividadesFin;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_evento.objetivo_fin
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    private String objetivoFin;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.c_cct
     *
     * @return the value of ce_evento.c_cct
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.c_cct
     *
     * @param cCct the value for ce_evento.c_cct
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.c_sesion
     *
     * @return the value of ce_evento.c_sesion
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public Short getcSesion() {
        return cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.c_sesion
     *
     * @param cSesion the value for ce_evento.c_sesion
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.c_evento
     *
     * @return the value of ce_evento.c_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public Short getcEvento() {
        return cEvento;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.c_evento
     *
     * @param cEvento the value for ce_evento.c_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setcEvento(Short cEvento) {
        this.cEvento = cEvento;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.nom_otro_evento
     *
     * @return the value of ce_evento.nom_otro_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getNomOtroEvento() {
        return nomOtroEvento;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.nom_otro_evento
     *
     * @param nomOtroEvento the value for ce_evento.nom_otro_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setNomOtroEvento(String nomOtroEvento) {
        this.nomOtroEvento = nomOtroEvento == null ? null : nomOtroEvento.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.ind_recurso
     *
     * @return the value of ce_evento.ind_recurso
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getIndRecurso() {
        return indRecurso;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.ind_recurso
     *
     * @param indRecurso the value for ce_evento.ind_recurso
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setIndRecurso(String indRecurso) {
        this.indRecurso = indRecurso == null ? null : indRecurso.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.periodo_realizado
     *
     * @return the value of ce_evento.periodo_realizado
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getPeriodoRealizado() {
        return periodoRealizado;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.periodo_realizado
     *
     * @param periodoRealizado the value for ce_evento.periodo_realizado
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setPeriodoRealizado(String periodoRealizado) {
        this.periodoRealizado = periodoRealizado == null ? null : periodoRealizado.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.actividades
     *
     * @return the value of ce_evento.actividades
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getActividades() {
        return actividades;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.actividades
     *
     * @param actividades the value for ce_evento.actividades
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setActividades(String actividades) {
        this.actividades = actividades == null ? null : actividades.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.objetivo
     *
     * @return the value of ce_evento.objetivo
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getObjetivo() {
        return objetivo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.objetivo
     *
     * @param objetivo the value for ce_evento.objetivo
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo == null ? null : objetivo.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.monto
     *
     * @return the value of ce_evento.monto
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public BigDecimal getMonto() {
        return monto;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.monto
     *
     * @param monto the value for ce_evento.monto
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.monto_str
     *
     * @return the value of ce_evento.monto_str
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getMontoStr() {
        return montoStr;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.monto_str
     *
     * @param montoStr the value for ce_evento.monto_str
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setMontoStr(String montoStr) {
        this.montoStr = montoStr == null ? null : montoStr.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.actividades_fin
     *
     * @return the value of ce_evento.actividades_fin
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getActividadesFin() {
        return actividadesFin;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.actividades_fin
     *
     * @param actividadesFin the value for ce_evento.actividades_fin
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setActividadesFin(String actividadesFin) {
        this.actividadesFin = actividadesFin == null ? null : actividadesFin.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_evento.objetivo_fin
     *
     * @return the value of ce_evento.objetivo_fin
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public String getObjetivoFin() {
        return objetivoFin;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_evento.objetivo_fin
     *
     * @param objetivoFin the value for ce_evento.objetivo_fin
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    public void setObjetivoFin(String objetivoFin) {
        this.objetivoFin = objetivoFin == null ? null : objetivoFin.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
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
        CeEvento other = (CeEvento) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getcEvento() == null ? other.getcEvento() == null : this.getcEvento().equals(other.getcEvento()))
            && (this.getNomOtroEvento() == null ? other.getNomOtroEvento() == null : this.getNomOtroEvento().equals(other.getNomOtroEvento()))
            && (this.getIndRecurso() == null ? other.getIndRecurso() == null : this.getIndRecurso().equals(other.getIndRecurso()))
            && (this.getPeriodoRealizado() == null ? other.getPeriodoRealizado() == null : this.getPeriodoRealizado().equals(other.getPeriodoRealizado()))
            && (this.getActividades() == null ? other.getActividades() == null : this.getActividades().equals(other.getActividades()))
            && (this.getObjetivo() == null ? other.getObjetivo() == null : this.getObjetivo().equals(other.getObjetivo()))
            && (this.getMonto() == null ? other.getMonto() == null : this.getMonto().equals(other.getMonto()))
            && (this.getMontoStr() == null ? other.getMontoStr() == null : this.getMontoStr().equals(other.getMontoStr()))
            && (this.getActividadesFin() == null ? other.getActividadesFin() == null : this.getActividadesFin().equals(other.getActividadesFin()))
            && (this.getObjetivoFin() == null ? other.getObjetivoFin() == null : this.getObjetivoFin().equals(other.getObjetivoFin()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_evento
     *
     * @mbggenerated Wed Jan 30 11:38:48 CST 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getcEvento() == null) ? 0 : getcEvento().hashCode());
        result = prime * result + ((getNomOtroEvento() == null) ? 0 : getNomOtroEvento().hashCode());
        result = prime * result + ((getIndRecurso() == null) ? 0 : getIndRecurso().hashCode());
        result = prime * result + ((getPeriodoRealizado() == null) ? 0 : getPeriodoRealizado().hashCode());
        result = prime * result + ((getActividades() == null) ? 0 : getActividades().hashCode());
        result = prime * result + ((getObjetivo() == null) ? 0 : getObjetivo().hashCode());
        result = prime * result + ((getMonto() == null) ? 0 : getMonto().hashCode());
        result = prime * result + ((getMontoStr() == null) ? 0 : getMontoStr().hashCode());
        result = prime * result + ((getActividadesFin() == null) ? 0 : getActividadesFin().hashCode());
        result = prime * result + ((getObjetivoFin() == null) ? 0 : getObjetivoFin().hashCode());
        return result;
    }
}