package mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.repuce.vo.ReunionVO;

public interface TerceraAsambleaService {

	public int saveTerceraAsamblea(ReunionVO reunionVO) throws Exception;
	
	public int deleteTerceraAsamblea(Integer cCct) throws Exception;

	public ReunionVO selectTerceraAsamblea(Integer cCct) throws Exception;

}
