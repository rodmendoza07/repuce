package test.mx.gob.sep.dgtec.repuce.dao;

import java.util.ArrayList;
import java.util.List;

import mx.gob.sep.dgtec.conafe.vo.PrimeraReunionVO;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.CTipoApoyoMapper;
import mx.gob.sep.dgtec.repuce.dao.PrimeraReunionMapper;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.util.Constants;

import org.aspectj.weaver.ArrayAnnotationValue;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class PrimeraReunionMapperTest extends BaseDaoTest {
	
	@Autowired
	private PrimeraReunionMapper primeraReunionMapper;
	@Autowired
	private ApecReunionInstructorMapperCstm apecReunionInstructorMapperCstm;
	@Autowired
	private CTipoApoyoMapper cTipoApoyoMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(primeraReunionMapper);
		Assert.assertNotNull(cTipoApoyoMapper);
	}
	
	@Test
	public void selectPrimeraReunionTest(){

		try{				
			PrimeraReunionVO primeraReunionVO = primeraReunionMapper.selectPrimeraReunion(107);
			
			
			Assert.assertNotNull(primeraReunionVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(primeraReunionVO));
			
			List<ApecReunionInstructorCtsm> lista = new ArrayList<ApecReunionInstructorCtsm>();
			lista=apecReunionInstructorMapperCstm.selectInstructoresRegistradosXReunion(primeraReunionVO.getApec().getcApec(),Constants.PRIMERA_REUNION);
			
			System.out.println("la lista contiene "+lista.size());
			
			for (ApecReunionInstructorCtsm regis : lista) {
				System.out.println("el instructor es el"+regis.getcInstructor()+".."+regis.getcApec());
				
			}
			

			Assert.assertNotNull(primeraReunionVO.getApec());
			Assert.assertNotNull(primeraReunionVO.getReunion());
			Assert.assertNotNull(primeraReunionVO.getIntegrantesR1());
			Assert.assertNotNull(primeraReunionVO.getInstructoresR1());
			
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}
	


}
