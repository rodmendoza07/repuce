package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CeEscrutadorExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public CeEscrutadorExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
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
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
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

        protected void addCriterionForJDBCDate(String condition, Date value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value.getTime()), property);
        }

        protected void addCriterionForJDBCDate(String condition, List<Date> values, String property) {
            if (values == null || values.size() == 0) {
                throw new RuntimeException("Value list for " + property + " cannot be null or empty");
            }
            List<java.sql.Date> dateList = new ArrayList<java.sql.Date>();
            Iterator<Date> iter = values.iterator();
            while (iter.hasNext()) {
                dateList.add(new java.sql.Date(iter.next().getTime()));
            }
            addCriterion(condition, dateList, property);
        }

        protected void addCriterionForJDBCDate(String condition, Date value1, Date value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value1.getTime()), new java.sql.Date(value2.getTime()), property);
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

        public Criteria andCscEscrutadorIsNull() {
            addCriterion("csc_integrante is null");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorIsNotNull() {
            addCriterion("csc_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorEqualTo(Short value) {
            addCriterion("csc_integrante =", value, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorNotEqualTo(Short value) {
            addCriterion("csc_integrante <>", value, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorGreaterThan(Short value) {
            addCriterion("csc_integrante >", value, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorGreaterThanOrEqualTo(Short value) {
            addCriterion("csc_integrante >=", value, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorLessThan(Short value) {
            addCriterion("csc_integrante <", value, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorLessThanOrEqualTo(Short value) {
            addCriterion("csc_integrante <=", value, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorIn(List<Short> values) {
            addCriterion("csc_integrante in", values, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorNotIn(List<Short> values) {
            addCriterion("csc_integrante not in", values, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorBetween(Short value1, Short value2) {
            addCriterion("csc_integrante between", value1, value2, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andCscEscrutadorNotBetween(Short value1, Short value2) {
            addCriterion("csc_integrante not between", value1, value2, "cscEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorIsNull() {
            addCriterion("paterno_integrante is null");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorIsNotNull() {
            addCriterion("paterno_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorEqualTo(String value) {
            addCriterion("paterno_integrante =", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorNotEqualTo(String value) {
            addCriterion("paterno_integrante <>", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorGreaterThan(String value) {
            addCriterion("paterno_integrante >", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorGreaterThanOrEqualTo(String value) {
            addCriterion("paterno_integrante >=", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorLessThan(String value) {
            addCriterion("paterno_integrante <", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorLessThanOrEqualTo(String value) {
            addCriterion("paterno_integrante <=", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorLike(String value) {
            addCriterion("paterno_integrante like", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorNotLike(String value) {
            addCriterion("paterno_integrante not like", value, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorIn(List<String> values) {
            addCriterion("paterno_integrante in", values, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorNotIn(List<String> values) {
            addCriterion("paterno_integrante not in", values, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorBetween(String value1, String value2) {
            addCriterion("paterno_integrante between", value1, value2, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andPaternoEscrutadorNotBetween(String value1, String value2) {
            addCriterion("paterno_integrante not between", value1, value2, "paternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorIsNull() {
            addCriterion("materno_integrante is null");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorIsNotNull() {
            addCriterion("materno_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorEqualTo(String value) {
            addCriterion("materno_integrante =", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorNotEqualTo(String value) {
            addCriterion("materno_integrante <>", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorGreaterThan(String value) {
            addCriterion("materno_integrante >", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorGreaterThanOrEqualTo(String value) {
            addCriterion("materno_integrante >=", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorLessThan(String value) {
            addCriterion("materno_integrante <", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorLessThanOrEqualTo(String value) {
            addCriterion("materno_integrante <=", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorLike(String value) {
            addCriterion("materno_integrante like", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorNotLike(String value) {
            addCriterion("materno_integrante not like", value, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorIn(List<String> values) {
            addCriterion("materno_integrante in", values, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorNotIn(List<String> values) {
            addCriterion("materno_integrante not in", values, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorBetween(String value1, String value2) {
            addCriterion("materno_integrante between", value1, value2, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andMaternoEscrutadorNotBetween(String value1, String value2) {
            addCriterion("materno_integrante not between", value1, value2, "maternoEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorIsNull() {
            addCriterion("nombre_integrante is null");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorIsNotNull() {
            addCriterion("nombre_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorEqualTo(String value) {
            addCriterion("nombre_integrante =", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorNotEqualTo(String value) {
            addCriterion("nombre_integrante <>", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorGreaterThan(String value) {
            addCriterion("nombre_integrante >", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorGreaterThanOrEqualTo(String value) {
            addCriterion("nombre_integrante >=", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorLessThan(String value) {
            addCriterion("nombre_integrante <", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorLessThanOrEqualTo(String value) {
            addCriterion("nombre_integrante <=", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorLike(String value) {
            addCriterion("nombre_integrante like", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorNotLike(String value) {
            addCriterion("nombre_integrante not like", value, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorIn(List<String> values) {
            addCriterion("nombre_integrante in", values, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorNotIn(List<String> values) {
            addCriterion("nombre_integrante not in", values, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorBetween(String value1, String value2) {
            addCriterion("nombre_integrante between", value1, value2, "nombreEscrutador");
            return (Criteria) this;
        }

        public Criteria andNombreEscrutadorNotBetween(String value1, String value2) {
            addCriterion("nombre_integrante not between", value1, value2, "nombreEscrutador");
            return (Criteria) this;
        }        
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_integrante
     *
     * @mbggenerated do_not_delete_during_merge Thu Mar 06 18:51:34 CST 2014
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_integrante
     *
     * @mbggenerated Thu Mar 06 18:51:34 CST 2014
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