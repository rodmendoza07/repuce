package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.model.CComiteExample;
import org.apache.ibatis.annotations.Param;

public interface CComiteMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int countByExample(CComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int deleteByExample(CComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int deleteByPrimaryKey(Integer cComite);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int insert(CComite record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int insertSelective(CComite record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    List<CComite> selectByExample(CComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    CComite selectByPrimaryKey(Integer cComite);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int updateByExampleSelective(@Param("record") CComite record, @Param("example") CComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int updateByExample(@Param("record") CComite record, @Param("example") CComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int updateByPrimaryKeySelective(CComite record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    int updateByPrimaryKey(CComite record);
}