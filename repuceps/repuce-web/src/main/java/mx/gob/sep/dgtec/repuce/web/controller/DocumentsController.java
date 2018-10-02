package mx.gob.sep.dgtec.repuce.web.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.sep.dgtec.conafe.vo.ReunionesConafeVO;
import mx.gob.sep.dgtec.repuce.dao.COpcionesCatMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.InformeTransparenciaMapper;
import mx.gob.sep.dgtec.repuce.model.COpcionesCat;
import mx.gob.sep.dgtec.repuce.model.COpcionesCatExample;
import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CctResultEnlaceExample;
import mx.gob.sep.dgtec.repuce.model.CeAccionCstm;
import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;
import mx.gob.sep.dgtec.repuce.model.CeComitesCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompromisosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEvaluaciones;
import mx.gob.sep.dgtec.repuce.model.CeEventosCstm;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionCstm;
import mx.gob.sep.dgtec.repuce.model.ConsejeroC1415;
import mx.gob.sep.dgtec.repuce.servicios.ActaConstitutivaService;
import mx.gob.sep.dgtec.repuce.servicios.CuartaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraReunionService;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaReunionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.SistemaArchivosServicio;
import mx.gob.sep.dgtec.repuce.servicios.SolrSearchService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraReunionService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ConvierteNumLetra;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.Categorias1SesionVO;
import mx.gob.sep.dgtec.repuce.vo.CeRecursosPadresVO;
import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;
import mx.gob.sep.dgtec.repuce.vo.InformeTransparenciaVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.RecursosFuentesEventosCategoriasVO;
import mx.gob.sep.dgtec.repuce.vo.RecursosProgramasVO;
import mx.gob.sep.dgtec.repuce.vo.RepConsejosNacionalVO;
import mx.gob.sep.dgtec.repuce.vo.ReunionVO;
import mx.gob.sep.dgtec.repuce.vo.ProgramasFederalesVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsamblea1415VO;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionC1415VO;
import mx.gob.sep.dgtec.repuce.vo.TotalesFuentesOProgramasVO;
//import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
//import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller que manda a imprimir las actas y minutas
 * 
 * @author Ismael Rosas
 * 
 */
@Controller
@RequestMapping(value = "/documentos")
public class DocumentsController {

	@Autowired
	ActaConstitutivaService actaConstitutivaService;
	@Autowired
	CeInfGralMapper ceInfGralMapper;
	@Autowired
	PrimeraAsambleaService primeraAsambleaService;
	@Autowired
	PrimeraSesionService primeraSesionService;
	@Autowired
	SegundaSesionService segundaSesionService;
	@Autowired
	SegundaAsambleaService segundaAsambleaService;
	@Autowired
	TerceraSesionService terceraSesionService;
	@Autowired
	CuartaSesionService cuartaSesionService;
	@Autowired
	TerceraAsambleaService terceraAsambleaService;
	@Autowired
	InformeTransparenciaMapper informeTransparenciaMapper;
	@Autowired
	SolrSearchService solrSearchService;
	@Autowired
	private SistemaArchivosServicio sistemaArchivosServicio;
	@Autowired
	PrimeraReunionService primeraReunionService;
	@Autowired
	SegundaReunionService segundaReunionService;

	@Autowired
	TerceraReunionService terceraReunionService;

	@Autowired
	private COpcionesCatMapper cOpcionesCatMapper;
	
	@RequestMapping(value = "/primeraAsamblea/{cCct}", method = RequestMethod.GET)
	public ModelAndView primeraAsamblea(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();
		
	    PrimeraAsambleaVO	tmpPrimeraAsamblea =  primeraAsambleaService.selectPrimeraAsamblea(cCct, "1");
		
	    List<ConsejeroC1415> listConsejero3 = tmpPrimeraAsamblea.getConsejeros();
	    List<ConsejeroC1415> listConsejero4 =new ArrayList<ConsejeroC1415>();
	    
	 if(tmpPrimeraAsamblea.getPreguntas().getRespuesta5()==2){
	  for(int i=0;i<listConsejero3.size();i++)
	  {
		 String nombreConsejero3=  tmpPrimeraAsamblea.getConsejeros().get(i).getPaternoIntegrante()+' '+tmpPrimeraAsamblea.getConsejeros().get(i).getMaternoIntegrante()+' '+tmpPrimeraAsamblea.getConsejeros().get(i).getNombreIntegrante();
		 String director3 =tmpPrimeraAsamblea.getCctViewVO().getNomDirector();
		 
		 if(!nombreConsejero3.equals(director3)){
			 
			 listConsejero4.add(listConsejero3.get(i));
		 }
	  }
	  tmpPrimeraAsamblea.setConsejeros(listConsejero4);
	 }
	 
		acta.setPrimeraAsamblea(tmpPrimeraAsamblea);

		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("primeraAsamblea",
						modelMap);
		
		if( acta.getPrimeraAsamblea().getValidacionHijo().getValnomhijo()>=1)
		{
			modelAndView = new ModelAndView("mensajeModifica",
					modelMap);	
		}
		
		
		return modelAndView;
	}

