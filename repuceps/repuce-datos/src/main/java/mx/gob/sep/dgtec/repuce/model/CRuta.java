package mx.gob.sep.dgtec.repuce.model;

public class CRuta {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_ruta.c_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
     */
    private Short cRuta;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_ruta.nom_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
     */
    private String nomRuta;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_ruta.c_ruta
     *
     * @return the value of c_ruta.c_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
     */
    public Short getcRuta() {
        return cRuta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_ruta.c_ruta
     *
     * @param cRuta the value for c_ruta.c_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
     */
    public void setcRuta(Short cRuta) {
        this.cRuta = cRuta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_ruta.nom_ruta
     *
     * @return the value of c_ruta.nom_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
     */
    public String getNomRuta() {
        return nomRuta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_ruta.nom_ruta
     *
     * @param nomRuta the value for c_ruta.nom_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
     */
    public void setNomRuta(String nomRuta) {
        this.nomRuta = nomRuta == null ? null : nomRuta.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
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
        CRuta other = (CRuta) that;
        return (this.getcRuta() == null ? other.getcRuta() == null : this.getcRuta().equals(other.getcRuta()))
            && (this.getNomRuta() == null ? other.getNomRuta() == null : this.getNomRuta().equals(other.getNomRuta()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_ruta
     *
     * @mbggenerated Fri Sep 02 11:33:09 CDT 2016
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcRuta() == null) ? 0 : getcRuta().hashCode());
        result = prime * result + ((getNomRuta() == null) ? 0 : getNomRuta().hashCode());
        return result;
    }
}