package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CctResultEnlaceExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public CctResultEnlaceExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
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
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
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

        public Criteria andNumGradoIsNull() {
            addCriterion("num_grado is null");
            return (Criteria) this;
        }

        public Criteria andNumGradoIsNotNull() {
            addCriterion("num_grado is not null");
            return (Criteria) this;
        }

        public Criteria andNumGradoEqualTo(Short value) {
            addCriterion("num_grado =", value, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoNotEqualTo(Short value) {
            addCriterion("num_grado <>", value, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoGreaterThan(Short value) {
            addCriterion("num_grado >", value, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoGreaterThanOrEqualTo(Short value) {
            addCriterion("num_grado >=", value, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoLessThan(Short value) {
            addCriterion("num_grado <", value, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoLessThanOrEqualTo(Short value) {
            addCriterion("num_grado <=", value, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoIn(List<Short> values) {
            addCriterion("num_grado in", values, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoNotIn(List<Short> values) {
            addCriterion("num_grado not in", values, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoBetween(Short value1, Short value2) {
            addCriterion("num_grado between", value1, value2, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumGradoNotBetween(Short value1, Short value2) {
            addCriterion("num_grado not between", value1, value2, "numGrado");
            return (Criteria) this;
        }

        public Criteria andNumMateriaIsNull() {
            addCriterion("num_materia is null");
            return (Criteria) this;
        }

        public Criteria andNumMateriaIsNotNull() {
            addCriterion("num_materia is not null");
            return (Criteria) this;
        }

        public Criteria andNumMateriaEqualTo(Short value) {
            addCriterion("num_materia =", value, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaNotEqualTo(Short value) {
            addCriterion("num_materia <>", value, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaGreaterThan(Short value) {
            addCriterion("num_materia >", value, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaGreaterThanOrEqualTo(Short value) {
            addCriterion("num_materia >=", value, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaLessThan(Short value) {
            addCriterion("num_materia <", value, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaLessThanOrEqualTo(Short value) {
            addCriterion("num_materia <=", value, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaIn(List<Short> values) {
            addCriterion("num_materia in", values, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaNotIn(List<Short> values) {
            addCriterion("num_materia not in", values, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaBetween(Short value1, Short value2) {
            addCriterion("num_materia between", value1, value2, "numMateria");
            return (Criteria) this;
        }

        public Criteria andNumMateriaNotBetween(Short value1, Short value2) {
            addCriterion("num_materia not between", value1, value2, "numMateria");
            return (Criteria) this;
        }

        public Criteria andAnioResultIsNull() {
            addCriterion("anio_result is null");
            return (Criteria) this;
        }

        public Criteria andAnioResultIsNotNull() {
            addCriterion("anio_result is not null");
            return (Criteria) this;
        }

        public Criteria andAnioResultEqualTo(Short value) {
            addCriterion("anio_result =", value, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultNotEqualTo(Short value) {
            addCriterion("anio_result <>", value, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultGreaterThan(Short value) {
            addCriterion("anio_result >", value, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultGreaterThanOrEqualTo(Short value) {
            addCriterion("anio_result >=", value, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultLessThan(Short value) {
            addCriterion("anio_result <", value, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultLessThanOrEqualTo(Short value) {
            addCriterion("anio_result <=", value, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultIn(List<Short> values) {
            addCriterion("anio_result in", values, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultNotIn(List<Short> values) {
            addCriterion("anio_result not in", values, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultBetween(Short value1, Short value2) {
            addCriterion("anio_result between", value1, value2, "anioResult");
            return (Criteria) this;
        }

        public Criteria andAnioResultNotBetween(Short value1, Short value2) {
            addCriterion("anio_result not between", value1, value2, "anioResult");
            return (Criteria) this;
        }

        public Criteria andPuntosNalIsNull() {
            addCriterion("puntos_nal is null");
            return (Criteria) this;
        }

        public Criteria andPuntosNalIsNotNull() {
            addCriterion("puntos_nal is not null");
            return (Criteria) this;
        }

        public Criteria andPuntosNalEqualTo(String value) {
            addCriterion("puntos_nal =", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalNotEqualTo(String value) {
            addCriterion("puntos_nal <>", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalGreaterThan(String value) {
            addCriterion("puntos_nal >", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalGreaterThanOrEqualTo(String value) {
            addCriterion("puntos_nal >=", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalLessThan(String value) {
            addCriterion("puntos_nal <", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalLessThanOrEqualTo(String value) {
            addCriterion("puntos_nal <=", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalLike(String value) {
            addCriterion("puntos_nal like", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalNotLike(String value) {
            addCriterion("puntos_nal not like", value, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalIn(List<String> values) {
            addCriterion("puntos_nal in", values, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalNotIn(List<String> values) {
            addCriterion("puntos_nal not in", values, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalBetween(String value1, String value2) {
            addCriterion("puntos_nal between", value1, value2, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosNalNotBetween(String value1, String value2) {
            addCriterion("puntos_nal not between", value1, value2, "puntosNal");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoIsNull() {
            addCriterion("puntos_edo is null");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoIsNotNull() {
            addCriterion("puntos_edo is not null");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoEqualTo(String value) {
            addCriterion("puntos_edo =", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoNotEqualTo(String value) {
            addCriterion("puntos_edo <>", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoGreaterThan(String value) {
            addCriterion("puntos_edo >", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoGreaterThanOrEqualTo(String value) {
            addCriterion("puntos_edo >=", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoLessThan(String value) {
            addCriterion("puntos_edo <", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoLessThanOrEqualTo(String value) {
            addCriterion("puntos_edo <=", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoLike(String value) {
            addCriterion("puntos_edo like", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoNotLike(String value) {
            addCriterion("puntos_edo not like", value, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoIn(List<String> values) {
            addCriterion("puntos_edo in", values, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoNotIn(List<String> values) {
            addCriterion("puntos_edo not in", values, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoBetween(String value1, String value2) {
            addCriterion("puntos_edo between", value1, value2, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosEdoNotBetween(String value1, String value2) {
            addCriterion("puntos_edo not between", value1, value2, "puntosEdo");
            return (Criteria) this;
        }

        public Criteria andPuntosCctIsNull() {
            addCriterion("puntos_cct is null");
            return (Criteria) this;
        }

        public Criteria andPuntosCctIsNotNull() {
            addCriterion("puntos_cct is not null");
            return (Criteria) this;
        }

        public Criteria andPuntosCctEqualTo(String value) {
            addCriterion("puntos_cct =", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctNotEqualTo(String value) {
            addCriterion("puntos_cct <>", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctGreaterThan(String value) {
            addCriterion("puntos_cct >", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctGreaterThanOrEqualTo(String value) {
            addCriterion("puntos_cct >=", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctLessThan(String value) {
            addCriterion("puntos_cct <", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctLessThanOrEqualTo(String value) {
            addCriterion("puntos_cct <=", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctLike(String value) {
            addCriterion("puntos_cct like", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctNotLike(String value) {
            addCriterion("puntos_cct not like", value, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctIn(List<String> values) {
            addCriterion("puntos_cct in", values, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctNotIn(List<String> values) {
            addCriterion("puntos_cct not in", values, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctBetween(String value1, String value2) {
            addCriterion("puntos_cct between", value1, value2, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPuntosCctNotBetween(String value1, String value2) {
            addCriterion("puntos_cct not between", value1, value2, "puntosCct");
            return (Criteria) this;
        }

        public Criteria andPctInsufIsNull() {
            addCriterion("pct_insuf is null");
            return (Criteria) this;
        }

        public Criteria andPctInsufIsNotNull() {
            addCriterion("pct_insuf is not null");
            return (Criteria) this;
        }

        public Criteria andPctInsufEqualTo(String value) {
            addCriterion("pct_insuf =", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufNotEqualTo(String value) {
            addCriterion("pct_insuf <>", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufGreaterThan(String value) {
            addCriterion("pct_insuf >", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufGreaterThanOrEqualTo(String value) {
            addCriterion("pct_insuf >=", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufLessThan(String value) {
            addCriterion("pct_insuf <", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufLessThanOrEqualTo(String value) {
            addCriterion("pct_insuf <=", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufLike(String value) {
            addCriterion("pct_insuf like", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufNotLike(String value) {
            addCriterion("pct_insuf not like", value, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufIn(List<String> values) {
            addCriterion("pct_insuf in", values, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufNotIn(List<String> values) {
            addCriterion("pct_insuf not in", values, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufBetween(String value1, String value2) {
            addCriterion("pct_insuf between", value1, value2, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctInsufNotBetween(String value1, String value2) {
            addCriterion("pct_insuf not between", value1, value2, "pctInsuf");
            return (Criteria) this;
        }

        public Criteria andPctElemIsNull() {
            addCriterion("pct_elem is null");
            return (Criteria) this;
        }

        public Criteria andPctElemIsNotNull() {
            addCriterion("pct_elem is not null");
            return (Criteria) this;
        }

        public Criteria andPctElemEqualTo(String value) {
            addCriterion("pct_elem =", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemNotEqualTo(String value) {
            addCriterion("pct_elem <>", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemGreaterThan(String value) {
            addCriterion("pct_elem >", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemGreaterThanOrEqualTo(String value) {
            addCriterion("pct_elem >=", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemLessThan(String value) {
            addCriterion("pct_elem <", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemLessThanOrEqualTo(String value) {
            addCriterion("pct_elem <=", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemLike(String value) {
            addCriterion("pct_elem like", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemNotLike(String value) {
            addCriterion("pct_elem not like", value, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemIn(List<String> values) {
            addCriterion("pct_elem in", values, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemNotIn(List<String> values) {
            addCriterion("pct_elem not in", values, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemBetween(String value1, String value2) {
            addCriterion("pct_elem between", value1, value2, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctElemNotBetween(String value1, String value2) {
            addCriterion("pct_elem not between", value1, value2, "pctElem");
            return (Criteria) this;
        }

        public Criteria andPctBuenoIsNull() {
            addCriterion("pct_bueno is null");
            return (Criteria) this;
        }

        public Criteria andPctBuenoIsNotNull() {
            addCriterion("pct_bueno is not null");
            return (Criteria) this;
        }

        public Criteria andPctBuenoEqualTo(String value) {
            addCriterion("pct_bueno =", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoNotEqualTo(String value) {
            addCriterion("pct_bueno <>", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoGreaterThan(String value) {
            addCriterion("pct_bueno >", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoGreaterThanOrEqualTo(String value) {
            addCriterion("pct_bueno >=", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoLessThan(String value) {
            addCriterion("pct_bueno <", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoLessThanOrEqualTo(String value) {
            addCriterion("pct_bueno <=", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoLike(String value) {
            addCriterion("pct_bueno like", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoNotLike(String value) {
            addCriterion("pct_bueno not like", value, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoIn(List<String> values) {
            addCriterion("pct_bueno in", values, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoNotIn(List<String> values) {
            addCriterion("pct_bueno not in", values, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoBetween(String value1, String value2) {
            addCriterion("pct_bueno between", value1, value2, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctBuenoNotBetween(String value1, String value2) {
            addCriterion("pct_bueno not between", value1, value2, "pctBueno");
            return (Criteria) this;
        }

        public Criteria andPctExcelIsNull() {
            addCriterion("pct_excel is null");
            return (Criteria) this;
        }

        public Criteria andPctExcelIsNotNull() {
            addCriterion("pct_excel is not null");
            return (Criteria) this;
        }

        public Criteria andPctExcelEqualTo(String value) {
            addCriterion("pct_excel =", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelNotEqualTo(String value) {
            addCriterion("pct_excel <>", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelGreaterThan(String value) {
            addCriterion("pct_excel >", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelGreaterThanOrEqualTo(String value) {
            addCriterion("pct_excel >=", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelLessThan(String value) {
            addCriterion("pct_excel <", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelLessThanOrEqualTo(String value) {
            addCriterion("pct_excel <=", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelLike(String value) {
            addCriterion("pct_excel like", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelNotLike(String value) {
            addCriterion("pct_excel not like", value, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelIn(List<String> values) {
            addCriterion("pct_excel in", values, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelNotIn(List<String> values) {
            addCriterion("pct_excel not in", values, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelBetween(String value1, String value2) {
            addCriterion("pct_excel between", value1, value2, "pctExcel");
            return (Criteria) this;
        }

        public Criteria andPctExcelNotBetween(String value1, String value2) {
            addCriterion("pct_excel not between", value1, value2, "pctExcel");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table cct_result_enlace
     *
     * @mbggenerated do_not_delete_during_merge Mon Oct 29 17:47:29 CST 2012
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table cct_result_enlace
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
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