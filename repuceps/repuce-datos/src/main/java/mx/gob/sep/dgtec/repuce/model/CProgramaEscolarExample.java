package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CProgramaEscolarExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public CProgramaEscolarExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
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
     * This method corresponds to the database table c_programa_escolar
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
     * This method corresponds to the database table c_programa_escolar
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_programa_escolar
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
     * This class corresponds to the database table c_programa_escolar
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

        public Criteria andModalidadIsNull() {
            addCriterion("modalidad is null");
            return (Criteria) this;
        }

        public Criteria andModalidadIsNotNull() {
            addCriterion("modalidad is not null");
            return (Criteria) this;
        }

        public Criteria andModalidadEqualTo(Short value) {
            addCriterion("modalidad =", value, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadNotEqualTo(Short value) {
            addCriterion("modalidad <>", value, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadGreaterThan(Short value) {
            addCriterion("modalidad >", value, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadGreaterThanOrEqualTo(Short value) {
            addCriterion("modalidad >=", value, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadLessThan(Short value) {
            addCriterion("modalidad <", value, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadLessThanOrEqualTo(Short value) {
            addCriterion("modalidad <=", value, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadIn(List<Short> values) {
            addCriterion("modalidad in", values, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadNotIn(List<Short> values) {
            addCriterion("modalidad not in", values, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadBetween(Short value1, Short value2) {
            addCriterion("modalidad between", value1, value2, "modalidad");
            return (Criteria) this;
        }

        public Criteria andModalidadNotBetween(Short value1, Short value2) {
            addCriterion("modalidad not between", value1, value2, "modalidad");
            return (Criteria) this;
        }

        public Criteria andDescripcionIsNull() {
            addCriterion("descripcion is null");
            return (Criteria) this;
        }

        public Criteria andDescripcionIsNotNull() {
            addCriterion("descripcion is not null");
            return (Criteria) this;
        }

        public Criteria andDescripcionEqualTo(String value) {
            addCriterion("descripcion =", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionNotEqualTo(String value) {
            addCriterion("descripcion <>", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionGreaterThan(String value) {
            addCriterion("descripcion >", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionGreaterThanOrEqualTo(String value) {
            addCriterion("descripcion >=", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionLessThan(String value) {
            addCriterion("descripcion <", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionLessThanOrEqualTo(String value) {
            addCriterion("descripcion <=", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionLike(String value) {
            addCriterion("descripcion like", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionNotLike(String value) {
            addCriterion("descripcion not like", value, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionIn(List<String> values) {
            addCriterion("descripcion in", values, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionNotIn(List<String> values) {
            addCriterion("descripcion not in", values, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionBetween(String value1, String value2) {
            addCriterion("descripcion between", value1, value2, "descripcion");
            return (Criteria) this;
        }

        public Criteria andDescripcionNotBetween(String value1, String value2) {
            addCriterion("descripcion not between", value1, value2, "descripcion");
            return (Criteria) this;
        }

        public Criteria andCveModalidadIsNull() {
            addCriterion("cve_modalidad is null");
            return (Criteria) this;
        }

        public Criteria andCveModalidadIsNotNull() {
            addCriterion("cve_modalidad is not null");
            return (Criteria) this;
        }

        public Criteria andCveModalidadEqualTo(String value) {
            addCriterion("cve_modalidad =", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadNotEqualTo(String value) {
            addCriterion("cve_modalidad <>", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadGreaterThan(String value) {
            addCriterion("cve_modalidad >", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadGreaterThanOrEqualTo(String value) {
            addCriterion("cve_modalidad >=", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadLessThan(String value) {
            addCriterion("cve_modalidad <", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadLessThanOrEqualTo(String value) {
            addCriterion("cve_modalidad <=", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadLike(String value) {
            addCriterion("cve_modalidad like", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadNotLike(String value) {
            addCriterion("cve_modalidad not like", value, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadIn(List<String> values) {
            addCriterion("cve_modalidad in", values, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadNotIn(List<String> values) {
            addCriterion("cve_modalidad not in", values, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadBetween(String value1, String value2) {
            addCriterion("cve_modalidad between", value1, value2, "cveModalidad");
            return (Criteria) this;
        }

        public Criteria andCveModalidadNotBetween(String value1, String value2) {
            addCriterion("cve_modalidad not between", value1, value2, "cveModalidad");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_programa_escolar
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
     * This class corresponds to the database table c_programa_escolar
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