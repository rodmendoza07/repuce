package test.mx.gob.sep.dgtec.repuce.servicios;

import static org.junit.Assert.assertNotNull;

import java.util.Properties;

import mx.gob.sep.dgtec.repuce.servicios.MailService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Tests that the generated messages were all processed by the JMS listener.
 * 
 * @author David Winterfeldt
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class MailServiceTest extends BaseServicioTest{


    final Logger logger = LoggerFactory.getLogger(MailServiceTest.class);

    @Autowired
    private MailService sender;
    
    @Test
    public void testMessage() {
        assertNotNull("MailService is null.", sender);

        Properties props = new Properties();
        props.put("nomCct", "Esc. Prim. Rafael Molina Betancourt");
        props.put("cveCct", "06DJN0126H");
        props.put("password", "#$%&/");
        props.put("nomDirector", "MA DE JESUS URZUA PLAZOLA");
        
        SimpleMailMessage msg = new SimpleMailMessage();
        
        msg.setFrom("repuce@sep.gob.mx");
        msg.setTo("irosass@gmail.com");
        msg.setSubject("Prueba unitaria");
        
        sender.send(msg, props);
    }
    
}