package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CeIntegranteComiteExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public CeIntegranteComiteExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
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
     * This method corresponds to the database table ce_integrante_comite
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
     * This method corresponds to the database table ce_integrante_comite
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_integrante_comite
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
     * This class corresponds to the database table ce_integrante_comite
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

        public Criteria andPaternoIntegranteIsNull() {
            addCriterion("paterno_integrante is null");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteIsNotNull() {
            addCriterion("paterno_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteEqualTo(String value) {
            addCriterion("paterno_integrante =", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteNotEqualTo(String value) {
            addCriterion("paterno_integrante <>", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteGreaterThan(String value) {
            addCriterion("paterno_integrante >", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteGreaterThanOrEqualTo(String value) {
            addCriterion("paterno_integrante >=", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteLessThan(String value) {
            addCriterion("paterno_integrante <", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteLessThanOrEqualTo(String value) {
            addCriterion("paterno_integrante <=", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteLike(String value) {
            addCriterion("paterno_integrante like", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteNotLike(String value) {
            addCriterion("paterno_integrante not like", value, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteIn(List<String> values) {
            addCriterion("paterno_integrante in", values, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteNotIn(List<String> values) {
            addCriterion("paterno_integrante not in", values, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteBetween(String value1, String value2) {
            addCriterion("paterno_integrante between", value1, value2, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andPaternoIntegranteNotBetween(String value1, String value2) {
            addCriterion("paterno_integrante not between", value1, value2, "paternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteIsNull() {
            addCriterion("materno_integrante is null");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteIsNotNull() {
            addCriterion("materno_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteEqualTo(String value) {
            addCriterion("materno_integrante =", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteNotEqualTo(String value) {
            addCriterion("materno_integrante <>", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteGreaterThan(String value) {
            addCriterion("materno_integrante >", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteGreaterThanOrEqualTo(String value) {
            addCriterion("materno_integrante >=", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteLessThan(String value) {
            addCriterion("materno_integrante <", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteLessThanOrEqualTo(String value) {
            addCriterion("materno_integrante <=", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteLike(String value) {
            addCriterion("materno_integrante like", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteNotLike(String value) {
            addCriterion("materno_integrante not like", value, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteIn(List<String> values) {
            addCriterion("materno_integrante in", values, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteNotIn(List<String> values) {
            addCriterion("materno_integrante not in", values, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteBetween(String value1, String value2) {
            addCriterion("materno_integrante between", value1, value2, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andMaternoIntegranteNotBetween(String value1, String value2) {
            addCriterion("materno_integrante not between", value1, value2, "maternoIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteIsNull() {
            addCriterion("nombre_integrante is null");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteIsNotNull() {
            addCriterion("nombre_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteEqualTo(String value) {
            addCriterion("nombre_integrante =", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteNotEqualTo(String value) {
            addCriterion("nombre_integrante <>", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteGreaterThan(String value) {
            addCriterion("nombre_integrante >", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteGreaterThanOrEqualTo(String value) {
            addCriterion("nombre_integrante >=", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteLessThan(String value) {
            addCriterion("nombre_integrante <", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteLessThanOrEqualTo(String value) {
            addCriterion("nombre_integrante <=", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteLike(String value) {
            addCriterion("nombre_integrante like", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteNotLike(String value) {
            addCriterion("nombre_integrante not like", value, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteIn(List<String> values) {
            addCriterion("nombre_integrante in", values, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteNotIn(List<String> values) {
            addCriterion("nombre_integrante not in", values, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteBetween(String value1, String value2) {
            addCriterion("nombre_integrante between", value1, value2, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andNombreIntegranteNotBetween(String value1, String value2) {
            addCriterion("nombre_integrante not between", value1, value2, "nombreIntegrante");
            return (Criteria) this;
        }

        public Criteria andFchAltaIsNull() {
            addCriterion("fch_alta is null");
            return (Criteria) this;
        }

        public Criteria andFchAltaIsNotNull() {
            addCriterion("fch_alta is not null");
            return (Criteria) this;
        }

        public Criteria andFchAltaEqualTo(Date value) {
            addCriterionForJDBCDate("fch_alta =", value, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaNotEqualTo(Date value) {
            addCriterionForJDBCDate("fch_alta <>", value, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaGreaterThan(Date value) {
            addCriterionForJDBCDate("fch_alta >", value, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_alta >=", value, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaLessThan(Date value) {
            addCriterionForJDBCDate("fch_alta <", value, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_alta <=", value, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaIn(List<Date> values) {
            addCriterionForJDBCDate("fch_alta in", values, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaNotIn(List<Date> values) {
            addCriterionForJDBCDate("fch_alta not in", values, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_alta between", value1, value2, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andFchAltaNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_alta not between", value1, value2, "fchAlta");
            return (Criteria) this;
        }

        public Criteria andGeneroIsNull() {
            addCriterion("genero is null");
            return (Criteria) this;
        }

        public Criteria andGeneroIsNotNull() {
            addCriterion("genero is not null");
            return (Criteria) this;
        }

        public Criteria andGeneroEqualTo(String value) {
            addCriterion("genero =", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroNotEqualTo(String value) {
            addCriterion("genero <>", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroGreaterThan(String value) {
            addCriterion("genero >", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroGreaterThanOrEqualTo(String value) {
            addCriterion("genero >=", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroLessThan(String value) {
            addCriterion("genero <", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroLessThanOrEqualTo(String value) {
            addCriterion("genero <=", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroLike(String value) {
            addCriterion("genero like", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroNotLike(String value) {
            addCriterion("genero not like", value, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroIn(List<String> values) {
            addCriterion("genero in", values, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroNotIn(List<String> values) {
            addCriterion("genero not in", values, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroBetween(String value1, String value2) {
            addCriterion("genero between", value1, value2, "genero");
            return (Criteria) this;
        }

        public Criteria andGeneroNotBetween(String value1, String value2) {
            addCriterion("genero not between", value1, value2, "genero");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_integrante_comite
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
     * This class corresponds to the database table ce_integrante_comite
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