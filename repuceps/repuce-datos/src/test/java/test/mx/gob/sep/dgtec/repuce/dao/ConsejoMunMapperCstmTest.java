package test.mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.ConsejoMunMapperCstm;
import mx.gob.sep.dgtec.repuce.model.ConsejoMunCstm;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ConsejoMunMapperCstmTest extends BaseDaoTest {
	
	@Autowired
	private ConsejoMunMapperCstm consejoMunMapperCstm;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(consejoMunMapperCstm);
	}
	
	@Test
	public void selectActasMunicipalesTest(){

		List<ConsejoMunCstm> actasList = 
				consejoMunMapperCstm.selectActasMunicipales(new Short("2"));
		
		
		Assert.assertNotNull(actasList);
		Assert.assertEquals(5,actasList.size());
	}
	
}
