package mx.gob.sep.dgtec.seguridad.modelo;

public class RolSeguridad extends BaseModelo{

	private String rol;
	private boolean activo;
	
	public RolSeguridad(){}
			
	public RolSeguridad(String rol, boolean activo) {
		this.rol = rol;
		this.activo = activo;
	}
	
	public String getRol() {
		return rol;
	}
	public void setRol(String rol) {
		this.rol = rol;
	}
	public boolean isActivo() {
		return activo;
	}
	public void setActivo(boolean activo) {
		this.activo = activo;
	}
	public String getAuthority() {
		return this.getRol();
	}

	@Override
	public String toString() {
		return "RolSeguridad [rol=" + rol + ", activo=" + activo + "]";
	}
		
	@Override
	public boolean equals(Object obj){
		RolSeguridad role = (RolSeguridad)obj;
		return role.isActivo()==activo && role.getRol().equals(rol);
	}
}