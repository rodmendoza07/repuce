package test.mx.gob.sep.dgtec.repuce.dao;

import java.util.ArrayList;
import java.util.List;

import mx.gob.sep.dgtec.conafe.vo.SegundaReunionVO;
import mx.gob.sep.dgtec.repuce.dao.ApecApoyoMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecApoyoMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecPlanTrabajoMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.SegundaReunionMapper;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.util.Constants;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class SegundaReunionMapperTest extends BaseDaoTest {
	
	@Autowired
	private SegundaReunionMapper segundaReunionMapper;

	@Autowired
	private ApecApoyoMapperCstm ApecApoyoMapperCstm;

	@Autowired
	private ApecPlanTrabajoMapperCstm apecPlanTrabajoMapperCstm;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(segundaReunionMapper);
		
	}
	
	@Ignore
	@Test
	public void selectSegundaReunionTest(){

		try{
			
			SegundaReunionVO segundaReunionVO = segundaReunionMapper.selectSegundaReunion(132);
			
			
			Assert.assertNotNull(segundaReunionVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(segundaReunionVO));
			System.out.println(segundaReunionVO.getInstructores().size());
			System.out.println(segundaReunionVO.getIntegrantes().size());

			Assert.assertNotNull(segundaReunionVO.getApec());
			Assert.assertNotNull(segundaReunionVO.getReunion());
			Assert.assertNotNull(segundaReunionVO.getIntegrantesR2());
			Assert.assertNotNull(segundaReunionVO.getInstructoresR2());
			
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}
	
	

	@Ignore
	@Test
	public void selectPruebaTest(){

		try{
			List<ApecApoyoCstm> apoyosRepetidos= new ArrayList<ApecApoyoCstm>();
			String valores="23,24,25,26";
			apoyosRepetidos = ApecApoyoMapperCstm.selectApoyosRegistradosPosterior(132, Constants.SEGUNDA_REUNION, valores);			
						

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(apoyosRepetidos));
			System.out.println("hay"+apoyosRepetidos.size()+".."+valores);
			
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}

	
	@Test
	public void selectPrueba2Test(){

		try{
			List<ApecPlanTrabajoCstm> accionesRepetidos= new ArrayList<ApecPlanTrabajoCstm>();
			
			accionesRepetidos = apecPlanTrabajoMapperCstm.selectAccionesRegistradasPosterior(132, Constants.PRIMERA_REUNION);			
						

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(accionesRepetidos));
			System.out.println("hay"+accionesRepetidos.size());
			
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}

	
}
