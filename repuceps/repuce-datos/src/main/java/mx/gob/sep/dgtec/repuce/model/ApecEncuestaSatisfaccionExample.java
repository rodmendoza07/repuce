package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class ApecEncuestaSatisfaccionExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public ApecEncuestaSatisfaccionExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
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
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
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

        public Criteria andCApecIsNull() {
            addCriterion("c_apec is null");
            return (Criteria) this;
        }

        public Criteria andCApecIsNotNull() {
            addCriterion("c_apec is not null");
            return (Criteria) this;
        }

        public Criteria andCApecEqualTo(Integer value) {
            addCriterion("c_apec =", value, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecNotEqualTo(Integer value) {
            addCriterion("c_apec <>", value, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecGreaterThan(Integer value) {
            addCriterion("c_apec >", value, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_apec >=", value, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecLessThan(Integer value) {
            addCriterion("c_apec <", value, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecLessThanOrEqualTo(Integer value) {
            addCriterion("c_apec <=", value, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecIn(List<Integer> values) {
            addCriterion("c_apec in", values, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecNotIn(List<Integer> values) {
            addCriterion("c_apec not in", values, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecBetween(Integer value1, Integer value2) {
            addCriterion("c_apec between", value1, value2, "cApec");
            return (Criteria) this;
        }

        public Criteria andCApecNotBetween(Integer value1, Integer value2) {
            addCriterion("c_apec not between", value1, value2, "cApec");
            return (Criteria) this;
        }

        public Criteria andCReunionIsNull() {
            addCriterion("c_reunion is null");
            return (Criteria) this;
        }

        public Criteria andCReunionIsNotNull() {
            addCriterion("c_reunion is not null");
            return (Criteria) this;
        }

        public Criteria andCReunionEqualTo(Short value) {
            addCriterion("c_reunion =", value, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionNotEqualTo(Short value) {
            addCriterion("c_reunion <>", value, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionGreaterThan(Short value) {
            addCriterion("c_reunion >", value, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionGreaterThanOrEqualTo(Short value) {
            addCriterion("c_reunion >=", value, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionLessThan(Short value) {
            addCriterion("c_reunion <", value, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionLessThanOrEqualTo(Short value) {
            addCriterion("c_reunion <=", value, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionIn(List<Short> values) {
            addCriterion("c_reunion in", values, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionNotIn(List<Short> values) {
            addCriterion("c_reunion not in", values, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionBetween(Short value1, Short value2) {
            addCriterion("c_reunion between", value1, value2, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCReunionNotBetween(Short value1, Short value2) {
            addCriterion("c_reunion not between", value1, value2, "cReunion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionIsNull() {
            addCriterion("c_medicion_satisfaccion is null");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionIsNotNull() {
            addCriterion("c_medicion_satisfaccion is not null");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionEqualTo(Integer value) {
            addCriterion("c_medicion_satisfaccion =", value, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionNotEqualTo(Integer value) {
            addCriterion("c_medicion_satisfaccion <>", value, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionGreaterThan(Integer value) {
            addCriterion("c_medicion_satisfaccion >", value, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_medicion_satisfaccion >=", value, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionLessThan(Integer value) {
            addCriterion("c_medicion_satisfaccion <", value, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionLessThanOrEqualTo(Integer value) {
            addCriterion("c_medicion_satisfaccion <=", value, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionIn(List<Integer> values) {
            addCriterion("c_medicion_satisfaccion in", values, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionNotIn(List<Integer> values) {
            addCriterion("c_medicion_satisfaccion not in", values, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionBetween(Integer value1, Integer value2) {
            addCriterion("c_medicion_satisfaccion between", value1, value2, "cMedicionSatisfaccion");
            return (Criteria) this;
        }

        public Criteria andCMedicionSatisfaccionNotBetween(Integer value1, Integer value2) {
            addCriterion("c_medicion_satisfaccion not between", value1, value2, "cMedicionSatisfaccion");
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
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated do_not_delete_during_merge Tue Oct 15 10:17:54 CDT 2013
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table apec_encuesta_satisfaccion
     *
     * @mbggenerated Tue Oct 15 10:17:54 CDT 2013
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