package test.mx.gob.sep.dgtec.repuce.servicios;


import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.servicios.ReunionesService;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;


/**
 * Apec 1 consultar
 * 
 * @author ismael.rosas
 *
 */

public class ReunionesServiceTest extends BaseServicioTest {
	
	@Autowired
	private ReunionesService reunionesService;

	@Test
	public void actaConstitutivaServiceTest(){
		Assert.notNull(reunionesService);
	}

	@Test
	public void searchReunionesApecTest(){
		try{
			List<ApecReunion> reuniones =
					reunionesService.searchReunionesApec((short)1,1,190);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(reuniones));
			
			Assert.notNull(reuniones);
			Assert.isTrue(reuniones.size() == 1);
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
}
