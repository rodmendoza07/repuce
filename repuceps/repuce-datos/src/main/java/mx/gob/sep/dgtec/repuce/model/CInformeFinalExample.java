package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CInformeFinalExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public CInformeFinalExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
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
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
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

        public Criteria andIdentificadorIsNull() {
            addCriterion("identificador is null");
            return (Criteria) this;
        }

        public Criteria andIdentificadorIsNotNull() {
            addCriterion("identificador is not null");
            return (Criteria) this;
        }

        public Criteria andIdentificadorEqualTo(Integer value) {
            addCriterion("identificador =", value, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorNotEqualTo(Integer value) {
            addCriterion("identificador <>", value, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorGreaterThan(Integer value) {
            addCriterion("identificador >", value, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorGreaterThanOrEqualTo(Integer value) {
            addCriterion("identificador >=", value, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorLessThan(Integer value) {
            addCriterion("identificador <", value, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorLessThanOrEqualTo(Integer value) {
            addCriterion("identificador <=", value, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorIn(List<Integer> values) {
            addCriterion("identificador in", values, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorNotIn(List<Integer> values) {
            addCriterion("identificador not in", values, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorBetween(Integer value1, Integer value2) {
            addCriterion("identificador between", value1, value2, "identificador");
            return (Criteria) this;
        }

        public Criteria andIdentificadorNotBetween(Integer value1, Integer value2) {
            addCriterion("identificador not between", value1, value2, "identificador");
            return (Criteria) this;
        }

        public Criteria andCPreguntaIsNull() {
            addCriterion("c_pregunta is null");
            return (Criteria) this;
        }

        public Criteria andCPreguntaIsNotNull() {
            addCriterion("c_pregunta is not null");
            return (Criteria) this;
        }

        public Criteria andCPreguntaEqualTo(Integer value) {
            addCriterion("c_pregunta =", value, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaNotEqualTo(Integer value) {
            addCriterion("c_pregunta <>", value, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaGreaterThan(Integer value) {
            addCriterion("c_pregunta >", value, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_pregunta >=", value, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaLessThan(Integer value) {
            addCriterion("c_pregunta <", value, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaLessThanOrEqualTo(Integer value) {
            addCriterion("c_pregunta <=", value, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaIn(List<Integer> values) {
            addCriterion("c_pregunta in", values, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaNotIn(List<Integer> values) {
            addCriterion("c_pregunta not in", values, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaBetween(Integer value1, Integer value2) {
            addCriterion("c_pregunta between", value1, value2, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCPreguntaNotBetween(Integer value1, Integer value2) {
            addCriterion("c_pregunta not between", value1, value2, "cPregunta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaIsNull() {
            addCriterion("c_respuesta is null");
            return (Criteria) this;
        }

        public Criteria andCRespuestaIsNotNull() {
            addCriterion("c_respuesta is not null");
            return (Criteria) this;
        }

        public Criteria andCRespuestaEqualTo(Integer value) {
            addCriterion("c_respuesta =", value, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaNotEqualTo(Integer value) {
            addCriterion("c_respuesta <>", value, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaGreaterThan(Integer value) {
            addCriterion("c_respuesta >", value, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_respuesta >=", value, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaLessThan(Integer value) {
            addCriterion("c_respuesta <", value, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaLessThanOrEqualTo(Integer value) {
            addCriterion("c_respuesta <=", value, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaIn(List<Integer> values) {
            addCriterion("c_respuesta in", values, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaNotIn(List<Integer> values) {
            addCriterion("c_respuesta not in", values, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaBetween(Integer value1, Integer value2) {
            addCriterion("c_respuesta between", value1, value2, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andCRespuestaNotBetween(Integer value1, Integer value2) {
            addCriterion("c_respuesta not between", value1, value2, "cRespuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaIsNull() {
            addCriterion("respuesta is null");
            return (Criteria) this;
        }

        public Criteria andRespuestaIsNotNull() {
            addCriterion("respuesta is not null");
            return (Criteria) this;
        }

        public Criteria andRespuestaEqualTo(String value) {
            addCriterion("respuesta =", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaNotEqualTo(String value) {
            addCriterion("respuesta <>", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaGreaterThan(String value) {
            addCriterion("respuesta >", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaGreaterThanOrEqualTo(String value) {
            addCriterion("respuesta >=", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaLessThan(String value) {
            addCriterion("respuesta <", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaLessThanOrEqualTo(String value) {
            addCriterion("respuesta <=", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaLike(String value) {
            addCriterion("respuesta like", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaNotLike(String value) {
            addCriterion("respuesta not like", value, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaIn(List<String> values) {
            addCriterion("respuesta in", values, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaNotIn(List<String> values) {
            addCriterion("respuesta not in", values, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaBetween(String value1, String value2) {
            addCriterion("respuesta between", value1, value2, "respuesta");
            return (Criteria) this;
        }

        public Criteria andRespuestaNotBetween(String value1, String value2) {
            addCriterion("respuesta not between", value1, value2, "respuesta");
            return (Criteria) this;
        }

        public Criteria andOtroIsNull() {
            addCriterion("otro is null");
            return (Criteria) this;
        }

        public Criteria andOtroIsNotNull() {
            addCriterion("otro is not null");
            return (Criteria) this;
        }

        public Criteria andOtroEqualTo(String value) {
            addCriterion("otro =", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroNotEqualTo(String value) {
            addCriterion("otro <>", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroGreaterThan(String value) {
            addCriterion("otro >", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroGreaterThanOrEqualTo(String value) {
            addCriterion("otro >=", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroLessThan(String value) {
            addCriterion("otro <", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroLessThanOrEqualTo(String value) {
            addCriterion("otro <=", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroLike(String value) {
            addCriterion("otro like", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroNotLike(String value) {
            addCriterion("otro not like", value, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroIn(List<String> values) {
            addCriterion("otro in", values, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroNotIn(List<String> values) {
            addCriterion("otro not in", values, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroBetween(String value1, String value2) {
            addCriterion("otro between", value1, value2, "otro");
            return (Criteria) this;
        }

        public Criteria andOtroNotBetween(String value1, String value2) {
            addCriterion("otro not between", value1, value2, "otro");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_informe_final
     *
     * @mbggenerated do_not_delete_during_merge Wed Aug 02 13:28:27 CDT 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_informe_final
     *
     * @mbggenerated Wed Aug 02 13:28:27 CDT 2017
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