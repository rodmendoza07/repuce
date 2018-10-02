package mx.gob.sep.dgtec.seguridad.util;

import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;
import mx.gob.sep.dgtec.seguridad.servicios.CustomUserDetails;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Métodos de utilería para interactuar con el módulo de seguridad.
 * 
 * @author Alejandro Pimentel
 *
 */
public class SeguridadUtil {
	private static final Logger log = LoggerFactory.getLogger(SeguridadUtil.class);

	/**
	 * Trata de obtener la información del usuario autenticado para el hilo
	 * de ejecución actual.
	 * 
	 * Si no le es posible obtenerlo lanza un {@link RuntimeException}
	 * 
	 * @return Un objeto tipo {@link UsuarioSeguridad}
	 */
    public static UsuarioSeguridad getUsuarioActual() {
    	
    	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	
    	System.out.println("Valor del principal="+principal);
    	
//    	HttpSession session = request.getSession(true);
//    	sysout(session.getAttribute("SPRING_SECURITY_CONTEXT"));
    	
//    	if(SecurityContextHolder.getContext().
//                getAuthentication() == null
//           || !SecurityContextHolder.getContext().
//                getAuthentication().
//                getPrincipal().
//                getClass().
//                equals(CustomUserDetails.class)) {
//            throw new RuntimeException("La sesión actual no ha sido autenticada", null);
//        }
        if(SecurityContextHolder.getContext().getAuthentication() == null ) {
            throw new RuntimeException("La sesi�n actual no ha sido autenticada 1", null);
        }
        
//        if(!SecurityContextHolder.getContext().getAuthentication().getPrincipal().getClass().equals(CustomUserDetails.class) ) {
//            throw new RuntimeException("La sesi�n actual no ha sido autenticada 2", null);
//        }
        
    	UsuarioSeguridad us = null;

    	if(!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken)){
	    	CustomUserDetails cud = (CustomUserDetails) SecurityContextHolder.getContext().
	                getAuthentication().
	                getPrincipal();
	       
	        us = new UsuarioSeguridad(cud.getUsername(), "x", cud.getNombre(), cud.isEnabled());
    	}else{
    		us = new UsuarioSeguridad("anonimo","x","anonimo",true);
    	}
    	
    	log.debug(":::::::::::::::"+SecurityContextHolder.getContext().
                getAuthentication().getAuthorities().toArray()[0].toString());

        us.setRolStr(SecurityContextHolder.getContext().
                getAuthentication().getAuthorities().toArray()[0].toString());

        return us;
    }
}
