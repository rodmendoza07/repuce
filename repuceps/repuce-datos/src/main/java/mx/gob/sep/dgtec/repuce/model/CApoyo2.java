package mx.gob.sep.dgtec.repuce.model;

public class CApoyo2 {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_apoyo2.c_apoyo
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    private Integer cApoyo;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_apoyo2.c_tipo_apoyo
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    private Integer cTipoApoyo;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_apoyo2.nombre
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    private String nombre;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_apoyo2.c_apoyo
     *
     * @return the value of c_apoyo2.c_apoyo
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    public Integer getcApoyo() {
        return cApoyo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_apoyo2.c_apoyo
     *
     * @param cApoyo the value for c_apoyo2.c_apoyo
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    public void setcApoyo(Integer cApoyo) {
        this.cApoyo = cApoyo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_apoyo2.c_tipo_apoyo
     *
     * @return the value of c_apoyo2.c_tipo_apoyo
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    public Integer getcTipoApoyo() {
        return cTipoApoyo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_apoyo2.c_tipo_apoyo
     *
     * @param cTipoApoyo the value for c_apoyo2.c_tipo_apoyo
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    public void setcTipoApoyo(Integer cTipoApoyo) {
        this.cTipoApoyo = cTipoApoyo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_apoyo2.nombre
     *
     * @return the value of c_apoyo2.nombre
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_apoyo2.nombre
     *
     * @param nombre the value for c_apoyo2.nombre
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    public void setNombre(String nombre) {
        this.nombre = nombre == null ? null : nombre.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
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
        CApoyo2 other = (CApoyo2) that;
        return (this.getcApoyo() == null ? other.getcApoyo() == null : this.getcApoyo().equals(other.getcApoyo()))
            && (this.getcTipoApoyo() == null ? other.getcTipoApoyo() == null : this.getcTipoApoyo().equals(other.getcTipoApoyo()))
            && (this.getNombre() == null ? other.getNombre() == null : this.getNombre().equals(other.getNombre()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_apoyo2
     *
     * @mbggenerated Fri Jun 02 16:15:03 CDT 2017
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcApoyo() == null) ? 0 : getcApoyo().hashCode());
        result = prime * result + ((getcTipoApoyo() == null) ? 0 : getcTipoApoyo().hashCode());
        result = prime * result + ((getNombre() == null) ? 0 : getNombre().hashCode());
        return result;
    }
}