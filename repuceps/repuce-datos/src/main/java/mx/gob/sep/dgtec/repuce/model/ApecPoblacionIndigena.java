package mx.gob.sep.dgtec.repuce.model;

public class ApecPoblacionIndigena {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_poblacion_indigena.c_apec
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Integer cApec;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_poblacion_indigena.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Short cReunion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_poblacion_indigena.c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Short cPoblacionIndigena;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_poblacion_indigena.poblacion_afectada
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Integer poblacionAfectada;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_poblacion_indigena.c_lengua
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Integer cLengua;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_poblacion_indigena.c_apec
     *
     * @return the value of apec_poblacion_indigena.c_apec
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Integer getcApec() {
        return cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_poblacion_indigena.c_apec
     *
     * @param cApec the value for apec_poblacion_indigena.c_apec
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcApec(Integer cApec) {
        this.cApec = cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_poblacion_indigena.c_reunion
     *
     * @return the value of apec_poblacion_indigena.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Short getcReunion() {
        return cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_poblacion_indigena.c_reunion
     *
     * @param cReunion the value for apec_poblacion_indigena.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcReunion(Short cReunion) {
        this.cReunion = cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_poblacion_indigena.c_poblacion_indigena
     *
     * @return the value of apec_poblacion_indigena.c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Short getcPoblacionIndigena() {
        return cPoblacionIndigena;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_poblacion_indigena.c_poblacion_indigena
     *
     * @param cPoblacionIndigena the value for apec_poblacion_indigena.c_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcPoblacionIndigena(Short cPoblacionIndigena) {
        this.cPoblacionIndigena = cPoblacionIndigena;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_poblacion_indigena.poblacion_afectada
     *
     * @return the value of apec_poblacion_indigena.poblacion_afectada
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Integer getPoblacionAfectada() {
        return poblacionAfectada;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_poblacion_indigena.poblacion_afectada
     *
     * @param poblacionAfectada the value for apec_poblacion_indigena.poblacion_afectada
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setPoblacionAfectada(Integer poblacionAfectada) {
        this.poblacionAfectada = poblacionAfectada;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_poblacion_indigena.c_lengua
     *
     * @return the value of apec_poblacion_indigena.c_lengua
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Integer getcLengua() {
        return cLengua;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_poblacion_indigena.c_lengua
     *
     * @param cLengua the value for apec_poblacion_indigena.c_lengua
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcLengua(Integer cLengua) {
        this.cLengua = cLengua;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
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
        ApecPoblacionIndigena other = (ApecPoblacionIndigena) that;
        return (this.getcApec() == null ? other.getcApec() == null : this.getcApec().equals(other.getcApec()))
            && (this.getcReunion() == null ? other.getcReunion() == null : this.getcReunion().equals(other.getcReunion()))
            && (this.getcPoblacionIndigena() == null ? other.getcPoblacionIndigena() == null : this.getcPoblacionIndigena().equals(other.getcPoblacionIndigena()))
            && (this.getPoblacionAfectada() == null ? other.getPoblacionAfectada() == null : this.getPoblacionAfectada().equals(other.getPoblacionAfectada()))
            && (this.getcLengua() == null ? other.getcLengua() == null : this.getcLengua().equals(other.getcLengua()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_poblacion_indigena
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcApec() == null) ? 0 : getcApec().hashCode());
        result = prime * result + ((getcReunion() == null) ? 0 : getcReunion().hashCode());
        result = prime * result + ((getcPoblacionIndigena() == null) ? 0 : getcPoblacionIndigena().hashCode());
        result = prime * result + ((getPoblacionAfectada() == null) ? 0 : getPoblacionAfectada().hashCode());
        result = prime * result + ((getcLengua() == null) ? 0 : getcLengua().hashCode());
        return result;
    }
}