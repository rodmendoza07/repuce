package mx.gob.sep.dgtec.repuce.servicios;
import mx.gob.sep.dgtec.conafe.vo.TerceraReunionVO;

public interface TerceraReunionService {
	public int saveTerceraReunion(TerceraReunionVO terceraReunionVO) throws Exception;

	public int deleteTerceraReunion(Integer apec) throws Exception;

	public TerceraReunionVO selectTerceraReunion(Integer apec);

}
