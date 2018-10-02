package mx.gob.sep.dgtec.repuce.model;

public class ApecReunionInstructorCtsm extends ApecReunionInstructor{
	
	private ApecInstructorCstm instructor;
	private boolean editable;
	private boolean imprimir;
	
	

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public boolean isImprimir() {
		return imprimir;
	}

	public void setImprimir(boolean imprimir) {
		this.imprimir = imprimir;
	}

	public ApecInstructorCstm getInstructor() {
		return instructor;
	}

	public void setInstructor(ApecInstructorCstm instructor) {
		this.instructor = instructor;
	}
	

}
