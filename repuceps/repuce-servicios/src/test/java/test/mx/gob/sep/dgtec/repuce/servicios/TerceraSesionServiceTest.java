package test.mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.repuce.servicios.TerceraSesionService;
import mx.gob.sep.dgtec.repuce.vo.TerceraSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import test.mx.gob.sep.dgtec.repuce.servicios.util.CreateTestData;

public class TerceraSesionServiceTest extends BaseServicioTest {
	
	@Autowired
	private TerceraSesionService terceraSesionService;

	@Test
	public void terceraSesionServiceTest(){
		Assert.notNull(terceraSesionService);
	}
	
	@Test
	public void saveTerceraSesionTest(){
		int numRecords = 0;
		try{
			TerceraSesionVO terceraSesionVO = CreateTestData.getTerceraSesionBean();
			numRecords = terceraSesionService.saveTerceraSesion(terceraSesionVO);
			Assert.isTrue(numRecords==1);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Test
	public void selectTerceraSesionTest(){
		try{
			TerceraSesionVO terceraSesionVO =
					terceraSesionService.selectTerceraSesion(91);
			Assert.notNull(terceraSesionVO);
			try{
				ObjectMapper mapper = new ObjectMapper();
				System.out.println(mapper.writeValueAsString(terceraSesionVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Test
	public void deleteTerceraSesionTest(){
		try{
			int deletedRows = terceraSesionService.deleteTerceraSesion(91);
			Assert.isTrue(deletedRows==1);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	
}
