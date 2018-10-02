package mx.gob.sep.dgtec.seguridad.util;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.RecoverableDataAccessException;
import org.springframework.security.authentication.encoding.PasswordEncoder;


public class SepPasswordEncoder implements PasswordEncoder {

	public SepPasswordEncoder(){
		super();
	}
	
	
    public String encodePassword(String rawPass, Object salt)
            throws DataAccessException {

    	String encPass = "";
    	
    	try{
    		encPass = Encripta.generaHashByte(rawPass);
    	}catch(Exception e){
    		throw new RecoverableDataAccessException("Error al codificar cadena",e);
    	}
    	
        return encPass;
    }

    public boolean isPasswordValid(String encPass, String rawPass, Object salt)
            throws DataAccessException {

    	String encPassCad = "";
    	try{
    		encPassCad = Encripta.generaHashByte(rawPass);
    	}catch(Exception e){
    		throw new RecoverableDataAccessException("Error al codificar cadena",e);
    	}
    	
        return encPass.equals(encPassCad);
    }
}