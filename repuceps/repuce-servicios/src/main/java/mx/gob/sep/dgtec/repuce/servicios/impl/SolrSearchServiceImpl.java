package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import mx.gob.sep.dgtec.repuce.servicios.SolrSearchService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.vo.RepConsejosNacionalVO;
import mx.gob.sep.dgtec.repuce.vo.SolrQueryVO;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrRequest.METHOD;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jayway.jsonpath.JsonPath;

@Service
public class SolrSearchServiceImpl implements SolrSearchService{
	
	@Autowired
	private String solrEngineHost;
	
	private static final Logger log = LoggerFactory.getLogger(SolrSearchServiceImpl.class);
	
	public List<RepConsejosNacionalVO> selectReporteMvtosNacional(){
		List<RepConsejosNacionalVO> reportList = new ArrayList<RepConsejosNacionalVO>();
		RepConsejosNacionalVO resultRepMvtoNal = null;
	    
		
		
	       HttpClient httpclient = new DefaultHttpClient();
	        try {
	            HttpGet httpget = new HttpGet("http://" + solrEngineHost +
	            		"/solr/repuce1617Core/select?q=*:*&rows=0&facet=on&facet.pivot=entidad,sostenimiento2,conConsejo&wt=json&facet.sort=entidad%20asc");
	          
	            System.out.println("URL reporte = "+httpget.getURI());
	            
	            log.debug("executing request " + httpget.getURI());

	            // Create a response handler
	            ResponseHandler<String> responseHandler = new BasicResponseHandler();
	            String responseBody = httpclient.execute(httpget, responseHandler);

	            JsonPath path = null;
	           // System.out.println("esto trae el responsebody---"+responseBody );
	            ObjectMapper mapper1 = new ObjectMapper();
	            
	            JsonFactory factory=mapper1.getJsonFactory();
	            //JsonParser jp=factory.createJsonParser(mapper2.writeValueAsString(responseBody));
	            JsonParser jp=factory.createJsonParser(responseBody.toString());
	            JsonNode nodo = mapper1.readTree(jp);
	           // System.out.println("imprimiendo el nodo---"+nodo);
	          //  System.out.println("imprimiendo el facet pivot----"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(0));
	            for (int j=0;j<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").size();j++)
	            {
	            	//System.out.println("imprimiendo ----"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("value"));
	            	
	            	Integer publicos=0, privados=0, otros=0;
	            	Integer publicosConConsejo=0, privadosConConsejo=0, otrosConConsejo=0;
	            	String entidad=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("value").getTextValue();
	            	int numConTotales=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("count").getIntValue();
	            	//System.out.println("imprimiendo ----"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").size());
	            	for(int h=0;h<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").size();h++)
	            	{
	            		//System.out.println("valor antes del if ---"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue()+" igual no se que --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().equalsIgnoreCase("publico"));
	            		if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().equalsIgnoreCase("publico"))
	            		{
	            			publicos=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("count").getIntValue();
	            			//System.out.println("imprimiendo h --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size());
	            			for (int g=0;g<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size();g++)
	            			{
	            				if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value").getTextValue().equalsIgnoreCase("si")){
	            					publicosConConsejo=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("count").getIntValue();
	            			//System.out.println("valores de consejo publicos ----- "+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value"));
	            			//System.out.println("contador publicos --- "+publicos);
	            				}
	            			}
	            		}
	            		if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().equalsIgnoreCase("privado"))
	            		{
	            			privados=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("count").getIntValue();
	            			//System.out.println("imprimiendo h --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size());
	            			for (int g=0;g<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size();g++)
	            			{
	            				if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value").getTextValue().equalsIgnoreCase("si")){
	            					privadosConConsejo=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("count").getIntValue();
	            			//System.out.println("valores de consejo privados ----- "+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value"));
	            			//System.out.println("contador privados--- "+privados);
	            				}
	            			}
	            		}
	            		if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().trim().equalsIgnoreCase("otros"))
	            		{
	            			otros=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("count").getIntValue();
	            			//System.out.println("imprimiendo h --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size());
	            			for (int g=0;g<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size();g++)
	            			{
	            				if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value").getTextValue().equalsIgnoreCase("si")){
	            					otrosConConsejo=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("count").getIntValue();
	            			//System.out.println("valores de consejo otros ----- "+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value"));
	            			//System.out.println("contador otros--- "+otros);
	            				}
	            			}
	            		}
	            	}
	            	System.out.println("entidad---"+entidad+"numero total de cct---"+numConTotales+" publicos  = "+publicos+" privados = "+privados+" otros = "+otros+" publicos ConConsejo = "+publicosConConsejo+" privados ConConsejo= "+privadosConConsejo+" otrosConConsejo = "+otrosConConsejo);
	            	resultRepMvtoNal = new RepConsejosNacionalVO();
					resultRepMvtoNal.setNomEntidadFed(entidad);
					resultRepMvtoNal.setNumCctPub(publicos);
					resultRepMvtoNal.setNumCctPriv(privados);
					resultRepMvtoNal.setNumCctOtros(otros);
					resultRepMvtoNal.setNumCePub(publicosConConsejo);
					resultRepMvtoNal.setNumCePriv(privadosConConsejo);
					resultRepMvtoNal.setNumCeOtros(otrosConConsejo);
					reportList.add(resultRepMvtoNal);
					
	            }
