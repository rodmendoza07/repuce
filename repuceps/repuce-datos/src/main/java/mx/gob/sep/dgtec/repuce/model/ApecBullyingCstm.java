package mx.gob.sep.dgtec.repuce.model;

public class ApecBullyingCstm extends ApecBullying{

	private String nomTipoBullying;
	private String descripCortar1;
	private String descripLargar2;
	private String descripLargar3;

	public String getDescripCortar1() {
		return descripCortar1;
	}
	public void setDescripCortar1(String descripCortar1) {
		this.descripCortar1 = descripCortar1;
	}
	
	public String getDescripLargar2() {
		return descripLargar2;
	}
	public void setDescripLargar2(String descripLargar2) {
		this.descripLargar2 = descripLargar2;
	}
	
	public String getDescripLargar3() {
		return descripLargar3;
	}
	public void setDescripLargar3(String descripLargar3) {
		this.descripLargar3 = descripLargar3;
	}
	
	public String getNomTipoBullying() {
		return nomTipoBullying;
	}
	public void setNomTipoBullying(String nomTipoBullying) {
		this.nomTipoBullying = nomTipoBullying;
	}

}
