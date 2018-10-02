package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Locale;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CCctExample;
import mx.gob.sep.dgtec.repuce.model.CSesion;
import mx.gob.sep.dgtec.repuce.model.CSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeCandidatopresi;
import mx.gob.sep.dgtec.repuce.model.CeEscrutador;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeIntegrante;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.servicios.CargaArchivosService;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraAsambleaService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.HijoPresidenteElectoVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.ValidacionNombreHijoVO;

@Service
public class CargaArchivosServicioImpl implements CargaArchivosService{

	private static final Logger log = LoggerFactory.getLogger(CargaArchivosServicioImpl.class);
	
	@Autowired
	private CCctMapper cctMapper;
	@Autowired
	private PrimeraAsambleaService primeraAsamblea; 
	
	public void validaArchivo()
			throws Exception{
		
		FileInputStream fileLayout = new FileInputStream(new File("C:\\Users\\juan.floresr\\Desktop\\carga_estado_de_mexico\\EdoMex_con_Baja_Alta1.xls"));
		
		HSSFWorkbook libro = new HSSFWorkbook(fileLayout);
		
		HSSFSheet sheet = libro.getSheetAt(0);
		
		int totalColumnas = 0;
		//Get iterator to all the rows in current sheet
		Iterator<Row> rowIterator = sheet.iterator();
		 
		while (rowIterator.hasNext()) {
			Row row = (Row) rowIterator.next();
		
			if(row.getCell(0)==null || row.getCell(0).toString().isEmpty() ){
				break;
			}
			
			//Get iterator to all cells of current row
			Iterator<Cell> cellIterator = row.cellIterator();

			//Validacion de titulos para contar las columnas
			if(row.getRowNum()==0){
				
			
				String cadena="";
				while (cellIterator.hasNext()) {
					Cell cell = (Cell) cellIterator.next();
					
					if(cell == null || cell.toString().isEmpty()){
						break;
					} else {
						totalColumnas++;
					}
				}
				
				if(totalColumnas != 32){
					System.out.println("Formato no valido="+totalColumnas);
					
				}
				
				System.out.println("Total de columnas="+totalColumnas);
				
			}
			
			if( totalColumnas==32 && row.getRowNum()>0){
				String[] renglon = new String[32];
				
				Iterator<Cell> cellIterator2 = row.cellIterator();
				DataFormatter formatter = new DataFormatter(); 
				while (cellIterator2.hasNext()) {
					Cell cell = (Cell) cellIterator2.next();
					if(cell == null || cell.toString().isEmpty()){
						break;
					} else {						 
						 
						 String valorCelda = formatter.formatCellValue(cell);
						 
						renglon[cell.getColumnIndex()] = valorCelda;
						//System.out.println("renglon="+cell.getColumnIndex()+"-->valor="+valorCelda);	
					}					
				}
				
				HSSFSheet sheet2 = libro.getSheetAt(1);								
				List<CeIntegranteCstm> integraList = new ArrayList<CeIntegranteCstm>();
				CeIntegranteCstm integrante = new CeIntegranteCstm();
				
				
				/* Step-6: Loop through Rows and Apply Filter */
				String[] tmpIntegrante = new String[11];
				short idIntegrante = 0;
				
				String tmpPresidente = renglon[23].trim()+renglon[24].trim()+renglon[25].trim();
				String tmpIntegra = "";
				System.out.println("Presidente="+tmpPresidente);
				for(Row r : sheet2) {
					int cctIgual = 0;
					//System.out.println("Integrante row="+r.getRowNum());
			        for (Cell c : r) {				        			
			        	//System.out.println("Integrante columna="+c.getColumnIndex()+"<->"+c.toString());
			        	if(c.getColumnIndex()==0 && c.getStringCellValue().matches(renglon[0])) {
			        	//	System.out.println("Integrante columna="+r.getRowNum());
			        		cctIgual=1;
			        	}	
			        	if(cctIgual!=0){
			        		// Es el CCT que se busca.
			        		String valorCeldaIntegrante = formatter.formatCellValue(c);								 
			        		tmpIntegrante[c.getColumnIndex()] = valorCeldaIntegrante;	
			        	} else {
			        		break;
			        	}
			        }
			        if(cctIgual!=0){
			        	
			        	idIntegrante++;
			        	integrante = new CeIntegranteCstm();
			        	integrante.setPaternoIntegrante(tmpIntegrante[2]);
						integrante.setMaternoIntegrante(tmpIntegrante[3]);
						integrante.setNombreIntegrante(tmpIntegrante[4]);
						integrante.setCscIntegrante( idIntegrante ) ;
						integrante.setcCalidad(Integer.parseInt(tmpIntegrante[7]));
						integrante.setcCargo(3);	 
						integrante.setcNiveleduc(Integer.parseInt(tmpIntegrante[8]));
					//	integrante.setCurp(tmpIntegrante[6]);
						integrante.setIdentificacion(Integer.parseInt(tmpIntegrante[5]));
						integrante.setGenero(tmpIntegrante[10]);
						integrante.setcGrado(Integer.parseInt(tmpIntegrante[9]));
						
						tmpIntegra = tmpIntegrante[2].trim()+tmpIntegrante[3].trim()+tmpIntegrante[4].trim();
						
						System.out.println("Consejero="+tmpIntegra);
						
						if(tmpPresidente.equals(tmpIntegra)){
							renglon[22] = String.valueOf(idIntegrante); 
						}
						
						integraList.add(integrante);   	
						
			        }
				}								
				
				//System.out.println("total renglon="+renglon.length);
				
				PrimeraAsambleaVO rowAsamblea = new PrimeraAsambleaVO();
							
				Date fchActualizacion = Calendar.getInstance().getTime();				
							
				DateFormat format = new SimpleDateFormat("dd/MM/yy");
				Date fchIntegracion = format.parse(renglon[2]);
				Date fechapublicacion = format.parse(renglon[6]);
												
				CCctExample criteria = new CCctExample();
				criteria.createCriteria()
						.andCveCctEqualTo(renglon[0])
						.andCveTurnoEqualTo(Short.parseShort(renglon[1]))
						.andStatusCctEqualTo(Constants.ESTATUS_ACTIVO);
						
				List<CCct> cctList = cctMapper.selectByExample(criteria);
				
				if(cctList.size()>0){
									
				CCct ccct = cctList.get(0);
				
				CeInfGral ceInfGral = new CeInfGral();
				ceInfGral.setcCct(ccct.getcCct());
				ceInfGral.setFchActualizacion(fchActualizacion);
				ceInfGral.setFchIntegracion(fchIntegracion);
				ceInfGral.setPeriodo(Constants.PERIODO_2016_2018);
				ceInfGral.setStatusCe(Constants.EDO_CE_NUEVO);
				
				CeSesion ceSesion = new CeSesion();
				ceSesion.setcCct(ccct.getcCct());
				ceSesion.setcSesion(Constants.PRIMERA_ASAMBLEA);
				ceSesion.setFchRegistro(fchActualizacion);
				ceSesion.setFchSesion(fchIntegracion);
				ceSesion.setFechapublicacion(fechapublicacion);
				ceSesion.setPublicadaen(renglon[5]);
				ceSesion.setHoraIniSesion(renglon[3]);
				ceSesion.setHoraFinSesion(renglon[4]);
				ceSesion.setNumIntegrantes(Short.parseShort(renglon[7]));
				ceSesion.setUsrCaptura("CMHID16171A");
				
//				List<CeEscrutador> escrutaList = new ArrayList<CeEscrutador>();
//				
//				CeEscrutador escrutador = new CeEscrutador();
//				
//				escrutador.setCscEscrutador(Short.parseShort("1"));
//				escrutador.setcSesion(Constants.PRIMERA_ASAMBLEA);
//				escrutador.setPaternoEscrutador(renglon[16]);
//				escrutador.setMaternoEscrutador(renglon[17]);
//				escrutador.setNombreEscrutador(renglon[18]);
//				
//				escrutaList.add(escrutador);
//				
				//System.out.println("Valor 19=>"+renglon[19]+"<=");
				
//				if(renglon[19]!=null && renglon[19] != ""){
//					System.out.println("Entro Escrutador 2=>"+renglon[19]+"<=");
//					escrutador = new CeEscrutador();				
//					escrutador.setCscEscrutador(Short.parseShort("2"));
//					escrutador.setcSesion(Constants.PRIMERA_ASAMBLEA);
//					escrutador.setPaternoEscrutador(renglon[19]);
//					escrutador.setMaternoEscrutador(renglon[20]);
//					escrutador.setNombreEscrutador(renglon[21]);
//					
//					escrutaList.add(escrutador);	
//				}
				
				//System.out.println("Total Escrutadores=>"+escrutaList.size()+"<=");
				
				CePreguntas preguntas = new CePreguntas();
				//preguntas.setRespuesta1(Integer.parseInt(renglon[11]));
				//preguntas.setRespuesta2(Integer.parseInt(renglon[12]));
				//preguntas.setRespuesta3(Integer.parseInt(renglon[13]));
				//preguntas.setRespuesta4(Integer.parseInt(renglon[14]));
				preguntas.setRespuesta5(Integer.parseInt(renglon[15]));
				
				List<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
				CeActSesionCstm actividad = new CeActSesionCstm();
				actividad.setcActividad(Short.parseShort("11"));
				actividades.add(actividad);
				
				actividad = new CeActSesionCstm();				
				actividad.setcActividad(Short.parseShort("12"));
				actividades.add(actividad);								
				
				List<CeCandidatopresi> presiList = new ArrayList<CeCandidatopresi>();
				
				CeCandidatopresi presi = new CeCandidatopresi();
				presi.setIdcandidato(Short.parseShort("1"));
				presi.setIdconsejero(Short.parseShort(renglon[22]));
				presi.setNombreHijoPresi(renglon[29]);
				presi.setAcreditacion(renglon[27]);
				presi.setVotos(Short.parseShort(renglon[26]));		
				
				presiList.add(presi);
				
				//List<CeIntegranteCstm> integraList = new ArrayList<CeIntegranteCstm>();
//				integrante = new CeIntegranteCstm();
//				integrante.setPaternoIntegrante(renglon[23]);
//				integrante.setMaternoIntegrante(renglon[24]);
//				integrante.setNombreIntegrante(renglon[25]);
//				integrante.setCscIntegrante(Short.parseShort(renglon[22]));
//				integrante.setcCalidad(4);
//				integrante.setcCargo(3);
//				
//				integraList.add(integrante);
				
				//CAMPO ASUNTO Y ACUERDOS
				// revisa si viene el codigo <enter> para crear una lista de asuntos
				List<CeAsunto> listaAsunto = new ArrayList<CeAsunto>();
						
				CeAsunto tmpAsunto1 = new CeAsunto();
				
				if(renglon != null || renglon[30] != null || !renglon[30].toString().isEmpty()){
					if(renglon[30].indexOf("\n")!=-1){
						String[] tmpAsunto = renglon[30].split("\n");
						short rowSec = 1;
						for(int rowA=0;rowA<tmpAsunto.length;rowA++){
							if(!tmpAsunto[rowA].trim().isEmpty()){
								
								tmpAsunto1 = new CeAsunto();
								
								tmpAsunto1.setcCct(ccct.getcCct());
								tmpAsunto1.setCscAsunto( null ) ;
								tmpAsunto1.setAsunto(tmpAsunto[rowA]);
								System.out.println("Asuntos="+rowSec);
								rowSec++;
								
								listaAsunto.add(tmpAsunto1);	
							}							
						}
						
					} else {
						tmpAsunto1.setcCct(ccct.getcCct());
						tmpAsunto1.setCscAsunto(Short.parseShort("1"));
						tmpAsunto1.setAsunto(renglon[30]);	
						tmpAsunto1.setAcuerdo(renglon[31]);
						listaAsunto.add(tmpAsunto1);
					}	
				}
				
				rowAsamblea.setcCct(ccct);
				rowAsamblea.setCeInfGral(ceInfGral);
				rowAsamblea.setCeSesion(ceSesion);
				//rowAsamblea.setEscrutadores(escrutaList);
				rowAsamblea.setPreguntas(preguntas);
				rowAsamblea.setActividades(actividades);
				rowAsamblea.setPresidentes(presiList);
				rowAsamblea.setIntegrantes(integraList);
				rowAsamblea.setAsuntos(listaAsunto);	
				
				System.out.println("Total de asuntos="+listaAsunto.size()+" registro="+row.getRowNum());
				
				primeraAsamblea.savePrimeraAsamblea(rowAsamblea);
								
				
			}
			}
			
		}
		
	}
}
