package mx.gob.sep.dgtec.seguridad.servicios;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

import mx.gob.sep.dgtec.seguridad.dao.UsuarioSeguridadDao;
import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Clase de servicio que permite acceder a la información del Menú de opciones.
 * 
 * @author Yo merito
 *
 */
@Service
public class UsuarioSeguridadServicioImpl implements UsuarioSeguridadServicio {

	@Autowired
	private UsuarioSeguridadDao usuarioSeguridadDao;

	/**
	 * 
	 * {@inheritDoc}
	 */
	public List<UsuarioSeguridad> consultarTodos() {
		List<UsuarioSeguridad> usuarios = usuarioSeguridadDao.consultarTodos();
		
		return usuarios;
	}

	public UsuarioSeguridad consultar(Long id){
		return usuarioSeguridadDao.consultar(id);
	}
	
	public Integer guardar(UsuarioSeguridad usuario){
		Integer id = usuarioSeguridadDao.guardar(usuario);
		return id;
		
	}
	
	public Integer actualizar(UsuarioSeguridad usuario){
		Integer count = usuarioSeguridadDao.actualizar(usuario);
		return count;
		
	}
	public Integer contar(){
		return usuarioSeguridadDao.contar();
	}	
	
	 public String generateRandomPassword()
	    {
	    	Random RANDOM = new SecureRandom();
	    	int PASSWORD_LENGTH = 8;
	        // Pick from some letters that won't be easily mistaken for each
	        // other. So, for example, omit o O and 0, 1 l and L.
	        String letters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789+@";

	        String pw = "";
	        for (int i=0; i<PASSWORD_LENGTH; i++)
	        {
	            int index = (int)(RANDOM.nextDouble()*letters.length());
	            pw += letters.substring(index, index+1);
	        }
	        return pw;
	    }
	 
	 public UsuarioSeguridad consultarUserName(String userName){
			return usuarioSeguridadDao.consultarUserName(userName);
		}
	 
}
