package mx.gob.sep.dgtec.repuce.web.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CCctCstm;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;


/**
 * clase que crea el templete de los documentos que serán exportados a Excel
 * 
 * @author Ismael Rosas
 * 
 */
public class PublicoExcelView extends AbstractExcelView {  
	  
    @Override
    @SuppressWarnings({ "rawtypes", "unchecked" })
    protected void buildExcelDocument(Map model, HSSFWorkbook workbook,  
            HttpServletRequest req, HttpServletResponse res) throws Exception {  
    	
    	
    	String [] columNames =(String []) model.get("labels");
		List<CCctCstm> cCcts =(ArrayList<CCctCstm>) model.get("cCcts");
        
        HSSFSheet sheet = workbook.createSheet("CEPS");  
        
        int row = 0;  
        int i=0;
        for(String columName : columNames ){
        	getCell(sheet, row, i).setCellValue(columName.trim());
        	i++;
        }
        
        for (CCctCstm cct : cCcts) { 
        	row++;
   		 	getCell(sheet, row, 0).setCellValue(  
   	          		(String)cct.getCveCct()); 
   		 	getCell(sheet, row, 1).setCellValue(  
   	          		(String)cct.getNomCct()); 
   		 	getCell(sheet, row, 2).setCellValue(  
   	          		(String)cct.getNomTurno()); 
   		 	getCell(sheet, row, 3).setCellValue(  
   	          		(String)cct.getNomNivel()); 
   		 	getCell(sheet, row, 4).setCellValue(  
   	          		(String)cct.getNomSubnivel()); 
   		 	getCell(sheet, row, 5).setCellValue(  
   	          		(String)cct.getDomicilio()); 
   		 	getCell(sheet, row, 6).setCellValue(  
   	          		(String)cct.getColonia());
   		 	getCell(sheet, row, 7).setCellValue(  
	          		(String)cct.getCodigoPostal());
   		 	getCell(sheet, row, 8).setCellValue(  
	          		(String)cct.getPresidente());
   			getCell(sheet, row, 9).setCellValue(  
	          		(String)cct.getSecretario());
   		 	getCell(sheet, row, 10).setCellValue(  
   	          		(String)cct.getIntegrantes()); 
              
        }  
        
    }  
} 