package mx.gob.sep.dgtec.repuce.model;

public class CMetas {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_metas.c_meta
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    private Integer cMeta;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column c_metas.descrip_meta
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    private String descripMeta;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_metas.c_meta
     *
     * @return the value of c_metas.c_meta
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    public Integer getcMeta() {
        return cMeta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_metas.c_meta
     *
     * @param cMeta the value for c_metas.c_meta
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    public void setcMeta(Integer cMeta) {
        this.cMeta = cMeta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column c_metas.descrip_meta
     *
     * @return the value of c_metas.descrip_meta
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    public String getDescripMeta() {
        return descripMeta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column c_metas.descrip_meta
     *
     * @param descripMeta the value for c_metas.descrip_meta
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    public void setDescripMeta(String descripMeta) {
        this.descripMeta = descripMeta == null ? null : descripMeta.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_metas
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
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
        CMetas other = (CMetas) that;
        return (this.getcMeta() == null ? other.getcMeta() == null : this.getcMeta().equals(other.getcMeta()))
            && (this.getDescripMeta() == null ? other.getDescripMeta() == null : this.getDescripMeta().equals(other.getDescripMeta()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_metas
     *
     * @mbggenerated Wed Nov 05 12:20:25 CST 2014
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getcMeta() == null) ? 0 : getcMeta().hashCode());
        result = prime * result + ((getDescripMeta() == null) ? 0 : getDescripMeta().hashCode());
        return result;
    }
}