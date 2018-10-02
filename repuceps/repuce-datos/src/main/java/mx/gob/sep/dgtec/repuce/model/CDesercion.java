package mx.gob.sep.dgtec.repuce.model;

public class CDesercion {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_desercion.c_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    private Short cDesercion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_desercion.descrip_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    private String descripDesercion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_desercion.descrip_corta
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    private String descripCorta;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_desercion.c_desercion
     *
     * @return the value of c_desercion.c_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    public Short getcDesercion() {
        return cDesercion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_desercion.c_desercion
     *
     * @param cDesercion the value for c_desercion.c_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    public void setcDesercion(Short cDesercion) {
        this.cDesercion = cDesercion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_desercion.descrip_desercion
     *
     * @return the value of c_desercion.descrip_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    public String getDescripDesercion() {
        return descripDesercion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_desercion.descrip_desercion
     *
     * @param descripDesercion the value for c_desercion.descrip_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    public void setDescripDesercion(String descripDesercion) {
        this.descripDesercion = descripDesercion == null ? null : descripDesercion.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_desercion.descrip_corta
     *
     * @return the value of c_desercion.descrip_corta
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    public String getDescripCorta() {
        return descripCorta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_desercion.descrip_corta
     *
     * @param descripCorta the value for c_desercion.descrip_corta
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    public void setDescripCorta(String descripCorta) {
        this.descripCorta = descripCorta == null ? null : descripCorta.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
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
        CDesercion other = (CDesercion) that;
        return (this.getcDesercion() == null ? other.getcDesercion() == null : this.getcDesercion().equals(other.getcDesercion()))
            && (this.getDescripDesercion() == null ? other.getDescripDesercion() == null : this.getDescripDesercion().equals(other.getDescripDesercion()))
            && (this.getDescripCorta() == null ? other.getDescripCorta() == null : this.getDescripCorta().equals(other.getDescripCorta()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_desercion
     *
     * @mbggenerated Fri Dec 06 17:33:01 CST 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcDesercion() == null) ? 0 : getcDesercion().hashCode());
        result = prime * result + ((getDescripDesercion() == null) ? 0 : getDescripDesercion().hashCode());
        result = prime * result + ((getDescripCorta() == null) ? 0 : getDescripCorta().hashCode());
        return result;
    }
}