package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CeComitesExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public CeComitesExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
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
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
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

        public Criteria andCeComitesIsNull() {
            addCriterion("ce_comites is null");
            return (Criteria) this;
        }

        public Criteria andCeComitesIsNotNull() {
            addCriterion("ce_comites is not null");
            return (Criteria) this;
        }

        public Criteria andCeComitesEqualTo(Integer value) {
            addCriterion("ce_comites =", value, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesNotEqualTo(Integer value) {
            addCriterion("ce_comites <>", value, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesGreaterThan(Integer value) {
            addCriterion("ce_comites >", value, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesGreaterThanOrEqualTo(Integer value) {
            addCriterion("ce_comites >=", value, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesLessThan(Integer value) {
            addCriterion("ce_comites <", value, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesLessThanOrEqualTo(Integer value) {
            addCriterion("ce_comites <=", value, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesIn(List<Integer> values) {
            addCriterion("ce_comites in", values, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesNotIn(List<Integer> values) {
            addCriterion("ce_comites not in", values, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesBetween(Integer value1, Integer value2) {
            addCriterion("ce_comites between", value1, value2, "ceComites");
            return (Criteria) this;
        }

        public Criteria andCeComitesNotBetween(Integer value1, Integer value2) {
            addCriterion("ce_comites not between", value1, value2, "ceComites");
            return (Criteria) this;
        }

        public Criteria andIdComiteIsNull() {
            addCriterion("id_comite is null");
            return (Criteria) this;
        }

        public Criteria andIdComiteIsNotNull() {
            addCriterion("id_comite is not null");
            return (Criteria) this;
        }

        public Criteria andIdComiteEqualTo(Integer value) {
            addCriterion("id_comite =", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteNotEqualTo(Integer value) {
            addCriterion("id_comite <>", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteGreaterThan(Integer value) {
            addCriterion("id_comite >", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteGreaterThanOrEqualTo(Integer value) {
            addCriterion("id_comite >=", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteLessThan(Integer value) {
            addCriterion("id_comite <", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteLessThanOrEqualTo(Integer value) {
            addCriterion("id_comite <=", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteIn(List<Integer> values) {
            addCriterion("id_comite in", values, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteNotIn(List<Integer> values) {
            addCriterion("id_comite not in", values, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteBetween(Integer value1, Integer value2) {
            addCriterion("id_comite between", value1, value2, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteNotBetween(Integer value1, Integer value2) {
            addCriterion("id_comite not between", value1, value2, "idComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteIsNull() {
            addCriterion("nom_comite is null");
            return (Criteria) this;
        }

        public Criteria andNomComiteIsNotNull() {
            addCriterion("nom_comite is not null");
            return (Criteria) this;
        }

        public Criteria andNomComiteEqualTo(String value) {
            addCriterion("nom_comite =", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotEqualTo(String value) {
            addCriterion("nom_comite <>", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteGreaterThan(String value) {
            addCriterion("nom_comite >", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteGreaterThanOrEqualTo(String value) {
            addCriterion("nom_comite >=", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteLessThan(String value) {
            addCriterion("nom_comite <", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteLessThanOrEqualTo(String value) {
            addCriterion("nom_comite <=", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteLike(String value) {
            addCriterion("nom_comite like", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotLike(String value) {
            addCriterion("nom_comite not like", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteIn(List<String> values) {
            addCriterion("nom_comite in", values, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotIn(List<String> values) {
            addCriterion("nom_comite not in", values, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteBetween(String value1, String value2) {
            addCriterion("nom_comite between", value1, value2, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotBetween(String value1, String value2) {
            addCriterion("nom_comite not between", value1, value2, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesIsNull() {
            addCriterion("num_integrantes is null");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesIsNotNull() {
            addCriterion("num_integrantes is not null");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesEqualTo(Short value) {
            addCriterion("num_integrantes =", value, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesNotEqualTo(Short value) {
            addCriterion("num_integrantes <>", value, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesGreaterThan(Short value) {
            addCriterion("num_integrantes >", value, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesGreaterThanOrEqualTo(Short value) {
            addCriterion("num_integrantes >=", value, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesLessThan(Short value) {
            addCriterion("num_integrantes <", value, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesLessThanOrEqualTo(Short value) {
            addCriterion("num_integrantes <=", value, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesIn(List<Short> values) {
            addCriterion("num_integrantes in", values, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesNotIn(List<Short> values) {
            addCriterion("num_integrantes not in", values, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesBetween(Short value1, Short value2) {
            addCriterion("num_integrantes between", value1, value2, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNumIntegrantesNotBetween(Short value1, Short value2) {
            addCriterion("num_integrantes not between", value1, value2, "numIntegrantes");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteIsNull() {
            addCriterion("nom_presidente is null");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteIsNotNull() {
            addCriterion("nom_presidente is not null");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteEqualTo(String value) {
            addCriterion("nom_presidente =", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteNotEqualTo(String value) {
            addCriterion("nom_presidente <>", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteGreaterThan(String value) {
            addCriterion("nom_presidente >", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteGreaterThanOrEqualTo(String value) {
            addCriterion("nom_presidente >=", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteLessThan(String value) {
            addCriterion("nom_presidente <", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteLessThanOrEqualTo(String value) {
            addCriterion("nom_presidente <=", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteLike(String value) {
            addCriterion("nom_presidente like", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteNotLike(String value) {
            addCriterion("nom_presidente not like", value, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteIn(List<String> values) {
            addCriterion("nom_presidente in", values, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteNotIn(List<String> values) {
            addCriterion("nom_presidente not in", values, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteBetween(String value1, String value2) {
            addCriterion("nom_presidente between", value1, value2, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andNomPresidenteNotBetween(String value1, String value2) {
            addCriterion("nom_presidente not between", value1, value2, "nomPresidente");
            return (Criteria) this;
        }

        public Criteria andIdCalidadIsNull() {
            addCriterion("id_calidad is null");
            return (Criteria) this;
        }

        public Criteria andIdCalidadIsNotNull() {
            addCriterion("id_calidad is not null");
            return (Criteria) this;
        }

        public Criteria andIdCalidadEqualTo(Integer value) {
            addCriterion("id_calidad =", value, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadNotEqualTo(Integer value) {
            addCriterion("id_calidad <>", value, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadGreaterThan(Integer value) {
            addCriterion("id_calidad >", value, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadGreaterThanOrEqualTo(Integer value) {
            addCriterion("id_calidad >=", value, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadLessThan(Integer value) {
            addCriterion("id_calidad <", value, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadLessThanOrEqualTo(Integer value) {
            addCriterion("id_calidad <=", value, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadIn(List<Integer> values) {
            addCriterion("id_calidad in", values, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadNotIn(List<Integer> values) {
            addCriterion("id_calidad not in", values, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadBetween(Integer value1, Integer value2) {
            addCriterion("id_calidad between", value1, value2, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andIdCalidadNotBetween(Integer value1, Integer value2) {
            addCriterion("id_calidad not between", value1, value2, "idCalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadIsNull() {
            addCriterion("nomcalidad is null");
            return (Criteria) this;
        }

        public Criteria andNomcalidadIsNotNull() {
            addCriterion("nomcalidad is not null");
            return (Criteria) this;
        }

        public Criteria andNomcalidadEqualTo(String value) {
            addCriterion("nomcalidad =", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadNotEqualTo(String value) {
            addCriterion("nomcalidad <>", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadGreaterThan(String value) {
            addCriterion("nomcalidad >", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadGreaterThanOrEqualTo(String value) {
            addCriterion("nomcalidad >=", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadLessThan(String value) {
            addCriterion("nomcalidad <", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadLessThanOrEqualTo(String value) {
            addCriterion("nomcalidad <=", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadLike(String value) {
            addCriterion("nomcalidad like", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadNotLike(String value) {
            addCriterion("nomcalidad not like", value, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadIn(List<String> values) {
            addCriterion("nomcalidad in", values, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadNotIn(List<String> values) {
            addCriterion("nomcalidad not in", values, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadBetween(String value1, String value2) {
            addCriterion("nomcalidad between", value1, value2, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andNomcalidadNotBetween(String value1, String value2) {
            addCriterion("nomcalidad not between", value1, value2, "nomcalidad");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoIsNull() {
            addCriterion("id_acuerdo is null");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoIsNotNull() {
            addCriterion("id_acuerdo is not null");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoEqualTo(Integer value) {
            addCriterion("id_acuerdo =", value, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoNotEqualTo(Integer value) {
            addCriterion("id_acuerdo <>", value, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoGreaterThan(Integer value) {
            addCriterion("id_acuerdo >", value, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoGreaterThanOrEqualTo(Integer value) {
            addCriterion("id_acuerdo >=", value, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoLessThan(Integer value) {
            addCriterion("id_acuerdo <", value, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoLessThanOrEqualTo(Integer value) {
            addCriterion("id_acuerdo <=", value, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoIn(List<Integer> values) {
            addCriterion("id_acuerdo in", values, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoNotIn(List<Integer> values) {
            addCriterion("id_acuerdo not in", values, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoBetween(Integer value1, Integer value2) {
            addCriterion("id_acuerdo between", value1, value2, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andIdAcuerdoNotBetween(Integer value1, Integer value2) {
            addCriterion("id_acuerdo not between", value1, value2, "idAcuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoIsNull() {
            addCriterion("acuerdo is null");
            return (Criteria) this;
        }

        public Criteria andAcuerdoIsNotNull() {
            addCriterion("acuerdo is not null");
            return (Criteria) this;
        }

        public Criteria andAcuerdoEqualTo(String value) {
            addCriterion("acuerdo =", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoNotEqualTo(String value) {
            addCriterion("acuerdo <>", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoGreaterThan(String value) {
            addCriterion("acuerdo >", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoGreaterThanOrEqualTo(String value) {
            addCriterion("acuerdo >=", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoLessThan(String value) {
            addCriterion("acuerdo <", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoLessThanOrEqualTo(String value) {
            addCriterion("acuerdo <=", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoLike(String value) {
            addCriterion("acuerdo like", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoNotLike(String value) {
            addCriterion("acuerdo not like", value, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoIn(List<String> values) {
            addCriterion("acuerdo in", values, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoNotIn(List<String> values) {
            addCriterion("acuerdo not in", values, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoBetween(String value1, String value2) {
            addCriterion("acuerdo between", value1, value2, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andAcuerdoNotBetween(String value1, String value2) {
            addCriterion("acuerdo not between", value1, value2, "acuerdo");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteIsNull() {
            addCriterion("nom_otro_comite is null");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteIsNotNull() {
            addCriterion("nom_otro_comite is not null");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteEqualTo(String value) {
            addCriterion("nom_otro_comite =", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteNotEqualTo(String value) {
            addCriterion("nom_otro_comite <>", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteGreaterThan(String value) {
            addCriterion("nom_otro_comite >", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteGreaterThanOrEqualTo(String value) {
            addCriterion("nom_otro_comite >=", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteLessThan(String value) {
            addCriterion("nom_otro_comite <", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteLessThanOrEqualTo(String value) {
            addCriterion("nom_otro_comite <=", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteLike(String value) {
            addCriterion("nom_otro_comite like", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteNotLike(String value) {
            addCriterion("nom_otro_comite not like", value, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteIn(List<String> values) {
            addCriterion("nom_otro_comite in", values, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteNotIn(List<String> values) {
            addCriterion("nom_otro_comite not in", values, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteBetween(String value1, String value2) {
            addCriterion("nom_otro_comite between", value1, value2, "nomOtroComite");
            return (Criteria) this;
        }

        public Criteria andNomOtroComiteNotBetween(String value1, String value2) {
            addCriterion("nom_otro_comite not between", value1, value2, "nomOtroComite");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_comites
     *
     * @mbggenerated do_not_delete_during_merge Tue Sep 23 14:59:01 CDT 2014
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_comites
     *
     * @mbggenerated Tue Sep 23 14:59:01 CDT 2014
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