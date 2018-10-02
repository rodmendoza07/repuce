package mx.gob.sep.dgtec.repuce.web.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.web.servlet.view.document.AbstractExcelView;


/**
 * clase que crea el templete de los documentos que serán exportados a Excel
 * 
 * @author Ismael Rosas
 * 
 */
public class DocumentsExcelView extends AbstractExcelView {  
	  
  
    @Override
    @SuppressWarnings({ "rawtypes", "unchecked" })
    protected void buildExcelDocument(Map model, HSSFWorkbook workbook,  
            HttpServletRequest req, HttpServletResponse res) throws Exception {  
    	
		List<String> columNames =(ArrayList<String>) model.get("labels");
        List<String> fieldValues =(ArrayList<String>) model.get("values");

		SolrDocumentList results = (SolrDocumentList)model.get("results");
		
        HSSFSheet sheet = workbook.createSheet("Reporte Dinamico");  
        
        int row = 0;  
        int i=0;
        for(String columName : columNames ){
        	getCell(sheet, row, i).setCellValue(columName.trim());
        	i++;
        }
        row++; 

        int j;
        for (SolrDocument document : results) {    
            j=0; 
        	for(String fieldValue : fieldValues ){
        		 getCell(sheet, row, j).setCellValue(  
                 		(document.getFieldValue(fieldValue)+"").trim()); 
            	j++;
            } 
            row++;  
        }  
        
    }  
} 