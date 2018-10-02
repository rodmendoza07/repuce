package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CLinkExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public CLinkExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
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
     * This method corresponds to the database table c_link
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
     * This method corresponds to the database table c_link
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_link
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
     * This class corresponds to the database table c_link
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

        public Criteria andIdLinkIsNull() {
            addCriterion("id_link is null");
            return (Criteria) this;
        }

        public Criteria andIdLinkIsNotNull() {
            addCriterion("id_link is not null");
            return (Criteria) this;
        }

        public Criteria andIdLinkEqualTo(Short value) {
            addCriterion("id_link =", value, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkNotEqualTo(Short value) {
            addCriterion("id_link <>", value, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkGreaterThan(Short value) {
            addCriterion("id_link >", value, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkGreaterThanOrEqualTo(Short value) {
            addCriterion("id_link >=", value, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkLessThan(Short value) {
            addCriterion("id_link <", value, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkLessThanOrEqualTo(Short value) {
            addCriterion("id_link <=", value, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkIn(List<Short> values) {
            addCriterion("id_link in", values, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkNotIn(List<Short> values) {
            addCriterion("id_link not in", values, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkBetween(Short value1, Short value2) {
            addCriterion("id_link between", value1, value2, "idLink");
            return (Criteria) this;
        }

        public Criteria andIdLinkNotBetween(Short value1, Short value2) {
            addCriterion("id_link not between", value1, value2, "idLink");
            return (Criteria) this;
        }

        public Criteria andUrlIsNull() {
            addCriterion("url is null");
            return (Criteria) this;
        }

        public Criteria andUrlIsNotNull() {
            addCriterion("url is not null");
            return (Criteria) this;
        }

        public Criteria andUrlEqualTo(String value) {
            addCriterion("url =", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlNotEqualTo(String value) {
            addCriterion("url <>", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlGreaterThan(String value) {
            addCriterion("url >", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlGreaterThanOrEqualTo(String value) {
            addCriterion("url >=", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlLessThan(String value) {
            addCriterion("url <", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlLessThanOrEqualTo(String value) {
            addCriterion("url <=", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlLike(String value) {
            addCriterion("url like", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlNotLike(String value) {
            addCriterion("url not like", value, "url");
            return (Criteria) this;
        }

        public Criteria andUrlIn(List<String> values) {
            addCriterion("url in", values, "url");
            return (Criteria) this;
        }

        public Criteria andUrlNotIn(List<String> values) {
            addCriterion("url not in", values, "url");
            return (Criteria) this;
        }

        public Criteria andUrlBetween(String value1, String value2) {
            addCriterion("url between", value1, value2, "url");
            return (Criteria) this;
        }

        public Criteria andUrlNotBetween(String value1, String value2) {
            addCriterion("url not between", value1, value2, "url");
            return (Criteria) this;
        }

        public Criteria andTextoIsNull() {
            addCriterion("texto is null");
            return (Criteria) this;
        }

        public Criteria andTextoIsNotNull() {
            addCriterion("texto is not null");
            return (Criteria) this;
        }

        public Criteria andTextoEqualTo(String value) {
            addCriterion("texto =", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoNotEqualTo(String value) {
            addCriterion("texto <>", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoGreaterThan(String value) {
            addCriterion("texto >", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoGreaterThanOrEqualTo(String value) {
            addCriterion("texto >=", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoLessThan(String value) {
            addCriterion("texto <", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoLessThanOrEqualTo(String value) {
            addCriterion("texto <=", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoLike(String value) {
            addCriterion("texto like", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoNotLike(String value) {
            addCriterion("texto not like", value, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoIn(List<String> values) {
            addCriterion("texto in", values, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoNotIn(List<String> values) {
            addCriterion("texto not in", values, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoBetween(String value1, String value2) {
            addCriterion("texto between", value1, value2, "texto");
            return (Criteria) this;
        }

        public Criteria andTextoNotBetween(String value1, String value2) {
            addCriterion("texto not between", value1, value2, "texto");
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

        public Criteria andOrdenIsNull() {
            addCriterion("orden is null");
            return (Criteria) this;
        }

        public Criteria andOrdenIsNotNull() {
            addCriterion("orden is not null");
            return (Criteria) this;
        }

        public Criteria andOrdenEqualTo(Short value) {
            addCriterion("orden =", value, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenNotEqualTo(Short value) {
            addCriterion("orden <>", value, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenGreaterThan(Short value) {
            addCriterion("orden >", value, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenGreaterThanOrEqualTo(Short value) {
            addCriterion("orden >=", value, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenLessThan(Short value) {
            addCriterion("orden <", value, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenLessThanOrEqualTo(Short value) {
            addCriterion("orden <=", value, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenIn(List<Short> values) {
            addCriterion("orden in", values, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenNotIn(List<Short> values) {
            addCriterion("orden not in", values, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenBetween(Short value1, Short value2) {
            addCriterion("orden between", value1, value2, "orden");
            return (Criteria) this;
        }

        public Criteria andOrdenNotBetween(Short value1, Short value2) {
            addCriterion("orden not between", value1, value2, "orden");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniIsNull() {
            addCriterion("fch_vigencia_ini is null");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniIsNotNull() {
            addCriterion("fch_vigencia_ini is not null");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_ini =", value, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniNotEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_ini <>", value, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniGreaterThan(Date value) {
            addCriterionForJDBCDate("fch_vigencia_ini >", value, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_ini >=", value, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniLessThan(Date value) {
            addCriterionForJDBCDate("fch_vigencia_ini <", value, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_ini <=", value, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniIn(List<Date> values) {
            addCriterionForJDBCDate("fch_vigencia_ini in", values, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniNotIn(List<Date> values) {
            addCriterionForJDBCDate("fch_vigencia_ini not in", values, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_vigencia_ini between", value1, value2, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaIniNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_vigencia_ini not between", value1, value2, "fchVigenciaIni");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinIsNull() {
            addCriterion("fch_vigencia_fin is null");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinIsNotNull() {
            addCriterion("fch_vigencia_fin is not null");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_fin =", value, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinNotEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_fin <>", value, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinGreaterThan(Date value) {
            addCriterionForJDBCDate("fch_vigencia_fin >", value, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_fin >=", value, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinLessThan(Date value) {
            addCriterionForJDBCDate("fch_vigencia_fin <", value, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_vigencia_fin <=", value, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinIn(List<Date> values) {
            addCriterionForJDBCDate("fch_vigencia_fin in", values, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinNotIn(List<Date> values) {
            addCriterionForJDBCDate("fch_vigencia_fin not in", values, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_vigencia_fin between", value1, value2, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andFchVigenciaFinNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_vigencia_fin not between", value1, value2, "fchVigenciaFin");
            return (Criteria) this;
        }

        public Criteria andActivoIsNull() {
            addCriterion("activo is null");
            return (Criteria) this;
        }

        public Criteria andActivoIsNotNull() {
            addCriterion("activo is not null");
            return (Criteria) this;
        }

        public Criteria andActivoEqualTo(Short value) {
            addCriterion("activo =", value, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoNotEqualTo(Short value) {
            addCriterion("activo <>", value, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoGreaterThan(Short value) {
            addCriterion("activo >", value, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoGreaterThanOrEqualTo(Short value) {
            addCriterion("activo >=", value, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoLessThan(Short value) {
            addCriterion("activo <", value, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoLessThanOrEqualTo(Short value) {
            addCriterion("activo <=", value, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoIn(List<Short> values) {
            addCriterion("activo in", values, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoNotIn(List<Short> values) {
            addCriterion("activo not in", values, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoBetween(Short value1, Short value2) {
            addCriterion("activo between", value1, value2, "activo");
            return (Criteria) this;
        }

        public Criteria andActivoNotBetween(Short value1, Short value2) {
            addCriterion("activo not between", value1, value2, "activo");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_link
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
     * This class corresponds to the database table c_link
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