	@RequestMapping(value = "/primeraSesion/{cCct}", method = RequestMethod.GET)
	public ModelAndView primeraSesion(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();
//		acta.setPrimeraSesion(primeraSesionService.selectPrimeraSesion(cCct));
		acta.setPrimeraSesionC1415(primeraSesionService.selectPrimeraSesionC1415(cCct));
	    PrimeraAsambleaVO	tmpPrimeraAsamblea =  primeraAsambleaService.selectPrimeraAsamblea(cCct, "1");
		
	    List<ConsejeroC1415> listConsejero = tmpPrimeraAsamblea.getConsejeros();
	    List<ConsejeroC1415> listConsejero2 =new ArrayList<ConsejeroC1415>();
	    
	 if(tmpPrimeraAsamblea.getPreguntas().getRespuesta5()==2){
	  for(int i=0;i<listConsejero.size();i++)
	  {
		 String nombreConsejero=  tmpPrimeraAsamblea.getConsejeros().get(i).getPaternoIntegrante()+' '+tmpPrimeraAsamblea.getConsejeros().get(i).getMaternoIntegrante()+' '+tmpPrimeraAsamblea.getConsejeros().get(i).getNombreIntegrante();
		 String director =tmpPrimeraAsamblea.getCctViewVO().getNomDirector();
		 if(!nombreConsejero.equals(director)){
			 listConsejero2.add(listConsejero.get(i));
		 }
	  }
	  tmpPrimeraAsamblea.setConsejeros(listConsejero2);
	 }
	 
		acta.setPrimeraAsamblea(tmpPrimeraAsamblea);
			
		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		System.out.println("-------------------------"+ list);
		
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));
		System.out.println("-------------------------"+ modelMap);
		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("primeraSesion", modelMap);

		return modelAndView;

	}

	private ProgramasFederalesVO mapeoFederal(String tmpSeguimientoStr, List <COpcionesCat> resultadosOpciones){
		ProgramasFederalesVO tmpFederalA = new ProgramasFederalesVO();
        tmpFederalA.setProgramastr("RECURSOS NO ECONOMICOS ASIGNADOS A LA ESCUELA POR PARTE DEL PROGRAMA");
        tmpFederalA.setObjetivo("");
        tmpFederalA.setIddetalle(1);
        
        String[] items = tmpSeguimientoStr.split(",-");
        
        String tmpRecursos = "";
        for(int ii=0; ii<items.length ; ii++ ){
        	
        	System.out.println("valor item-->"+items[ii]);
        	System.out.println("valor item-->"+items[ii].indexOf(",="));
        	if(items[ii].indexOf(",=")>0){
        		String[] items2 = items[ii].split(",=");
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items2[0])-1).getDescripOpcion()+System.getProperty("line.separator");
        		tmpRecursos += items2[1]+System.getProperty("line.separator");
        	} else {
        		if(items[ii]!=null && items[ii].length()>0){
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items[ii])-1).getDescripOpcion()+System.getProperty("line.separator");
        		}
        		else {
        			tmpRecursos+="No registr\u00f3"+System.getProperty("line.separator");
        		}
        		}
        }
        tmpFederalA.setMeta(tmpRecursos);
        tmpFederalA.setDescripcionAvance("");
        
        return tmpFederalA;
	}
	

	
	private ArrayList<ProgramasFederalesVO> procesaProgramas(SegundaSesionC1415VO tmpSegunda,
			                                                 List<ProgramasFederalesVO> programa,
			                                                 List <COpcionesCat> resultadosOpciones){
		
		ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = new ArrayList<ProgramasFederalesVO>();
		ProgramasFederalesVO tmpFederalA = new ProgramasFederalesVO();
				
		int noPrograma = programa.get(0).getcPrograma();
		String tmpSeguimientoStr = "";
		for(int ii=0; ii<programa.size() ; ii++ ){
			
			ProgramasFederalesVO tmpFederal = new ProgramasFederalesVO();
			tmpFederal = programa.get(ii);
					
			if(noPrograma != tmpFederal.getcPrograma()){
				
				tmpFederalA = mapeoFederal(tmpSeguimientoStr, resultadosOpciones);
                
				tmpSegundaRecurso.add(tmpFederalA);
				
                noPrograma = tmpFederal.getcPrograma();                                        
                                    
			}
			
			tmpSegundaRecurso.add(tmpFederal);
			tmpSeguimientoStr = tmpFederal.getSeguimiento();
			
			tmpFederalA=tmpFederal;
		}
	
		if(tmpSeguimientoStr!=null){
			tmpFederalA = mapeoFederal(tmpSeguimientoStr, resultadosOpciones);
			tmpSegundaRecurso.add(tmpFederalA);
		}
		
		return tmpSegundaRecurso;
	}

		
	
	private ArrayList<CeCompromisosCstm> procesaCompromiso(SegundaSesionC1415VO tmpSegunda,
															List<CeCompromisosCstm> compromiso,
															List <COpcionesCat> resultadosOpciones){
		
ArrayList<CeCompromisosCstm> tmpSegundaRecursoCom = new ArrayList<CeCompromisosCstm>();
CeCompromisosCstm tmpCompromisoA = new CeCompromisosCstm();


String tmpSeguimientoStr = "";
Integer num=0;
String tmpCompromisoStr = "";

for(int ii=0; ii<compromiso.size() ; ii++ ){

	CeCompromisosCstm tmpCompromiso = new CeCompromisosCstm();
	tmpCompromiso = compromiso.get(ii);
	if(tmpCompromiso.getNomOtroCompromiso().length()>0){
		tmpSeguimientoStr = tmpCompromiso.getAccion1()+System.getProperty("line.separator")+tmpCompromiso.getAccion2();
		tmpCompromisoStr = tmpCompromiso.getCompromiso()+" "+tmpCompromiso.getNomOtroCompromiso();
		num=1;
	}
	else
	{
		tmpSeguimientoStr = tmpCompromiso.getAccion1();
        tmpCompromisoStr=tmpCompromiso.getCompromiso();
        num=0;
	}

	tmpCompromisoA = mapeoCompromisos(tmpSeguimientoStr,tmpCompromisoStr,num, resultadosOpciones);
    tmpSegundaRecursoCom.add(tmpCompromisoA);
}

return tmpSegundaRecursoCom;

	}
	private CeCompromisosCstm mapeoCompromisos(String tmpCompromiso,String tmpCompromisoStr, Integer num,List <COpcionesCat> resultadosOpciones){
		CeCompromisosCstm tmpCompromisoA = new CeCompromisosCstm();
if(num==0){
        String[] items = tmpCompromiso.split(",-");
        
        String tmpRecursos = "";
        for(int ii=0; ii<items.length ; ii++ ){
        	System.out.println("valor item-->"+items[ii]);
        	System.out.println("valor item-->"+items[ii].indexOf(",="));
        	if(items[ii].indexOf(",=")>0){
        		String[] items2 = items[ii].split(",=");
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items2[0])-1).getDescripOpcion()+System.getProperty("line.separator");
        		tmpRecursos += items2[1]+System.getProperty("line.separator");
        	} else {
        		if(items[ii]!=null && items[ii].length()>0){
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items[ii])-1).getDescripOpcion()+System.getProperty("line.separator");
        	}
        		}
        }
        tmpCompromisoA.setCompromiso(tmpCompromisoStr);
        tmpCompromisoA.setAccion1(tmpRecursos);
    
}
else {
	
	tmpCompromisoA.setCompromiso(tmpCompromisoStr);
    tmpCompromisoA.setAccion1(tmpCompromiso);
}
        
        return tmpCompromisoA;
	
	}

	
	private ArrayList<CeComitesCstm> procesaComite(SegundaSesionC1415VO tmpSegunda,
			List<CeComitesCstm> comite,
			List <COpcionesCat> resultadosOpciones){

ArrayList<CeComitesCstm> tmpSegundaRecursoComi = new ArrayList<CeComitesCstm>();
CeComitesCstm tmpComiteA = new CeComitesCstm();


String tmpSeguimientoStr = "";
String tmpComiteStr = "";
String tmpComiteStr2 = "";
Integer num=0;
for(int ii=0; ii<comite.size() ; ii++ ){

	CeComitesCstm tmpComite = new CeComitesCstm();
tmpComite = comite.get(ii);

if(tmpComite.getNomOtroComite().length()>0){
tmpSeguimientoStr = tmpComite.getAccion1()+System.getProperty("line.separator")+tmpComite.getAccion2()+System.getProperty("line.separator")+tmpComite.getAccion3();
tmpComiteStr=tmpComite.getNomComite()+" "+tmpComite.getNomOtroComite();
tmpComiteStr2=tmpComite.getAccion4();
num=1;
}
else {
	tmpSeguimientoStr = tmpComite.getAccion1();
	tmpComiteStr=tmpComite.getNomComite();
	tmpComiteStr2=tmpComite.getAccion4();
	num=0;
}
tmpComiteA = mapeoComite(tmpSeguimientoStr,tmpComiteStr,num,tmpComiteStr2, resultadosOpciones);

tmpSegundaRecursoComi.add(tmpComiteA);
}

return tmpSegundaRecursoComi;



	}
	
	private CeComitesCstm mapeoComite(String tmpComite,String tmpComiteStr, Integer num,String tmpComiteStr2 ,List <COpcionesCat> resultadosOpciones){
		CeComitesCstm tmpComiteA = new CeComitesCstm();
		if(num==0){
        String[] items = tmpComite.split(",-");
        
        String tmpRecursos = "";
        for(int ii=0; ii<items.length ; ii++ ){
        	System.out.println("valor item-->"+items[ii]);
        	System.out.println("valor item-->"+items[ii].indexOf(",="));
        	if(items[ii].indexOf(",=")>0){
        		String[] items2 = items[ii].split(",=");
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items2[0])-1).getDescripOpcion()+System.getProperty("line.separator");
        		tmpRecursos += items2[1]+System.getProperty("line.separator");
        	} else {
        		if(items[ii]!=null && items[ii].length()>0){
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items[ii])-1).getDescripOpcion()+System.getProperty("line.separator");
        	}
        	}
        }
        tmpComiteA.setNomComite(tmpComiteStr);
        tmpComiteA.setAccion1(tmpRecursos);
        tmpComiteA.setAccion4(tmpComiteStr2);
		}
		else{
			tmpComiteA.setNomComite(tmpComiteStr);
	        tmpComiteA.setAccion1(tmpComite);
	        tmpComiteA.setAccion4(tmpComiteStr2);
			
		    		
		}
        
        return tmpComiteA;
	}
	
	
	@RequestMapping(value = "/segundaSesion/{cCct}", method = RequestMethod.GET)
	public ModelAndView segundaSesion(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();		
		SegundaSesionC1415VO tmpSegunda = segundaSesionService.selectSegundaSesionC1415(cCct);				
		
		List <COpcionesCat> resultadosOpciones;
		COpcionesCatExample opcionesCatalogoExample = new COpcionesCatExample();
		
		resultadosOpciones = cOpcionesCatMapper.selectByExample2(opcionesCatalogoExample);
		
		Integer validaSesion=0;
		
		if(tmpSegunda.getValida().getProPri()==1){
			if(tmpSegunda.getValida().getProSeg()==0){
				validaSesion=1;
			}
		}
		
		if(tmpSegunda.getValida().getRecSeg()==0){
			validaSesion=1;
		}
		if(tmpSegunda.getValida().getAccSeg()==0){
			validaSesion=1;
		}
		if(tmpSegunda.getValida().getNorSeg()==0){
			validaSesion=1;
		}
		if(tmpSegunda.getValida().getcNivel()==12 || tmpSegunda.getValida().getcNivel()==13){
		if(tmpSegunda.getValida().getEvaSeg()==0){
			validaSesion=1;
		}
		}
		if(tmpSegunda.getValida().getComSeg()==0){
			validaSesion=1;
		}
		if(tmpSegunda.getValida().getComiSeg()==0){
			validaSesion=1;
		}
		if(tmpSegunda.getValida().getPreSeg()==0){
			validaSesion=1;
		}
		
		
		//----------------- Lista de programas federales -- Inicio
		if(validaSesion==0){
		
		List<ProgramasFederalesVO> programa= new ArrayList<ProgramasFederalesVO>();
						
		if(tmpSegunda.getProgramasFederalesActa2Sesion().size()>0){
			
			programa = tmpSegunda.getProgramasFederalesActa2Sesion();				
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas(tmpSegunda,programa, resultadosOpciones);
			
			tmpSegunda.setProgramasFederalesActa2Sesion(tmpSegundaRecurso);		
		}
		
		if(tmpSegunda.getProgramasEstatalesActa2Sesion().size()>0){
			programa = tmpSegunda.getProgramasEstatalesActa2Sesion();
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas(tmpSegunda,programa, resultadosOpciones);
			
			tmpSegunda.setProgramasEstatalesActa2Sesion(tmpSegundaRecurso);
		}
//			
		if(tmpSegunda.getProgramasMunicipalesActa2Sesion().size()>0){
			programa = tmpSegunda.getProgramasMunicipalesActa2Sesion();
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas(tmpSegunda,programa, resultadosOpciones);
			
			tmpSegunda.setProgramasMunicipalesActa2Sesion(tmpSegundaRecurso);
		}
//		
		if(tmpSegunda.getProgramasOSCActa2Sesion().size()>0){
			programa = tmpSegunda.getProgramasOSCActa2Sesion();
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas(tmpSegunda,programa, resultadosOpciones);
			
			tmpSegunda.setProgramasOSCActa2Sesion(tmpSegundaRecurso);
		}
		
		List<CeCompromisosCstm> compromiso= new ArrayList<CeCompromisosCstm>();
		if(tmpSegunda.getCompromiso().size()>0){
			compromiso = tmpSegunda.getCompromiso();
			ArrayList<CeCompromisosCstm> tmpSegundaRecursoCom = procesaCompromiso(tmpSegunda,compromiso, resultadosOpciones);
			tmpSegunda.setCompromiso(tmpSegundaRecursoCom);
		}
		
		List<CeComitesCstm> comite= new ArrayList<CeComitesCstm>();
		if(tmpSegunda.getComiteActa().size()>0){
			comite = tmpSegunda.getComiteActa();
			ArrayList<CeComitesCstm> tmpSegundaRecursoComi = procesaComite(tmpSegunda,comite, resultadosOpciones);
			tmpSegunda.setComiteActa(tmpSegundaRecursoComi);
		}
		
		}
		
		acta.setSegundaSesionC1415(tmpSegunda);
		acta.setPrimeraAsamblea(primeraAsambleaService.selectPrimeraAsamblea(
				cCct, "1"));
		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("segundaSesion", modelMap);

		
		if( validaSesion==1)
		{
			modelAndView = new ModelAndView("validaSegundaSesion",
					modelMap);	
		}
		
		return modelAndView;
	}


	private ProgramasFederalesVO mapeoFederal2(String tmpSeguimientoStr, List <COpcionesCat> resultadosOpciones){
		ProgramasFederalesVO tmpFederalA = new ProgramasFederalesVO();
        tmpFederalA.setProgramastr("RECURSOS NO ECONOMICOS ASIGNADOS A LA ESCUELA POR PARTE DEL PROGRAMA");
        tmpFederalA.setObjetivo("");
        tmpFederalA.setIddetalle(1);
        
        String[] items = tmpSeguimientoStr.split(",-");
        
        String tmpRecursos = "";
        for(int ii=0; ii<items.length ; ii++ ){
        	
        	System.out.println("valor item-->"+items[ii]);
        	System.out.println("valor item-->"+items[ii].indexOf(",="));
        	if(items[ii].indexOf(",=")>0){
        		String[] items2 = items[ii].split(",=");
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items2[0])-1).getDescripOpcion()+System.getProperty("line.separator");
        		tmpRecursos += items2[1]+System.getProperty("line.separator");
        	} else {
        		if(items[ii]!=null && items[ii].length()>0){
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items[ii])-1).getDescripOpcion()+System.getProperty("line.separator");
        		}
        		else {
        			tmpRecursos+="No registr\u00f3"+System.getProperty("line.separator");
        		}
        		}
        }
        tmpFederalA.setMeta(tmpRecursos);
        tmpFederalA.setDescripcionAvance("");
        
        return tmpFederalA;
	}
	

	
	private ArrayList<ProgramasFederalesVO> procesaProgramas2(SegundaAsamblea1415VO tmpSegunda,
			                                                 List<ProgramasFederalesVO> programa,
			                                                 List <COpcionesCat> resultadosOpciones){
		
		ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = new ArrayList<ProgramasFederalesVO>();
		ProgramasFederalesVO tmpFederalA = new ProgramasFederalesVO();
				
		int noPrograma = programa.get(0).getcPrograma();
		String tmpSeguimientoStr = "";
		for(int ii=0; ii<programa.size() ; ii++ ){
			
			ProgramasFederalesVO tmpFederal = new ProgramasFederalesVO();
			tmpFederal = programa.get(ii);
					
			if(noPrograma != tmpFederal.getcPrograma()){
				
				tmpFederalA = mapeoFederal2(tmpSeguimientoStr, resultadosOpciones);
                
				tmpSegundaRecurso.add(tmpFederalA);
				
                noPrograma = tmpFederal.getcPrograma();                                        
                                    
			}
			
			tmpSegundaRecurso.add(tmpFederal);
			tmpSeguimientoStr = tmpFederal.getSeguimiento();
			
			tmpFederalA=tmpFederal;
		}
	
		if(tmpSeguimientoStr!=null){
			tmpFederalA = mapeoFederal2(tmpSeguimientoStr, resultadosOpciones);
			tmpSegundaRecurso.add(tmpFederalA);
		}
		
		return tmpSegundaRecurso;
	}

	
	
	private ArrayList<CeComitesCstm> procesaComite2(SegundaAsamblea1415VO tmpSegunda,
			List<CeComitesCstm> comite,
			List <COpcionesCat> resultadosOpciones){

ArrayList<CeComitesCstm> tmpSegundaRecursoComi = new ArrayList<CeComitesCstm>();
CeComitesCstm tmpComiteA = new CeComitesCstm();


String tmpSeguimientoStr = "";
String tmpComiteStr = "";
Integer num=0;
Integer tmpActividad=0;
for(int ii=0; ii<comite.size() ; ii++ ){

	CeComitesCstm tmpComite = new CeComitesCstm();
tmpComite = comite.get(ii);

if(tmpComite.getNomOtroComite().length()>0){
tmpSeguimientoStr = tmpComite.getAccion1()+System.getProperty("line.separator")+tmpComite.getAccion2()+System.getProperty("line.separator")+tmpComite.getAccion3();
tmpComiteStr=tmpComite.getNomComite()+" "+tmpComite.getNomOtroComite();
tmpActividad=tmpComite.getActividadComite1();
num=1;
}
else {
	tmpSeguimientoStr = tmpComite.getAccion1();
	tmpComiteStr=tmpComite.getNomComite();
	tmpActividad=tmpComite.getActividadComite1();
	num=0;
}
tmpComiteA = mapeoComite2(tmpSeguimientoStr,tmpComiteStr,num, resultadosOpciones,tmpActividad);

tmpSegundaRecursoComi.add(tmpComiteA);
}

return tmpSegundaRecursoComi;



	}
	
	private CeComitesCstm mapeoComite2(String tmpComite,String tmpComiteStr, Integer num, List <COpcionesCat> resultadosOpciones, Integer tmpActividad){
		CeComitesCstm tmpComiteA = new CeComitesCstm();
		if(num==0){
        String[] items = tmpComite.split(",-");
        
        String tmpRecursos = "";
        for(int ii=0; ii<items.length ; ii++ ){
        	System.out.println("valor item-->"+items[ii]);
        	System.out.println("valor item-->"+items[ii].indexOf(",="));
        	if(items[ii].indexOf(",=")>0){
        		String[] items2 = items[ii].split(",=");
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items2[0])-1).getDescripOpcion()+System.getProperty("line.separator");
        		tmpRecursos += items2[1]+System.getProperty("line.separator");
        	} else {
        		if(items[ii]!=null && items[ii].length()>0){
        		tmpRecursos += resultadosOpciones.get( Integer.parseInt(items[ii])-1).getDescripOpcion()+System.getProperty("line.separator");
        	}
        	}
        }
        tmpComiteA.setNomComite(tmpComiteStr);
        tmpComiteA.setAccion1(tmpRecursos);
        tmpComiteA.setActividadComite1(tmpActividad);
		}
		else{
			tmpComiteA.setNomComite(tmpComiteStr);
	        tmpComiteA.setAccion1(tmpComite);
	        tmpComiteA.setActividadComite1(tmpActividad);
			
		    		
		}
        
        return tmpComiteA;
	}
	

	private ArrayList<CeCompromisosCstm> procesaCompromiso2(SegundaAsamblea1415VO tmpSegunda,
			List<CeCompromisosCstm> compromiso,
			List <COpcionesCat> resultadosOpciones){

ArrayList<CeCompromisosCstm> tmpSegundaRecursoCom = new ArrayList<CeCompromisosCstm>();
CeCompromisosCstm tmpCompromisoA = new CeCompromisosCstm();


String tmpSeguimientoStr = "";
Integer num=0;
String tmpCompromisoStr = "";
Short tmpCumplimiento=0;
for(int ii=0; ii<compromiso.size() ; ii++ ){

CeCompromisosCstm tmpCompromiso = new CeCompromisosCstm();
tmpCompromiso = compromiso.get(ii);
if(tmpCompromiso.getNomOtroCompromiso().length()>0){
tmpSeguimientoStr = tmpCompromiso.getAccion1()+System.getProperty("line.separator")+tmpCompromiso.getAccion2();
tmpCompromisoStr = tmpCompromiso.getCompromiso()+" "+tmpCompromiso.getNomOtroCompromiso();
num=1;
}
else
{
tmpSeguimientoStr = tmpCompromiso.getAccion1();
tmpCompromisoStr=tmpCompromiso.getCompromiso();
tmpCumplimiento=tmpCompromiso.getCumplimiento();
num=0;
}

tmpCompromisoA = mapeoCompromisos2(tmpSeguimientoStr,tmpCompromisoStr,num, resultadosOpciones,tmpCumplimiento);
tmpSegundaRecursoCom.add(tmpCompromisoA);
}

return tmpSegundaRecursoCom;

}
private CeCompromisosCstm mapeoCompromisos2(String tmpCompromiso,String tmpCompromisoStr, Integer num,List <COpcionesCat> resultadosOpciones, Short tmpCumplimiento){
CeCompromisosCstm tmpCompromisoA = new CeCompromisosCstm();
if(num==0){
String[] items = tmpCompromiso.split(",-");

String tmpRecursos = "";
for(int ii=0; ii<items.length ; ii++ ){
System.out.println("valor item-->"+items[ii]);
System.out.println("valor item-->"+items[ii].indexOf(",="));
if(items[ii].indexOf(",=")>0){
String[] items2 = items[ii].split(",=");
tmpRecursos += resultadosOpciones.get( Integer.parseInt(items2[0])).getDescripOpcion()+System.getProperty("line.separator");
tmpRecursos += items2[1]+System.getProperty("line.separator");
} else {
if(items[ii]!=null && items[ii].length()>0){
tmpRecursos += resultadosOpciones.get( Integer.parseInt(items[ii])).getDescripOpcion()+System.getProperty("line.separator");
}
}
}
tmpCompromisoA.setCompromiso(tmpCompromisoStr);
tmpCompromisoA.setAccion1(tmpRecursos);
tmpCompromisoA.setCumplimiento(tmpCumplimiento);   

}
else {

tmpCompromisoA.setCompromiso(tmpCompromisoStr);
tmpCompromisoA.setAccion1(tmpCompromiso);
tmpCompromisoA.setCumplimiento(tmpCumplimiento);
}

return tmpCompromisoA;

}
	
	
	@RequestMapping(value = "/segundaAsamblea/{cCct}", method = RequestMethod.GET)
	public ModelAndView segundaAsamblea(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();
		SegundaAsamblea1415VO tmpSegundaAsamblea = segundaAsambleaService.selectSegundaAsamblea1415(cCct);

		List <COpcionesCat> resultadosOpciones;
		COpcionesCatExample opcionesCatalogoExample = new COpcionesCatExample();
		
		resultadosOpciones = cOpcionesCatMapper.selectByExample2(opcionesCatalogoExample);

		
		
		List<ProgramasFederalesVO> programa= new ArrayList<ProgramasFederalesVO>();
		
		if(tmpSegundaAsamblea.getProgramasFederalesActa2Asamblea().size()>0){
			
			programa = tmpSegundaAsamblea.getProgramasFederalesActa2Asamblea();				
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas2(tmpSegundaAsamblea,programa, resultadosOpciones);
			
			tmpSegundaAsamblea.setProgramasFederalesActa2Asamblea(tmpSegundaRecurso);		
		}
		
		if(tmpSegundaAsamblea.getProgramasEstatalesActa2Asamblea().size()>0){
			programa = tmpSegundaAsamblea.getProgramasEstatalesActa2Asamblea();
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas2(tmpSegundaAsamblea,programa, resultadosOpciones);
			
			tmpSegundaAsamblea.setProgramasEstatalesActa2Asamblea(tmpSegundaRecurso);
		}
//			
		if(tmpSegundaAsamblea.getProgramasMunicipalesActa2Asamblea().size()>0){
			programa = tmpSegundaAsamblea.getProgramasMunicipalesActa2Asamblea();
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas2(tmpSegundaAsamblea,programa, resultadosOpciones);
			
			tmpSegundaAsamblea.setProgramasMunicipalesActa2Asamblea(tmpSegundaRecurso);
		}
//		
		if(tmpSegundaAsamblea.getProgramasOSCActa2Asamblea().size()>0){
			programa = tmpSegundaAsamblea.getProgramasOSCActa2Asamblea();
			ArrayList<ProgramasFederalesVO> tmpSegundaRecurso = procesaProgramas2(tmpSegundaAsamblea,programa, resultadosOpciones);
			
			tmpSegundaAsamblea.setProgramasOSCActa2Asamblea(tmpSegundaRecurso);
		}
		

		// esto es para recuros de los programas
				List<CeProgramasParticipacionCstm> tmpprogramaRecursos1= new ArrayList<CeProgramasParticipacionCstm>();
				List<CeProgramasParticipacionCstm> tmpprogramaRecursos2= new ArrayList<CeProgramasParticipacionCstm>();
				tmpprogramaRecursos1=tmpSegundaAsamblea.getProgramaRecursos();
				System.out.println("viendo la longitud de los recursos de programas:   "+tmpprogramaRecursos1.size());		
				if(tmpprogramaRecursos1.size()>0){
				for(int it=0;it<tmpprogramaRecursos1.size();it++){
					if(tmpprogramaRecursos1.get(it).getcSesion()!=null){
					if(tmpprogramaRecursos1.get(it).getcSesion()==4){
						tmpprogramaRecursos2.add(tmpprogramaRecursos1.get(it));
					}
				}
					}
				}
				tmpSegundaAsamblea.setProgramaRecursos(tmpprogramaRecursos2);
		
		// esto es para categorias
		List<Categorias1SesionVO> tmpCategorias1= new ArrayList<Categorias1SesionVO>();
		List<Categorias1SesionVO> tmpCategorias2= new ArrayList<Categorias1SesionVO>();
				
		tmpCategorias1=tmpSegundaAsamblea.getCategoriasSegundaAsamblea();
		
		if(tmpCategorias1.size()>0){
		for(int it=0;it<tmpCategorias1.size();it++){
			if(tmpCategorias1.get(it).getcSesion()!=null){
			if(tmpCategorias1.get(it).getcSesion()==4){
			
					tmpCategorias2.add(tmpCategorias1.get(it));	
			}
		}
			}
		}
				
		tmpSegundaAsamblea.setCategoriasSegundaAsamblea(tmpCategorias2);
		
		// esto es para compromisos
				List<CeCompromisosCstm> tmpCompromisos1= new ArrayList<CeCompromisosCstm>();
				List<CeCompromisosCstm> tmpCompromisos2= new ArrayList<CeCompromisosCstm>();
				tmpCompromisos1=tmpSegundaAsamblea.getCompromiso();
				
				if(tmpCompromisos1.size()>0){
				for(int it=0;it<tmpCompromisos1.size();it++){
					if(tmpCompromisos1.get(it).getcSesion()!=null){
					if(tmpCompromisos1.get(it).getcSesion()==4){
						tmpCompromisos2.add(tmpCompromisos1.get(it));
					}
				}
				}
				}
				tmpSegundaAsamblea.setCompromiso(tmpCompromisos2);
		
				
				List<CeCompromisosCstm> compromiso= new ArrayList<CeCompromisosCstm>();
				if(tmpSegundaAsamblea.getCompromiso().size()>0){
					compromiso = tmpSegundaAsamblea.getCompromiso();
					ArrayList<CeCompromisosCstm> tmpSegundaRecursoCom = procesaCompromiso2(tmpSegundaAsamblea,compromiso, resultadosOpciones);
					tmpSegundaAsamblea.setCompromiso(tmpSegundaRecursoCom);
				}
		
		// esto es para evaluaciones
		List<CeEvaluaciones> tmpEvaluaciones1= new ArrayList<CeEvaluaciones>();
		List<CeEvaluaciones> tmpEvaluaciones2= new ArrayList<CeEvaluaciones>();
		tmpEvaluaciones1=tmpSegundaAsamblea.getEvaluacion();
		
		if(tmpEvaluaciones1.size()>0){
		for(int it=0;it<tmpEvaluaciones1.size();it++){
			if(tmpEvaluaciones1.get(it).getcSesion()!=null){
			if(tmpEvaluaciones1.get(it).getcSesion()==4){
				tmpEvaluaciones2.add(tmpEvaluaciones1.get(it));
			}
		}
			}
		}
		tmpSegundaAsamblea.setEvaluacion(tmpEvaluaciones2);
		
		// esto es para acciones
				List<CeAccionCstm> tmpAccion1= new ArrayList<CeAccionCstm>();
				List<CeAccionCstm> tmpAccion2= new ArrayList<CeAccionCstm>();
				tmpAccion1=tmpSegundaAsamblea.getAcciones();
				
		if(tmpAccion1.size()>0){		
				for(int it=0;it<tmpAccion1.size();it++){
					if(tmpAccion1.get(it).getcSesion()!=null){
					if(tmpAccion1.get(it).getcSesion()==4){
						tmpAccion2.add(tmpAccion1.get(it));
					}
				}
					}
		}
				tmpSegundaAsamblea.setAcciones(tmpAccion2);
		
		// esto es para normalidad
		List<CeNormalidadCstm> tmpNormalidad1= new ArrayList<CeNormalidadCstm>();
		List<CeNormalidadCstm> tmpNormalidad2= new ArrayList<CeNormalidadCstm>();
		tmpNormalidad1=tmpSegundaAsamblea.getNormalidad();
		
		if(tmpNormalidad1.size()>0){
		for(int it=0;it<tmpNormalidad1.size();it++){
			if(tmpNormalidad1.get(it).getcSesion()!=null){
			if(tmpNormalidad1.get(it).getcSesion()==4){
				tmpNormalidad2.add(tmpNormalidad1.get(it));
			}
		}
		}
		}
		tmpSegundaAsamblea.setNormalidad(tmpNormalidad2);
		
		// esto es para comites
		List<CeComitesCstm> tmpComites1= new ArrayList<CeComitesCstm>();
		List<CeComitesCstm> tmpComites2= new ArrayList<CeComitesCstm>();
		tmpComites1=tmpSegundaAsamblea.getComiteSeguimiento();
		Integer comiteContra=0;
		if(tmpComites1.size()>0){
		for(int it=0;it<tmpComites1.size();it++){
			if(tmpComites1.get(it).getcSesion()!=null){
			if(tmpComites1.get(it).getcSesion()==4){
				if(tmpComites1.get(it).getIdComite()==13)
				{
					comiteContra=1;
					tmpSegundaAsamblea.setComContra(comiteContra);
				}
				tmpComites2.add(tmpComites1.get(it));
			}
		}
		}
		}
		tmpSegundaAsamblea.setComiteSeguimiento(tmpComites2);
		
		List<CeComitesCstm> comite= new ArrayList<CeComitesCstm>();
		if(tmpSegundaAsamblea.getComiteSeguimiento().size()>0){
			comite = tmpSegundaAsamblea.getComiteSeguimiento();
			ArrayList<CeComitesCstm> tmpSegundaRecursoComi = procesaComite2(tmpSegundaAsamblea,comite, resultadosOpciones);
			tmpSegundaAsamblea.setComiteSeguimiento(tmpSegundaRecursoComi);
		}
		
		// esto es para eventos
		List<CeEventosCstm> tmpEventos1= new ArrayList<CeEventosCstm>();
		List<CeEventosCstm> tmpEventos2= new ArrayList<CeEventosCstm>();
		tmpEventos1=tmpSegundaAsamblea.getEventos();
		
		if(tmpEventos1.size()>0){
		for(int it=0;it<tmpEventos1.size();it++){
			if(tmpEventos1.get(it).getcSesion()!=null){
			if(tmpEventos1.get(it).getcSesion()==4){
				tmpEventos2.add(tmpEventos1.get(it));
			}
		}
		}
		}
		tmpSegundaAsamblea.setEventos(tmpEventos2);
		
		
		//esto es para estimulos
		
		List<CeEstimulosCstm> tmpEstimulos1= new ArrayList<CeEstimulosCstm>();
		List<CeEstimulosCstm> tmpEstimulos2= new ArrayList<CeEstimulosCstm>();
		tmpEstimulos1=tmpSegundaAsamblea.getEstimulos();
		
		if(tmpEstimulos1.size()>0){
		for(int it=0;it<tmpEstimulos1.size();it++){
			if(tmpEstimulos1.get(it).getcSesion()!=null){
			if(tmpEstimulos1.get(it).getcSesion()==4){
				tmpEstimulos2.add(tmpEstimulos1.get(it));
			}
		}
		}
		}
		tmpSegundaAsamblea.setEstimulos(tmpEstimulos2);

		
		
		// pone la letra a los recursos de las fuentes
		
		List<RecursosFuentesEventosCategoriasVO> tmpRecursosFuentes1= new ArrayList<RecursosFuentesEventosCategoriasVO>();
		List<RecursosFuentesEventosCategoriasVO> tmpRecursosFuentes2= new ArrayList<RecursosFuentesEventosCategoriasVO>();
		tmpRecursosFuentes1=tmpSegundaAsamblea.getRecursosFuentesTotales();
		
	     if(tmpRecursosFuentes1.size()>0){
		for(int it=0;it<tmpRecursosFuentes1.size();it++){
			BigDecimal montoEjercido=tmpRecursosFuentes1.get(it).getEjercido();
			BigDecimal montoRecabado=tmpRecursosFuentes1.get(it).getRecabado();
			String montoEjercidoLetra="";
			String montoRecabadoLetra="";
			RecursosFuentesEventosCategoriasVO transformando= new RecursosFuentesEventosCategoriasVO();
			
			montoEjercidoLetra=ConvierteNumLetra.numeroACastellano(montoEjercido.intValue());
			montoRecabadoLetra=ConvierteNumLetra.numeroACastellano(montoRecabado.intValue());
			transformando.setEjercido(montoEjercido);
			transformando.setEjercidoLetra(montoEjercidoLetra);
			transformando.setFuente(tmpRecursosFuentes1.get(it).getFuente());
			transformando.setRecabado(montoRecabado);
			transformando.setRecabadoLetra(montoRecabadoLetra);
			
			
			
			tmpRecursosFuentes2.add(transformando);
			
		}
	     }
		tmpSegundaAsamblea.setRecursosFuentesTotales(tmpRecursosFuentes2);
		
		
		// pone la letra a los recursos de los programas
		
				List<RecursosProgramasVO> tmpRecursosProgramas1= new ArrayList<RecursosProgramasVO>();
				List<RecursosProgramasVO> tmpRecursosProgramas2= new ArrayList<RecursosProgramasVO>();
				tmpRecursosProgramas1=tmpSegundaAsamblea.getRecursosProgramasTotales();
				
				BigDecimal montoTotalEjercido=new java.math.BigDecimal("0");
				BigDecimal montoTotalRecabado=new java.math.BigDecimal("0");
				if(tmpRecursosProgramas1.size()>0){
				for(int it=0;it<tmpRecursosProgramas1.size();it++){
					BigDecimal montoEjercido=tmpRecursosProgramas1.get(it).getEjercido();
					BigDecimal montoRecabado=tmpRecursosProgramas1.get(it).getRecabado();
					String montoEjercidoLetra="";
					String montoRecabadoLetra="";
					if(montoEjercido!=null){
					montoTotalEjercido=montoTotalEjercido.add(montoEjercido);
					}
					if(montoRecabado!=null){
					montoTotalRecabado=montoTotalRecabado.add(montoRecabado);
					}
					RecursosProgramasVO transformandoProgramas= new RecursosProgramasVO();
					
					if(montoEjercido!=null){
					montoEjercidoLetra=ConvierteNumLetra.numeroACastellano(montoEjercido.intValue());
					}
					if(montoRecabado!=null){
					montoRecabadoLetra=ConvierteNumLetra.numeroACastellano(montoRecabado.intValue());
					}
					transformandoProgramas.setEjercido(montoEjercido);
					transformandoProgramas.setEjercidoLetra(montoEjercidoLetra);
					transformandoProgramas.setCategoriaPrograma(tmpRecursosProgramas1.get(it).getCategoriaPrograma());
					transformandoProgramas.setNomPrograma(tmpRecursosProgramas1.get(it).getNomPrograma());
					transformandoProgramas.setRecabado(montoRecabado);
					transformandoProgramas.setRecabadoLetra(montoRecabadoLetra);
					
					tmpRecursosProgramas2.add(transformandoProgramas);
					
				}
				}
				RecursosProgramasVO transformandoProgramas2= new RecursosProgramasVO();
				String montoEjercidoTotalLetra="";
				String montoRecabadoTotalLetra="";
				
				montoEjercidoTotalLetra=ConvierteNumLetra.numeroACastellano(montoTotalEjercido.intValue());
				montoRecabadoTotalLetra=ConvierteNumLetra.numeroACastellano(montoTotalRecabado.intValue());
				transformandoProgramas2.setCategoriaPrograma("TOTAL");
				transformandoProgramas2.setEjercido(montoTotalEjercido);
				transformandoProgramas2.setEjercidoLetra(montoEjercidoTotalLetra);
				transformandoProgramas2.setRecabado(montoTotalRecabado);
				transformandoProgramas2.setRecabadoLetra(montoRecabadoTotalLetra);
				
				tmpRecursosProgramas2.add(transformandoProgramas2);
				
				tmpSegundaAsamblea.setRecursosProgramasTotales(tmpRecursosProgramas2);
		
				
				
				// pone la letra a los recursos totales de las fuentes
				
				TotalesFuentesOProgramasVO tmpRecursosTotales1= new TotalesFuentesOProgramasVO();
				TotalesFuentesOProgramasVO transformandoFuentesTotales= new TotalesFuentesOProgramasVO();
				tmpRecursosTotales1=tmpSegundaAsamblea.getTotalFuentes();
if(tmpRecursosTotales1!=null){
				BigDecimal montoEjercido=tmpRecursosTotales1.getTotalejercido();
				BigDecimal montoRecabado=tmpRecursosTotales1.getTotalrecabado();
				String montoEjercidoLetra="";
				String montoRecabadoLetra="";
				
				montoEjercidoLetra=ConvierteNumLetra.numeroACastellano(montoEjercido.intValue());
				montoRecabadoLetra=ConvierteNumLetra.numeroACastellano(montoRecabado.intValue());
				transformandoFuentesTotales.setTotalejercido(montoEjercido);
				transformandoFuentesTotales.setTotalejercidoLetra(montoEjercidoLetra);
				transformandoFuentesTotales.setTotalrecabado(montoRecabado);
				transformandoFuentesTotales.setTotalrecabadoLetra(montoRecabadoLetra);
}
				tmpSegundaAsamblea.setTotalFuentes(transformandoFuentesTotales);
			
				
				
				//agrego el total a los recursos obtenidos de los padres
				
				List<CeRecursosPadresVO> ceRecursosPadres1=new ArrayList<CeRecursosPadresVO>();
				CeRecursosPadresVO ceRecursosPadres2=new CeRecursosPadresVO();
				List<CeRecursosPadresVO> ceRecursosPadres3=new ArrayList<CeRecursosPadresVO>();
				ceRecursosPadres1=tmpSegundaAsamblea.getRecursosPadres();
				BigDecimal total1=new java.math.BigDecimal("0");
				BigDecimal total2=new java.math.BigDecimal("0");
				BigDecimal total3=new java.math.BigDecimal("0");
				BigDecimal total4=new java.math.BigDecimal("0");
				BigDecimal total5=new java.math.BigDecimal("0");
				BigDecimal total6=new java.math.BigDecimal("0");
				
				
				String totalLetra="";
				String totalLetraR1="";
				String totalLetraG1="";
				String totalLetraG2="";
				String totalLetraG3="";
				String totalLetraG4="";
				String totalLetraG5="";
				for(int it=0;it<ceRecursosPadres1.size();it++){
					
					if(ceRecursosPadres1.get(it).getMontoG1()!=null){
						
						System.out.println("monto 1 ----" + ceRecursosPadres1.get(it).getMontoG1());
					 total1=total1.add(ceRecursosPadres1.get(it).getMontoG1());
					 System.out.println("total1----" +total1);
					}
					if(ceRecursosPadres1.get(it).getMontoG2()!=null){
						System.out.println("monto 2 ----" + ceRecursosPadres1.get(it).getMontoG2());
						total2=total2.add(ceRecursosPadres1.get(it).getMontoG2());
					System.out.println("total2----" +total2);
					}
					if(ceRecursosPadres1.get(it).getMontoG3()!=null){
						System.out.println("monto 3 ----" + ceRecursosPadres1.get(it).getMontoG3());
						total3=total3.add(ceRecursosPadres1.get(it).getMontoG3());
					System.out.println("total3----" +total3);
					}
					if(ceRecursosPadres1.get(it).getMontoG4()!=null){
						System.out.println("monto 4 ----" + ceRecursosPadres1.get(it).getMontoG4());
						total5=total5.add(ceRecursosPadres1.get(it).getMontoG4());
					System.out.println("total4----" +total5);
					}
					if(ceRecursosPadres1.get(it).getMontoG5()!=null){
						System.out.println("monto 5 ----" + ceRecursosPadres1.get(it).getMontoG5());
						total6=total6.add(ceRecursosPadres1.get(it).getMontoG5());
					System.out.println("total5----" +total6);
					}
					total4=total4.add(total1);
					total4=total4.add(total2);
					total4=total4.add(total3);
					total4=total4.add(total5);
					total4=total4.add(total6);
					
					System.out.println("total4----" +total4);
					totalLetra=ConvierteNumLetra.numeroACastellano(total4.intValue());
					totalLetraG1=ConvierteNumLetra.numeroACastellano(total1.intValue());
					totalLetraG2=ConvierteNumLetra.numeroACastellano(total2.intValue());
					totalLetraG3=ConvierteNumLetra.numeroACastellano(total3.intValue());
					totalLetraG4=ConvierteNumLetra.numeroACastellano(total5.intValue());
					totalLetraG5=ConvierteNumLetra.numeroACastellano(total6.intValue());
					totalLetraR1=ConvierteNumLetra.numeroACastellano(ceRecursosPadres1.get(it).getMontoR1().intValue());
					ceRecursosPadres2.setMontoG1(total1);
					ceRecursosPadres2.setMontoG2(total2);
					ceRecursosPadres2.setMontoG3(total3);
					ceRecursosPadres2.setMontoG4(total5);
					ceRecursosPadres2.setMontoG5(total6);
					ceRecursosPadres2.setMontoR1(ceRecursosPadres1.get(it).getMontoR1());
					ceRecursosPadres2.setMontoStrG1(totalLetraG1);
					ceRecursosPadres2.setMontoStrG2(totalLetraG2);
					ceRecursosPadres2.setMontoStrG3(totalLetraG3);
					ceRecursosPadres2.setMontoStrG4(totalLetraG4);
					ceRecursosPadres2.setMontoStrG5(totalLetraG5);
					ceRecursosPadres2.setMontoStrR1(totalLetraR1);
					ceRecursosPadres2.setOtro(ceRecursosPadres1.get(it).getOtro());
					ceRecursosPadres2.setOtro2(ceRecursosPadres1.get(it).getOtro2());
					ceRecursosPadres2.setOtro3(ceRecursosPadres1.get(it).getOtro3());
					ceRecursosPadres2.setTotal(total4);
					ceRecursosPadres2.setTotalStr(totalLetra);
					ceRecursosPadres3.add(ceRecursosPadres2);
				}
				
				tmpSegundaAsamblea.setRecursosPadres(ceRecursosPadres3);
				
		
		acta.setSegundaAsamblea1415(tmpSegundaAsamblea);
		acta.setPrimeraAsamblea(primeraAsambleaService.selectPrimeraAsamblea(
				cCct, "1"));

		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("segundaAsamblea",
				modelMap);

		return modelAndView;

	}

	
	@RequestMapping(value = "/terceraSesion/{cCct}", method = RequestMethod.GET)
	public ModelAndView terceraSesion(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();
		acta.setTerceraSesion(terceraSesionService.selectTerceraSesion(cCct));

		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("terceraSesion", modelMap);

		return modelAndView;

	}

	@RequestMapping(value = "/cuartaSesion/{cCct}", method = RequestMethod.GET)
	public ModelAndView cuartaSesion(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();
		CuartaSesionVO cuartaSesion = cuartaSesionService
				.selectCuartaSesion(cCct);
		acta.setCuartaSesion(cuartaSesion);

		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("registroProgramas",
				registroPgrCuartaSesion(cuartaSesion.getActividades()));
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("cuartaSesion", modelMap);

		return modelAndView;
	}

	@RequestMapping(value = "/terceraAsamblea/{cCct}", method = RequestMethod.GET)
	public ModelAndView terceraAsamblea(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();
		ReunionVO terceraAsamblea = terceraAsambleaService
				.selectTerceraAsamblea(cCct);
		acta.setTerceraAsamblea(terceraAsamblea);

		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);

		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("terceraAsamblea",
				modelMap);

		return modelAndView;
	}

	@RequestMapping(value = "/informeTransparencia/{cCct}", method = RequestMethod.GET)
	public ModelAndView informeTransparencia(@PathVariable Integer cCct,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ActaMinutaInfoVO acta = new ActaMinutaInfoVO();
		InformeTransparenciaVO informeTransparencia = informeTransparenciaMapper
				.selectInformeTransparencia(cCct);
		informeTransparencia.getCeSesion().setcSesion(
				Constants.INFORME_TRANSPARENCIA);
		acta.setInformeTransparencia(informeTransparencia);

		ArrayList<ActaMinutaInfoVO> list = new ArrayList<ActaMinutaInfoVO>();
		list.add(acta);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("informeTransparencia",
				modelMap);

		return modelAndView;
	}

	@RequestMapping(value = "/reporteMvtosNal", method = RequestMethod.GET)
	public ModelAndView reporteMvtosNal(ModelMap modelMap,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		System.out.println("Entro a reporteMvtosNal");
		
		List<RepConsejosNacionalVO> list = solrSearchService
				.selectReporteMvtosNacional();
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("reporteMvtosNal",
				modelMap);

		return modelAndView;
	}
	
	@RequestMapping(value = "/reporteMvtosNal2", method = RequestMethod.GET)
	public ModelAndView reporteMvtosNal2(ModelMap modelMap,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		System.out.println("Entro a reporteMvtosNal");
		
		List<RepConsejosNacionalVO> list = solrSearchService
				.selectReporteMvtosNacional2();
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("reporteMvtosNal",
				modelMap);

		return modelAndView;
	}

	/**
	 * Valida se el Centro de trabajo cuenta con programas registrados en Cuarta
	 * Sesión
	 * 
	 * @param actividades
	 * @return
	 */

	private Boolean registroPgrCuartaSesion(List<CeActSesionCstm> actividades) {
		Boolean result = false;

		for (CeActSesionCstm actividad : actividades) {
			// Si registro en Programas en actividades
			if (actividad.getcActividad().equals(new Short("61")))
				return true;
		}

		return result;
	}

	/**
	 * Escribe el contenido de un archivo dentro del cuerpo de la respuesta para
	 * que sea descargado por el navegador.
	 * 
	 * El método recibe el patrón de url {nombreArchivo} que no es usado, pero
	 * su presencia provoca que los navegadores descarguen el archivo con ese
	 * nombre.
	 * 
	 * @param pathId
	 * @param nombreArchivo
	 * @param response
	 */
	@RequestMapping(value = "/download/{nombreArchivo}", method = RequestMethod.GET)
	public void downloadArchivo(@PathVariable String nombreArchivo,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			System.out
					.println(" +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ");
			System.out.println(" downloadArchivo ");
			ServletOutputStream out = response.getOutputStream();
			String pathId = request.getSession().getServletContext()
					.getRealPath("/static/documentos");
			System.out.println(" pathId :: " + pathId);
			System.out.println(" nombreArchivo :: " + nombreArchivo);
			byte[] archivo = sistemaArchivosServicio.leerArchivo(pathId,
					nombreArchivo);
			response.setContentLength(archivo.length);
			response.setCharacterEncoding("UTF-8");
			out.write(archivo);
			out.flush();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/actaConstitutiva/{apec}", method = RequestMethod.GET)
	public ModelAndView actaConstitutiva(@PathVariable Integer apec,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {

		ReunionesConafeVO reunion = new ReunionesConafeVO();
		reunion.setActaConstitutiva(actaConstitutivaService
				.selectActaConstitutiva(apec));
		ArrayList<ReunionesConafeVO> list = new ArrayList<ReunionesConafeVO>();
		list.add(reunion);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("actaConstitutiva",
				modelMap);

		return modelAndView;

	}

	@RequestMapping(value = "/primeraReunion/{apec}", method = RequestMethod.GET)
	public ModelAndView primeraReunion(@PathVariable Integer apec,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {

		ReunionesConafeVO reunion = new ReunionesConafeVO();
		reunion.setPrimeraReunionVO(primeraReunionService
				.selectPrimeraReunion(apec));
		ArrayList<ReunionesConafeVO> list = new ArrayList<ReunionesConafeVO>();
		list.add(reunion);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("primeraReunion", modelMap);

		return modelAndView;

	}

	@RequestMapping(value = "/segundaReunion/{apec}", method = RequestMethod.GET)
	public ModelAndView segundaReunion(@PathVariable Integer apec,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {

		ReunionesConafeVO reunion = new ReunionesConafeVO();
		reunion.setSegundaReunion(segundaReunionService
				.selectSegundaReunion(apec));
		ArrayList<ReunionesConafeVO> list = new ArrayList<ReunionesConafeVO>();
		list.add(reunion);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("segundaReunion", modelMap);

		return modelAndView;

	}

	@RequestMapping(value = "/terceraReunion/{apec}", method = RequestMethod.GET)
	public ModelAndView terceraReunion(@PathVariable Integer apec,
			ModelMap modelMap, HttpServletRequest request,
			HttpServletResponse response) {

		ReunionesConafeVO reunion = new ReunionesConafeVO();
		reunion.setTerceraReunion(terceraReunionService
				.selectTerceraReunion(apec));
		ArrayList<ReunionesConafeVO> list = new ArrayList<ReunionesConafeVO>();
		list.add(reunion);
		JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(list);

		modelMap.put("dataSourceKey", ds);
		modelMap.put("pRuta", request.getSession().getServletContext()
				.getRealPath("/"));

		// pdfReport bean has ben declared in the jasper-views.xml file
		ModelAndView modelAndView = new ModelAndView("terceraReunion", modelMap);

		return modelAndView;

	}

}
