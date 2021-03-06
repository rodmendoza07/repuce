package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class BitacoraExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public BitacoraExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
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
     * This method corresponds to the database table bitacora
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
     * This method corresponds to the database table bitacora
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table bitacora
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
     * This class corresponds to the database table bitacora
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

        public Criteria andCscBitacoraIsNull() {
            addCriterion("csc_bitacora is null");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraIsNotNull() {
            addCriterion("csc_bitacora is not null");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraEqualTo(Integer value) {
            addCriterion("csc_bitacora =", value, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraNotEqualTo(Integer value) {
            addCriterion("csc_bitacora <>", value, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraGreaterThan(Integer value) {
            addCriterion("csc_bitacora >", value, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraGreaterThanOrEqualTo(Integer value) {
            addCriterion("csc_bitacora >=", value, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraLessThan(Integer value) {
            addCriterion("csc_bitacora <", value, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraLessThanOrEqualTo(Integer value) {
            addCriterion("csc_bitacora <=", value, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraIn(List<Integer> values) {
            addCriterion("csc_bitacora in", values, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraNotIn(List<Integer> values) {
            addCriterion("csc_bitacora not in", values, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraBetween(Integer value1, Integer value2) {
            addCriterion("csc_bitacora between", value1, value2, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andCscBitacoraNotBetween(Integer value1, Integer value2) {
            addCriterion("csc_bitacora not between", value1, value2, "cscBitacora");
            return (Criteria) this;
        }

        public Criteria andNomTablaIsNull() {
            addCriterion("nom_tabla is null");
            return (Criteria) this;
        }

        public Criteria andNomTablaIsNotNull() {
            addCriterion("nom_tabla is not null");
            return (Criteria) this;
        }

        public Criteria andNomTablaEqualTo(String value) {
            addCriterion("nom_tabla =", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaNotEqualTo(String value) {
            addCriterion("nom_tabla <>", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaGreaterThan(String value) {
            addCriterion("nom_tabla >", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaGreaterThanOrEqualTo(String value) {
            addCriterion("nom_tabla >=", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaLessThan(String value) {
            addCriterion("nom_tabla <", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaLessThanOrEqualTo(String value) {
            addCriterion("nom_tabla <=", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaLike(String value) {
            addCriterion("nom_tabla like", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaNotLike(String value) {
            addCriterion("nom_tabla not like", value, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaIn(List<String> values) {
            addCriterion("nom_tabla in", values, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaNotIn(List<String> values) {
            addCriterion("nom_tabla not in", values, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaBetween(String value1, String value2) {
            addCriterion("nom_tabla between", value1, value2, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andNomTablaNotBetween(String value1, String value2) {
            addCriterion("nom_tabla not between", value1, value2, "nomTabla");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroIsNull() {
            addCriterion("fch_hr_registro is null");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroIsNotNull() {
            addCriterion("fch_hr_registro is not null");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroEqualTo(Date value) {
            addCriterionForJDBCDate("fch_hr_registro =", value, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroNotEqualTo(Date value) {
            addCriterionForJDBCDate("fch_hr_registro <>", value, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroGreaterThan(Date value) {
            addCriterionForJDBCDate("fch_hr_registro >", value, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_hr_registro >=", value, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroLessThan(Date value) {
            addCriterionForJDBCDate("fch_hr_registro <", value, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_hr_registro <=", value, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroIn(List<Date> values) {
            addCriterionForJDBCDate("fch_hr_registro in", values, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroNotIn(List<Date> values) {
            addCriterionForJDBCDate("fch_hr_registro not in", values, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_hr_registro between", value1, value2, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andFchHrRegistroNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_hr_registro not between", value1, value2, "fchHrRegistro");
            return (Criteria) this;
        }

        public Criteria andUsuarioIsNull() {
            addCriterion("usuario is null");
            return (Criteria) this;
        }

        public Criteria andUsuarioIsNotNull() {
            addCriterion("usuario is not null");
            return (Criteria) this;
        }

        public Criteria andUsuarioEqualTo(String value) {
            addCriterion("usuario =", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioNotEqualTo(String value) {
            addCriterion("usuario <>", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioGreaterThan(String value) {
            addCriterion("usuario >", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioGreaterThanOrEqualTo(String value) {
            addCriterion("usuario >=", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioLessThan(String value) {
            addCriterion("usuario <", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioLessThanOrEqualTo(String value) {
            addCriterion("usuario <=", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioLike(String value) {
            addCriterion("usuario like", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioNotLike(String value) {
            addCriterion("usuario not like", value, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioIn(List<String> values) {
            addCriterion("usuario in", values, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioNotIn(List<String> values) {
            addCriterion("usuario not in", values, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioBetween(String value1, String value2) {
            addCriterion("usuario between", value1, value2, "usuario");
            return (Criteria) this;
        }

        public Criteria andUsuarioNotBetween(String value1, String value2) {
            addCriterion("usuario not between", value1, value2, "usuario");
            return (Criteria) this;
        }

        public Criteria andEventoIsNull() {
            addCriterion("evento is null");
            return (Criteria) this;
        }

        public Criteria andEventoIsNotNull() {
            addCriterion("evento is not null");
            return (Criteria) this;
        }

        public Criteria andEventoEqualTo(String value) {
            addCriterion("evento =", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoNotEqualTo(String value) {
            addCriterion("evento <>", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoGreaterThan(String value) {
            addCriterion("evento >", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoGreaterThanOrEqualTo(String value) {
            addCriterion("evento >=", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoLessThan(String value) {
            addCriterion("evento <", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoLessThanOrEqualTo(String value) {
            addCriterion("evento <=", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoLike(String value) {
            addCriterion("evento like", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoNotLike(String value) {
            addCriterion("evento not like", value, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoIn(List<String> values) {
            addCriterion("evento in", values, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoNotIn(List<String> values) {
            addCriterion("evento not in", values, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoBetween(String value1, String value2) {
            addCriterion("evento between", value1, value2, "evento");
            return (Criteria) this;
        }

        public Criteria andEventoNotBetween(String value1, String value2) {
            addCriterion("evento not between", value1, value2, "evento");
            return (Criteria) this;
        }

        public Criteria andServidorIsNull() {
            addCriterion("servidor is null");
            return (Criteria) this;
        }

        public Criteria andServidorIsNotNull() {
            addCriterion("servidor is not null");
            return (Criteria) this;
        }

        public Criteria andServidorEqualTo(String value) {
            addCriterion("servidor =", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorNotEqualTo(String value) {
            addCriterion("servidor <>", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorGreaterThan(String value) {
            addCriterion("servidor >", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorGreaterThanOrEqualTo(String value) {
            addCriterion("servidor >=", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorLessThan(String value) {
            addCriterion("servidor <", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorLessThanOrEqualTo(String value) {
            addCriterion("servidor <=", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorLike(String value) {
            addCriterion("servidor like", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorNotLike(String value) {
            addCriterion("servidor not like", value, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorIn(List<String> values) {
            addCriterion("servidor in", values, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorNotIn(List<String> values) {
            addCriterion("servidor not in", values, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorBetween(String value1, String value2) {
            addCriterion("servidor between", value1, value2, "servidor");
            return (Criteria) this;
        }

        public Criteria andServidorNotBetween(String value1, String value2) {
            addCriterion("servidor not between", value1, value2, "servidor");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table bitacora
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
     * This class corresponds to the database table bitacora
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