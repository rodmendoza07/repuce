package mx.gob.sep.dgtec.repuce.vo;

import java.util.ArrayList;
import java.util.List;

public class SolrQueryVO {

	/**
	 * q
	 */
	private String query;

	/**
	 * facet on/off
	 */
    private Boolean facet;

    /**
     * facet.mincount
     */
    private Integer facetMinCount;
    
    /**
     * fl
     */
    private List<String> fieldList; 
    
    /**
     * wt
     */
    private String writerType;
    
    /**
     * indent on/off
     */
    private Boolean indent;
    
    /**
     * rows
     */
    private Integer rows;
    
    /**
     * fq
     */
    private List<String> facetQuerys;
    
    private String sortedField;
    
    /**
     * facet.field
     */
    private List<String> factetFields;
    /**
     * facet.field
     */
    private List<String> fieldsLabels;



	public SolrQueryVO() {
		super();
		query = "*:*";
		facet = false;
		facetMinCount = 1;
	    fieldList = new ArrayList<String>(); 
	    writerType = "json";
	    indent = false;
	    rows = 10;
	    facetQuerys = new ArrayList<String>();
	    factetFields = new ArrayList<String>();
	    fieldsLabels = new ArrayList<String>();
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public Boolean getFacet() {
		return facet;
	}

	public void setFacet(Boolean facet) {
		this.facet = facet;
	}

	public Integer getFacetMinCount() {
		return facetMinCount;
	}

	public void setFacetMinCount(Integer facetMinCount) {
		this.facetMinCount = facetMinCount;
	}

	public List<String> getFieldList() {
		return fieldList;
	}

	public void setFieldList(List<String> fieldList) {
		this.fieldList = fieldList;
	}

	public String getWriterType() {
		return writerType;
	}

	public void setWriterType(String writerType) {
		this.writerType = writerType;
	}

	public Boolean getIndent() {
		return indent;
	}

	public void setIndent(Boolean indent) {
		this.indent = indent;
	}

	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public List<String> getFacetQuerys() {
		return facetQuerys;
	}

	public void setFacetQuerys(List<String> facetQuerys) {
		this.facetQuerys = facetQuerys;
	}

	public List<String> getFactetFields() {
		return factetFields;
	}

	public void setFactetFields(List<String> factetFields) {
		this.factetFields = factetFields;
	}

	public String getSortedField() {
		return sortedField;
	}

	public void setSortedField(String sortedField) {
		this.sortedField = sortedField;
	} 
	
	public List<String> getFieldsLabels() {
		return fieldsLabels;
	}

	public void setFieldsLabels(List<String> fieldsLabels) {
		this.fieldsLabels = fieldsLabels;
	}    
}