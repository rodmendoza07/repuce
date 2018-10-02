package mx.gob.sep.dgtec.repuce.servicios;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;


public interface ActaConstitutivaService{
	
    public int saveActaConstitutiva(ActaConstitutivaVO actaConstitutivaVO);
	
	public int deleteActaConstitutiva(Integer cCct);
	
	public ActaConstitutivaVO selectActaConstitutiva(Integer cCct);
	public void actaulizaRelacionesPendientes();
	
}