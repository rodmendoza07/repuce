package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CeComIntegrantesExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public CeComIntegrantesExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
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
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
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

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeIsNull() {
            addCriterion("nom_es_miembro_ce is null");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeIsNotNull() {
            addCriterion("nom_es_miembro_ce is not null");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeEqualTo(String value) {
            addCriterion("nom_es_miembro_ce =", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeNotEqualTo(String value) {
            addCriterion("nom_es_miembro_ce <>", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeGreaterThan(String value) {
            addCriterion("nom_es_miembro_ce >", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeGreaterThanOrEqualTo(String value) {
            addCriterion("nom_es_miembro_ce >=", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeLessThan(String value) {
            addCriterion("nom_es_miembro_ce <", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeLessThanOrEqualTo(String value) {
            addCriterion("nom_es_miembro_ce <=", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeLike(String value) {
            addCriterion("nom_es_miembro_ce like", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeNotLike(String value) {
            addCriterion("nom_es_miembro_ce not like", value, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeIn(List<String> values) {
            addCriterion("nom_es_miembro_ce in", values, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeNotIn(List<String> values) {
            addCriterion("nom_es_miembro_ce not in", values, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeBetween(String value1, String value2) {
            addCriterion("nom_es_miembro_ce between", value1, value2, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomEsMiembroCeNotBetween(String value1, String value2) {
            addCriterion("nom_es_miembro_ce not between", value1, value2, "nomEsMiembroCe");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteIsNull() {
            addCriterion("id_integrante is null");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteIsNotNull() {
            addCriterion("id_integrante is not null");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteEqualTo(Integer value) {
            addCriterion("id_integrante =", value, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteNotEqualTo(Integer value) {
            addCriterion("id_integrante <>", value, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteGreaterThan(Integer value) {
            addCriterion("id_integrante >", value, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteGreaterThanOrEqualTo(Integer value) {
            addCriterion("id_integrante >=", value, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteLessThan(Integer value) {
            addCriterion("id_integrante <", value, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteLessThanOrEqualTo(Integer value) {
            addCriterion("id_integrante <=", value, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteIn(List<Integer> values) {
            addCriterion("id_integrante in", values, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteNotIn(List<Integer> values) {
            addCriterion("id_integrante not in", values, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteBetween(Integer value1, Integer value2) {
            addCriterion("id_integrante between", value1, value2, "idIntegrante");
            return (Criteria) this;
        }

        public Criteria andIdIntegranteNotBetween(Integer value1, Integer value2) {
            addCriterion("id_integrante not between", value1, value2, "idIntegrante");
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

        public Criteria andCCalidadIsNull() {
            addCriterion("c_calidad is null");
            return (Criteria) this;
        }

        public Criteria andCCalidadIsNotNull() {
            addCriterion("c_calidad is not null");
            return (Criteria) this;
        }

        public Criteria andCCalidadEqualTo(String value) {
            addCriterion("c_calidad =", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadNotEqualTo(String value) {
            addCriterion("c_calidad <>", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadGreaterThan(String value) {
            addCriterion("c_calidad >", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadGreaterThanOrEqualTo(String value) {
            addCriterion("c_calidad >=", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadLessThan(String value) {
            addCriterion("c_calidad <", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadLessThanOrEqualTo(String value) {
            addCriterion("c_calidad <=", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadLike(String value) {
            addCriterion("c_calidad like", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadNotLike(String value) {
            addCriterion("c_calidad not like", value, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadIn(List<String> values) {
            addCriterion("c_calidad in", values, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadNotIn(List<String> values) {
            addCriterion("c_calidad not in", values, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadBetween(String value1, String value2) {
            addCriterion("c_calidad between", value1, value2, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andCCalidadNotBetween(String value1, String value2) {
            addCriterion("c_calidad not between", value1, value2, "cCalidad");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeIsNull() {
            addCriterion("es_miembro_ce is null");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeIsNotNull() {
            addCriterion("es_miembro_ce is not null");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeEqualTo(Boolean value) {
            addCriterion("es_miembro_ce =", value, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeNotEqualTo(Boolean value) {
            addCriterion("es_miembro_ce <>", value, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeGreaterThan(Boolean value) {
            addCriterion("es_miembro_ce >", value, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeGreaterThanOrEqualTo(Boolean value) {
            addCriterion("es_miembro_ce >=", value, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeLessThan(Boolean value) {
            addCriterion("es_miembro_ce <", value, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeLessThanOrEqualTo(Boolean value) {
            addCriterion("es_miembro_ce <=", value, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeIn(List<Boolean> values) {
            addCriterion("es_miembro_ce in", values, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeNotIn(List<Boolean> values) {
            addCriterion("es_miembro_ce not in", values, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeBetween(Boolean value1, Boolean value2) {
            addCriterion("es_miembro_ce between", value1, value2, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andEsMiembroCeNotBetween(Boolean value1, Boolean value2) {
            addCriterion("es_miembro_ce not between", value1, value2, "esMiembroCe");
            return (Criteria) this;
        }

        public Criteria andNomComitesIsNull() {
            addCriterion("nom_comites is null");
            return (Criteria) this;
        }

        public Criteria andNomComitesIsNotNull() {
            addCriterion("nom_comites is not null");
            return (Criteria) this;
        }

        public Criteria andNomComitesEqualTo(String value) {
            addCriterion("nom_comites =", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesNotEqualTo(String value) {
            addCriterion("nom_comites <>", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesGreaterThan(String value) {
            addCriterion("nom_comites >", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesGreaterThanOrEqualTo(String value) {
            addCriterion("nom_comites >=", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesLessThan(String value) {
            addCriterion("nom_comites <", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesLessThanOrEqualTo(String value) {
            addCriterion("nom_comites <=", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesLike(String value) {
            addCriterion("nom_comites like", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesNotLike(String value) {
            addCriterion("nom_comites not like", value, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesIn(List<String> values) {
            addCriterion("nom_comites in", values, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesNotIn(List<String> values) {
            addCriterion("nom_comites not in", values, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesBetween(String value1, String value2) {
            addCriterion("nom_comites between", value1, value2, "nomComites");
            return (Criteria) this;
        }

        public Criteria andNomComitesNotBetween(String value1, String value2) {
            addCriterion("nom_comites not between", value1, value2, "nomComites");
            return (Criteria) this;
        }

        public Criteria andIdComiteIsNull() {
            addCriterion("id_comite is null");
            return (Criteria) this;
        }

        public Criteria andIdComiteIsNotNull() {
            addCriterion("id_comite is not null");
            return (Criteria) this;
        }

        public Criteria andIdComiteEqualTo(Integer value) {
            addCriterion("id_comite =", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteNotEqualTo(Integer value) {
            addCriterion("id_comite <>", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteGreaterThan(Integer value) {
            addCriterion("id_comite >", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteGreaterThanOrEqualTo(Integer value) {
            addCriterion("id_comite >=", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteLessThan(Integer value) {
            addCriterion("id_comite <", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteLessThanOrEqualTo(Integer value) {
            addCriterion("id_comite <=", value, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteIn(List<Integer> values) {
            addCriterion("id_comite in", values, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteNotIn(List<Integer> values) {
            addCriterion("id_comite not in", values, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteBetween(Integer value1, Integer value2) {
            addCriterion("id_comite between", value1, value2, "idComite");
            return (Criteria) this;
        }

        public Criteria andIdComiteNotBetween(Integer value1, Integer value2) {
            addCriterion("id_comite not between", value1, value2, "idComite");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated do_not_delete_during_merge Mon Jan 30 17:52:49 CST 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_com_integrantes
     *
     * @mbggenerated Mon Jan 30 17:52:49 CST 2017
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