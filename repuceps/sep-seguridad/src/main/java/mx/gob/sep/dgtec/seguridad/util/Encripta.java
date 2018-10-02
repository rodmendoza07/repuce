
package mx.gob.sep.dgtec.seguridad.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;

public class Encripta {
	/**
	 * Metodo encargado de codificar la cadena
	 * @param asCampo La cadena que se desea codificar
	 * @return La cadena codificada
	 */
	public static String generaHashByte(String asCampo)throws NoSuchAlgorithmException, UnsupportedEncodingException{
		byte[] buf;
		buf = asCampo.getBytes("UTF8");
		MessageDigest algorithm=null;
		algorithm = MessageDigest.getInstance("SHA-1");
		algorithm.reset();
		algorithm.update(buf);
		byte[] bDigest = algorithm.digest();
		BASE64Encoder encoder = new BASE64Encoder();
		String lsCodigo = encoder.encodeBuffer(bDigest);
		if(lsCodigo.length() > 20 ){
			lsCodigo = lsCodigo.substring(0,20);
		}
		return lsCodigo;
	}
	public static void main(String args[]){
		try{
		  String lsCodigo =  Encripta.generaHashByte("ENTABASCO");
		  System.out.println("lsCodigo: " + lsCodigo);
		}catch(Exception ex){
		  ex.printStackTrace();
		}
	}

}
