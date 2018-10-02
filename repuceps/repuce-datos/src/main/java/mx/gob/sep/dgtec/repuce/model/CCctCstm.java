package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;

public class CCctCstm extends CCct{
    
    private String presidente;
    private String secretario;
    private String integrantes;
    private String domicilio;
    private String colonia;
    private String codigoPostal;
    private String programa;
    private BigDecimal monto;

    public String getPresidente() {
        return presidente;
    }
    public void setPresidente(String presidente) {
        this.presidente = presidente == null ? null : presidente.trim();
    }
    
    public String getSecretario() {
        return secretario;
    }
    public void setSecretario(String secretario) {
        this.secretario = secretario == null ? null : secretario.trim();
    }
    
    public String getIntegrantes() {
        return integrantes;
    }
    public void setIntegrantes(String integrantes) {
        this.integrantes = integrantes == null ? null : integrantes.trim();
    }
	public String getDomicilio() {
		return domicilio;
	}
	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}
	public String getColonia() {
		return colonia;
	}
	public void setColonia(String colonia) {
		this.colonia = colonia;
	}
	public String getCodigoPostal() {
		return codigoPostal;
	}
	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}
	public String getPrograma() {
		return programa;
	}
	public void setPrograma(String programa) {
		this.programa = programa;
	}
	public BigDecimal getMonto() {
		return monto;
	}
	public void setMonto(BigDecimal monto) {
		this.monto = monto;
	}
    
}