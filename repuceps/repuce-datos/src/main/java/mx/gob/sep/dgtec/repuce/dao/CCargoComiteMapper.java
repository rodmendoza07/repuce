package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CCargoComite;
import mx.gob.sep.dgtec.repuce.model.CCargoComiteExample;
import org.apache.ibatis.annotations.Param;

public interface CCargoComiteMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int countByExample(CCargoComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int deleteByExample(CCargoComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int deleteByPrimaryKey(Integer cCargo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int insert(CCargoComite record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int insertSelective(CCargoComite record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    List<CCargoComite> selectByExample(CCargoComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    CCargoComite selectByPrimaryKey(Integer cCargo);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int updateByExampleSelective(@Param("record") CCargoComite record, @Param("example") CCargoComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int updateByExample(@Param("record") CCargoComite record, @Param("example") CCargoComiteExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int updateByPrimaryKeySelective(CCargoComite record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cargo_comite
     *
     * @mbggenerated Thu Sep 04 11:25:26 CDT 2014
     */
    int updateByPrimaryKey(CCargoComite record);
}