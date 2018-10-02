package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeSesion;



public class ReunionesRealizadasVO {

	private CCct cct;
	private UbicacionCctCstm ubicacionCct;
	private CeInfGral ceInfGral;
	private List<CeSesion> reuniones;
	private ProgramaTiempoCompletoVO tiempoCompleto;
	
	public ReunionesRealizadasVO(){
		super();
	}

	public CCct getCct() {
		return cct;
	}

	public void setCct(CCct cct) {
		this.cct = cct;
	}

	public UbicacionCctCstm getUbicacionCct() {
		return ubicacionCct;
	}

	public void setUbicacionCct(UbicacionCctCstm ubicacionCct) {
		this.ubicacionCct = ubicacionCct;
	}

	public CeInfGral getCeInfGral() {
		return ceInfGral;
	}

	public void setCeInfGral(CeInfGral ceInfGral) {
		this.ceInfGral = ceInfGral;
	}

	public List<CeSesion> getReuniones() {
		return reuniones;
	}

	public void setReuniones(List<CeSesion> reuniones) {
		this.reuniones = reuniones;
	}

	public ProgramaTiempoCompletoVO getTiempoCompleto() {
		return tiempoCompleto;
	}

	public void setTiempoCompleto(ProgramaTiempoCompletoVO tiempoCompleto) {
		this.tiempoCompleto = tiempoCompleto;
	}
	
}
