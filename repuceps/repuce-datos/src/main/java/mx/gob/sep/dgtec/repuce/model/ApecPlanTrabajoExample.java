package mx.gob.sep.dgtec.repuce.model;

import java.util.ArrayList;
import java.util.List;

public class ApecPlanTrabajoExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public ApecPlanTrabajoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
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
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
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

        public Criteria andCAccionIsNull() {
            addCriterion("c_accion is null");
            return (Criteria) this;
        }

        public Criteria andCAccionIsNotNull() {
            addCriterion("c_accion is not null");
            return (Criteria) this;
        }

        public Criteria andCAccionEqualTo(Integer value) {
            addCriterion("c_accion =", value, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionNotEqualTo(Integer value) {
            addCriterion("c_accion <>", value, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionGreaterThan(Integer value) {
            addCriterion("c_accion >", value, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionGreaterThanOrEqualTo(Integer value) {
            addCriterion("c_accion >=", value, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionLessThan(Integer value) {
            addCriterion("c_accion <", value, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionLessThanOrEqualTo(Integer value) {
            addCriterion("c_accion <=", value, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionIn(List<Integer> values) {
            addCriterion("c_accion in", values, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionNotIn(List<Integer> values) {
            addCriterion("c_accion not in", values, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionBetween(Integer value1, Integer value2) {
            addCriterion("c_accion between", value1, value2, "cAccion");
            return (Criteria) this;
        }

        public Criteria andCAccionNotBetween(Integer value1, Integer value2) {
            addCriterion("c_accion not between", value1, value2, "cAccion");
            return (Criteria) this;
        }

        public Criteria andNomOtraIsNull() {
            addCriterion("nom_otra is null");
            return (Criteria) this;
        }

        public Criteria andNomOtraIsNotNull() {
            addCriterion("nom_otra is not null");
            return (Criteria) this;
        }

        public Criteria andNomOtraEqualTo(String value) {
            addCriterion("nom_otra =", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraNotEqualTo(String value) {
            addCriterion("nom_otra <>", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraGreaterThan(String value) {
            addCriterion("nom_otra >", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraGreaterThanOrEqualTo(String value) {
            addCriterion("nom_otra >=", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraLessThan(String value) {
            addCriterion("nom_otra <", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraLessThanOrEqualTo(String value) {
            addCriterion("nom_otra <=", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraLike(String value) {
            addCriterion("nom_otra like", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraNotLike(String value) {
            addCriterion("nom_otra not like", value, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraIn(List<String> values) {
            addCriterion("nom_otra in", values, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraNotIn(List<String> values) {
            addCriterion("nom_otra not in", values, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraBetween(String value1, String value2) {
            addCriterion("nom_otra between", value1, value2, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNomOtraNotBetween(String value1, String value2) {
            addCriterion("nom_otra not between", value1, value2, "nomOtra");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1IsNull() {
            addCriterion("num_vecesr1 is null");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1IsNotNull() {
            addCriterion("num_vecesr1 is not null");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1EqualTo(String value) {
            addCriterion("num_vecesr1 =", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1NotEqualTo(String value) {
            addCriterion("num_vecesr1 <>", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1GreaterThan(String value) {
            addCriterion("num_vecesr1 >", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1GreaterThanOrEqualTo(String value) {
            addCriterion("num_vecesr1 >=", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1LessThan(String value) {
            addCriterion("num_vecesr1 <", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1LessThanOrEqualTo(String value) {
            addCriterion("num_vecesr1 <=", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1Like(String value) {
            addCriterion("num_vecesr1 like", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1NotLike(String value) {
            addCriterion("num_vecesr1 not like", value, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1In(List<String> values) {
            addCriterion("num_vecesr1 in", values, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1NotIn(List<String> values) {
            addCriterion("num_vecesr1 not in", values, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1Between(String value1, String value2) {
            addCriterion("num_vecesr1 between", value1, value2, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr1NotBetween(String value1, String value2) {
            addCriterion("num_vecesr1 not between", value1, value2, "numVecesr1");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2IsNull() {
            addCriterion("num_vecesr2 is null");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2IsNotNull() {
            addCriterion("num_vecesr2 is not null");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2EqualTo(String value) {
            addCriterion("num_vecesr2 =", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2NotEqualTo(String value) {
            addCriterion("num_vecesr2 <>", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2GreaterThan(String value) {
            addCriterion("num_vecesr2 >", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2GreaterThanOrEqualTo(String value) {
            addCriterion("num_vecesr2 >=", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2LessThan(String value) {
            addCriterion("num_vecesr2 <", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2LessThanOrEqualTo(String value) {
            addCriterion("num_vecesr2 <=", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2Like(String value) {
            addCriterion("num_vecesr2 like", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2NotLike(String value) {
            addCriterion("num_vecesr2 not like", value, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2In(List<String> values) {
            addCriterion("num_vecesr2 in", values, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2NotIn(List<String> values) {
            addCriterion("num_vecesr2 not in", values, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2Between(String value1, String value2) {
            addCriterion("num_vecesr2 between", value1, value2, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr2NotBetween(String value1, String value2) {
            addCriterion("num_vecesr2 not between", value1, value2, "numVecesr2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2IsNull() {
            addCriterion("c_respuestar2 is null");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2IsNotNull() {
            addCriterion("c_respuestar2 is not null");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2EqualTo(Integer value) {
            addCriterion("c_respuestar2 =", value, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2NotEqualTo(Integer value) {
            addCriterion("c_respuestar2 <>", value, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2GreaterThan(Integer value) {
            addCriterion("c_respuestar2 >", value, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2GreaterThanOrEqualTo(Integer value) {
            addCriterion("c_respuestar2 >=", value, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2LessThan(Integer value) {
            addCriterion("c_respuestar2 <", value, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2LessThanOrEqualTo(Integer value) {
            addCriterion("c_respuestar2 <=", value, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2In(List<Integer> values) {
            addCriterion("c_respuestar2 in", values, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2NotIn(List<Integer> values) {
            addCriterion("c_respuestar2 not in", values, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2Between(Integer value1, Integer value2) {
            addCriterion("c_respuestar2 between", value1, value2, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andCRespuestar2NotBetween(Integer value1, Integer value2) {
            addCriterion("c_respuestar2 not between", value1, value2, "cRespuestar2");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3IsNull() {
            addCriterion("num_vecesr3 is null");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3IsNotNull() {
            addCriterion("num_vecesr3 is not null");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3EqualTo(String value) {
            addCriterion("num_vecesr3 =", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3NotEqualTo(String value) {
            addCriterion("num_vecesr3 <>", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3GreaterThan(String value) {
            addCriterion("num_vecesr3 >", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3GreaterThanOrEqualTo(String value) {
            addCriterion("num_vecesr3 >=", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3LessThan(String value) {
            addCriterion("num_vecesr3 <", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3LessThanOrEqualTo(String value) {
            addCriterion("num_vecesr3 <=", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3Like(String value) {
            addCriterion("num_vecesr3 like", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3NotLike(String value) {
            addCriterion("num_vecesr3 not like", value, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3In(List<String> values) {
            addCriterion("num_vecesr3 in", values, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3NotIn(List<String> values) {
            addCriterion("num_vecesr3 not in", values, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3Between(String value1, String value2) {
            addCriterion("num_vecesr3 between", value1, value2, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andNumVecesr3NotBetween(String value1, String value2) {
            addCriterion("num_vecesr3 not between", value1, value2, "numVecesr3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3IsNull() {
            addCriterion("c_respuestar3 is null");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3IsNotNull() {
            addCriterion("c_respuestar3 is not null");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3EqualTo(Integer value) {
            addCriterion("c_respuestar3 =", value, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3NotEqualTo(Integer value) {
            addCriterion("c_respuestar3 <>", value, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3GreaterThan(Integer value) {
            addCriterion("c_respuestar3 >", value, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3GreaterThanOrEqualTo(Integer value) {
            addCriterion("c_respuestar3 >=", value, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3LessThan(Integer value) {
            addCriterion("c_respuestar3 <", value, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3LessThanOrEqualTo(Integer value) {
            addCriterion("c_respuestar3 <=", value, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3In(List<Integer> values) {
            addCriterion("c_respuestar3 in", values, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3NotIn(List<Integer> values) {
            addCriterion("c_respuestar3 not in", values, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3Between(Integer value1, Integer value2) {
            addCriterion("c_respuestar3 between", value1, value2, "cRespuestar3");
            return (Criteria) this;
        }

        public Criteria andCRespuestar3NotBetween(Integer value1, Integer value2) {
            addCriterion("c_respuestar3 not between", value1, value2, "cRespuestar3");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated do_not_delete_during_merge Tue May 23 13:18:48 CDT 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table apec_plan_trabajo
     *
     * @mbggenerated Tue May 23 13:18:48 CDT 2017
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