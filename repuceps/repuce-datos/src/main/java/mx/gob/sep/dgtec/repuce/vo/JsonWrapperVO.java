	package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeComite;
import mx.gob.sep.dgtec.repuce.model.CeEvento;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCct;
import mx.gob.sep.dgtec.repuce.model.CePlaneacion;
import mx.gob.sep.dgtec.repuce.model.CePrograma;

@SuppressWarnings("rawtypes")
public class JsonWrapperVO {

	private String identifier;
	private String label;
	private List items;
	public String getIdentifier() {
		return identifier;
	}
	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public List getItems() {
		return items;
	}
	public void setItems(List items) {
		this.items = items;
	}


}
