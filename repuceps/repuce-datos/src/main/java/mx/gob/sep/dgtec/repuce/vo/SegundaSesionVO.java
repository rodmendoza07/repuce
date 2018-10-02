package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.HCeMetaEnlace;


public class SegundaSesionVO extends ReunionVO{
	
	private List<CeCompEnlaceCstm> compromisos;
	private List<CeMetaEnlace> metas;
	private List<HCeMetaEnlace> hMetas;
	private List<CctResultEnlace> resultadosEnlace;
	private IndicadorEnlaceVO indicadorEnlace;

	public SegundaSesionVO(){
		super();
	}
	
	public List<CeCompEnlaceCstm> getCompromisos() {
		return compromisos;
	}

	public void setCompromisos(List<CeCompEnlaceCstm> compEnlace) {
		this.compromisos = compEnlace;
	}

	public List<CeMetaEnlace> getMetas() {
		return metas;
	}

	public void setMetas(List<CeMetaEnlace> metaEnlace) {
		this.metas = metaEnlace;
	}

	public List<HCeMetaEnlace> gethMetas() {
		return hMetas;
	}

	public void sethMetas(List<HCeMetaEnlace> hMetas) {
		this.hMetas = hMetas;
	}

	public List<CctResultEnlace> getResultadosEnlace() {
		return resultadosEnlace;
	}

	public void setResultadosEnlace(List<CctResultEnlace> resultEnlace) {
		this.resultadosEnlace = resultEnlace;
	}

	public IndicadorEnlaceVO getIndicadorEnlace() {
		return indicadorEnlace;
	}

	public void setIndicadorEnlace(IndicadorEnlaceVO indicadorEnlace) {
		this.indicadorEnlace = indicadorEnlace;
	}

	
	

}
