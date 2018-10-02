package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.conafe.vo.TerceraReunionVO;
import mx.gob.sep.dgtec.repuce.dao.TerceraReunionMapper;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class TerceraReunionMapperTest extends BaseDaoTest {

	@Autowired
	private TerceraReunionMapper terceraReunionMapper;

	@Test
	public void beanTest() {
		Assert.assertNotNull(terceraReunionMapper);

	}

	@Test
	public void selectTerceraReunionTest() {

		try {

			TerceraReunionVO terceraReunionVO = terceraReunionMapper
					.selectTerceraReunion(97);

			Assert.assertNotNull(terceraReunionVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(terceraReunionVO));

			Assert.assertNotNull(terceraReunionVO.getApec());
			Assert.assertNotNull(terceraReunionVO.getReunion());
			Assert.assertNotNull(terceraReunionVO.getIntegrantesR3());
			Assert.assertNotNull(terceraReunionVO.getInstructoresR3());
			
			
		} catch (Exception ex) {
			ex.printStackTrace();
			Assert.fail();
		}
	}

}
