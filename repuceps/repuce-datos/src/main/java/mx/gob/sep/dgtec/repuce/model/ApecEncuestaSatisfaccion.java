package mx.gob.sep.dgtec.repuce.model;

public class ApecEncuestaSatisfaccion {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_encuesta_satisfaccion.c_apec
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Integer cApec;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_encuesta_satisfaccion.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Short cReunion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_encuesta_satisfaccion.c_medicion_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Integer cMedicionSatisfaccion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_encuesta_satisfaccion.c_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    private Integer cRespuesta;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_encuesta_satisfaccion.c_apec
     *
     * @return the value of apec_encuesta_satisfaccion.c_apec
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Integer getcApec() {
        return cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_encuesta_satisfaccion.c_apec
     *
     * @param cApec the value for apec_encuesta_satisfaccion.c_apec
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcApec(Integer cApec) {
        this.cApec = cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_encuesta_satisfaccion.c_reunion
     *
     * @return the value of apec_encuesta_satisfaccion.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Short getcReunion() {
        return cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_encuesta_satisfaccion.c_reunion
     *
     * @param cReunion the value for apec_encuesta_satisfaccion.c_reunion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcReunion(Short cReunion) {
        this.cReunion = cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_encuesta_satisfaccion.c_medicion_satisfaccion
     *
     * @return the value of apec_encuesta_satisfaccion.c_medicion_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Integer getcMedicionSatisfaccion() {
        return cMedicionSatisfaccion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_encuesta_satisfaccion.c_medicion_satisfaccion
     *
     * @param cMedicionSatisfaccion the value for apec_encuesta_satisfaccion.c_medicion_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcMedicionSatisfaccion(Integer cMedicionSatisfaccion) {
        this.cMedicionSatisfaccion = cMedicionSatisfaccion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_encuesta_satisfaccion.c_respuesta
     *
     * @return the value of apec_encuesta_satisfaccion.c_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Integer getcRespuesta() {
        return cRespuesta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_encuesta_satisfaccion.c_respuesta
     *
     * @param cRespuesta the value for apec_encuesta_satisfaccion.c_respuesta
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setcRespuesta(Integer cRespuesta) {
        this.cRespuesta = cRespuesta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
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
        ApecEncuestaSatisfaccion other = (ApecEncuestaSatisfaccion) that;
        return (this.getcApec() == null ? other.getcApec() == null : this.getcApec().equals(other.getcApec()))
            && (this.getcReunion() == null ? other.getcReunion() == null : this.getcReunion().equals(other.getcReunion()))
            && (this.getcMedicionSatisfaccion() == null ? other.getcMedicionSatisfaccion() == null : this.getcMedicionSatisfaccion().equals(other.getcMedicionSatisfaccion()))
            && (this.getcRespuesta() == null ? other.getcRespuesta() == null : this.getcRespuesta().equals(other.getcRespuesta()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcApec() == null) ? 0 : getcApec().hashCode());
        result = prime * result + ((getcReunion() == null) ? 0 : getcReunion().hashCode());
        result = prime * result + ((getcMedicionSatisfaccion() == null) ? 0 : getcMedicionSatisfaccion().hashCode());
        result = prime * result + ((getcRespuesta() == null) ? 0 : getcRespuesta().hashCode());
        return result;
    }
}