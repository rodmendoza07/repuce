package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CeProgramasSeguimientoExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public CeProgramasSeguimientoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andCCctIsNull() {
            addCriterion("c_cct is null");
            return (Criteria) this;
        }

        public Criteria andCCctIsNotNull() {
            addCriterion("c_cct is not null");
            return (Criteria) this;
        }

        public Criteria andCCctEqualTo(Integer value) {
            addCriterion("c_cct =", value, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctNotEqualTo(Integer value) {
            addCriterion("c_cct <>", value, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctGreaterThan(Integer value) {
            addCriterion("c_cct >", value, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_cct >=", value, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctLessThan(Integer value) {
            addCriterion("c_cct <", value, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctLessThanOrEqualTo(Integer value) {
            addCriterion("c_cct <=", value, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctIn(List<Integer> values) {
            addCriterion("c_cct in", values, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctNotIn(List<Integer> values) {
            addCriterion("c_cct not in", values, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctBetween(Integer value1, Integer value2) {
            addCriterion("c_cct between", value1, value2, "cCct");
            return (Criteria) this;
        }

        public Criteria andCCctNotBetween(Integer value1, Integer value2) {
            addCriterion("c_cct not between", value1, value2, "cCct");
            return (Criteria) this;
        }

        public Criteria andCSesionIsNull() {
            addCriterion("c_sesion is null");
            return (Criteria) this;
        }

        public Criteria andCSesionIsNotNull() {
            addCriterion("c_sesion is not null");
            return (Criteria) this;
        }

        public Criteria andCSesionEqualTo(Short value) {
            addCriterion("c_sesion =", value, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionNotEqualTo(Short value) {
            addCriterion("c_sesion <>", value, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionGreaterThan(Short value) {
            addCriterion("c_sesion >", value, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionGreaterThanOrEqualTo(Short value) {
            addCriterion("c_sesion >=", value, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionLessThan(Short value) {
            addCriterion("c_sesion <", value, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionLessThanOrEqualTo(Short value) {
            addCriterion("c_sesion <=", value, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionIn(List<Short> values) {
            addCriterion("c_sesion in", values, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionNotIn(List<Short> values) {
            addCriterion("c_sesion not in", values, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionBetween(Short value1, Short value2) {
            addCriterion("c_sesion between", value1, value2, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCSesionNotBetween(Short value1, Short value2) {
            addCriterion("c_sesion not between", value1, value2, "cSesion");
            return (Criteria) this;
        }

        public Criteria andCProgramaIsNull() {
            addCriterion("c_programa is null");
            return (Criteria) this;
        }

        public Criteria andCProgramaIsNotNull() {
            addCriterion("c_programa is not null");
            return (Criteria) this;
        }

        public Criteria andCProgramaEqualTo(Short value) {
            addCriterion("c_programa =", value, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaNotEqualTo(Short value) {
            addCriterion("c_programa <>", value, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaGreaterThan(Short value) {
            addCriterion("c_programa >", value, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaGreaterThanOrEqualTo(Short value) {
            addCriterion("c_programa >=", value, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaLessThan(Short value) {
            addCriterion("c_programa <", value, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaLessThanOrEqualTo(Short value) {
            addCriterion("c_programa <=", value, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaIn(List<Short> values) {
            addCriterion("c_programa in", values, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaNotIn(List<Short> values) {
            addCriterion("c_programa not in", values, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaBetween(Short value1, Short value2) {
            addCriterion("c_programa between", value1, value2, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andCProgramaNotBetween(Short value1, Short value2) {
            addCriterion("c_programa not between", value1, value2, "cPrograma");
            return (Criteria) this;
        }

        public Criteria andIdDetalleIsNull() {
            addCriterion("id_detalle is null");
            return (Criteria) this;
        }

        public Criteria andIdDetalleIsNotNull() {
            addCriterion("id_detalle is not null");
            return (Criteria) this;
        }

        public Criteria andIdDetalleEqualTo(Integer value) {
            addCriterion("id_detalle =", value, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleNotEqualTo(Integer value) {
            addCriterion("id_detalle <>", value, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleGreaterThan(Integer value) {
            addCriterion("id_detalle >", value, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleGreaterThanOrEqualTo(Integer value) {
            addCriterion("id_detalle >=", value, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleLessThan(Integer value) {
            addCriterion("id_detalle <", value, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleLessThanOrEqualTo(Integer value) {
            addCriterion("id_detalle <=", value, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleIn(List<Integer> values) {
            addCriterion("id_detalle in", values, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleNotIn(List<Integer> values) {
            addCriterion("id_detalle not in", values, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleBetween(Integer value1, Integer value2) {
            addCriterion("id_detalle between", value1, value2, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdDetalleNotBetween(Integer value1, Integer value2) {
            addCriterion("id_detalle not between", value1, value2, "idDetalle");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoIsNull() {
            addCriterion("id_objetivo is null");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoIsNotNull() {
            addCriterion("id_objetivo is not null");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoEqualTo(Short value) {
            addCriterion("id_objetivo =", value, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoNotEqualTo(Short value) {
            addCriterion("id_objetivo <>", value, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoGreaterThan(Short value) {
            addCriterion("id_objetivo >", value, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoGreaterThanOrEqualTo(Short value) {
            addCriterion("id_objetivo >=", value, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoLessThan(Short value) {
            addCriterion("id_objetivo <", value, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoLessThanOrEqualTo(Short value) {
            addCriterion("id_objetivo <=", value, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoIn(List<Short> values) {
            addCriterion("id_objetivo in", values, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoNotIn(List<Short> values) {
            addCriterion("id_objetivo not in", values, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoBetween(Short value1, Short value2) {
            addCriterion("id_objetivo between", value1, value2, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andIdObjetivoNotBetween(Short value1, Short value2) {
            addCriterion("id_objetivo not between", value1, value2, "idObjetivo");
            return (Criteria) this;
        }

        public Criteria andAvanceIsNull() {
            addCriterion("avance is null");
            return (Criteria) this;
        }

        public Criteria andAvanceIsNotNull() {
            addCriterion("avance is not null");
            return (Criteria) this;
        }

        public Criteria andAvanceEqualTo(String value) {
            addCriterion("avance =", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceNotEqualTo(String value) {
            addCriterion("avance <>", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceGreaterThan(String value) {
            addCriterion("avance >", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceGreaterThanOrEqualTo(String value) {
            addCriterion("avance >=", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceLessThan(String value) {
            addCriterion("avance <", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceLessThanOrEqualTo(String value) {
            addCriterion("avance <=", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceLike(String value) {
            addCriterion("avance like", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceNotLike(String value) {
            addCriterion("avance not like", value, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceIn(List<String> values) {
            addCriterion("avance in", values, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceNotIn(List<String> values) {
            addCriterion("avance not in", values, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceBetween(String value1, String value2) {
            addCriterion("avance between", value1, value2, "avance");
            return (Criteria) this;
        }

        public Criteria andAvanceNotBetween(String value1, String value2) {
            addCriterion("avance not between", value1, value2, "avance");
            return (Criteria) this;
        }

        public Criteria andSeguimientoIsNull() {
            addCriterion("seguimiento is null");
            return (Criteria) this;
        }

        public Criteria andSeguimientoIsNotNull() {
            addCriterion("seguimiento is not null");
            return (Criteria) this;
        }

        public Criteria andSeguimientoEqualTo(String value) {
            addCriterion("seguimiento =", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoNotEqualTo(String value) {
            addCriterion("seguimiento <>", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoGreaterThan(String value) {
            addCriterion("seguimiento >", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoGreaterThanOrEqualTo(String value) {
            addCriterion("seguimiento >=", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoLessThan(String value) {
            addCriterion("seguimiento <", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoLessThanOrEqualTo(String value) {
            addCriterion("seguimiento <=", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoLike(String value) {
            addCriterion("seguimiento like", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoNotLike(String value) {
            addCriterion("seguimiento not like", value, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoIn(List<String> values) {
            addCriterion("seguimiento in", values, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoNotIn(List<String> values) {
            addCriterion("seguimiento not in", values, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoBetween(String value1, String value2) {
            addCriterion("seguimiento between", value1, value2, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andSeguimientoNotBetween(String value1, String value2) {
            addCriterion("seguimiento not between", value1, value2, "seguimiento");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionIsNull() {
            addCriterion("monto2_sesion is null");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionIsNotNull() {
            addCriterion("monto2_sesion is not null");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionEqualTo(BigDecimal value) {
            addCriterion("monto2_sesion =", value, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionNotEqualTo(BigDecimal value) {
            addCriterion("monto2_sesion <>", value, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionGreaterThan(BigDecimal value) {
            addCriterion("monto2_sesion >", value, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("monto2_sesion >=", value, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionLessThan(BigDecimal value) {
            addCriterion("monto2_sesion <", value, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionLessThanOrEqualTo(BigDecimal value) {
            addCriterion("monto2_sesion <=", value, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionIn(List<BigDecimal> values) {
            addCriterion("monto2_sesion in", values, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionNotIn(List<BigDecimal> values) {
            addCriterion("monto2_sesion not in", values, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("monto2_sesion between", value1, value2, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMonto2SesionNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("monto2_sesion not between", value1, value2, "monto2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionIsNull() {
            addCriterion("monto_str2_sesion is null");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionIsNotNull() {
            addCriterion("monto_str2_sesion is not null");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionEqualTo(String value) {
            addCriterion("monto_str2_sesion =", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionNotEqualTo(String value) {
            addCriterion("monto_str2_sesion <>", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionGreaterThan(String value) {
            addCriterion("monto_str2_sesion >", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionGreaterThanOrEqualTo(String value) {
            addCriterion("monto_str2_sesion >=", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionLessThan(String value) {
            addCriterion("monto_str2_sesion <", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionLessThanOrEqualTo(String value) {
            addCriterion("monto_str2_sesion <=", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionLike(String value) {
            addCriterion("monto_str2_sesion like", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionNotLike(String value) {
            addCriterion("monto_str2_sesion not like", value, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionIn(List<String> values) {
            addCriterion("monto_str2_sesion in", values, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionNotIn(List<String> values) {
            addCriterion("monto_str2_sesion not in", values, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionBetween(String value1, String value2) {
            addCriterion("monto_str2_sesion between", value1, value2, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andMontoStr2SesionNotBetween(String value1, String value2) {
            addCriterion("monto_str2_sesion not between", value1, value2, "montoStr2Sesion");
            return (Criteria) this;
        }

        public Criteria andCambioMontoIsNull() {
            addCriterion("cambio_monto is null");
            return (Criteria) this;
        }

        public Criteria andCambioMontoIsNotNull() {
            addCriterion("cambio_monto is not null");
            return (Criteria) this;
        }

        public Criteria andCambioMontoEqualTo(Integer value) {
            addCriterion("cambio_monto =", value, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoNotEqualTo(Integer value) {
            addCriterion("cambio_monto <>", value, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoGreaterThan(Integer value) {
            addCriterion("cambio_monto >", value, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoGreaterThanOrEqualTo(Integer value) {
            addCriterion("cambio_monto >=", value, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoLessThan(Integer value) {
            addCriterion("cambio_monto <", value, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoLessThanOrEqualTo(Integer value) {
            addCriterion("cambio_monto <=", value, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoIn(List<Integer> values) {
            addCriterion("cambio_monto in", values, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoNotIn(List<Integer> values) {
            addCriterion("cambio_monto not in", values, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoBetween(Integer value1, Integer value2) {
            addCriterion("cambio_monto between", value1, value2, "cambioMonto");
            return (Criteria) this;
        }

        public Criteria andCambioMontoNotBetween(Integer value1, Integer value2) {
            addCriterion("cambio_monto not between", value1, value2, "cambioMonto");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated do_not_delete_during_merge Mon Feb 13 14:19:35 CST 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_programas_seguimiento
     *
     * @mbggenerated Mon Feb 13 14:19:35 CST 2017
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}