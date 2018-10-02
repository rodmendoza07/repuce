package mx.gob.sep.dgtec.repuce.model;

public class ApecDiagnosticoComCstm extends ApecDiagnosticoCom{
	
	/*private String descripDiagnosticoCom;
	private Boolean poblacionAefctada;
	private Boolean otraDescrip;*/
	
	private String tipoDiagnostico;
	private CDiagnosticoCom diagnostico;
	
	
	

	/*public String getDescripDiagnosticoCom() {
		return descripDiagnosticoCom;
	}

	public void setDescripDiagnosticoCom(String descripDiagnosticoCom) {
		this.descripDiagnosticoCom = descripDiagnosticoCom;
	}

	public Boolean getPoblacionAefctada() {
		return poblacionAefctada;
	}

	public void setPoblacionAefctada(Boolean poblacionAefctada) {
		this.poblacionAefctada = poblacionAefctada;
	}

	public Boolean getOtraDescrip() {
		return otraDescrip;
	}

	public void setOtraDescrip(Boolean otraDescrip) {
		this.otraDescrip = otraDescrip;
	}*/

	public CDiagnosticoCom getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(CDiagnosticoCom diagnostico) {
		this.diagnostico = diagnostico;
	}

	public String getTipoDiagnostico() {
		return tipoDiagnostico;
	}

	public void setTipoDiagnostico(String tipoDiagnostico) {
		this.tipoDiagnostico = tipoDiagnostico;
	}

	
}
