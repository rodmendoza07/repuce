package mx.gob.sep.dgtec.repuce.model;

public class CTipoRespuesta {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_tipo_respuesta.c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Short cTipoRespuesta;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_tipo_respuesta.nom_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private String nomTipoRespuesta;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_tipo_respuesta.c_tipo_respuesta
     *
     * @return the value of c_tipo_respuesta.c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Short getcTipoRespuesta() {
        return cTipoRespuesta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_tipo_respuesta.c_tipo_respuesta
     *
     * @param cTipoRespuesta the value for c_tipo_respuesta.c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcTipoRespuesta(Short cTipoRespuesta) {
        this.cTipoRespuesta = cTipoRespuesta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_tipo_respuesta.nom_tipo_respuesta
     *
     * @return the value of c_tipo_respuesta.nom_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public String getNomTipoRespuesta() {
        return nomTipoRespuesta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_tipo_respuesta.nom_tipo_respuesta
     *
     * @param nomTipoRespuesta the value for c_tipo_respuesta.nom_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setNomTipoRespuesta(String nomTipoRespuesta) {
        this.nomTipoRespuesta = nomTipoRespuesta == null ? null : nomTipoRespuesta.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
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
        CTipoRespuesta other = (CTipoRespuesta) that;
        return (this.getcTipoRespuesta() == null ? other.getcTipoRespuesta() == null : this.getcTipoRespuesta().equals(other.getcTipoRespuesta()))
            && (this.getNomTipoRespuesta() == null ? other.getNomTipoRespuesta() == null : this.getNomTipoRespuesta().equals(other.getNomTipoRespuesta()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcTipoRespuesta() == null) ? 0 : getcTipoRespuesta().hashCode());
        result = prime * result + ((getNomTipoRespuesta() == null) ? 0 : getNomTipoRespuesta().hashCode());
        return result;
    }
}