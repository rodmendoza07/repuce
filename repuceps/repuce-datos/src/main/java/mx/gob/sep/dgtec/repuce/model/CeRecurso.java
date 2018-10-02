package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;

public class CeRecurso {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.c_cct
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.c_sesion
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private Short cSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.c_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private Short cRecurso;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.monto
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private BigDecimal monto;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.monto_str
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private String montoStr;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.uso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private String uso;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.especie
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private String especie;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.ind_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private String indRecurso;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_recurso.ind_transparenta
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    private Boolean indTransparenta;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.c_cct
     *
     * @return the value of ce_recurso.c_cct
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.c_cct
     *
     * @param cCct the value for ce_recurso.c_cct
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.c_sesion
     *
     * @return the value of ce_recurso.c_sesion
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public Short getcSesion() {
        return cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.c_sesion
     *
     * @param cSesion the value for ce_recurso.c_sesion
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.c_recurso
     *
     * @return the value of ce_recurso.c_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public Short getcRecurso() {
        return cRecurso;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.c_recurso
     *
     * @param cRecurso the value for ce_recurso.c_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setcRecurso(Short cRecurso) {
        this.cRecurso = cRecurso;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.monto
     *
     * @return the value of ce_recurso.monto
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public BigDecimal getMonto() {
        return monto;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.monto
     *
     * @param monto the value for ce_recurso.monto
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.monto_str
     *
     * @return the value of ce_recurso.monto_str
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public String getMontoStr() {
        return montoStr;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.monto_str
     *
     * @param montoStr the value for ce_recurso.monto_str
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setMontoStr(String montoStr) {
        this.montoStr = montoStr == null ? null : montoStr.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.uso
     *
     * @return the value of ce_recurso.uso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public String getUso() {
        return uso;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.uso
     *
     * @param uso the value for ce_recurso.uso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setUso(String uso) {
        this.uso = uso == null ? null : uso.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.especie
     *
     * @return the value of ce_recurso.especie
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public String getEspecie() {
        return especie;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.especie
     *
     * @param especie the value for ce_recurso.especie
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setEspecie(String especie) {
        this.especie = especie == null ? null : especie.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.ind_recurso
     *
     * @return the value of ce_recurso.ind_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public String getIndRecurso() {
        return indRecurso;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.ind_recurso
     *
     * @param indRecurso the value for ce_recurso.ind_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setIndRecurso(String indRecurso) {
        this.indRecurso = indRecurso == null ? null : indRecurso.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_recurso.ind_transparenta
     *
     * @return the value of ce_recurso.ind_transparenta
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public Boolean getIndTransparenta() {
        return indTransparenta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_recurso.ind_transparenta
     *
     * @param indTransparenta the value for ce_recurso.ind_transparenta
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setIndTransparenta(Boolean indTransparenta) {
        this.indTransparenta = indTransparenta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
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
        CeRecurso other = (CeRecurso) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getcRecurso() == null ? other.getcRecurso() == null : this.getcRecurso().equals(other.getcRecurso()))
            && (this.getMonto() == null ? other.getMonto() == null : this.getMonto().equals(other.getMonto()))
            && (this.getMontoStr() == null ? other.getMontoStr() == null : this.getMontoStr().equals(other.getMontoStr()))
            && (this.getUso() == null ? other.getUso() == null : this.getUso().equals(other.getUso()))
            && (this.getEspecie() == null ? other.getEspecie() == null : this.getEspecie().equals(other.getEspecie()))
            && (this.getIndRecurso() == null ? other.getIndRecurso() == null : this.getIndRecurso().equals(other.getIndRecurso()))
            && (this.getIndTransparenta() == null ? other.getIndTransparenta() == null : this.getIndTransparenta().equals(other.getIndTransparenta()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getcRecurso() == null) ? 0 : getcRecurso().hashCode());
        result = prime * result + ((getMonto() == null) ? 0 : getMonto().hashCode());
        result = prime * result + ((getMontoStr() == null) ? 0 : getMontoStr().hashCode());
        result = prime * result + ((getUso() == null) ? 0 : getUso().hashCode());
        result = prime * result + ((getEspecie() == null) ? 0 : getEspecie().hashCode());
        result = prime * result + ((getIndRecurso() == null) ? 0 : getIndRecurso().hashCode());
        result = prime * result + ((getIndTransparenta() == null) ? 0 : getIndTransparenta().hashCode());
        return result;
    }
}