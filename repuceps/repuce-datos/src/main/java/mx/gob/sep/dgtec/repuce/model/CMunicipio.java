package mx.gob.sep.dgtec.repuce.model;

import java.util.Date;

public class CMunicipio {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_municipio.id_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    private Integer idMunicipio;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_municipio.id_entidadfed
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    private Short idEntidadfed;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_municipio.nom_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    private String nomMunicipio;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_municipio.fch_ini_vigencia
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    private Date fchIniVigencia;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_municipio.status
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    private String status;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_municipio.id_usuario
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    private String idUsuario;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_municipio.id_municipio
     *
     * @return the value of c_municipio.id_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public Integer getIdMunicipio() {
        return idMunicipio;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_municipio.id_municipio
     *
     * @param idMunicipio the value for c_municipio.id_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setIdMunicipio(Integer idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_municipio.id_entidadfed
     *
     * @return the value of c_municipio.id_entidadfed
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public Short getIdEntidadfed() {
        return idEntidadfed;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_municipio.id_entidadfed
     *
     * @param idEntidadfed the value for c_municipio.id_entidadfed
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setIdEntidadfed(Short idEntidadfed) {
        this.idEntidadfed = idEntidadfed;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_municipio.nom_municipio
     *
     * @return the value of c_municipio.nom_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getNomMunicipio() {
        return nomMunicipio;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_municipio.nom_municipio
     *
     * @param nomMunicipio the value for c_municipio.nom_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setNomMunicipio(String nomMunicipio) {
        this.nomMunicipio = nomMunicipio == null ? null : nomMunicipio.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_municipio.fch_ini_vigencia
     *
     * @return the value of c_municipio.fch_ini_vigencia
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public Date getFchIniVigencia() {
        return fchIniVigencia;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_municipio.fch_ini_vigencia
     *
     * @param fchIniVigencia the value for c_municipio.fch_ini_vigencia
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setFchIniVigencia(Date fchIniVigencia) {
        this.fchIniVigencia = fchIniVigencia;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_municipio.status
     *
     * @return the value of c_municipio.status
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getStatus() {
        return status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_municipio.status
     *
     * @param status the value for c_municipio.status
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_municipio.id_usuario
     *
     * @return the value of c_municipio.id_usuario
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getIdUsuario() {
        return idUsuario;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_municipio.id_usuario
     *
     * @param idUsuario the value for c_municipio.id_usuario
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario == null ? null : idUsuario.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
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
        CMunicipio other = (CMunicipio) that;
        return (this.getIdMunicipio() == null ? other.getIdMunicipio() == null : this.getIdMunicipio().equals(other.getIdMunicipio()))
            && (this.getIdEntidadfed() == null ? other.getIdEntidadfed() == null : this.getIdEntidadfed().equals(other.getIdEntidadfed()))
            && (this.getNomMunicipio() == null ? other.getNomMunicipio() == null : this.getNomMunicipio().equals(other.getNomMunicipio()))
            && (this.getFchIniVigencia() == null ? other.getFchIniVigencia() == null : this.getFchIniVigencia().equals(other.getFchIniVigencia()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getIdUsuario() == null ? other.getIdUsuario() == null : this.getIdUsuario().equals(other.getIdUsuario()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getIdMunicipio() == null) ? 0 : getIdMunicipio().hashCode());
        result = prime * result + ((getIdEntidadfed() == null) ? 0 : getIdEntidadfed().hashCode());
        result = prime * result + ((getNomMunicipio() == null) ? 0 : getNomMunicipio().hashCode());
        result = prime * result + ((getFchIniVigencia() == null) ? 0 : getFchIniVigencia().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getIdUsuario() == null) ? 0 : getIdUsuario().hashCode());
        return result;
    }
}