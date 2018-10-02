package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CComiteExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public CComiteExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
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
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
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

        public Criteria andCComiteIsNull() {
            addCriterion("c_comite is null");
            return (Criteria) this;
        }

        public Criteria andCComiteIsNotNull() {
            addCriterion("c_comite is not null");
            return (Criteria) this;
        }

        public Criteria andCComiteEqualTo(Integer value) {
            addCriterion("c_comite =", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteNotEqualTo(Integer value) {
            addCriterion("c_comite <>", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteGreaterThan(Integer value) {
            addCriterion("c_comite >", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_comite >=", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteLessThan(Integer value) {
            addCriterion("c_comite <", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteLessThanOrEqualTo(Integer value) {
            addCriterion("c_comite <=", value, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteIn(List<Integer> values) {
            addCriterion("c_comite in", values, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteNotIn(List<Integer> values) {
            addCriterion("c_comite not in", values, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteBetween(Integer value1, Integer value2) {
            addCriterion("c_comite between", value1, value2, "cComite");
            return (Criteria) this;
        }

        public Criteria andCComiteNotBetween(Integer value1, Integer value2) {
            addCriterion("c_comite not between", value1, value2, "cComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteIsNull() {
            addCriterion("nom_comite is null");
            return (Criteria) this;
        }

        public Criteria andNomComiteIsNotNull() {
            addCriterion("nom_comite is not null");
            return (Criteria) this;
        }

        public Criteria andNomComiteEqualTo(String value) {
            addCriterion("nom_comite =", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotEqualTo(String value) {
            addCriterion("nom_comite <>", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteGreaterThan(String value) {
            addCriterion("nom_comite >", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteGreaterThanOrEqualTo(String value) {
            addCriterion("nom_comite >=", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteLessThan(String value) {
            addCriterion("nom_comite <", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteLessThanOrEqualTo(String value) {
            addCriterion("nom_comite <=", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteLike(String value) {
            addCriterion("nom_comite like", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotLike(String value) {
            addCriterion("nom_comite not like", value, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteIn(List<String> values) {
            addCriterion("nom_comite in", values, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotIn(List<String> values) {
            addCriterion("nom_comite not in", values, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteBetween(String value1, String value2) {
            addCriterion("nom_comite between", value1, value2, "nomComite");
            return (Criteria) this;
        }

        public Criteria andNomComiteNotBetween(String value1, String value2) {
            addCriterion("nom_comite not between", value1, value2, "nomComite");
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

        public Criteria andFchSistemaIniIsNull() {
            addCriterion("fch_sistema_ini is null");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniIsNotNull() {
            addCriterion("fch_sistema_ini is not null");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_ini =", value, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniNotEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_ini <>", value, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniGreaterThan(Date value) {
            addCriterionForJDBCDate("fch_sistema_ini >", value, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_ini >=", value, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniLessThan(Date value) {
            addCriterionForJDBCDate("fch_sistema_ini <", value, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_ini <=", value, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniIn(List<Date> values) {
            addCriterionForJDBCDate("fch_sistema_ini in", values, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniNotIn(List<Date> values) {
            addCriterionForJDBCDate("fch_sistema_ini not in", values, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_sistema_ini between", value1, value2, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaIniNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_sistema_ini not between", value1, value2, "fchSistemaIni");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinIsNull() {
            addCriterion("fch_sistema_fin is null");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinIsNotNull() {
            addCriterion("fch_sistema_fin is not null");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_fin =", value, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinNotEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_fin <>", value, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinGreaterThan(Date value) {
            addCriterionForJDBCDate("fch_sistema_fin >", value, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_fin >=", value, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinLessThan(Date value) {
            addCriterionForJDBCDate("fch_sistema_fin <", value, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("fch_sistema_fin <=", value, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinIn(List<Date> values) {
            addCriterionForJDBCDate("fch_sistema_fin in", values, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinNotIn(List<Date> values) {
            addCriterionForJDBCDate("fch_sistema_fin not in", values, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_sistema_fin between", value1, value2, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andFchSistemaFinNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("fch_sistema_fin not between", value1, value2, "fchSistemaFin");
            return (Criteria) this;
        }

        public Criteria andDVigenciaIsNull() {
            addCriterion("d_vigencia is null");
            return (Criteria) this;
        }

        public Criteria andDVigenciaIsNotNull() {
            addCriterion("d_vigencia is not null");
            return (Criteria) this;
        }

        public Criteria andDVigenciaEqualTo(String value) {
            addCriterion("d_vigencia =", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaNotEqualTo(String value) {
            addCriterion("d_vigencia <>", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaGreaterThan(String value) {
            addCriterion("d_vigencia >", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaGreaterThanOrEqualTo(String value) {
            addCriterion("d_vigencia >=", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaLessThan(String value) {
            addCriterion("d_vigencia <", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaLessThanOrEqualTo(String value) {
            addCriterion("d_vigencia <=", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaLike(String value) {
            addCriterion("d_vigencia like", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaNotLike(String value) {
            addCriterion("d_vigencia not like", value, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaIn(List<String> values) {
            addCriterion("d_vigencia in", values, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaNotIn(List<String> values) {
            addCriterion("d_vigencia not in", values, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaBetween(String value1, String value2) {
            addCriterion("d_vigencia between", value1, value2, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andDVigenciaNotBetween(String value1, String value2) {
            addCriterion("d_vigencia not between", value1, value2, "dVigencia");
            return (Criteria) this;
        }

        public Criteria andTpoComiteIsNull() {
            addCriterion("tpo_comite is null");
            return (Criteria) this;
        }

        public Criteria andTpoComiteIsNotNull() {
            addCriterion("tpo_comite is not null");
            return (Criteria) this;
        }

        public Criteria andTpoComiteEqualTo(String value) {
            addCriterion("tpo_comite =", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteNotEqualTo(String value) {
            addCriterion("tpo_comite <>", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteGreaterThan(String value) {
            addCriterion("tpo_comite >", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteGreaterThanOrEqualTo(String value) {
            addCriterion("tpo_comite >=", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteLessThan(String value) {
            addCriterion("tpo_comite <", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteLessThanOrEqualTo(String value) {
            addCriterion("tpo_comite <=", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteLike(String value) {
            addCriterion("tpo_comite like", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteNotLike(String value) {
            addCriterion("tpo_comite not like", value, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteIn(List<String> values) {
            addCriterion("tpo_comite in", values, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteNotIn(List<String> values) {
            addCriterion("tpo_comite not in", values, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteBetween(String value1, String value2) {
            addCriterion("tpo_comite between", value1, value2, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andTpoComiteNotBetween(String value1, String value2) {
            addCriterion("tpo_comite not between", value1, value2, "tpoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteIsNull() {
            addCriterion("nom_corto_comite is null");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteIsNotNull() {
            addCriterion("nom_corto_comite is not null");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteEqualTo(String value) {
            addCriterion("nom_corto_comite =", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteNotEqualTo(String value) {
            addCriterion("nom_corto_comite <>", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteGreaterThan(String value) {
            addCriterion("nom_corto_comite >", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteGreaterThanOrEqualTo(String value) {
            addCriterion("nom_corto_comite >=", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteLessThan(String value) {
            addCriterion("nom_corto_comite <", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteLessThanOrEqualTo(String value) {
            addCriterion("nom_corto_comite <=", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteLike(String value) {
            addCriterion("nom_corto_comite like", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteNotLike(String value) {
            addCriterion("nom_corto_comite not like", value, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteIn(List<String> values) {
            addCriterion("nom_corto_comite in", values, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteNotIn(List<String> values) {
            addCriterion("nom_corto_comite not in", values, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteBetween(String value1, String value2) {
            addCriterion("nom_corto_comite between", value1, value2, "nomCortoComite");
            return (Criteria) this;
        }

        public Criteria andNomCortoComiteNotBetween(String value1, String value2) {
            addCriterion("nom_corto_comite not between", value1, value2, "nomCortoComite");
            return (Criteria) this;
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

        public Criteria andObservacionesIsNull() {
            addCriterion("observaciones is null");
            return (Criteria) this;
        }

        public Criteria andObservacionesIsNotNull() {
            addCriterion("observaciones is not null");
            return (Criteria) this;
        }

        public Criteria andObservacionesEqualTo(String value) {
            addCriterion("observaciones =", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesNotEqualTo(String value) {
            addCriterion("observaciones <>", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesGreaterThan(String value) {
            addCriterion("observaciones >", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesGreaterThanOrEqualTo(String value) {
            addCriterion("observaciones >=", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesLessThan(String value) {
            addCriterion("observaciones <", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesLessThanOrEqualTo(String value) {
            addCriterion("observaciones <=", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesLike(String value) {
            addCriterion("observaciones like", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesNotLike(String value) {
            addCriterion("observaciones not like", value, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesIn(List<String> values) {
            addCriterion("observaciones in", values, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesNotIn(List<String> values) {
            addCriterion("observaciones not in", values, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesBetween(String value1, String value2) {
            addCriterion("observaciones between", value1, value2, "observaciones");
            return (Criteria) this;
        }

        public Criteria andObservacionesNotBetween(String value1, String value2) {
            addCriterion("observaciones not between", value1, value2, "observaciones");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_comite
     *
     * @mbggenerated do_not_delete_during_merge Tue Aug 13 16:12:58 CDT 2013
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table c_comite
     *
     * @mbggenerated Tue Aug 13 16:12:58 CDT 2013
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