package mx.gob.sep.dgtec.repuce.servicios;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.SerAlimPetc1415;

public interface ZZ_SerAlim1415Service {
	
	//Llamado del cuestionario
	public SerAlimPetc1415 selectSerAlim1415(Integer cCct);
	
	//Guardado del cuestionario
	public int saveFormSerAlim1415(SerAlimPetc1415 serAlim1415);		

}