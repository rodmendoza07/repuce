package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.HCeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.HCeMetaEnlaceExample;
import org.apache.ibatis.annotations.Param;

public interface HCeMetaEnlaceMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int countByExample(HCeMetaEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int deleteByExample(HCeMetaEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int deleteByPrimaryKey(@Param("cCct") Integer cCct, @Param("numGrado") Short numGrado, @Param("numMateria") Short numMateria);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int insert(HCeMetaEnlace record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int insertSelective(HCeMetaEnlace record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    List<HCeMetaEnlace> selectByExample(HCeMetaEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    HCeMetaEnlace selectByPrimaryKey(@Param("cCct") Integer cCct, @Param("numGrado") Short numGrado, @Param("numMateria") Short numMateria);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int updateByExampleSelective(@Param("record") HCeMetaEnlace record, @Param("example") HCeMetaEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int updateByExample(@Param("record") HCeMetaEnlace record, @Param("example") HCeMetaEnlaceExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int updateByPrimaryKeySelective(HCeMetaEnlace record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table h_ce_meta_enlace
     *
     * @mbggenerated Tue Nov 27 13:04:19 CST 2012
     */
    int updateByPrimaryKey(HCeMetaEnlace record);
}