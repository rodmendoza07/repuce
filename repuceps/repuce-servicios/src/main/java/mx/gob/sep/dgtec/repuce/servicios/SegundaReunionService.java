package mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.conafe.vo.SegundaReunionVO;

public interface SegundaReunionService {
	public int saveSegundaReunion(SegundaReunionVO segundaReunionVO) throws Exception ;

	public int deleteSegundaReunion(Integer apec) throws Exception;

	public SegundaReunionVO selectSegundaReunion(Integer apec);


}
