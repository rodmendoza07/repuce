package mx.gob.sep.dgtec.repuce.servicios;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeIntegrante;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;
import mx.gob.sep.dgtec.repuce.model.CeDenuncia;


public interface PrimeraAsambleaService {
	
	public int savePrimeraAsamblea(PrimeraAsambleaVO primeraAsambleaVO);
	
	public int saveDenuncia(CeDenuncia ceDenuncia);
	
	public int deletePrimeraAsamblea(Integer cCct);

	public PrimeraAsambleaVO selectPrimeraAsamblea(Integer cCct, String acta);
	
	public List<CeIntegrante> selectIntegrantes(Integer cCct);
}