/**	            
	            path = JsonPath.compile("$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value=='PUBLICO')].count");
	            List<Integer> cctPublicos = path.read(responseBody);
	            path = JsonPath.compile("$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value=='PRIVADO')].count");
	            List<Integer> cctPrivados = path.read(responseBody);
	            //path = JsonPath.compile("$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].count");
	            path = JsonPath.compile("$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value=='Otros  ')].count");
	            List<Integer> cctOtros = path.read(responseBody);
	            
	            path = JsonPath.compile(
	            		"$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value=='PUBLICO')].pivot[?(@.value=='SI')].count");
	            List<Integer> conConsejoPublicas = path.read(responseBody);
	            path = JsonPath.compile(
	            		"$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value=='PRIVADO')].pivot[?(@.value=='SI')].count");
	            List<Integer> conConsejoPrivadas = path.read(responseBody);
	            path = JsonPath.compile(	 
	            		"$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value<>'PUBLICO') and (@.value<>'PRIVADO')].pivot[?(@.value=='SI')].count");
	                  //"$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value=='Otros')].pivot[?(@.value=='SI')].count");
	            	//	"$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].pivot[?(@.value=='SI')].count");
	            		
	            List<Integer> conConsejoOtras = path.read(responseBody);
	            
	            path = JsonPath.compile("$.facet_counts.facet_pivot.entidad,sostenimiento,conConsejo[*].value");
	            List<String> listEntidades = path.read(responseBody);
	            //System.out.println("lista entidades-----"+listEntidades);
	            //System.out.println("conConsejoOtros"+conConsejoOtras);
	            ObjectMapper mapper = new ObjectMapper();
	            //System.out.println("esto trae el parseado del responsebody----"+JSON.parse(responseBody));
	            log.debug("cctPublicos: " + mapper.writeValueAsString(cctPublicos));	            
				log.debug("cctPrivados: " + mapper.writeValueAsString(cctPrivados));	            
				log.debug("cctOtros: " + mapper.writeValueAsString(cctOtros));	            
				
				log.debug("conConsejoPublicas: " + mapper.writeValueAsString(conConsejoPublicas));	            
				log.debug("conConsejoPrivadas: " + mapper.writeValueAsString(conConsejoPrivadas));	            
				log.debug("conConsejoOtras: " + mapper.writeValueAsString(conConsejoOtras));	            
	            
				log.debug("listEntidades: " + mapper.writeValueAsString(listEntidades));	            

				int i=0;
				
				for(String entidad: listEntidades){
				//	System.out.println("tamaño variable i-----"+i);
				//	System.out.println("tamaño entidad-----"+listEntidades.size());
					resultRepMvtoNal = new RepConsejosNacionalVO();
					resultRepMvtoNal.setNomEntidadFed(entidad);
					
				//	System.out.println("cct publicos-----"+resultRepMvtoNal.getNomEntidadFed());
				//	System.out.println("cct privados-----"+conConsejoPrivadas.size());
				//	System.out.println("cct otros-----"+conConsejoOtras.size());
					int privadas=0, publicas=0,otros=0;
					if(i<30){
						privadas=conConsejoPrivadas.get(i);
						publicas=conConsejoPublicas.get(i);
						otros=conConsejoOtras.get(i*3);
					}
					resultRepMvtoNal.setNumCctPub(cctPublicos.get(i));
					resultRepMvtoNal.setNumCctPriv(cctPrivados.get(i));
					resultRepMvtoNal.setNumCctOtros(cctOtros.get(i)-cctPublicos.get(i)-cctPrivados.get(i));
					resultRepMvtoNal.setNumCePub(publicas);
					resultRepMvtoNal.setNumCePriv(privadas);
					resultRepMvtoNal.setNumCeOtros(otros);
					reportList.add(resultRepMvtoNal);
					
					System.out.println("cct publicos-----"+resultRepMvtoNal.getNomEntidadFed());
					
					i++;
				}
**/
	        } catch(ClientProtocolException e){
	        	e.printStackTrace();
				throw new ErrorInfraestructura (e,"servicios.solr.query",new Object[]{});
	        }catch(IOException e){
	        	e.printStackTrace();
				throw new ErrorInfraestructura (e,"servicios.solr.query",new Object[]{});
	        }
	        finally {
	            // When HttpClient instance is no longer needed,
	            // shut down the connection manager to ensure
	            // immediate deallocation of all system resources
	            httpclient.getConnectionManager().shutdown();
	        }
		
		return reportList;
	}	
	
	/**
	 * Método que exporta los resultados obtenidos de la conuslta en Solr a Excel
	 * 
	 * @param queryParam Parametros que se envian desde el cliente
	 * 
	 */
	public SolrDocumentList selectExportResults(SolrQueryVO queryParam){
		SolrServer server = new HttpSolrServer("http://" + solrEngineHost + "/solr/repuce1617Core");

		try{
			SolrQuery query = new SolrQuery()
			
	                .setQuery(queryParam.getQuery())
	                .setFacet(queryParam.getFacet())
	                .setRows(65534)
	                .setFacetMinCount(queryParam.getFacetMinCount())
	                .setParam("wt", "json");
			
	                for(String field : queryParam.getFieldList()){
	                    query.addField(field);
	                }
	                
	                for(String facetField : queryParam.getFactetFields()){
	                    query.addFacetField(facetField);
	                }
	                
	                for(String facetQuery : queryParam.getFacetQuerys()){
	                    query.add("fq", facetQuery);
	                }
	             
	        log.debug("query: "+ query.toString());

	        //Se envia la petición por POST para que codifique en UTF8
		    QueryResponse rsp = server.query( query, METHOD.POST);
		    SolrDocumentList docs = rsp.getResults();
		    
	        return docs;
	    
		}catch(SolrServerException e){
			e.printStackTrace();
			throw new ErrorInfraestructura (e,"servicios.solr.query",new Object[]{});
		}
	
	}
	
	public SolrDocumentList selectExportResults1(SolrQueryVO queryParam){
		SolrServer server = new HttpSolrServer("http://" + solrEngineHost + "/solr/conafeCore");

		try{
			SolrQuery query = new SolrQuery()
			
	                .setQuery(queryParam.getQuery())
	                .setFacet(queryParam.getFacet())
	                .setRows(65534)
	                .setFacetMinCount(queryParam.getFacetMinCount())
	                .setParam("wt", "json");
			
	                for(String field : queryParam.getFieldList()){
	                    query.addField(field);
	                }
	                
	                for(String facetField : queryParam.getFactetFields()){
	                    query.addFacetField(facetField);
	                }
	                
	                for(String facetQuery : queryParam.getFacetQuerys()){
	                    query.add("fq", facetQuery);
	                }
	             
	        log.debug("query: "+ query.toString());

	        //Se envia la petición por POST para que codifique en UTF8
		    QueryResponse rsp = server.query( query, METHOD.POST);
		    SolrDocumentList docs = rsp.getResults();
		    
	        return docs;
	    
		}catch(SolrServerException e){
			e.printStackTrace();
			throw new ErrorInfraestructura (e,"servicios.solr.query",new Object[]{});
		}
	
	}

	public List<RepConsejosNacionalVO> selectReporteMvtosNacional2() {
		List<RepConsejosNacionalVO> reportList2 = new ArrayList<RepConsejosNacionalVO>();
		RepConsejosNacionalVO resultRepMvtoNal = null;
	    
		
		
	       HttpClient httpclient = new DefaultHttpClient();
	        try {
	            HttpGet httpget = new HttpGet("http://" + solrEngineHost +
	            		"/solr/repuce1617Core/select?q=*:*&rows=0&facet=on&facet.pivot=entidad,sostenimiento2,conConsejo,esConafe&wt=json&facet.sort=entidad%20asc");
	          
	            System.out.println("URL reporte = "+httpget.getURI());
	            
	            log.debug("executing request " + httpget.getURI());

	            // Create a response handler
	            ResponseHandler<String> responseHandler = new BasicResponseHandler();
	            String responseBody = httpclient.execute(httpget, responseHandler);

	            JsonPath path = null;
	           // System.out.println("esto trae el responsebody---"+responseBody );
	            ObjectMapper mapper1 = new ObjectMapper();
	            
	            JsonFactory factory=mapper1.getJsonFactory();
	            //JsonParser jp=factory.createJsonParser(mapper2.writeValueAsString(responseBody));
	            JsonParser jp=factory.createJsonParser(responseBody.toString());
	            JsonNode nodo = mapper1.readTree(jp);
	            System.out.println("imprimiendo el nodo---"+nodo);
	            //System.out.println("imprimiendo el facet pivot----"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(0));
	            for (int j=0;j<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo,esConafe").size();j++)
	            {
	            	//System.out.println("imprimiendo ----"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo,esConafe").get(j).findValue("value"));
	            	
	            	Integer publicos=0, privados=0, otros=0;
	            	Integer publicosConConsejo=0, privadosConConsejo=0, otrosConConsejo=0;
	            	String entidad=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo,esConafe").get(j).findValue("value").getTextValue();
	            	int numConTotales=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo,esConafe").get(j).findValue("count").getIntValue();
	            	//System.out.println("imprimiendo ----"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").size());
	            	for(int h=0;h<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo,esConafe").get(j).findValue("pivot").size();h++)
	            	{
	            		
	            		
	            		//System.out.println("valor antes del if ---"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue()+" igual no se que --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().equalsIgnoreCase("publico"));
	            		if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo,esConafe").get(j).findValue("pivot").get(h).findValue("value").getTextValue().equalsIgnoreCase("no"))
	            		{
	            		if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().equalsIgnoreCase("publico"))
	            		{
	            			System.out.println("entro al  publicos");
	            			publicos=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("count").getIntValue();
	            			System.out.println("imprimiendo h --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size());
	            			for (int g=0;g<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size();g++)
	            			{
	            				if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value").getTextValue().equalsIgnoreCase("si")){
	            					publicosConConsejo=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("count").getIntValue();
	            			System.out.println("valores de consejo publicos ----- "+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value"));
	            			System.out.println("contador publicos --- "+publicos);
	            				}
	            			}
	            		}
	            		
	            		
	            		if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().equalsIgnoreCase("privado"))
	            		{
	            			privados=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("count").getIntValue();
	            			//System.out.println("imprimiendo h --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size());
	            			for (int g=0;g<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size();g++)
	            			{
	            				if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value").getTextValue().equalsIgnoreCase("si")){
	            					privadosConConsejo=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("count").getIntValue();
	            			//System.out.println("valores de consejo privados ----- "+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value"));
	            			//System.out.println("contador privados--- "+privados);
	            				}
	            			}
	            		}
	            	
	            	
	            		if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("value").getTextValue().trim().equalsIgnoreCase("otros"))
	            		{
	            			otros=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("count").getIntValue();
	            			//System.out.println("imprimiendo h --"+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size());
	            			for (int g=0;g<nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").size();g++)
	            			{
	            				if(nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value").getTextValue().equalsIgnoreCase("si")){
	            					otrosConConsejo=nodo.findValue("facet_pivot").findValue("entidad,sostenimiento2,conConsejo,esConafe").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("count").getIntValue();
	            			//System.out.println("valores de consejo otros ----- "+nodo.findValue("facet_pivot").findValue("entidad,sostenimiento,conConsejo").get(j).findValue("pivot").get(h).findValue("pivot").get(g).findValue("value"));
	            			//System.out.println("contador otros--- "+otros);
	            				}
	            			}
	            		}
	            		}
	            	}
	            	System.out.println("entidad---"+entidad+"numero total de cct---"+numConTotales+" publicos  = "+publicos+" privados = "+privados+" otros = "+otros+" publicos ConConsejo = "+publicosConConsejo+" privados ConConsejo= "+privadosConConsejo+" otrosConConsejo = "+otrosConConsejo);
	            	resultRepMvtoNal = new RepConsejosNacionalVO();
					resultRepMvtoNal.setNomEntidadFed(entidad);
					resultRepMvtoNal.setNumCctPub(publicos);
					resultRepMvtoNal.setNumCctPriv(privados);
					resultRepMvtoNal.setNumCctOtros(otros);
					resultRepMvtoNal.setNumCePub(publicosConConsejo);
					resultRepMvtoNal.setNumCePriv(privadosConConsejo);
					resultRepMvtoNal.setNumCeOtros(otrosConConsejo);
					reportList2.add(resultRepMvtoNal);
					
	            }

	        } catch(ClientProtocolException e){
	        	e.printStackTrace();
				throw new ErrorInfraestructura (e,"servicios.solr.query",new Object[]{});
	        }catch(IOException e){
	        	e.printStackTrace();
				throw new ErrorInfraestructura (e,"servicios.solr.query",new Object[]{});
	        }
	        finally {
	            // When HttpClient instance is no longer needed,
	            // shut down the connection manager to ensure
	            // immediate deallocation of all system resources
	            httpclient.getConnectionManager().shutdown();
	        }
		
		return reportList2;

	}
}