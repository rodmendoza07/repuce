package mx.gob.sep.dgtec.repuce.web.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.sep.dgtec.repuce.model.CMunicipio;
import mx.gob.sep.dgtec.repuce.model.ConsejoMunCstm;
import mx.gob.sep.dgtec.repuce.servicios.ActasMunicipalesService;
import mx.gob.sep.dgtec.repuce.servicios.CargaArchivosService;
import mx.gob.sep.dgtec.repuce.servicios.SistemaArchivosServicio;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorNegocio;
import mx.gob.sep.dgtec.repuce.vo.EstatusCargaArchivoVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * Controller para administrar la subida de archivos.
 * 
 * @author Brian Hernandez y Alejandro Pimentel
 *
 */
@Controller
@RequestMapping(value = "/actasMunicipales") 
public class ActasMunicipalesController {   
	
	private static final Logger log = LoggerFactory.getLogger(ActasMunicipalesController.class);
	
	@Autowired
	private SistemaArchivosServicio sistemaArchivosServicio;

	@Autowired
	private ActasMunicipalesService actasMunicipalesService;
	
	@Autowired
	private CargaArchivosService cargaArchivosService;
	
	private final String ACTAS_MUNICIPALES = "actasMunicipales";
	
	/**
	 * Este metodo admite la subida de varias actas consitutivas a la vez
	 * 
	 * @param idPath El identificador del path en el cual se guardará el archivo.
	 * @param guardarEnBD Bandera que indica si adicionalmente se debe guardar el archivo de Base de Datos.
	 * @param request
	 * 
	 * @return Una entidad ejemplo vacía. Podría sustituirse por un informe resultado de la carga de los archivos.
	 */
	@RequestMapping(value= "/upload", method = RequestMethod.POST)   
	@ResponseBody
	public List<EstatusCargaArchivoVO> uploadActasMunicipales (HttpServletRequest request, 
			Principal principal) {
		
		List<EstatusCargaArchivoVO> estatusList = new ArrayList<EstatusCargaArchivoVO>();
		MultiValueMap<String,MultipartFile> mapaArchivos ;
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
		mapaArchivos =  multipartRequest.getMultiFileMap();
		byte[] archivo;
		String nombreArchivo = "";   
		String type; 
		String estatus = "";
		// proceso de lectura de archivos excel layout primera asamblea
		try {
			cargaArchivosService.validaArchivo();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		try {
			if(mapaArchivos != null && mapaArchivos.size() > 0){
				
				for(Entry<String, List<MultipartFile>> listaElementos : mapaArchivos.entrySet()) {
					
					List<MultipartFile> listaArchivos = listaElementos.getValue();
					for (MultipartFile multipartFile : listaArchivos) {
	
						nombreArchivo = multipartFile.getOriginalFilename();
						type = multipartFile.getContentType();  
						archivo = multipartFile.getBytes();
						
						estatus = "OK";
						
						try{
							actasMunicipalesService.insertActaMunicipal( 
									principal.getName(),nombreArchivo, archivo);
						}catch(Exception e){
							estatus = e.getMessage();
						}
						
						estatusList.add(new EstatusCargaArchivoVO(nombreArchivo, estatus));
					}
					
				}
			}
			
			return estatusList;
		} catch(IOException ioe){
			throw new ErrorInfraestructura(ioe, "servicios.archivos.error.upload", new Object[]{nombreArchivo});
		}
	}
	
	/**
	 * Obtiene los mobres de los archivos que existen dentro del directorio correspondiente
	 * al pathId enviado.
	 * 
	 * @return Obtiene la lista de todos los archivos 
	 */
	@RequestMapping(value= "/listar", method = RequestMethod.GET)   
	@ResponseBody	
	public List<ConsejoMunCstm> selectActasMunicipales(Principal principal){
		String userName = principal.getName();
		
		return actasMunicipalesService.selectActasMunicipales(userName);
	}
	
	/**
	 * Elimina las actas seleccionadas por el usuario.
	 * 
	 * @return Obtiene la lista de todos los archivos 
	 */
	@RequestMapping(value= "/delete", method = RequestMethod.POST)   
	@ResponseBody	
	public List<String> deleteActasMunicipales(@RequestBody CMunicipio[] listaActas,
			Principal principal){
		String userName = principal.getName();
		List<String> results = new ArrayList<String>();
		
		for(CMunicipio acta : listaActas){
			try{
				actasMunicipalesService.deleteActaMunicipal(userName, acta.getIdEntidadfed(), 
						acta.getIdMunicipio());
				results.add("<br/> " + acta.getIdEntidadfed() + "-" + acta.getIdMunicipio() + " (OK)");	
			}catch(ErrorNegocio e){
				results.add("<br/> " + acta.getIdEntidadfed() + "-" + acta.getIdMunicipio() + " (" 
					+ e.getMessage() );
			}
		}
		return results;
	}
	
	/**
	 * Escribe el contenido de un archivo dentro del cuerpo de la respuesta para
	 * que sea descargado por el navegador.
	 * 
	 * El metodo recibe el patron de url {nombreArchivo} que no es usado, pero su
	 * presencia provoca que los navegadores descarguen el archivo con ese nombre.
	 * 
	 * @param pathId
	 * @param nombreArchivo
	 * @param response
	 */
	@RequestMapping(value= "/download/{nombreArchivo}", method = RequestMethod.GET)
	public void downloadArchivo(@PathVariable String nombreArchivo, 
				HttpServletResponse response) throws IOException {
		ServletOutputStream out = response.getOutputStream();		
		byte[] archivo = sistemaArchivosServicio.leerArchivo(ACTAS_MUNICIPALES, nombreArchivo + ".pdf");
		response.setContentLength(archivo.length);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Type", "application/pdf");
		out.write(archivo);
		out.flush();	
	}
	
}

