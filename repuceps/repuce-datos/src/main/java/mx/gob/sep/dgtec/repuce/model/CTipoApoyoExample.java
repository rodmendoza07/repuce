package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CTipoApoyoExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public CTipoApoyoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
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
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
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

        public Criteria andCTipoApoyoIsNull() {
            addCriterion("c_tipo_apoyo is null");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoIsNotNull() {
            addCriterion("c_tipo_apoyo is not null");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoEqualTo(Short value) {
            addCriterion("c_tipo_apoyo =", value, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoNotEqualTo(Short value) {
            addCriterion("c_tipo_apoyo <>", value, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoGreaterThan(Short value) {
            addCriterion("c_tipo_apoyo >", value, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoGreaterThanOrEqualTo(Short value) {
            addCriterion("c_tipo_apoyo >=", value, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoLessThan(Short value) {
            addCriterion("c_tipo_apoyo <", value, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoLessThanOrEqualTo(Short value) {
            addCriterion("c_tipo_apoyo <=", value, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoIn(List<Short> values) {
            addCriterion("c_tipo_apoyo in", values, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoNotIn(List<Short> values) {
            addCriterion("c_tipo_apoyo not in", values, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoBetween(Short value1, Short value2) {
            addCriterion("c_tipo_apoyo between", value1, value2, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andCTipoApoyoNotBetween(Short value1, Short value2) {
            addCriterion("c_tipo_apoyo not between", value1, value2, "cTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoIsNull() {
            addCriterion("nom_tipo_apoyo is null");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoIsNotNull() {
            addCriterion("nom_tipo_apoyo is not null");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoEqualTo(String value) {
            addCriterion("nom_tipo_apoyo =", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoNotEqualTo(String value) {
            addCriterion("nom_tipo_apoyo <>", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoGreaterThan(String value) {
            addCriterion("nom_tipo_apoyo >", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoGreaterThanOrEqualTo(String value) {
            addCriterion("nom_tipo_apoyo >=", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoLessThan(String value) {
            addCriterion("nom_tipo_apoyo <", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoLessThanOrEqualTo(String value) {
            addCriterion("nom_tipo_apoyo <=", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoLike(String value) {
            addCriterion("nom_tipo_apoyo like", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoNotLike(String value) {
            addCriterion("nom_tipo_apoyo not like", value, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoIn(List<String> values) {
            addCriterion("nom_tipo_apoyo in", values, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoNotIn(List<String> values) {
            addCriterion("nom_tipo_apoyo not in", values, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoBetween(String value1, String value2) {
            addCriterion("nom_tipo_apoyo between", value1, value2, "nomTipoApoyo");
            return (Criteria) this;
        }

        public Criteria andNomTipoApoyoNotBetween(String value1, String value2) {
            addCriterion("nom_tipo_apoyo not between", value1, value2, "nomTipoApoyo");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated do_not_delete_during_merge Mon Oct 14 18:10:59 CDT 2013
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_tipo_apoyo
     *
     * @mbggenerated Mon Oct 14 18:10:59 CDT 2013
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