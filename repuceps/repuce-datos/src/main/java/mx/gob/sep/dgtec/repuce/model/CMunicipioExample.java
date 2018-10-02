package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CMunicipioExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public CMunicipioExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
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
     * This method corresponds to the database table c_municipio
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
     * This method corresponds to the database table c_municipio
     *
     * @mbggenerated Mon Oct 29 17:47:29 CST 2012
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_municipio
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
     * This class corresponds to the database table c_municipio
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

        public Criteria andIdMunicipioIsNull() {
            addCriterion("id_municipio is null");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioIsNotNull() {
            addCriterion("id_municipio is not null");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioEqualTo(Integer value) {
            addCriterion("id_municipio =", value, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioNotEqualTo(Integer value) {
            addCriterion("id_municipio <>", value, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioGreaterThan(Integer value) {
            addCriterion("id_municipio >", value, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioGreaterThanOrEqualTo(Integer value) {
            addCriterion("id_municipio >=", value, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioLessThan(Integer value) {
            addCriterion("id_municipio <", value, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioLessThanOrEqualTo(Integer value) {
            addCriterion("id_municipio <=", value, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioIn(List<Integer> values) {
            addCriterion("id_municipio in", values, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioNotIn(List<Integer> values) {
            addCriterion("id_municipio not in", values, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioBetween(Integer value1, Integer value2) {
            addCriterion("id_municipio between", value1, value2, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdMunicipioNotBetween(Integer value1, Integer value2) {
            addCriterion("id_municipio not between", value1, value2, "idMunicipio");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedIsNull() {
            addCriterion("id_entidadfed is null");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedIsNotNull() {
            addCriterion("id_entidadfed is not null");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedEqualTo(Short value) {
            addCriterion("id_entidadfed =", value, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedNotEqualTo(Short value) {
            addCriterion("id_entidadfed <>", value, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedGreaterThan(Short value) {
            addCriterion("id_entidadfed >", value, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedGreaterThanOrEqualTo(Short value) {
            addCriterion("id_entidadfed >=", value, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedLessThan(Short value) {
            addCriterion("id_entidadfed <", value, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedLessThanOrEqualTo(Short value) {
            addCriterion("id_entidadfed <=", value, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedIn(List<Short> values) {
            addCriterion("id_entidadfed in", values, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedNotIn(List<Short> values) {
            addCriterion("id_entidadfed not in", values, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedBetween(Short value1, Short value2) {
            addCriterion("id_entidadfed between", value1, value2, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andIdEntidadfedNotBetween(Short value1, Short value2) {
            addCriterion("id_entidadfed not between", value1, value2, "idEntidadfed");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioIsNull() {
            addCriterion("nom_municipio is null");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioIsNotNull() {
            addCriterion("nom_municipio is not null");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioEqualTo(String value) {
            addCriterion("nom_municipio =", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioNotEqualTo(String value) {
            addCriterion("nom_municipio <>", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioGreaterThan(String value) {
            addCriterion("nom_municipio >", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioGreaterThanOrEqualTo(String value) {
            addCriterion("nom_municipio >=", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioLessThan(String value) {
            addCriterion("nom_municipio <", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioLessThanOrEqualTo(String value) {
            addCriterion("nom_municipio <=", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioLike(String value) {
            addCriterion("nom_municipio like", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioNotLike(String value) {
            addCriterion("nom_municipio not like", value, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioIn(List<String> values) {
            addCriterion("nom_municipio in", values, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioNotIn(List<String> values) {
            addCriterion("nom_municipio not in", values, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioBetween(String value1, String value2) {
            addCriterion("nom_municipio between", value1, value2, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andNomMunicipioNotBetween(String value1, String value2) {
            addCriterion("nom_municipio not between", value1, value2, "nomMunicipio");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaIsNull() {
            addCriterion("fch_ini_vigencia is null");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaIsNotNull() {
            addCriterion("fch_ini_vigencia is not null");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaEqualTo(Date value) {
            addCriterionForJDBCDate("fch_ini_vigencia =", value, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaNotEqualTo(Date value) {
            addCriterionForJDBCDate("fch_ini_vigencia <>", value, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaGreaterThan(Date value) {
            addCriterionForJDBCDate("fch_ini_vigencia >", value, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_ini_vigencia >=", value, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaLessThan(Date value) {
            addCriterionForJDBCDate("fch_ini_vigencia <", value, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_ini_vigencia <=", value, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaIn(List<Date> values) {
            addCriterionForJDBCDate("fch_ini_vigencia in", values, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaNotIn(List<Date> values) {
            addCriterionForJDBCDate("fch_ini_vigencia not in", values, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_ini_vigencia between", value1, value2, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andFchIniVigenciaNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_ini_vigencia not between", value1, value2, "fchIniVigencia");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(String value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(String value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(String value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(String value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(String value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(String value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLike(String value) {
            addCriterion("status like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotLike(String value) {
            addCriterion("status not like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<String> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<String> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(String value1, String value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(String value1, String value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioIsNull() {
            addCriterion("id_usuario is null");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioIsNotNull() {
            addCriterion("id_usuario is not null");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioEqualTo(String value) {
            addCriterion("id_usuario =", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioNotEqualTo(String value) {
            addCriterion("id_usuario <>", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioGreaterThan(String value) {
            addCriterion("id_usuario >", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioGreaterThanOrEqualTo(String value) {
            addCriterion("id_usuario >=", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioLessThan(String value) {
            addCriterion("id_usuario <", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioLessThanOrEqualTo(String value) {
            addCriterion("id_usuario <=", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioLike(String value) {
            addCriterion("id_usuario like", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioNotLike(String value) {
            addCriterion("id_usuario not like", value, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioIn(List<String> values) {
            addCriterion("id_usuario in", values, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioNotIn(List<String> values) {
            addCriterion("id_usuario not in", values, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioBetween(String value1, String value2) {
            addCriterion("id_usuario between", value1, value2, "idUsuario");
            return (Criteria) this;
        }

        public Criteria andIdUsuarioNotBetween(String value1, String value2) {
            addCriterion("id_usuario not between", value1, value2, "idUsuario");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_municipio
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
     * This class corresponds to the database table c_municipio
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