package mx.gob.sep.dgtec.repuce.servicios;

import mx.gob.sep.dgtec.conafe.vo.PrimeraReunionVO;

public interface PrimeraReunionService {

	public int savePrimeraReunion(PrimeraReunionVO primeraReunionVO) throws Exception;

	public int deletePrimeraReunion(Integer apec) throws Exception;

	public PrimeraReunionVO selectPrimeraReunion(Integer apec);

}
