package mx.gob.sep.dgtec.repuce.model;

public class ApecReunionIntegrante {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_integrante.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Integer cApec;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_integrante.c_reunion
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Short cReunion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_integrante.c_apec_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Integer cApecIntegrante;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_integrante.c_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Short cIntegrante;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_integrante.c_apec
     *
     * @return the value of apec_reunion_integrante.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Integer getcApec() {
        return cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_integrante.c_apec
     *
     * @param cApec the value for apec_reunion_integrante.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcApec(Integer cApec) {
        this.cApec = cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_integrante.c_reunion
     *
     * @return the value of apec_reunion_integrante.c_reunion
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Short getcReunion() {
        return cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_integrante.c_reunion
     *
     * @param cReunion the value for apec_reunion_integrante.c_reunion
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcReunion(Short cReunion) {
        this.cReunion = cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_integrante.c_apec_integrante
     *
     * @return the value of apec_reunion_integrante.c_apec_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Integer getcApecIntegrante() {
        return cApecIntegrante;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_integrante.c_apec_integrante
     *
     * @param cApecIntegrante the value for apec_reunion_integrante.c_apec_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcApecIntegrante(Integer cApecIntegrante) {
        this.cApecIntegrante = cApecIntegrante;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_integrante.c_integrante
     *
     * @return the value of apec_reunion_integrante.c_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Short getcIntegrante() {
        return cIntegrante;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_integrante.c_integrante
     *
     * @param cIntegrante the value for apec_reunion_integrante.c_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcIntegrante(Short cIntegrante) {
        this.cIntegrante = cIntegrante;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
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
        ApecReunionIntegrante other = (ApecReunionIntegrante) that;
        return (this.getcApec() == null ? other.getcApec() == null : this.getcApec().equals(other.getcApec()))
            && (this.getcReunion() == null ? other.getcReunion() == null : this.getcReunion().equals(other.getcReunion()))
            && (this.getcApecIntegrante() == null ? other.getcApecIntegrante() == null : this.getcApecIntegrante().equals(other.getcApecIntegrante()))
            && (this.getcIntegrante() == null ? other.getcIntegrante() == null : this.getcIntegrante().equals(other.getcIntegrante()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_integrante
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcApec() == null) ? 0 : getcApec().hashCode());
        result = prime * result + ((getcReunion() == null) ? 0 : getcReunion().hashCode());
        result = prime * result + ((getcApecIntegrante() == null) ? 0 : getcApecIntegrante().hashCode());
        result = prime * result + ((getcIntegrante() == null) ? 0 : getcIntegrante().hashCode());
        return result;
    }
}