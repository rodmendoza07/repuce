package mx.gob.sep.dgtec.repuce.model;

public class CParticipacion {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_participacion.c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private Integer cParticipacion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_participacion.descrip_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private String descripParticipacion;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_participacion.c_participacion
     *
     * @return the value of c_participacion.c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public Integer getcParticipacion() {
        return cParticipacion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_participacion.c_participacion
     *
     * @param cParticipacion the value for c_participacion.c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setcParticipacion(Integer cParticipacion) {
        this.cParticipacion = cParticipacion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_participacion.descrip_participacion
     *
     * @return the value of c_participacion.descrip_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public String getDescripParticipacion() {
        return descripParticipacion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_participacion.descrip_participacion
     *
     * @param descripParticipacion the value for c_participacion.descrip_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setDescripParticipacion(String descripParticipacion) {
        this.descripParticipacion = descripParticipacion == null ? null : descripParticipacion.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
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
        CParticipacion other = (CParticipacion) that;
        return (this.getcParticipacion() == null ? other.getcParticipacion() == null : this.getcParticipacion().equals(other.getcParticipacion()))
            && (this.getDescripParticipacion() == null ? other.getDescripParticipacion() == null : this.getDescripParticipacion().equals(other.getDescripParticipacion()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_participacion
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcParticipacion() == null) ? 0 : getcParticipacion().hashCode());
        result = prime * result + ((getDescripParticipacion() == null) ? 0 : getDescripParticipacion().hashCode());
        return result;
    }
}