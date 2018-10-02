package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CeIntegranteComiteConsejoExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public CeIntegranteComiteConsejoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
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
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
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

        public Criteria andCCctIntegranteIsNull() {
            addCriterion("c_cct_integrante is null");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteIsNotNull() {
            addCriterion("c_cct_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteEqualTo(Integer value) {
            addCriterion("c_cct_integrante =", value, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteNotEqualTo(Integer value) {
            addCriterion("c_cct_integrante <>", value, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteGreaterThan(Integer value) {
            addCriterion("c_cct_integrante >", value, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_cct_integrante >=", value, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteLessThan(Integer value) {
            addCriterion("c_cct_integrante <", value, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteLessThanOrEqualTo(Integer value) {
            addCriterion("c_cct_integrante <=", value, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteIn(List<Integer> values) {
            addCriterion("c_cct_integrante in", values, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteNotIn(List<Integer> values) {
            addCriterion("c_cct_integrante not in", values, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteBetween(Integer value1, Integer value2) {
            addCriterion("c_cct_integrante between", value1, value2, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctIntegranteNotBetween(Integer value1, Integer value2) {
            addCriterion("c_cct_integrante not between", value1, value2, "cCctIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteIsNull() {
            addCriterion("c_sesion_integrante is null");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteIsNotNull() {
            addCriterion("c_sesion_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteEqualTo(Short value) {
            addCriterion("c_sesion_integrante =", value, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteNotEqualTo(Short value) {
            addCriterion("c_sesion_integrante <>", value, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteGreaterThan(Short value) {
            addCriterion("c_sesion_integrante >", value, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteGreaterThanOrEqualTo(Short value) {
            addCriterion("c_sesion_integrante >=", value, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteLessThan(Short value) {
            addCriterion("c_sesion_integrante <", value, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteLessThanOrEqualTo(Short value) {
            addCriterion("c_sesion_integrante <=", value, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteIn(List<Short> values) {
            addCriterion("c_sesion_integrante in", values, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteNotIn(List<Short> values) {
            addCriterion("c_sesion_integrante not in", values, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteBetween(Short value1, Short value2) {
            addCriterion("c_sesion_integrante between", value1, value2, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCSesionIntegranteNotBetween(Short value1, Short value2) {
            addCriterion("c_sesion_integrante not between", value1, value2, "cSesionIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteIsNull() {
            addCriterion("csc_integrante is null");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteIsNotNull() {
            addCriterion("csc_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteEqualTo(Short value) {
            addCriterion("csc_integrante =", value, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteNotEqualTo(Short value) {
            addCriterion("csc_integrante <>", value, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteGreaterThan(Short value) {
            addCriterion("csc_integrante >", value, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteGreaterThanOrEqualTo(Short value) {
            addCriterion("csc_integrante >=", value, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteLessThan(Short value) {
            addCriterion("csc_integrante <", value, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteLessThanOrEqualTo(Short value) {
            addCriterion("csc_integrante <=", value, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteIn(List<Short> values) {
            addCriterion("csc_integrante in", values, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteNotIn(List<Short> values) {
            addCriterion("csc_integrante not in", values, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteBetween(Short value1, Short value2) {
            addCriterion("csc_integrante between", value1, value2, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCscIntegranteNotBetween(Short value1, Short value2) {
            addCriterion("csc_integrante not between", value1, value2, "cscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCCctComiteIsNull() {
            addCriterion("c_cct_comite is null");
            return (Criteria) this;
        }

        public Criteria andCCctComiteIsNotNull() {
            addCriterion("c_cct_comite is not null");
            return (Criteria) this;
        }

        public Criteria andCCctComiteEqualTo(Integer value) {
            addCriterion("c_cct_comite =", value, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteNotEqualTo(Integer value) {
            addCriterion("c_cct_comite <>", value, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteGreaterThan(Integer value) {
            addCriterion("c_cct_comite >", value, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_cct_comite >=", value, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteLessThan(Integer value) {
            addCriterion("c_cct_comite <", value, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteLessThanOrEqualTo(Integer value) {
            addCriterion("c_cct_comite <=", value, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteIn(List<Integer> values) {
            addCriterion("c_cct_comite in", values, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteNotIn(List<Integer> values) {
            addCriterion("c_cct_comite not in", values, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteBetween(Integer value1, Integer value2) {
            addCriterion("c_cct_comite between", value1, value2, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCCctComiteNotBetween(Integer value1, Integer value2) {
            addCriterion("c_cct_comite not between", value1, value2, "cCctComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteIsNull() {
            addCriterion("c_sesion_comite is null");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteIsNotNull() {
            addCriterion("c_sesion_comite is not null");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteEqualTo(Short value) {
            addCriterion("c_sesion_comite =", value, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteNotEqualTo(Short value) {
            addCriterion("c_sesion_comite <>", value, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteGreaterThan(Short value) {
            addCriterion("c_sesion_comite >", value, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteGreaterThanOrEqualTo(Short value) {
            addCriterion("c_sesion_comite >=", value, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteLessThan(Short value) {
            addCriterion("c_sesion_comite <", value, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteLessThanOrEqualTo(Short value) {
            addCriterion("c_sesion_comite <=", value, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteIn(List<Short> values) {
            addCriterion("c_sesion_comite in", values, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteNotIn(List<Short> values) {
            addCriterion("c_sesion_comite not in", values, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteBetween(Short value1, Short value2) {
            addCriterion("c_sesion_comite between", value1, value2, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCSesionComiteNotBetween(Short value1, Short value2) {
            addCriterion("c_sesion_comite not between", value1, value2, "cSesionComite");
            return (Criteria) this;
        }

        public Criteria andCComiteIsNull() {
            addCriterion("c_comite is null");
            return (Criteria) this;
        }

        public Criteria andCComiteIsNotNull() {
            addCriterion("c_comite is not null");
            return (Criteria) this;
        }

        public Criteria andCComiteEqualTo(Integer value) {
            addCriterion("c_comite =", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteNotEqualTo(Integer value) {
            addCriterion("c_comite <>", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteGreaterThan(Integer value) {
            addCriterion("c_comite >", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_comite >=", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteLessThan(Integer value) {
            addCriterion("c_comite <", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteLessThanOrEqualTo(Integer value) {
            addCriterion("c_comite <=", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteIn(List<Integer> values) {
            addCriterion("c_comite in", values, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteNotIn(List<Integer> values) {
            addCriterion("c_comite not in", values, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteBetween(Integer value1, Integer value2) {
            addCriterion("c_comite between", value1, value2, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteNotBetween(Integer value1, Integer value2) {
            addCriterion("c_comite not between", value1, value2, "cComite");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated do_not_delete_during_merge Mon Aug 12 12:10:46 CDT 2013
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_integrante_comite_consejo
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
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