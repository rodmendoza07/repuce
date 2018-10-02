package mx.gob.sep.dgtec.repuce.model;

public class PresidenteElecto {
	
	private Integer cCct;
	
	private String paterno;

    private String materno;
    
    private String nombre;

    private Short votos;

	public String getPaterno() {
		return paterno;
	}

	public void setPaterno(String paterno) {
		this.paterno = paterno;
	}

	public String getMaterno() {
		return materno;
	}

	public void setMaterno(String materno) {
		this.materno = materno;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Short getVotos() {
		return votos;
	}

	public void setVotos(Short votos) {
		this.votos = votos;
	}

	public Integer getcCct() {
		return cCct;
	}

	public void setcCct(Integer cCct) {
		this.cCct = cCct;
	}

}
