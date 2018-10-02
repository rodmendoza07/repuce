package mx.gob.sep.dgtec.repuce.web.util;

import java.util.Calendar;
import java.util.GregorianCalendar;

import mx.gob.sep.dgtec.conafe.vo.ReunionConafeVO;
import mx.gob.sep.dgtec.repuce.vo.ReunionVO;
import mx.gob.sep.dgtec.seguridad.util.Encripta;

/**
 * Genera la cadena de autenticidad que es impresa en las actas y minutas.
 * 
 * @author ismael.rosas
 *
 */
public class ReunionesUtil {

    public static String generaCadenaHash(ReunionVO reunionVO,
    		int aSesion,String aFecha) throws Exception{
        Calendar c = new GregorianCalendar();
        String dia = Integer.toString(c.get(Calendar.DATE));
        String mes = Integer.toString(c.get(Calendar.MONTH));
        String annio = Integer.toString(c.get(Calendar.YEAR));
        String  cadenaConcatenada = "" + reunionVO.getCeInfGral().getcCct() + "|"
                                       + aSesion + "|"
                                       + aFecha + "|"
                                       + dia+"/"+mes+"/"+annio;
        String cadenaHash = Encripta.generaHashByte(cadenaConcatenada);
        return cadenaHash;
    }

    public static String generaCadenaConafeHash(ReunionConafeVO reunionVO,
    		int aReunion,String aFecha) throws Exception{
        Calendar c = new GregorianCalendar();
        String dia = Integer.toString(c.get(Calendar.DATE));
        String mes = Integer.toString(c.get(Calendar.MONTH));
        String annio = Integer.toString(c.get(Calendar.YEAR));
        String  cadenaConcatenada = "" + reunionVO.getApec().getcApec() + "|"
                                       + aReunion + "|"
                                       + aFecha + "|"
                                       + dia+"/"+mes+"/"+annio;
        String cadenaHash = Encripta.generaHashByte(cadenaConcatenada);
        return cadenaHash;
    }

}
