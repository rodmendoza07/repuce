package mx.gob.sep.dgtec.repuce.web.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.sep.dgtec.repuce.vo.FiltroBusquedaVO;

import org.springframework.util.StringUtils;


/**
 * Los controllers pueden heredar de esta clase para hacer uso de utilerías y helpers.
 * 
 * @author Alejandro Pimentel
 *
 */
public abstract class ControllerBase {
	
	/**
	 * Método de utileria para simplificar el uso de operaciones REST como paginacion y ordenamiento.
	 * 
	 * @param rango cadena con informacion de la paginacion en la forma items=x-y
	 * @param total
	 * @param request
	 * @param response
	 * @return
	 */
	protected FiltroBusquedaVO manejarRestPaging(String rango, Integer total, HttpServletRequest request, HttpServletResponse response){
		String[] rangos = rango.substring("items=".length()).split("-");
		int desde = Integer.valueOf(rangos[0]);
		int hasta = Integer.valueOf(rangos[1]);	
		String nombreCampo = null;
		String ascDesc = null;
		
		String queryString = request.getQueryString();
		if(StringUtils.hasText(queryString) && queryString.indexOf("sort(") != -1){
			Integer idx = "sort(".length();
			nombreCampo = queryString.substring(idx+1, queryString.indexOf(")"));
			ascDesc = queryString.substring(idx, idx+1);	
			ascDesc = ascDesc.equals("+")? "asc":"desc";
		}
		
		response.addHeader("Content-Range", "items " + desde + "-" + hasta + "/" + total);
		
		return new FiltroBusquedaVO(desde, hasta, nombreCampo, ascDesc);
	}
}
