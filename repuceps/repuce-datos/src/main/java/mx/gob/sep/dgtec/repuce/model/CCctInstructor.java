package mx.gob.sep.dgtec.repuce.model;

public class CCctInstructor {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_cct_instructor.c_cct
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Integer cCct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_cct_instructor.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Integer cApec;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_cct_instructor.c_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    private Short cInstructor;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_cct_instructor.c_cct
     *
     * @return the value of c_cct_instructor.c_cct
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Integer getcCct() {
        return cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_cct_instructor.c_cct
     *
     * @param cCct the value for c_cct_instructor.c_cct
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcCct(Integer cCct) {
        this.cCct = cCct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_cct_instructor.c_apec
     *
     * @return the value of c_cct_instructor.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Integer getcApec() {
        return cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_cct_instructor.c_apec
     *
     * @param cApec the value for c_cct_instructor.c_apec
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcApec(Integer cApec) {
        this.cApec = cApec;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_cct_instructor.c_instructor
     *
     * @return the value of c_cct_instructor.c_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public Short getcInstructor() {
        return cInstructor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_cct_instructor.c_instructor
     *
     * @param cInstructor the value for c_cct_instructor.c_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    public void setcInstructor(Short cInstructor) {
        this.cInstructor = cInstructor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cct_instructor
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
        CCctInstructor other = (CCctInstructor) that;
        return (this.getcCct() == null ? other.getcCct() == null : this.getcCct().equals(other.getcCct()))
            && (this.getcApec() == null ? other.getcApec() == null : this.getcApec().equals(other.getcApec()))
            && (this.getcInstructor() == null ? other.getcInstructor() == null : this.getcInstructor().equals(other.getcInstructor()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cct_instructor
     *
     * @mbggenerated Thu Dec 12 14:51:34 CST 2013
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcCct() == null) ? 0 : getcCct().hashCode());
        result = prime * result + ((getcApec() == null) ? 0 : getcApec().hashCode());
        result = prime * result + ((getcInstructor() == null) ? 0 : getcInstructor().hashCode());
        return result;
    }
}