package mx.gob.sep.dgtec.repuce.model;

public class CeProgramaComite {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_programa_comite.c_cct
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_programa_comite.c_sesion
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    private Short cSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_programa_comite.c_programa_comite
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    private Short cProgramaComite;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_programa_comite.opcion
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    private Short opcion;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_programa_comite.c_cct
     *
     * @return the value of ce_programa_comite.c_cct
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_programa_comite.c_cct
     *
     * @param cCct the value for ce_programa_comite.c_cct
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_programa_comite.c_sesion
     *
     * @return the value of ce_programa_comite.c_sesion
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public Short getcSesion() {
        return cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_programa_comite.c_sesion
     *
     * @param cSesion the value for ce_programa_comite.c_sesion
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_programa_comite.c_programa_comite
     *
     * @return the value of ce_programa_comite.c_programa_comite
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public Short getcProgramaComite() {
        return cProgramaComite;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_programa_comite.c_programa_comite
     *
     * @param cProgramaComite the value for ce_programa_comite.c_programa_comite
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public void setcProgramaComite(Short cProgramaComite) {
        this.cProgramaComite = cProgramaComite;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_programa_comite.opcion
     *
     * @return the value of ce_programa_comite.opcion
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public Short getOpcion() {
        return opcion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_programa_comite.opcion
     *
     * @param opcion the value for ce_programa_comite.opcion
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    public void setOpcion(Short opcion) {
        this.opcion = opcion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programa_comite
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
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
        CeProgramaComite other = (CeProgramaComite) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getcProgramaComite() == null ? other.getcProgramaComite() == null : this.getcProgramaComite().equals(other.getcProgramaComite()))
            && (this.getOpcion() == null ? other.getOpcion() == null : this.getOpcion().equals(other.getOpcion()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programa_comite
     *
     * @mbggenerated Wed Apr 20 11:35:12 CDT 2016
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getcProgramaComite() == null) ? 0 : getcProgramaComite().hashCode());
        result = prime * result + ((getOpcion() == null) ? 0 : getOpcion().hashCode());
        return result;
    }
}