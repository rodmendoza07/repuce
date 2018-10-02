package test.mx.gob.sep.dgtec.repuce.servicios;


import java.io.File;
import java.io.RandomAccessFile;
import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ConsejoMunCstm;
import mx.gob.sep.dgtec.repuce.servicios.ActasMunicipalesService;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.util.Assert;

public class ActasMunicipalesServicioTest extends BaseServicioTest {
	
	@Autowired
	private ActasMunicipalesService actasMunicipalesService;
	
	@Autowired
	private ApplicationContext applicationContext;
	
	@Autowired
	private String basePath;

	@Test
	public void archivoServicioTest(){
		Assert.notNull(actasMunicipalesService);
	}
	
	private String TEST_FILE_NAME = "1-1.pdf";
	
	@Test
	public void insertActaMunicipalTest(){
		try{
			
			Resource r = applicationContext.getResource(basePath+TEST_FILE_NAME);
			RandomAccessFile archivo = new  RandomAccessFile(r.getFile(),"r");
			byte[] data = new byte[(int) archivo.length()];
			archivo.readFully(data);
			
			actasMunicipalesService.insertActaMunicipal("01ENLACE01", TEST_FILE_NAME, data);
			archivo.close();
			
			r = applicationContext.getResource(basePath + "municipales/actas/");
			
			File file = new File(r.getFile(),TEST_FILE_NAME);
			
			Assert.isTrue(file.exists());
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Test
	public void retrieveActasListTest(){
		try{
			
			List<ConsejoMunCstm> actas = actasMunicipalesService.selectActasMunicipales(
					"02ENLACE01");
			System.out.println("actas.size: " + actas.size());
			Assert.isTrue(actas.size() == 5);
			
			actas = actasMunicipalesService.selectActasMunicipales(
					"CONAPASE01");
			System.out.println("actas.size: " + actas.size());
			Assert.isTrue(actas.size() > 500);

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Test
	public void deleteActaMunicipalTest(){
		try{
			
			actasMunicipalesService.deleteActaMunicipal("03ENLACE01",
					new Short("3"),	1);
			
			Resource r = applicationContext.getResource(basePath + "municipales/actas/");
			File file = new File(r.getFile(),"3-1.pdf");
			
			Assert.isTrue(!file.exists());
			
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
}
