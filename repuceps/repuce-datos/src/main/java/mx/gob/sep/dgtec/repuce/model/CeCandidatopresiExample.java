package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class CeCandidatopresiExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public CeCandidatopresiExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
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
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
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

        public Criteria andIdcandidatoIsNull() {
            addCriterion("idcandidato is null");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoIsNotNull() {
            addCriterion("idcandidato is not null");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoEqualTo(Short value) {
            addCriterion("idcandidato =", value, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoNotEqualTo(Short value) {
            addCriterion("idcandidato <>", value, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoGreaterThan(Short value) {
            addCriterion("idcandidato >", value, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoGreaterThanOrEqualTo(Short value) {
            addCriterion("idcandidato >=", value, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoLessThan(Short value) {
            addCriterion("idcandidato <", value, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoLessThanOrEqualTo(Short value) {
            addCriterion("idcandidato <=", value, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoIn(List<Short> values) {
            addCriterion("idcandidato in", values, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoNotIn(List<Short> values) {
            addCriterion("idcandidato not in", values, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoBetween(Short value1, Short value2) {
            addCriterion("idcandidato between", value1, value2, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdcandidatoNotBetween(Short value1, Short value2) {
            addCriterion("idcandidato not between", value1, value2, "idcandidato");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroIsNull() {
            addCriterion("idconsejero is null");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroIsNotNull() {
            addCriterion("idconsejero is not null");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroEqualTo(Short value) {
            addCriterion("idconsejero =", value, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroNotEqualTo(Short value) {
            addCriterion("idconsejero <>", value, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroGreaterThan(Short value) {
            addCriterion("idconsejero >", value, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroGreaterThanOrEqualTo(Short value) {
            addCriterion("idconsejero >=", value, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroLessThan(Short value) {
            addCriterion("idconsejero <", value, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroLessThanOrEqualTo(Short value) {
            addCriterion("idconsejero <=", value, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroIn(List<Short> values) {
            addCriterion("idconsejero in", values, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroNotIn(List<Short> values) {
            addCriterion("idconsejero not in", values, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroBetween(Short value1, Short value2) {
            addCriterion("idconsejero between", value1, value2, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andIdconsejeroNotBetween(Short value1, Short value2) {
            addCriterion("idconsejero not between", value1, value2, "idconsejero");
            return (Criteria) this;
        }

        public Criteria andVotosIsNull() {
            addCriterion("votos is null");
            return (Criteria) this;
        }

        public Criteria andVotosIsNotNull() {
            addCriterion("votos is not null");
            return (Criteria) this;
        }

        public Criteria andVotosEqualTo(Short value) {
            addCriterion("votos =", value, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosNotEqualTo(Short value) {
            addCriterion("votos <>", value, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosGreaterThan(Short value) {
            addCriterion("votos >", value, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosGreaterThanOrEqualTo(Short value) {
            addCriterion("votos >=", value, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosLessThan(Short value) {
            addCriterion("votos <", value, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosLessThanOrEqualTo(Short value) {
            addCriterion("votos <=", value, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosIn(List<Short> values) {
            addCriterion("votos in", values, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosNotIn(List<Short> values) {
            addCriterion("votos not in", values, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosBetween(Short value1, Short value2) {
            addCriterion("votos between", value1, value2, "votos");
            return (Criteria) this;
        }

        public Criteria andVotosNotBetween(Short value1, Short value2) {
            addCriterion("votos not between", value1, value2, "votos");
            return (Criteria) this;
        }

        public Criteria andAcreditacionIsNull() {
            addCriterion("acreditacion is null");
            return (Criteria) this;
        }

        public Criteria andAcreditacionIsNotNull() {
            addCriterion("acreditacion is not null");
            return (Criteria) this;
        }

        public Criteria andAcreditacionEqualTo(String value) {
            addCriterion("acreditacion =", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionNotEqualTo(String value) {
            addCriterion("acreditacion <>", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionGreaterThan(String value) {
            addCriterion("acreditacion >", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionGreaterThanOrEqualTo(String value) {
            addCriterion("acreditacion >=", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionLessThan(String value) {
            addCriterion("acreditacion <", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionLessThanOrEqualTo(String value) {
            addCriterion("acreditacion <=", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionLike(String value) {
            addCriterion("acreditacion like", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionNotLike(String value) {
            addCriterion("acreditacion not like", value, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionIn(List<String> values) {
            addCriterion("acreditacion in", values, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionNotIn(List<String> values) {
            addCriterion("acreditacion not in", values, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionBetween(String value1, String value2) {
            addCriterion("acreditacion between", value1, value2, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andAcreditacionNotBetween(String value1, String value2) {
            addCriterion("acreditacion not between", value1, value2, "acreditacion");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiIsNull() {
            addCriterion("nombre_hijo_presi is null");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiIsNotNull() {
            addCriterion("nombre_hijo_presi is not null");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiEqualTo(String value) {
            addCriterion("nombre_hijo_presi =", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiNotEqualTo(String value) {
            addCriterion("nombre_hijo_presi <>", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiGreaterThan(String value) {
            addCriterion("nombre_hijo_presi >", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiGreaterThanOrEqualTo(String value) {
            addCriterion("nombre_hijo_presi >=", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiLessThan(String value) {
            addCriterion("nombre_hijo_presi <", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiLessThanOrEqualTo(String value) {
            addCriterion("nombre_hijo_presi <=", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiLike(String value) {
            addCriterion("nombre_hijo_presi like", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiNotLike(String value) {
            addCriterion("nombre_hijo_presi not like", value, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiIn(List<String> values) {
            addCriterion("nombre_hijo_presi in", values, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiNotIn(List<String> values) {
            addCriterion("nombre_hijo_presi not in", values, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiBetween(String value1, String value2) {
            addCriterion("nombre_hijo_presi between", value1, value2, "nombreHijoPresi");
            return (Criteria) this;
        }

        public Criteria andNombreHijoPresiNotBetween(String value1, String value2) {
            addCriterion("nombre_hijo_presi not between", value1, value2, "nombreHijoPresi");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated do_not_delete_during_merge Tue Aug 04 13:44:35 CDT 2015
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table ce_candidatopresi
     *
     * @mbggenerated Tue Aug 04 13:44:35 CDT 2015
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