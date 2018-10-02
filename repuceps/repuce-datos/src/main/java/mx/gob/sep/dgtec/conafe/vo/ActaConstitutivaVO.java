package mx.gob.sep.dgtec.conafe.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecAsistenteCstm;

public class ActaConstitutivaVO extends ReunionConafeVO {
	
	private List<ApecAsistenteCstm> asistentes;
	
	public List<ApecAsistenteCstm> getAsistentes() {
		return asistentes;
	}

	public void setAsistentes(List<ApecAsistenteCstm> asistentes) {
		this.asistentes = asistentes;
	}

	
	
}