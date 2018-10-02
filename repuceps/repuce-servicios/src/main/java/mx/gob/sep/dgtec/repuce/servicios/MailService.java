package mx.gob.sep.dgtec.repuce.servicios;

import java.util.Map;

import org.springframework.mail.SimpleMailMessage;

public interface MailService {

	public void send(final SimpleMailMessage msg, final Map<Object, Object> hTemplateVariables) ;
	
}
