package mx.gob.sep.dgtec.repuce.model;

public class CNormalidad {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_normalidad.c_normalidad
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private Integer cNormalidad;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_normalidad.descrip_normalidad
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    private String descripNormalidad;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_normalidad.c_normalidad
     *
     * @return the value of c_normalidad.c_normalidad
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public Integer getcNormalidad() {
        return cNormalidad;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_normalidad.c_normalidad
     *
     * @param cNormalidad the value for c_normalidad.c_normalidad
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setcNormalidad(Integer cNormalidad) {
        this.cNormalidad = cNormalidad;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_normalidad.descrip_normalidad
     *
     * @return the value of c_normalidad.descrip_normalidad
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public String getDescripNormalidad() {
        return descripNormalidad;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_normalidad.descrip_normalidad
     *
     * @param descripNormalidad the value for c_normalidad.descrip_normalidad
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    public void setDescripNormalidad(String descripNormalidad) {
        this.descripNormalidad = descripNormalidad == null ? null : descripNormalidad.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_normalidad
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
        CNormalidad other = (CNormalidad) that;
        return (this.getcNormalidad() == null ? other.getcNormalidad() == null : this.getcNormalidad().equals(other.getcNormalidad()))
            && (this.getDescripNormalidad() == null ? other.getDescripNormalidad() == null : this.getDescripNormalidad().equals(other.getDescripNormalidad()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_normalidad
     *
     * @mbggenerated Thu Nov 06 17:34:56 CST 2014
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcNormalidad() == null) ? 0 : getcNormalidad().hashCode());
        result = prime * result + ((getDescripNormalidad() == null) ? 0 : getDescripNormalidad().hashCode());
        return result;
    }
}