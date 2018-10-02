package test.mx.gob.sep.dgtec.repuce.servicios;


import java.io.RandomAccessFile;

import mx.gob.sep.dgtec.repuce.model.Archivo;
import mx.gob.sep.dgtec.repuce.servicios.SistemaArchivosServicio;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

public class SistemaArchivosServicioTest extends BaseServicioTest {
	
	@Autowired
	private SistemaArchivosServicio sistemaArchivosServicio;

	@Test
	public void archivoServicioTest(){
		Assert.notNull(sistemaArchivosServicio);
	}
	
	final String DIR_BASE = "file:///c:/tmp/";

	@Test
	public void escribirArchivoTest(){
		try{
			
			RandomAccessFile archivo = new  RandomAccessFile("c:/tmp/koco.txt","r");
			byte[] data = new byte[(int) archivo.length()];
			archivo.readFully(data);
			
			sistemaArchivosServicio.escribirArchivo("juiciosAbiertos", "uploaded.txt", data);
			archivo.close();

			//Assert.isTrue(numRecords==1);
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

}
