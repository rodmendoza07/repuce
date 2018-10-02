package mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mx.gob.sep.dgtec.repuce.model.ConsejoMunCstm;

public interface ConsejoMunMapperCstm {
    /**
     * Entrega la lista de todos las actas cargadas en la base de datos
     * para una entidad dada.
     *
     *@param idEntdadfed Clave de le entidad federativa 
     */
    List<ConsejoMunCstm> selectActasMunicipales(@Param("idEntidadfed") Short idEntidadfed);

}