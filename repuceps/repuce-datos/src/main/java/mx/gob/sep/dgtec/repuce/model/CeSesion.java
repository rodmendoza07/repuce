package mx.gob.sep.dgtec.repuce.model;

import java.util.Date;

public class CeSesion {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.c_cct
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.c_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private Short cSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.fch_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private Date fchSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.hora_ini_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private String horaIniSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.hora_fin_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private String horaFinSesion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.num_integrantes
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private Short numIntegrantes;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.observaciones
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private String observaciones;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.fch_registro
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private Date fchRegistro;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.usr_captura
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private String usrCaptura;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.cadena
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private String cadena;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.publicadaen
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private String publicadaen;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ce_sesion.fechapublicacion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    private Date fechapublicacion;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.c_cct
     *
     * @return the value of ce_sesion.c_cct
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.c_cct
     *
     * @param cCct the value for ce_sesion.c_cct
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.c_sesion
     *
     * @return the value of ce_sesion.c_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public Short getcSesion() {
        return cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.c_sesion
     *
     * @param cSesion the value for ce_sesion.c_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setcSesion(Short cSesion) {
        this.cSesion = cSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.fch_sesion
     *
     * @return the value of ce_sesion.fch_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public Date getFchSesion() {
        return fchSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.fch_sesion
     *
     * @param fchSesion the value for ce_sesion.fch_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setFchSesion(Date fchSesion) {
        this.fchSesion = fchSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.hora_ini_sesion
     *
     * @return the value of ce_sesion.hora_ini_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public String getHoraIniSesion() {
        return horaIniSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.hora_ini_sesion
     *
     * @param horaIniSesion the value for ce_sesion.hora_ini_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setHoraIniSesion(String horaIniSesion) {
        this.horaIniSesion = horaIniSesion == null ? null : horaIniSesion.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.hora_fin_sesion
     *
     * @return the value of ce_sesion.hora_fin_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public String getHoraFinSesion() {
        return horaFinSesion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.hora_fin_sesion
     *
     * @param horaFinSesion the value for ce_sesion.hora_fin_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setHoraFinSesion(String horaFinSesion) {
        this.horaFinSesion = horaFinSesion == null ? null : horaFinSesion.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.num_integrantes
     *
     * @return the value of ce_sesion.num_integrantes
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public Short getNumIntegrantes() {
        return numIntegrantes;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.num_integrantes
     *
     * @param numIntegrantes the value for ce_sesion.num_integrantes
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setNumIntegrantes(Short numIntegrantes) {
        this.numIntegrantes = numIntegrantes;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.observaciones
     *
     * @return the value of ce_sesion.observaciones
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public String getObservaciones() {
        return observaciones;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.observaciones
     *
     * @param observaciones the value for ce_sesion.observaciones
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones == null ? null : observaciones.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.fch_registro
     *
     * @return the value of ce_sesion.fch_registro
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public Date getFchRegistro() {
        return fchRegistro;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.fch_registro
     *
     * @param fchRegistro the value for ce_sesion.fch_registro
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setFchRegistro(Date fchRegistro) {
        this.fchRegistro = fchRegistro;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.usr_captura
     *
     * @return the value of ce_sesion.usr_captura
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public String getUsrCaptura() {
        return usrCaptura;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.usr_captura
     *
     * @param usrCaptura the value for ce_sesion.usr_captura
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setUsrCaptura(String usrCaptura) {
        this.usrCaptura = usrCaptura == null ? null : usrCaptura.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.cadena
     *
     * @return the value of ce_sesion.cadena
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public String getCadena() {
        return cadena;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.cadena
     *
     * @param cadena the value for ce_sesion.cadena
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setCadena(String cadena) {
        this.cadena = cadena == null ? null : cadena.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.publicadaen
     *
     * @return the value of ce_sesion.publicadaen
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public String getPublicadaen() {
        return publicadaen;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.publicadaen
     *
     * @param publicadaen the value for ce_sesion.publicadaen
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setPublicadaen(String publicadaen) {
        this.publicadaen = publicadaen == null ? null : publicadaen.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ce_sesion.fechapublicacion
     *
     * @return the value of ce_sesion.fechapublicacion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public Date getFechapublicacion() {
        return fechapublicacion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ce_sesion.fechapublicacion
     *
     * @param fechapublicacion the value for ce_sesion.fechapublicacion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    public void setFechapublicacion(Date fechapublicacion) {
        this.fechapublicacion = fechapublicacion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
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
        CeSesion other = (CeSesion) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcSesion() == null ? other.getcSesion() == null : this.getcSesion().equals(other.getcSesion()))
            && (this.getFchSesion() == null ? other.getFchSesion() == null : this.getFchSesion().equals(other.getFchSesion()))
            && (this.getHoraIniSesion() == null ? other.getHoraIniSesion() == null : this.getHoraIniSesion().equals(other.getHoraIniSesion()))
            && (this.getHoraFinSesion() == null ? other.getHoraFinSesion() == null : this.getHoraFinSesion().equals(other.getHoraFinSesion()))
            && (this.getNumIntegrantes() == null ? other.getNumIntegrantes() == null : this.getNumIntegrantes().equals(other.getNumIntegrantes()))
            && (this.getObservaciones() == null ? other.getObservaciones() == null : this.getObservaciones().equals(other.getObservaciones()))
            && (this.getFchRegistro() == null ? other.getFchRegistro() == null : this.getFchRegistro().equals(other.getFchRegistro()))
            && (this.getUsrCaptura() == null ? other.getUsrCaptura() == null : this.getUsrCaptura().equals(other.getUsrCaptura()))
            && (this.getCadena() == null ? other.getCadena() == null : this.getCadena().equals(other.getCadena()))
            && (this.getPublicadaen() == null ? other.getPublicadaen() == null : this.getPublicadaen().equals(other.getPublicadaen()))
            && (this.getFechapublicacion() == null ? other.getFechapublicacion() == null : this.getFechapublicacion().equals(other.getFechapublicacion()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_sesion
     *
     * @mbggenerated Wed Aug 13 23:38:58 CDT 2014
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcSesion() == null) ? 0 : getcSesion().hashCode());
        result = prime * result + ((getFchSesion() == null) ? 0 : getFchSesion().hashCode());
        result = prime * result + ((getHoraIniSesion() == null) ? 0 : getHoraIniSesion().hashCode());
        result = prime * result + ((getHoraFinSesion() == null) ? 0 : getHoraFinSesion().hashCode());
        result = prime * result + ((getNumIntegrantes() == null) ? 0 : getNumIntegrantes().hashCode());
        result = prime * result + ((getObservaciones() == null) ? 0 : getObservaciones().hashCode());
        result = prime * result + ((getFchRegistro() == null) ? 0 : getFchRegistro().hashCode());
        result = prime * result + ((getUsrCaptura() == null) ? 0 : getUsrCaptura().hashCode());
        result = prime * result + ((getCadena() == null) ? 0 : getCadena().hashCode());
        result = prime * result + ((getPublicadaen() == null) ? 0 : getPublicadaen().hashCode());
        result = prime * result + ((getFechapublicacion() == null) ? 0 : getFechapublicacion().hashCode());
        return result;
    }
}