package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.UbicacionCctMapperCstm;
import mx.gob.sep.dgtec.repuce.vo.UbicacionCctCstm;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UbicacionCctMapperTest extends BaseDaoTest {
	
	@Autowired
	private UbicacionCctMapperCstm ubicacionCctMapperCstm;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(ubicacionCctMapperCstm);
	}
	
	@Test
	public void selectByPrimaryKeyCstmTest(){

		UbicacionCctCstm ubicCct = ubicacionCctMapperCstm.selectByPrimaryKeyCstm(1);
		
		
		Assert.assertNotNull(ubicCct);
		Assert.assertEquals("AGUASCALIENTES", ubicCct.getEntidad().getNomEntidadfed());
		Assert.assertEquals("AGUASCALIENTES", ubicCct.getMunicipio().getNomMunicipio());
		Assert.assertEquals("AGUASCALIENTES", ubicCct.getLocalidad().getNomLocalidad());
	}
	
}
