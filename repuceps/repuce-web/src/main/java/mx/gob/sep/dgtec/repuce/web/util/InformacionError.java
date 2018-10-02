package mx.gob.sep.dgtec.repuce.web.util;

import java.io.Serializable;
import java.text.DateFormat;
import java.util.Date;



import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 * Las instancias de esta clase contienen toda la informacion que sucedio dentro de la
 * aplicacion. Es usada por alguna implementacion de {@link ServicioNotificacion} para
 * publicar la informacion en algún medio (p.e. Logger o email).
 * 
 * @author Alejandro Pimentel
 *
 */
@JsonIgnoreProperties( { "excepcion" } )
public class InformacionError
        implements Serializable {

	private static final long serialVersionUID = 354478526898744851L;

	private Class<?> claseExcepcion;

    private Class<?> claseHandler;

    private transient Throwable excepcion;

    private Date momentoError;

    private String momentoErrorFrmt;

    private UsuarioSeguridad usuario;

    private String mensaje;

    private String host;

    private String urlPeticion;

    private String nivelError;

    private Object extraInfo;

    private String claveError;

    private Integer status;

    private String statusText;

    /**
     * @return La clase de la Excepcion que fue lanzada.
     */
    public Class<?> getClaseExcepcion() {
        return claseExcepcion;
    }

    /**
     * @param La clase de la Excepcion que fue lanzada.
     */
    public void setClaseExcepcion(Class<?> claseExcepcion) {
        this.claseExcepcion = claseExcepcion;
    }

    /**
     * @return El objeto de la Excepcion o Error lanzados
     */
    public Throwable getExcepcion() {
        return excepcion;
    }

    /**
     * @param El objeto de la Excepcion o Error lanzados
     */
    public void setExcepcion(Throwable excepcion) {
        this.excepcion = excepcion;
    }

    /**
     * @return El momento en que sucedio la excepcion.
     */
    public Date getMomentoError() {
        return momentoError;
    }

    /**
     * @param momentoError El momento en que sucedio la excepcion.
     */
    public void setMomentoError(Date momentoError) {
        this.momentoError = momentoError;

        DateFormat complDf = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG);

        momentoErrorFrmt = complDf.format(getMomentoError());
    }

    /**
     * @return Informacion del usuario al momento que sucedio la excepcion.
     */
    public UsuarioSeguridad getUsuario() {
        return usuario;
    }

    /**
     * @param usuario Informacion del usuario al momento que sucedio la excepcion.
     */
    public void setUsuario(UsuarioSeguridad usuario) {
        this.usuario = usuario;
    }

    /**
     * @return El mensaje que detalla el error 
     */
    public String getMensaje() {
        return mensaje;
    }

    /**
     * @param mensaje El mensaje que detalla el error 
     */
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    /**
     * @return El tipo de objeto del cual provino la excepcion.
     */
    public Class<?> getClaseHandler() {
        return claseHandler;
    }

    /**
     * @param claseHandler El tipo de objeto del cual provino la excepcion.
     */
    public void setClaseHandler(Class<?> claseHandler) {
        this.claseHandler = claseHandler;
    }

    /**
     * @return La direccion del cliente o del último proxy por el que la peticion salio.
     */
    public String getHost() {
        return host;
    }

    /**
     * @param host La direccion del cliente o del último proxy por el que la peticion salio.
     */
    public void setHost(String host) {
        this.host = host;
    }

    /**
     * @return El url reconstruido (completo) que el cliente solicito.
     */
    public String getUrlPeticion() {
        return urlPeticion;
    }

    /**
     * @param urlPeticion El url reconstruido (completo) que el cliente solicito.
     */
    public void setUrlPeticion(String urlPeticion) {
        this.urlPeticion = urlPeticion;
    }

    /**
     * @return Una cadena que clasifica la gravedad del error sucedido.
     */
    public String getNivelError() {
        return nivelError;
    }

    /**
     * @param nivelError Una cadena que clasifica la gravedad del error sucedido.
     */
    public void setNivelError(String nivelError) {
        this.nivelError = nivelError;
    }

    /**
     * @return El momento del error con un formato más amigable.
     */
    public String getMomentoErrorFrmt() {
        return momentoErrorFrmt;
    }

    /**
     * @return Objeto arbitrario con informacion adicional del error. O informacion que deba ser procesada dado el error sucedido.
     */
    public Object getExtraInfo() {
        return extraInfo;
    }

    /**
     * @param extraInfo Objeto arbitrario con informacion adicional del error. O informacion que deba ser procesada dado el error sucedido.
     */
    public void setExtraInfo(Object extraInfo) {
        this.extraInfo = extraInfo;
    }

    /**
     * @return Una clave única del error. Puede ser usada para rastrear el error dentro de los archivos de log.
     */
    public String getClaveError() {
        return claveError;
    }

    /**
     * @param claveError Una clave única del error. Puede ser usada para rastrear el error dentro de los archivos de log.
     */
    public void setClaveError(String claveError) {
        this.claveError = claveError;
    }

    /**
     * @return Un codigo de error entregado al cliente. Si el cliente es HTTP se entregará un codigo de error 503. 
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * @param status Un codigo de error entregado al cliente. Si el cliente es HTTP se entregará un codigo de error 503. 
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * @return Por default es el mensaje de la excepcion original. Típicamente un detalle tecnico.
     */
    public String getStatusText() {
        return statusText;
    }

    /**
     * @param statusText Por default es el mensaje de la excepcion original. Típicamente un detalle tecnico.
     */
    public void setStatusText(String statusText) {
        this.statusText = statusText;
    }
}
