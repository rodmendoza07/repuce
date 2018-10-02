package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;
import mx.gob.sep.dgtec.repuce.model.CeEventoCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CmSeguimiento;


public class TerceraSesionVO extends ReunionVO{

	
	private List<CeProgramaCstm> programas;
	private List<CeEventoCstm> eventos;
	private CmSeguimiento seguimientoMunicipal;

	
	public TerceraSesionVO(){
		super();
	}

		public List<CeProgramaCstm> getProgramas() {
			return programas;
		}

		public void setProgramas(List<CeProgramaCstm> programas) {
			this.programas = programas;
		}

		

		public List<CeEventoCstm> getEventos() {
			return eventos;
		}

		public void setEventos(List<CeEventoCstm> eventos) {
			this.eventos = eventos;
		}

		public CmSeguimiento getSeguimientoMunicipal() {
			return seguimientoMunicipal;
		}

		public void setSeguimientoMunicipal(CmSeguimiento seguimientoMunicipal) {
			this.seguimientoMunicipal = seguimientoMunicipal;
		}

		
		
		
		
		
		
}
