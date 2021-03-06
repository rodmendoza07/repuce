package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CePreguntasMunicipalExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public CePreguntasMunicipalExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
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
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
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

        public Criteria andCctIdIsNull() {
            addCriterion("cct_id is null");
            return (Criteria) this;
        }

        public Criteria andCctIdIsNotNull() {
            addCriterion("cct_id is not null");
            return (Criteria) this;
        }

        public Criteria andCctIdEqualTo(Integer value) {
            addCriterion("cct_id =", value, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdNotEqualTo(Integer value) {
            addCriterion("cct_id <>", value, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdGreaterThan(Integer value) {
            addCriterion("cct_id >", value, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("cct_id >=", value, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdLessThan(Integer value) {
            addCriterion("cct_id <", value, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdLessThanOrEqualTo(Integer value) {
            addCriterion("cct_id <=", value, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdIn(List<Integer> values) {
            addCriterion("cct_id in", values, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdNotIn(List<Integer> values) {
            addCriterion("cct_id not in", values, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdBetween(Integer value1, Integer value2) {
            addCriterion("cct_id between", value1, value2, "cctId");
            return (Criteria) this;
        }

        public Criteria andCctIdNotBetween(Integer value1, Integer value2) {
            addCriterion("cct_id not between", value1, value2, "cctId");
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

        public Criteria andRespuesta1IsNull() {
            addCriterion("respuesta_1 is null");
            return (Criteria) this;
        }

        public Criteria andRespuesta1IsNotNull() {
            addCriterion("respuesta_1 is not null");
            return (Criteria) this;
        }

        public Criteria andRespuesta1EqualTo(Integer value) {
            addCriterion("respuesta_1 =", value, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1NotEqualTo(Integer value) {
            addCriterion("respuesta_1 <>", value, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1GreaterThan(Integer value) {
            addCriterion("respuesta_1 >", value, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1GreaterThanOrEqualTo(Integer value) {
            addCriterion("respuesta_1 >=", value, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1LessThan(Integer value) {
            addCriterion("respuesta_1 <", value, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1LessThanOrEqualTo(Integer value) {
            addCriterion("respuesta_1 <=", value, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1In(List<Integer> values) {
            addCriterion("respuesta_1 in", values, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1NotIn(List<Integer> values) {
            addCriterion("respuesta_1 not in", values, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1Between(Integer value1, Integer value2) {
            addCriterion("respuesta_1 between", value1, value2, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta1NotBetween(Integer value1, Integer value2) {
            addCriterion("respuesta_1 not between", value1, value2, "respuesta1");
            return (Criteria) this;
        }

        public Criteria andRespuesta2IsNull() {
            addCriterion("respuesta_2 is null");
            return (Criteria) this;
        }

        public Criteria andRespuesta2IsNotNull() {
            addCriterion("respuesta_2 is not null");
            return (Criteria) this;
        }

        public Criteria andRespuesta2EqualTo(Integer value) {
            addCriterion("respuesta_2 =", value, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2NotEqualTo(Integer value) {
            addCriterion("respuesta_2 <>", value, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2GreaterThan(Integer value) {
            addCriterion("respuesta_2 >", value, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2GreaterThanOrEqualTo(Integer value) {
            addCriterion("respuesta_2 >=", value, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2LessThan(Integer value) {
            addCriterion("respuesta_2 <", value, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2LessThanOrEqualTo(Integer value) {
            addCriterion("respuesta_2 <=", value, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2In(List<Integer> values) {
            addCriterion("respuesta_2 in", values, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2NotIn(List<Integer> values) {
            addCriterion("respuesta_2 not in", values, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2Between(Integer value1, Integer value2) {
            addCriterion("respuesta_2 between", value1, value2, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta2NotBetween(Integer value1, Integer value2) {
            addCriterion("respuesta_2 not between", value1, value2, "respuesta2");
            return (Criteria) this;
        }

        public Criteria andRespuesta3IsNull() {
            addCriterion("respuesta_3 is null");
            return (Criteria) this;
        }

        public Criteria andRespuesta3IsNotNull() {
            addCriterion("respuesta_3 is not null");
            return (Criteria) this;
        }

        public Criteria andRespuesta3EqualTo(Integer value) {
            addCriterion("respuesta_3 =", value, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3NotEqualTo(Integer value) {
            addCriterion("respuesta_3 <>", value, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3GreaterThan(Integer value) {
            addCriterion("respuesta_3 >", value, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3GreaterThanOrEqualTo(Integer value) {
            addCriterion("respuesta_3 >=", value, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3LessThan(Integer value) {
            addCriterion("respuesta_3 <", value, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3LessThanOrEqualTo(Integer value) {
            addCriterion("respuesta_3 <=", value, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3In(List<Integer> values) {
            addCriterion("respuesta_3 in", values, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3NotIn(List<Integer> values) {
            addCriterion("respuesta_3 not in", values, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3Between(Integer value1, Integer value2) {
            addCriterion("respuesta_3 between", value1, value2, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta3NotBetween(Integer value1, Integer value2) {
            addCriterion("respuesta_3 not between", value1, value2, "respuesta3");
            return (Criteria) this;
        }

        public Criteria andRespuesta4IsNull() {
            addCriterion("respuesta_4 is null");
            return (Criteria) this;
        }

        public Criteria andRespuesta4IsNotNull() {
            addCriterion("respuesta_4 is not null");
            return (Criteria) this;
        }

        public Criteria andRespuesta4EqualTo(Integer value) {
            addCriterion("respuesta_4 =", value, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4NotEqualTo(Integer value) {
            addCriterion("respuesta_4 <>", value, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4GreaterThan(Integer value) {
            addCriterion("respuesta_4 >", value, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4GreaterThanOrEqualTo(Integer value) {
            addCriterion("respuesta_4 >=", value, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4LessThan(Integer value) {
            addCriterion("respuesta_4 <", value, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4LessThanOrEqualTo(Integer value) {
            addCriterion("respuesta_4 <=", value, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4In(List<Integer> values) {
            addCriterion("respuesta_4 in", values, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4NotIn(List<Integer> values) {
            addCriterion("respuesta_4 not in", values, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4Between(Integer value1, Integer value2) {
            addCriterion("respuesta_4 between", value1, value2, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta4NotBetween(Integer value1, Integer value2) {
            addCriterion("respuesta_4 not between", value1, value2, "respuesta4");
            return (Criteria) this;
        }

        public Criteria andRespuesta5IsNull() {
            addCriterion("respuesta_5 is null");
            return (Criteria) this;
        }

        public Criteria andRespuesta5IsNotNull() {
            addCriterion("respuesta_5 is not null");
            return (Criteria) this;
        }

        public Criteria andRespuesta5EqualTo(Integer value) {
            addCriterion("respuesta_5 =", value, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5NotEqualTo(Integer value) {
            addCriterion("respuesta_5 <>", value, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5GreaterThan(Integer value) {
            addCriterion("respuesta_5 >", value, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5GreaterThanOrEqualTo(Integer value) {
            addCriterion("respuesta_5 >=", value, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5LessThan(Integer value) {
            addCriterion("respuesta_5 <", value, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5LessThanOrEqualTo(Integer value) {
            addCriterion("respuesta_5 <=", value, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5In(List<Integer> values) {
            addCriterion("respuesta_5 in", values, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5NotIn(List<Integer> values) {
            addCriterion("respuesta_5 not in", values, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5Between(Integer value1, Integer value2) {
            addCriterion("respuesta_5 between", value1, value2, "respuesta5");
            return (Criteria) this;
        }

        public Criteria andRespuesta5NotBetween(Integer value1, Integer value2) {
            addCriterion("respuesta_5 not between", value1, value2, "respuesta5");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated do_not_delete_during_merge Mon Jun 01 19:03:36 CDT 2015
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_preguntas_municipal
     *
     * @mbggenerated Mon Jun 01 19:03:36 CDT 2015
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