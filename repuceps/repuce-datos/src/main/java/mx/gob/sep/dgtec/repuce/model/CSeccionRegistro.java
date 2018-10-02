package mx.gob.sep.dgtec.repuce.model;

public class CSeccionRegistro {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_seccion_registro.c_seccion_registro
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Integer cSeccionRegistro;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_seccion_registro.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Short cReunion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_seccion_registro.nom_seccion_registro
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private String nomSeccionRegistro;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_seccion_registro.c_seccion_registro
     *
     * @return the value of c_seccion_registro.c_seccion_registro
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Integer getcSeccionRegistro() {
        return cSeccionRegistro;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_seccion_registro.c_seccion_registro
     *
     * @param cSeccionRegistro the value for c_seccion_registro.c_seccion_registro
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcSeccionRegistro(Integer cSeccionRegistro) {
        this.cSeccionRegistro = cSeccionRegistro;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_seccion_registro.c_reunion
     *
     * @return the value of c_seccion_registro.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Short getcReunion() {
        return cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_seccion_registro.c_reunion
     *
     * @param cReunion the value for c_seccion_registro.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcReunion(Short cReunion) {
        this.cReunion = cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_seccion_registro.nom_seccion_registro
     *
     * @return the value of c_seccion_registro.nom_seccion_registro
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public String getNomSeccionRegistro() {
        return nomSeccionRegistro;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_seccion_registro.nom_seccion_registro
     *
     * @param nomSeccionRegistro the value for c_seccion_registro.nom_seccion_registro
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setNomSeccionRegistro(String nomSeccionRegistro) {
        this.nomSeccionRegistro = nomSeccionRegistro == null ? null : nomSeccionRegistro.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_seccion_registro
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
        CSeccionRegistro other = (CSeccionRegistro) that;
        return (this.getcSeccionRegistro() == null ? other.getcSeccionRegistro() == null : this.getcSeccionRegistro().equals(other.getcSeccionRegistro()))
            && (this.getcReunion() == null ? other.getcReunion() == null : this.getcReunion().equals(other.getcReunion()))
            && (this.getNomSeccionRegistro() == null ? other.getNomSeccionRegistro() == null : this.getNomSeccionRegistro().equals(other.getNomSeccionRegistro()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_seccion_registro
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcSeccionRegistro() == null) ? 0 : getcSeccionRegistro().hashCode());
        result = prime * result + ((getcReunion() == null) ? 0 : getcReunion().hashCode());
        result = prime * result + ((getNomSeccionRegistro() == null) ? 0 : getNomSeccionRegistro().hashCode());
        return result;
    }
}