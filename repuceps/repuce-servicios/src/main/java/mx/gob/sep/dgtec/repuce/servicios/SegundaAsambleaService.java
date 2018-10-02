package mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.repuce.vo.SegundaAsamblea1415VO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;

public interface SegundaAsambleaService {

	public int saveSegundaAsamblea(SegundaAsambleaVO segundaAsambleaVO) throws Exception;
	
	public int deleteSegundaAsamblea(Integer cCct) throws Exception;

	public SegundaAsambleaVO selectSegundaAsamblea(Integer cCct) throws Exception;
	
    // Ciclo Escolar 2014-2015
	
	public int saveSegundaAsamblea1415(SegundaAsamblea1415VO segundaAsambleaVO) throws Exception;
	
	public int deleteSegundaAsamblea1415(Integer cCct, Integer opcion) throws Exception;

	public SegundaAsamblea1415VO selectSegundaAsamblea1415(Integer cCct) throws Exception;
	
}
