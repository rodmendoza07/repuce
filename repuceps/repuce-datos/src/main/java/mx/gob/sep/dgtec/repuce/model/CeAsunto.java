package mx.gob.sep.dgtec.repuce.model;

public class CeAsunto {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_asunto.c_cct
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_asunto.c_sesion
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    private Short cSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_asunto.csc_asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    private Short cscAsunto;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_asunto.asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    private String asunto;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_asunto.acuerdo
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    private String acuerdo;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_asunto.c_cct
     *
     * @return the value of ce_asunto.c_cct
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_asunto.c_cct
     *
     * @param cCct the value for ce_asunto.c_cct
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_asunto.c_sesion
     *
     * @return the value of ce_asunto.c_sesion
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public Short getcSesion() {
        return cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_asunto.c_sesion
     *
     * @param cSesion the value for ce_asunto.c_sesion
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_asunto.csc_asunto
     *
     * @return the value of ce_asunto.csc_asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public Short getCscAsunto() {
        return cscAsunto;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_asunto.csc_asunto
     *
     * @param cscAsunto the value for ce_asunto.csc_asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public void setCscAsunto(Short cscAsunto) {
        this.cscAsunto = cscAsunto;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_asunto.asunto
     *
     * @return the value of ce_asunto.asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public String getAsunto() {
        return asunto;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_asunto.asunto
     *
     * @param asunto the value for ce_asunto.asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public void setAsunto(String asunto) {
        this.asunto = asunto == null ? null : asunto.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_asunto.acuerdo
     *
     * @return the value of ce_asunto.acuerdo
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public String getAcuerdo() {
        return acuerdo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_asunto.acuerdo
     *
     * @param acuerdo the value for ce_asunto.acuerdo
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    public void setAcuerdo(String acuerdo) {
        this.acuerdo = acuerdo == null ? null : acuerdo.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
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
        CeAsunto other = (CeAsunto) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getCscAsunto() == null ? other.getCscAsunto() == null : this.getCscAsunto().equals(other.getCscAsunto()))
            && (this.getAsunto() == null ? other.getAsunto() == null : this.getAsunto().equals(other.getAsunto()))
            && (this.getAcuerdo() == null ? other.getAcuerdo() == null : this.getAcuerdo().equals(other.getAcuerdo()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_asunto
     *
     * @mbggenerated Mon Aug 11 19:48:55 CDT 2014
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getCscAsunto() == null) ? 0 : getCscAsunto().hashCode());
        result = prime * result + ((getAsunto() == null) ? 0 : getAsunto().hashCode());
        result = prime * result + ((getAcuerdo() == null) ? 0 : getAcuerdo().hashCode());
        return result;
    }
}