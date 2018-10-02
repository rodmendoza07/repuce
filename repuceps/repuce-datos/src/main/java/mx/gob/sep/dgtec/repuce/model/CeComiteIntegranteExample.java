package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CeComiteIntegranteExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public CeComiteIntegranteExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
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
     * This method corresponds to the database table ce_comite_integrante
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
     * This method corresponds to the database table ce_comite_integrante
     *
     * @mbggenerated Mon Aug 12 12:10:46 CDT 2013
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_comite_integrante
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
     * This class corresponds to the database table ce_comite_integrante
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

        public Criteria andCeIntegranteComiteCCctIsNull() {
            addCriterion("ce_integrante_comite_c_cct is null");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctIsNotNull() {
            addCriterion("ce_integrante_comite_c_cct is not null");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctEqualTo(Integer value) {
            addCriterion("ce_integrante_comite_c_cct =", value, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctNotEqualTo(Integer value) {
            addCriterion("ce_integrante_comite_c_cct <>", value, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctGreaterThan(Integer value) {
            addCriterion("ce_integrante_comite_c_cct >", value, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctGreaterThanOrEqualTo(Integer value) {
            addCriterion("ce_integrante_comite_c_cct >=", value, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctLessThan(Integer value) {
            addCriterion("ce_integrante_comite_c_cct <", value, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctLessThanOrEqualTo(Integer value) {
            addCriterion("ce_integrante_comite_c_cct <=", value, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctIn(List<Integer> values) {
            addCriterion("ce_integrante_comite_c_cct in", values, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctNotIn(List<Integer> values) {
            addCriterion("ce_integrante_comite_c_cct not in", values, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctBetween(Integer value1, Integer value2) {
            addCriterion("ce_integrante_comite_c_cct between", value1, value2, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCCctNotBetween(Integer value1, Integer value2) {
            addCriterion("ce_integrante_comite_c_cct not between", value1, value2, "ceIntegranteComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionIsNull() {
            addCriterion("ce_integrante_comite_c_sesion is null");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionIsNotNull() {
            addCriterion("ce_integrante_comite_c_sesion is not null");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionEqualTo(Short value) {
            addCriterion("ce_integrante_comite_c_sesion =", value, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionNotEqualTo(Short value) {
            addCriterion("ce_integrante_comite_c_sesion <>", value, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionGreaterThan(Short value) {
            addCriterion("ce_integrante_comite_c_sesion >", value, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionGreaterThanOrEqualTo(Short value) {
            addCriterion("ce_integrante_comite_c_sesion >=", value, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionLessThan(Short value) {
            addCriterion("ce_integrante_comite_c_sesion <", value, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionLessThanOrEqualTo(Short value) {
            addCriterion("ce_integrante_comite_c_sesion <=", value, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionIn(List<Short> values) {
            addCriterion("ce_integrante_comite_c_sesion in", values, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionNotIn(List<Short> values) {
            addCriterion("ce_integrante_comite_c_sesion not in", values, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionBetween(Short value1, Short value2) {
            addCriterion("ce_integrante_comite_c_sesion between", value1, value2, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCSesionNotBetween(Short value1, Short value2) {
            addCriterion("ce_integrante_comite_c_sesion not between", value1, value2, "ceIntegranteComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteIsNull() {
            addCriterion("ce_integrante_comite_csc_integrante is null");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteIsNotNull() {
            addCriterion("ce_integrante_comite_csc_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteEqualTo(Short value) {
            addCriterion("ce_integrante_comite_csc_integrante =", value, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteNotEqualTo(Short value) {
            addCriterion("ce_integrante_comite_csc_integrante <>", value, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteGreaterThan(Short value) {
            addCriterion("ce_integrante_comite_csc_integrante >", value, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteGreaterThanOrEqualTo(Short value) {
            addCriterion("ce_integrante_comite_csc_integrante >=", value, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteLessThan(Short value) {
            addCriterion("ce_integrante_comite_csc_integrante <", value, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteLessThanOrEqualTo(Short value) {
            addCriterion("ce_integrante_comite_csc_integrante <=", value, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteIn(List<Short> values) {
            addCriterion("ce_integrante_comite_csc_integrante in", values, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteNotIn(List<Short> values) {
            addCriterion("ce_integrante_comite_csc_integrante not in", values, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteBetween(Short value1, Short value2) {
            addCriterion("ce_integrante_comite_csc_integrante between", value1, value2, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeIntegranteComiteCscIntegranteNotBetween(Short value1, Short value2) {
            addCriterion("ce_integrante_comite_csc_integrante not between", value1, value2, "ceIntegranteComiteCscIntegrante");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctIsNull() {
            addCriterion("ce_comite_c_cct is null");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctIsNotNull() {
            addCriterion("ce_comite_c_cct is not null");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctEqualTo(Integer value) {
            addCriterion("ce_comite_c_cct =", value, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctNotEqualTo(Integer value) {
            addCriterion("ce_comite_c_cct <>", value, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctGreaterThan(Integer value) {
            addCriterion("ce_comite_c_cct >", value, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctGreaterThanOrEqualTo(Integer value) {
            addCriterion("ce_comite_c_cct >=", value, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctLessThan(Integer value) {
            addCriterion("ce_comite_c_cct <", value, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctLessThanOrEqualTo(Integer value) {
            addCriterion("ce_comite_c_cct <=", value, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctIn(List<Integer> values) {
            addCriterion("ce_comite_c_cct in", values, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctNotIn(List<Integer> values) {
            addCriterion("ce_comite_c_cct not in", values, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctBetween(Integer value1, Integer value2) {
            addCriterion("ce_comite_c_cct between", value1, value2, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCCctNotBetween(Integer value1, Integer value2) {
            addCriterion("ce_comite_c_cct not between", value1, value2, "ceComiteCCct");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionIsNull() {
            addCriterion("ce_comite_c_sesion is null");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionIsNotNull() {
            addCriterion("ce_comite_c_sesion is not null");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionEqualTo(Short value) {
            addCriterion("ce_comite_c_sesion =", value, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionNotEqualTo(Short value) {
            addCriterion("ce_comite_c_sesion <>", value, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionGreaterThan(Short value) {
            addCriterion("ce_comite_c_sesion >", value, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionGreaterThanOrEqualTo(Short value) {
            addCriterion("ce_comite_c_sesion >=", value, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionLessThan(Short value) {
            addCriterion("ce_comite_c_sesion <", value, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionLessThanOrEqualTo(Short value) {
            addCriterion("ce_comite_c_sesion <=", value, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionIn(List<Short> values) {
            addCriterion("ce_comite_c_sesion in", values, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionNotIn(List<Short> values) {
            addCriterion("ce_comite_c_sesion not in", values, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionBetween(Short value1, Short value2) {
            addCriterion("ce_comite_c_sesion between", value1, value2, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCSesionNotBetween(Short value1, Short value2) {
            addCriterion("ce_comite_c_sesion not between", value1, value2, "ceComiteCSesion");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteIsNull() {
            addCriterion("ce_comite_c_comite is null");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteIsNotNull() {
            addCriterion("ce_comite_c_comite is not null");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteEqualTo(Integer value) {
            addCriterion("ce_comite_c_comite =", value, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteNotEqualTo(Integer value) {
            addCriterion("ce_comite_c_comite <>", value, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteGreaterThan(Integer value) {
            addCriterion("ce_comite_c_comite >", value, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteGreaterThanOrEqualTo(Integer value) {
            addCriterion("ce_comite_c_comite >=", value, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteLessThan(Integer value) {
            addCriterion("ce_comite_c_comite <", value, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteLessThanOrEqualTo(Integer value) {
            addCriterion("ce_comite_c_comite <=", value, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteIn(List<Integer> values) {
            addCriterion("ce_comite_c_comite in", values, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteNotIn(List<Integer> values) {
            addCriterion("ce_comite_c_comite not in", values, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteBetween(Integer value1, Integer value2) {
            addCriterion("ce_comite_c_comite between", value1, value2, "ceComiteCComite");
            return (Criteria) this;
        }

        public Criteria andCeComiteCComiteNotBetween(Integer value1, Integer value2) {
            addCriterion("ce_comite_c_comite not between", value1, value2, "ceComiteCComite");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_comite_integrante
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
     * This class corresponds to the database table ce_comite_integrante
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