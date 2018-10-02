package mx.gob.sep.dgtec.repuce.model;

public class ApecReunionInstructor {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_instructor.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Integer cApec;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_instructor.c_reunion
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Short cReunion;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_instructor.c_apec_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Integer cApecInstructor;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column apec_reunion_instructor.c_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Short cInstructor;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_instructor.c_apec
     *
     * @return the value of apec_reunion_instructor.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Integer getcApec() {
        return cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_instructor.c_apec
     *
     * @param cApec the value for apec_reunion_instructor.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcApec(Integer cApec) {
        this.cApec = cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_instructor.c_reunion
     *
     * @return the value of apec_reunion_instructor.c_reunion
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Short getcReunion() {
        return cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_instructor.c_reunion
     *
     * @param cReunion the value for apec_reunion_instructor.c_reunion
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcReunion(Short cReunion) {
        this.cReunion = cReunion;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_instructor.c_apec_instructor
     *
     * @return the value of apec_reunion_instructor.c_apec_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Integer getcApecInstructor() {
        return cApecInstructor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_instructor.c_apec_instructor
     *
     * @param cApecInstructor the value for apec_reunion_instructor.c_apec_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcApecInstructor(Integer cApecInstructor) {
        this.cApecInstructor = cApecInstructor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column apec_reunion_instructor.c_instructor
     *
     * @return the value of apec_reunion_instructor.c_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Short getcInstructor() {
        return cInstructor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column apec_reunion_instructor.c_instructor
     *
     * @param cInstructor the value for apec_reunion_instructor.c_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcInstructor(Short cInstructor) {
        this.cInstructor = cInstructor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
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
        ApecReunionInstructor other = (ApecReunionInstructor) that;
        return (this.getcApec() == null ? other.getcApec() == null : this.getcApec().equals(other.getcApec()))
            && (this.getcReunion() == null ? other.getcReunion() == null : this.getcReunion().equals(other.getcReunion()))
            && (this.getcApecInstructor() == null ? other.getcApecInstructor() == null : this.getcApecInstructor().equals(other.getcApecInstructor()))
            && (this.getcInstructor() == null ? other.getcInstructor() == null : this.getcInstructor().equals(other.getcInstructor()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_reunion_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcApec() == null) ? 0 : getcApec().hashCode());
        result = prime * result + ((getcReunion() == null) ? 0 : getcReunion().hashCode());
        result = prime * result + ((getcApecInstructor() == null) ? 0 : getcApecInstructor().hashCode());
        result = prime * result + ((getcInstructor() == null) ? 0 : getcInstructor().hashCode());
        return result;
    }
}