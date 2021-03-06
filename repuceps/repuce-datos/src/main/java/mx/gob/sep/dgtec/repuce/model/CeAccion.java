package mx.gob.sep.dgtec.repuce.model;

public class CeAccion {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_accion.c_cct
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_accion.c_sesion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    private Short cSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_accion.id_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    private Short idAccion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_accion.accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    private String accion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_accion.recomendacion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    private String recomendacion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_accion.id_ruta
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    private Short idRuta;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_accion.nom_otra_ruta
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    private String nomOtraRuta;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_accion.c_cct
     *
     * @return the value of ce_accion.c_cct
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_accion.c_cct
     *
     * @param cCct the value for ce_accion.c_cct
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_accion.c_sesion
     *
     * @return the value of ce_accion.c_sesion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public Short getcSesion() {
        return cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_accion.c_sesion
     *
     * @param cSesion the value for ce_accion.c_sesion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_accion.id_accion
     *
     * @return the value of ce_accion.id_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public Short getIdAccion() {
        return idAccion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_accion.id_accion
     *
     * @param idAccion the value for ce_accion.id_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public void setIdAccion(Short idAccion) {
        this.idAccion = idAccion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_accion.accion
     *
     * @return the value of ce_accion.accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public String getAccion() {
        return accion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_accion.accion
     *
     * @param accion the value for ce_accion.accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public void setAccion(String accion) {
        this.accion = accion == null ? null : accion.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_accion.recomendacion
     *
     * @return the value of ce_accion.recomendacion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public String getRecomendacion() {
        return recomendacion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_accion.recomendacion
     *
     * @param recomendacion the value for ce_accion.recomendacion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public void setRecomendacion(String recomendacion) {
        this.recomendacion = recomendacion == null ? null : recomendacion.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_accion.id_ruta
     *
     * @return the value of ce_accion.id_ruta
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public Short getIdRuta() {
        return idRuta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_accion.id_ruta
     *
     * @param idRuta the value for ce_accion.id_ruta
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public void setIdRuta(Short idRuta) {
        this.idRuta = idRuta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_accion.nom_otra_ruta
     *
     * @return the value of ce_accion.nom_otra_ruta
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public String getNomOtraRuta() {
        return nomOtraRuta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_accion.nom_otra_ruta
     *
     * @param nomOtraRuta the value for ce_accion.nom_otra_ruta
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    public void setNomOtraRuta(String nomOtraRuta) {
        this.nomOtraRuta = nomOtraRuta == null ? null : nomOtraRuta.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
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
        CeAccion other = (CeAccion) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getIdAccion() == null ? other.getIdAccion() == null : this.getIdAccion().equals(other.getIdAccion()))
            && (this.getAccion() == null ? other.getAccion() == null : this.getAccion().equals(other.getAccion()))
            && (this.getRecomendacion() == null ? other.getRecomendacion() == null : this.getRecomendacion().equals(other.getRecomendacion()))
            && (this.getIdRuta() == null ? other.getIdRuta() == null : this.getIdRuta().equals(other.getIdRuta()))
            && (this.getNomOtraRuta() == null ? other.getNomOtraRuta() == null : this.getNomOtraRuta().equals(other.getNomOtraRuta()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_accion
     *
     * @mbggenerated Fri Sep 02 11:47:20 CDT 2016
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getIdAccion() == null) ? 0 : getIdAccion().hashCode());
        result = prime * result + ((getAccion() == null) ? 0 : getAccion().hashCode());
        result = prime * result + ((getRecomendacion() == null) ? 0 : getRecomendacion().hashCode());
        result = prime * result + ((getIdRuta() == null) ? 0 : getIdRuta().hashCode());
        result = prime * result + ((getNomOtraRuta() == null) ? 0 : getNomOtraRuta().hashCode());
        return result;
    }
}