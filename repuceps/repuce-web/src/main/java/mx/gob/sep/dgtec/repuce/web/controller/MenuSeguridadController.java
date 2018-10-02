package mx.gob.sep.dgtec.repuce.web.controller;

import java.util.ArrayList;
import java.util.List;


import mx.gob.sep.dgtec.seguridad.modelo.ModuloMenu;
import mx.gob.sep.dgtec.seguridad.modelo.OpcionMenu;
import mx.gob.sep.dgtec.seguridad.servicios.MenuSeguridadServicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller que se encarga de atender la peticiones del cliente
 * para el menu de opciones que sera mostrado.
 * 
 * @author Alejandro Pimentel
 *
 */
@Controller
@RequestMapping("/seguridad/menu")
public class MenuSeguridadController {

	@Autowired
	private MenuSeguridadServicio menuSeguridadServicio;
	
	/**
	 * Obtiene un objeto tipo {@link OpcionMenu}, verifica si cada uno de sus subopciones tendran o no
	 * hijos a su vez.
	 * 
	 * @param id El id de la opcon de menu que se desea obtener.
	 * @return Un objeto tipo {@link OpcionMenu} que contiene la informacon de la opcon y de sus subopciones. 
	 */
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	@ResponseBody
	public OpcionMenu obtenerOpciones(@PathVariable Long id){
		OpcionMenu opcion = menuSeguridadServicio.consultarOpcionSubOpciones(id);
		
		for (OpcionMenu op : opcion.getOpciones()) {
			if(!StringUtils.hasLength(op.getUrl())){
				// con un arreglo vacio indicamos que tiene hijos
				// que posteriormente podrian ser cargados.
				op.setOpciones(new ArrayList<OpcionMenu>());
			}
		}
		
		return opcion;
	}
	
	/**
	 * Consulta un modulo por id y lo devuelve como una OpcionMenu. Coloca
	 * ademas en {@link OpcionMenu#setOpciones(List)} una lista vacia
	 * indicando que dado que es un modulo este siempre tendra opciones hijas.
	 * 
	 * @param id El id de la opcon de menu que se desea obtener.
	 * @return
	 */
	@RequestMapping(value="/modulo/{id}", method=RequestMethod.GET)
	@ResponseBody
	public OpcionMenu obtenerModulo(@PathVariable Long id){
		ModuloMenu modulo = menuSeguridadServicio.consultarModuloMenu(id);
		OpcionMenu opcion = new OpcionMenu();
		opcion.setId(modulo.getId());
		opcion.setOpcion(modulo.getModulo());
		// con un arreglo vacio indicamos que tiene hijos
		// que posteriormente podrian ser cargados.		
		opcion.setOpciones(new ArrayList<OpcionMenu>());
		
		return opcion;
	}	
	
	/**
	 * Devuelve la lista de modulo que se mostrara en el menu.
	 * 
	 * @return lista de modulos.
	 */
	@RequestMapping(value="/modulos", method=RequestMethod.GET)
	@ResponseBody
	public List<ModuloMenu> obtenerModulos(){
		List<ModuloMenu> modulos = menuSeguridadServicio.consultarModulos();
		
		return modulos;
	}	
	
}
