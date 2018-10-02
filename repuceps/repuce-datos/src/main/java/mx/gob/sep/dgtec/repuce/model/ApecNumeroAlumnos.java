package mx.gob.sep.dgtec.repuce.model;

public class ApecNumeroAlumnos {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_numero_alumnos.c_apec
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    private Integer cApec;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_numero_alumnos.c_reunion
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    private Short cReunion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_numero_alumnos.c_numalum
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    private Short cNumalum;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_numero_alumnos.cct
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    private String cct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_numero_alumnos.ninos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    private Integer ninos;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_numero_alumnos.ninas
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    private Integer ninas;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_numero_alumnos.c_apec
     *
     * @return the value of apec_numero_alumnos.c_apec
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public Integer getcApec() {
        return cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_numero_alumnos.c_apec
     *
     * @param cApec the value for apec_numero_alumnos.c_apec
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public void setcApec(Integer cApec) {
        this.cApec = cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_numero_alumnos.c_reunion
     *
     * @return the value of apec_numero_alumnos.c_reunion
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public Short getcReunion() {
        return cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_numero_alumnos.c_reunion
     *
     * @param cReunion the value for apec_numero_alumnos.c_reunion
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public void setcReunion(Short cReunion) {
        this.cReunion = cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_numero_alumnos.c_numalum
     *
     * @return the value of apec_numero_alumnos.c_numalum
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public Short getcNumalum() {
        return cNumalum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_numero_alumnos.c_numalum
     *
     * @param cNumalum the value for apec_numero_alumnos.c_numalum
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public void setcNumalum(Short cNumalum) {
        this.cNumalum = cNumalum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_numero_alumnos.cct
     *
     * @return the value of apec_numero_alumnos.cct
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public String getCct() {
        return cct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_numero_alumnos.cct
     *
     * @param cct the value for apec_numero_alumnos.cct
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public void setCct(String cct) {
        this.cct = cct == null ? null : cct.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_numero_alumnos.ninos
     *
     * @return the value of apec_numero_alumnos.ninos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public Integer getNinos() {
        return ninos;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_numero_alumnos.ninos
     *
     * @param ninos the value for apec_numero_alumnos.ninos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public void setNinos(Integer ninos) {
        this.ninos = ninos;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_numero_alumnos.ninas
     *
     * @return the value of apec_numero_alumnos.ninas
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public Integer getNinas() {
        return ninas;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_numero_alumnos.ninas
     *
     * @param ninas the value for apec_numero_alumnos.ninas
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    public void setNinas(Integer ninas) {
        this.ninas = ninas;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
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
        ApecNumeroAlumnos other = (ApecNumeroAlumnos) that;
        return (this.getcApec() == null ? other.getcApec() == null : this.getcApec().equals(other.getcApec()))
            && (this.getcReunion() == null ? other.getcReunion() == null : this.getcReunion().equals(other.getcReunion()))
            && (this.getcNumalum() == null ? other.getcNumalum() == null : this.getcNumalum().equals(other.getcNumalum()))
            && (this.getCct() == null ? other.getCct() == null : this.getCct().equals(other.getCct()))
            && (this.getNinos() == null ? other.getNinos() == null : this.getNinos().equals(other.getNinos()))
            && (this.getNinas() == null ? other.getNinas() == null : this.getNinas().equals(other.getNinas()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_numero_alumnos
     *
     * @mbggenerated Tue May 30 14:53:57 CDT 2017
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcApec() == null) ? 0 : getcApec().hashCode());
        result = prime * result + ((getcReunion() == null) ? 0 : getcReunion().hashCode());
        result = prime * result + ((getcNumalum() == null) ? 0 : getcNumalum().hashCode());
        result = prime * result + ((getCct() == null) ? 0 : getCct().hashCode());
        result = prime * result + ((getNinos() == null) ? 0 : getNinos().hashCode());
        result = prime * result + ((getNinas() == null) ? 0 : getNinas().hashCode());
        return result;
    }
}