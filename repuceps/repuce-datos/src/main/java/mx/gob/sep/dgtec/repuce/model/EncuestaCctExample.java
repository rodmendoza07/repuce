package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class EncuestaCctExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public EncuestaCctExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
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
     * This method corresponds to the database table encuesta_cct
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
     * This method corresponds to the database table encuesta_cct
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table encuesta_cct
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
     * This class corresponds to the database table encuesta_cct
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

        public Criteria andMotivoIsNull() {
            addCriterion("motivo is null");
            return (Criteria) this;
        }

        public Criteria andMotivoIsNotNull() {
            addCriterion("motivo is not null");
            return (Criteria) this;
        }

        public Criteria andMotivoEqualTo(Short value) {
            addCriterion("motivo =", value, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoNotEqualTo(Short value) {
            addCriterion("motivo <>", value, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoGreaterThan(Short value) {
            addCriterion("motivo >", value, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoGreaterThanOrEqualTo(Short value) {
            addCriterion("motivo >=", value, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoLessThan(Short value) {
            addCriterion("motivo <", value, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoLessThanOrEqualTo(Short value) {
            addCriterion("motivo <=", value, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoIn(List<Short> values) {
            addCriterion("motivo in", values, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoNotIn(List<Short> values) {
            addCriterion("motivo not in", values, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoBetween(Short value1, Short value2) {
            addCriterion("motivo between", value1, value2, "motivo");
            return (Criteria) this;
        }

        public Criteria andMotivoNotBetween(Short value1, Short value2) {
            addCriterion("motivo not between", value1, value2, "motivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoIsNull() {
            addCriterion("otro_motivo is null");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoIsNotNull() {
            addCriterion("otro_motivo is not null");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoEqualTo(String value) {
            addCriterion("otro_motivo =", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoNotEqualTo(String value) {
            addCriterion("otro_motivo <>", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoGreaterThan(String value) {
            addCriterion("otro_motivo >", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoGreaterThanOrEqualTo(String value) {
            addCriterion("otro_motivo >=", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoLessThan(String value) {
            addCriterion("otro_motivo <", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoLessThanOrEqualTo(String value) {
            addCriterion("otro_motivo <=", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoLike(String value) {
            addCriterion("otro_motivo like", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoNotLike(String value) {
            addCriterion("otro_motivo not like", value, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoIn(List<String> values) {
            addCriterion("otro_motivo in", values, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoNotIn(List<String> values) {
            addCriterion("otro_motivo not in", values, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoBetween(String value1, String value2) {
            addCriterion("otro_motivo between", value1, value2, "otroMotivo");
            return (Criteria) this;
        }

        public Criteria andOtroMotivoNotBetween(String value1, String value2) {
            addCriterion("otro_motivo not between", value1, value2, "otroMotivo");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table encuesta_cct
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
     * This class corresponds to the database table encuesta_cct
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