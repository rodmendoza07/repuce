package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CNiveleducConafe;
import mx.gob.sep.dgtec.repuce.model.CNiveleducConafeExample;
import org.apache.ibatis.annotations.Param;

public interface CNiveleducConafeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int countByExample(CNiveleducConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int deleteByExample(CNiveleducConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int deleteByPrimaryKey(Integer cNiveleduc);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int insert(CNiveleducConafe record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int insertSelective(CNiveleducConafe record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    List<CNiveleducConafe> selectByExample(CNiveleducConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    CNiveleducConafe selectByPrimaryKey(Integer cNiveleduc);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CNiveleducConafe record, @Param("example") CNiveleducConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByExample(@Param("record") CNiveleducConafe record, @Param("example") CNiveleducConafeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByPrimaryKeySelective(CNiveleducConafe record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_niveleduc_conafe
     *
     * @mbggenerated Fri Oct 04 19:06:54 CDT 2013
     */
    int updateByPrimaryKey(CNiveleducConafe record);
}