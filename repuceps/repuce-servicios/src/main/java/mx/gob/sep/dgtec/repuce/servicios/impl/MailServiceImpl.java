package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.Map;

import javax.mail.internet.MimeMessage;

import mx.gob.sep.dgtec.repuce.servicios.MailService;

import org.apache.velocity.app.VelocityEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineUtils;

@Service
public class MailServiceImpl implements MailService {
 
    private static final Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);

    private final VelocityEngine velocityEngine;
    private final JavaMailSender mailSender;

    /**
     * Constructor
     */
    @Autowired
    public MailServiceImpl(VelocityEngine velocityEngine, 
                               JavaMailSender mailSender) {
        this.velocityEngine = velocityEngine;
        this.mailSender = mailSender;
    }

    /**
     * Sends e-mail using Velocity template for the body and 
     * the properties passed in as Velocity variables.
     * 
     * @param   msg                 The e-mail message to be sent, except for the body.
     * @param   hTemplateVariables  Variables to use when processing the template. 
     */
    public void send(final SimpleMailMessage msg, 
                     final Map<Object, Object> hTemplateVariables) {
        MimeMessagePreparator preparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
               MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
               message.setTo(msg.getTo());
               message.setFrom(msg.getFrom());
               message.setSubject(msg.getSubject());

               String body = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, 
            		   "emailBody.vm", hTemplateVariables);
               
               logger.info("body={}", body);

               message.setText(body, true);
            }
         };
         
         mailSender.send(preparator);
        
        logger.info("Sent e-mail to '{}'.", msg.getTo());
    }
	 
 
}