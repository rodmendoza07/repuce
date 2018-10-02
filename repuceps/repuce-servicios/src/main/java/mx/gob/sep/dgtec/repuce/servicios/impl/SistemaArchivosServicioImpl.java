package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import mx.gob.sep.dgtec.repuce.servicios.SistemaArchivosServicio;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;

public class SistemaArchivosServicioImpl implements SistemaArchivosServicio, ApplicationContextAware{
	
	private static final Logger log = LoggerFactory.getLogger(SistemaArchivosServicioImpl.class);

	private final Map<String,String> PATHS;
	private ApplicationContext ctx;
	private final String DIR_BASE;
		
	public SistemaArchivosServicioImpl(Map<String, String> paths, String dirBase) {
		this.PATHS = paths;
		DIR_BASE = dirBase;
	}

	/**
	 * {@inheritDoc}
	 */
	public void escribirArchivo(String pathId, String nombreArchivo, byte[] archivo) 
			throws ErrorInfraestructura {
		String pathDirectorio = DIR_BASE+PATHS.get(pathId);
		log.debug("pathDirectorio: " + pathDirectorio);
		try {
			Resource r = this.obtenerRecurso(pathDirectorio);

			File archivoLocal = new File(r.getFile(),nombreArchivo);
			this.verificarPermisosEscritura(r.getFile());
			
			if(!archivoLocal.exists()){
				archivoLocal.createNewFile();
			}
			
			BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(archivoLocal));
			bos.write(archivo);
			bos.close();
		} catch (IOException e) {
			throw new ErrorInfraestructura(e, "servicios.archivos.error.escritura", 
					new Object[]{nombreArchivo, pathDirectorio});
		}
	}
	
	/**
	 * {@inheritDoc}
	 */	
	public List<String> obtenerNombresArchivosWildcard(String pathId, final String wildcard){
		String pathDirectorio = DIR_BASE+PATHS.get(pathId);
		Resource r = this.obtenerRecurso(pathDirectorio);
		File dir = obtenerFile(r);

		FilenameFilter filter = new FilenameFilter() {
	        public boolean accept(File directory, String fileName) {
	            return fileName.matches(wildcard);
	        }
	    };
	    
		List<String> archivos = Arrays.asList(dir.list(filter));
		
		return archivos;
	}

	
	/**
	 * {@inheritDoc}
	 */	
	public List<String> obtenerNombresArchivos(String pathId){
		String pathDirectorio = DIR_BASE+PATHS.get(pathId);
		Resource r = this.obtenerRecurso(pathDirectorio);
		File dir = obtenerFile(r);

		List<String> archivos = Arrays.asList(dir.list());
		
		return archivos;
	}

	/**
	 * {@inheritDoc}
	 */	
	public boolean deleteArchivo(String pathId, String fileName) 
			throws ErrorInfraestructura {
		String pathDirectorio = DIR_BASE+PATHS.get(pathId);

		try{
			Resource r = this.obtenerRecurso(pathDirectorio);
			File file = new File(r.getFile(),fileName);
			
			return file.delete();
		} catch (IOException e) {
			throw new ErrorInfraestructura(e, "servicios.archivos.municipal.error.delete.exception", 
					new Object[]{fileName});
		}

	}
	
	/**
	 * {@inheritDoc}
	 */	
	public byte[] leerArchivo(String pathId, String nombreArchivo){
		String pathDirectorio = DIR_BASE+PATHS.get(pathId);

		Resource r = this.obtenerRecurso(pathDirectorio + nombreArchivo);
		
		
//		r.
		byte[] archivo = null;
		
		try {
			archivo = IOUtils.toByteArray(r.getInputStream());
		} catch (IOException e) {
			throw new ErrorInfraestructura(e, "servicios.archivos.error.lectura", new Object[]{nombreArchivo, pathDirectorio});
		}
		
		return archivo;
	}
	
	private Resource obtenerRecurso(String pathAbsoluto){
		Resource r = ctx.getResource(pathAbsoluto);
		if(!r.exists()){
			throw new ErrorInfraestructura(new Object[]{pathAbsoluto}, 
					"servicios.archivos.error.directorio.noExiste");
		}		
		
		return r;
	}
	
	private File obtenerFile(Resource r){
		File f = null;
		try {
			f = r.getFile();
			return f;
		} catch (IOException e) {
			throw new ErrorInfraestructura(new Object[]{r.getFilename()}, 
					"servicios.archivos.error.directorio.noExiste");
		}
	}
	
	private void verificarPermisosEscritura(File f){
		if(!f.canWrite()){
			throw new ErrorInfraestructura(new Object[]{f.getAbsolutePath()}, 
					"servicios.archivos.error.directorio.noPermisos.escritura");
		}		
	}
	
	private void verificarPermisosLectura(File f){
		if(!f.canRead()){
			throw new ErrorInfraestructura(new Object[]{f.getAbsolutePath()}, 
					"servicios.archivos.error.directorio.noPermisos.lectura");
		}		
	}
	
	/**
	 * {@inheritDoc}
	 */	
	public Map<String, String> obtenerPaths() {
		Map<String, String> soloExistentes = new HashMap<String, String>();
		for (Entry<String,String> p : PATHS.entrySet()) {
			Resource r = ctx.getResource(DIR_BASE+p.getValue());
			if(r.exists()){
				soloExistentes.put(p.getKey(), p.getValue());
			}
		}

		return soloExistentes;
	}
	
	/**
	 * {@inheritDoc}
	 */	
	public String obtenerPathAbsoluto(String pathId){
		return DIR_BASE; //+PATHS.get(pathId);
	}

	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		ctx = applicationContext;
	}
}
