package mx.gob.sep.dgtec.repuce.model;

public class ConsejoMun {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column consejo_mun.id_entidadfed
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    private Short idEntidadfed;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column consejo_mun.id_municipio
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    private Integer idMunicipio;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column consejo_mun.archivo
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    private String archivo;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column consejo_mun.id_entidadfed
     *
     * @return the value of consejo_mun.id_entidadfed
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    public Short getIdEntidadfed() {
        return idEntidadfed;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column consejo_mun.id_entidadfed
     *
     * @param idEntidadfed the value for consejo_mun.id_entidadfed
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    public void setIdEntidadfed(Short idEntidadfed) {
        this.idEntidadfed = idEntidadfed;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column consejo_mun.id_municipio
     *
     * @return the value of consejo_mun.id_municipio
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    public Integer getIdMunicipio() {
        return idMunicipio;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column consejo_mun.id_municipio
     *
     * @param idMunicipio the value for consejo_mun.id_municipio
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    public void setIdMunicipio(Integer idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column consejo_mun.archivo
     *
     * @return the value of consejo_mun.archivo
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    public String getArchivo() {
        return archivo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column consejo_mun.archivo
     *
     * @param archivo the value for consejo_mun.archivo
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    public void setArchivo(String archivo) {
        this.archivo = archivo == null ? null : archivo.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table consejo_mun
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
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
        ConsejoMun other = (ConsejoMun) that;
        return (this.getIdEntidadfed() == null ? other.getIdEntidadfed() == null : this.getIdEntidadfed().equals(other.getIdEntidadfed()))
            && (this.getIdMunicipio() == null ? other.getIdMunicipio() == null : this.getIdMunicipio().equals(other.getIdMunicipio()))
            && (this.getArchivo() == null ? other.getArchivo() == null : this.getArchivo().equals(other.getArchivo()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table consejo_mun
     *
     * @mbggenerated Tue May 07 23:32:37 CDT 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getIdEntidadfed() == null) ? 0 : getIdEntidadfed().hashCode());
        result = prime * result + ((getIdMunicipio() == null) ? 0 : getIdMunicipio().hashCode());
        result = prime * result + ((getArchivo() == null) ? 0 : getArchivo().hashCode());
        return result;
    }
}