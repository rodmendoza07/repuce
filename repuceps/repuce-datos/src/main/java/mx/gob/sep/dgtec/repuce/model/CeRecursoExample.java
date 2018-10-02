package mx.gob.sep.dgtec.repuce.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CeRecursoExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public CeRecursoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
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
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
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

        public Criteria andCRecursoIsNull() {
            addCriterion("c_recurso is null");
            return (Criteria) this;
        }

        public Criteria andCRecursoIsNotNull() {
            addCriterion("c_recurso is not null");
            return (Criteria) this;
        }

        public Criteria andCRecursoEqualTo(Short value) {
            addCriterion("c_recurso =", value, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoNotEqualTo(Short value) {
            addCriterion("c_recurso <>", value, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoGreaterThan(Short value) {
            addCriterion("c_recurso >", value, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoGreaterThanOrEqualTo(Short value) {
            addCriterion("c_recurso >=", value, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoLessThan(Short value) {
            addCriterion("c_recurso <", value, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoLessThanOrEqualTo(Short value) {
            addCriterion("c_recurso <=", value, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoIn(List<Short> values) {
            addCriterion("c_recurso in", values, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoNotIn(List<Short> values) {
            addCriterion("c_recurso not in", values, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoBetween(Short value1, Short value2) {
            addCriterion("c_recurso between", value1, value2, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andCRecursoNotBetween(Short value1, Short value2) {
            addCriterion("c_recurso not between", value1, value2, "cRecurso");
            return (Criteria) this;
        }

        public Criteria andMontoIsNull() {
            addCriterion("monto is null");
            return (Criteria) this;
        }

        public Criteria andMontoIsNotNull() {
            addCriterion("monto is not null");
            return (Criteria) this;
        }

        public Criteria andMontoEqualTo(BigDecimal value) {
            addCriterion("monto =", value, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoNotEqualTo(BigDecimal value) {
            addCriterion("monto <>", value, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoGreaterThan(BigDecimal value) {
            addCriterion("monto >", value, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("monto >=", value, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoLessThan(BigDecimal value) {
            addCriterion("monto <", value, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoLessThanOrEqualTo(BigDecimal value) {
            addCriterion("monto <=", value, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoIn(List<BigDecimal> values) {
            addCriterion("monto in", values, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoNotIn(List<BigDecimal> values) {
            addCriterion("monto not in", values, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("monto between", value1, value2, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("monto not between", value1, value2, "monto");
            return (Criteria) this;
        }

        public Criteria andMontoStrIsNull() {
            addCriterion("monto_str is null");
            return (Criteria) this;
        }

        public Criteria andMontoStrIsNotNull() {
            addCriterion("monto_str is not null");
            return (Criteria) this;
        }

        public Criteria andMontoStrEqualTo(String value) {
            addCriterion("monto_str =", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrNotEqualTo(String value) {
            addCriterion("monto_str <>", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrGreaterThan(String value) {
            addCriterion("monto_str >", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrGreaterThanOrEqualTo(String value) {
            addCriterion("monto_str >=", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrLessThan(String value) {
            addCriterion("monto_str <", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrLessThanOrEqualTo(String value) {
            addCriterion("monto_str <=", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrLike(String value) {
            addCriterion("monto_str like", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrNotLike(String value) {
            addCriterion("monto_str not like", value, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrIn(List<String> values) {
            addCriterion("monto_str in", values, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrNotIn(List<String> values) {
            addCriterion("monto_str not in", values, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrBetween(String value1, String value2) {
            addCriterion("monto_str between", value1, value2, "montoStr");
            return (Criteria) this;
        }

        public Criteria andMontoStrNotBetween(String value1, String value2) {
            addCriterion("monto_str not between", value1, value2, "montoStr");
            return (Criteria) this;
        }

        public Criteria andUsoIsNull() {
            addCriterion("uso is null");
            return (Criteria) this;
        }

        public Criteria andUsoIsNotNull() {
            addCriterion("uso is not null");
            return (Criteria) this;
        }

        public Criteria andUsoEqualTo(String value) {
            addCriterion("uso =", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoNotEqualTo(String value) {
            addCriterion("uso <>", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoGreaterThan(String value) {
            addCriterion("uso >", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoGreaterThanOrEqualTo(String value) {
            addCriterion("uso >=", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoLessThan(String value) {
            addCriterion("uso <", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoLessThanOrEqualTo(String value) {
            addCriterion("uso <=", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoLike(String value) {
            addCriterion("uso like", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoNotLike(String value) {
            addCriterion("uso not like", value, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoIn(List<String> values) {
            addCriterion("uso in", values, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoNotIn(List<String> values) {
            addCriterion("uso not in", values, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoBetween(String value1, String value2) {
            addCriterion("uso between", value1, value2, "uso");
            return (Criteria) this;
        }

        public Criteria andUsoNotBetween(String value1, String value2) {
            addCriterion("uso not between", value1, value2, "uso");
            return (Criteria) this;
        }

        public Criteria andEspecieIsNull() {
            addCriterion("especie is null");
            return (Criteria) this;
        }

        public Criteria andEspecieIsNotNull() {
            addCriterion("especie is not null");
            return (Criteria) this;
        }

        public Criteria andEspecieEqualTo(String value) {
            addCriterion("especie =", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieNotEqualTo(String value) {
            addCriterion("especie <>", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieGreaterThan(String value) {
            addCriterion("especie >", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieGreaterThanOrEqualTo(String value) {
            addCriterion("especie >=", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieLessThan(String value) {
            addCriterion("especie <", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieLessThanOrEqualTo(String value) {
            addCriterion("especie <=", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieLike(String value) {
            addCriterion("especie like", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieNotLike(String value) {
            addCriterion("especie not like", value, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieIn(List<String> values) {
            addCriterion("especie in", values, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieNotIn(List<String> values) {
            addCriterion("especie not in", values, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieBetween(String value1, String value2) {
            addCriterion("especie between", value1, value2, "especie");
            return (Criteria) this;
        }

        public Criteria andEspecieNotBetween(String value1, String value2) {
            addCriterion("especie not between", value1, value2, "especie");
            return (Criteria) this;
        }

        public Criteria andIndRecursoIsNull() {
            addCriterion("ind_recurso is null");
            return (Criteria) this;
        }

        public Criteria andIndRecursoIsNotNull() {
            addCriterion("ind_recurso is not null");
            return (Criteria) this;
        }

        public Criteria andIndRecursoEqualTo(String value) {
            addCriterion("ind_recurso =", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoNotEqualTo(String value) {
            addCriterion("ind_recurso <>", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoGreaterThan(String value) {
            addCriterion("ind_recurso >", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoGreaterThanOrEqualTo(String value) {
            addCriterion("ind_recurso >=", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoLessThan(String value) {
            addCriterion("ind_recurso <", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoLessThanOrEqualTo(String value) {
            addCriterion("ind_recurso <=", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoLike(String value) {
            addCriterion("ind_recurso like", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoNotLike(String value) {
            addCriterion("ind_recurso not like", value, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoIn(List<String> values) {
            addCriterion("ind_recurso in", values, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoNotIn(List<String> values) {
            addCriterion("ind_recurso not in", values, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoBetween(String value1, String value2) {
            addCriterion("ind_recurso between", value1, value2, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndRecursoNotBetween(String value1, String value2) {
            addCriterion("ind_recurso not between", value1, value2, "indRecurso");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaIsNull() {
            addCriterion("ind_transparenta is null");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaIsNotNull() {
            addCriterion("ind_transparenta is not null");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaEqualTo(Boolean value) {
            addCriterion("ind_transparenta =", value, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaNotEqualTo(Boolean value) {
            addCriterion("ind_transparenta <>", value, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaGreaterThan(Boolean value) {
            addCriterion("ind_transparenta >", value, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaGreaterThanOrEqualTo(Boolean value) {
            addCriterion("ind_transparenta >=", value, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaLessThan(Boolean value) {
            addCriterion("ind_transparenta <", value, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaLessThanOrEqualTo(Boolean value) {
            addCriterion("ind_transparenta <=", value, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaIn(List<Boolean> values) {
            addCriterion("ind_transparenta in", values, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaNotIn(List<Boolean> values) {
            addCriterion("ind_transparenta not in", values, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaBetween(Boolean value1, Boolean value2) {
            addCriterion("ind_transparenta between", value1, value2, "indTransparenta");
            return (Criteria) this;
        }

        public Criteria andIndTransparentaNotBetween(Boolean value1, Boolean value2) {
            addCriterion("ind_transparenta not between", value1, value2, "indTransparenta");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_recurso
     *
     * @mbggenerated do_not_delete_during_merge Thu Feb 07 13:17:28 CST 2013
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_recurso
     *
     * @mbggenerated Thu Feb 07 13:17:28 CST 2013
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