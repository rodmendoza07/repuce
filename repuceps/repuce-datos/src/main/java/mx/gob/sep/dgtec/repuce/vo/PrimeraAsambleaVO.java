package mx.gob.sep.dgtec.repuce.vo;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeCandidatopresi;
import mx.gob.sep.dgtec.repuce.model.CeCandidatopresiCstm;
import mx.gob.sep.dgtec.repuce.model.CeCandidatosecre;
import mx.gob.sep.dgtec.repuce.model.CeEscrutador;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteMesa;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.ConsejeroC1415;
import mx.gob.sep.dgtec.repuce.model.PresidenteElecto;


public class PrimeraAsambleaVO extends ReunionVO{
	
	public PrimeraAsambleaVO(){
		super();
	}

	private List<CeIntegranteCstm> integrantes;
	private List<CeIntegranteMesa> integrantesMesa;
	//private List<CeEscrutador> escrutadores;
	private List<CeAsunto> asuntos;
	private List<CeCandidatopresi> presidentes;
	private List<CeCandidatosecre> secretarios;
	private List<CeCandidatopresiCstm> presidentesActa;
	private List<CeCandidatopresiCstm> secretariosActa;
	private PresidenteElecto presidenteGanador;
	private HijoPresidenteElectoVO hijoPresidente;
	private SecretarioElectoVO secreatioGanador; 
	private CePreguntas preguntas;
	private List<ConsejeroC1415> consejeros;
	private ValidacionPeriodoVO validacionPeriodo;
	private ValidacionNombreHijoVO validacionHijo;


	public List<CeIntegranteCstm> getIntegrantes() {
		return integrantes;
	}

	public void setIntegrantes(List<CeIntegranteCstm> integrantes) {
		this.integrantes = integrantes;
	}
	public List<CeIntegranteMesa> getIntegrantesMesa() {
		return integrantesMesa;
	}

	public void setIntegrantesMesa(List<CeIntegranteMesa> integrantesMesa) {
		this.integrantesMesa = integrantesMesa;
	}

//	public List<CeEscrutador> getEscrutadores() {
//		return escrutadores;
//	}
//
//	public void setEscrutadores(List<CeEscrutador> escrutadores) {
//		this.escrutadores = escrutadores;
//	}

	public List<CeAsunto> getAsuntos() {
		return asuntos;
	}

	public void setAsuntos(List<CeAsunto> asuntos) {
		this.asuntos = asuntos;
	}

	public List<CeCandidatopresi> getPresidentes() {
		return presidentes;
	}

	public void setPresidentes(List<CeCandidatopresi> presidentes) {
		this.presidentes = presidentes;
	}

	public List<CeCandidatosecre> getSecretarios() {
		return secretarios;
	}

	public void setSecretarios(List<CeCandidatosecre> secretarios) {
		this.secretarios = secretarios;
	}

	public List<CeCandidatopresiCstm> getPresidentesActa() {
		return presidentesActa;
	}

	public void setPresidentesActa(List<CeCandidatopresiCstm> presidentesActa) {
		this.presidentesActa = presidentesActa;
	}

	public List<CeCandidatopresiCstm> getSecretariosActa() {
		return secretariosActa;
	}

	public void setSecretariosActa(List<CeCandidatopresiCstm> secretariosActa) {
		this.secretariosActa = secretariosActa;
	}

	public PresidenteElecto getPresidenteGanador() {
		return presidenteGanador;
	}

	public void setPresidenteGanador(PresidenteElecto presidenteGanador) {
		this.presidenteGanador = presidenteGanador;
	}

	public HijoPresidenteElectoVO getHijoPresidente() {
		return hijoPresidente;
	}

	public void setHijoPresidente(HijoPresidenteElectoVO hijoPresidente) {
		this.hijoPresidente = hijoPresidente;
	}

	public SecretarioElectoVO getSecreatioGanador() {
		return secreatioGanador;
	}

	public void setSecreatioGanador(SecretarioElectoVO secreatioGanador) {
		this.secreatioGanador = secreatioGanador;
	}

	public CePreguntas getPreguntas() {
		return preguntas;
	}

	public void setPreguntas(CePreguntas preguntas) {
		this.preguntas = preguntas;
	}

	public List<ConsejeroC1415> getConsejeros() {
		return consejeros;
	}

	public void setConsejeros(List<ConsejeroC1415> consejeros) {
		this.consejeros = consejeros;
	}

	public ValidacionPeriodoVO getValidacionPeriodo() {
		return validacionPeriodo;
	}

	public void setValidacionPeriodo(ValidacionPeriodoVO validacionPeriodo) {
		this.validacionPeriodo = validacionPeriodo;
	}

	public ValidacionNombreHijoVO getValidacionHijo() {
		return validacionHijo;
	}

	public void setValidacionHijo(ValidacionNombreHijoVO validacionHijo) {
		this.validacionHijo = validacionHijo;
	}

	}
		
	

