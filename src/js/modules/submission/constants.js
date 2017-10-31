"use strict";

export const name = "submission";

export const annotationFormats = {
    COMMENT: "COMMENT",
    GENE_TERM: "GENE_TERM",
    GENE_GENE: "GENE_GENE"
};

export const annotationTypes = {
    MOLECULAR_FUNCTION: "MOLECULAR_FUNCTION",
    BIOLOGICAL_PROCESS: "BIOLOGICAL_PROCESS",
    SUBCELLULAR_LOCATION: "SUBCELLULAR_LOCATION",
    ANATOMICAL_LOCATION: "ANATOMICAL_LOCATION",
    TEMPORAL_EXPRESSION: "TEMPORAL_EXPRESSION",
    PROTEIN_INTERACTION: "PROTEIN_INTERACTION",
    COMMENT: "COMMENT"
};

export const annotationTypeData = {
    [annotationTypes.MOLECULAR_FUNCTION]: {
        name: "Molecular Function (GO Function)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "molecular_function"
    },
    [annotationTypes.BIOLOGICAL_PROCESS]: {
        name: "Biological Process (GO Process)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "biological_process"
    },
    [annotationTypes.SUBCELLULAR_LOCATION]: {
        name: "Subcellular Location (GO Component)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "cellular_component"
    },
    [annotationTypes.ANATOMICAL_LOCATION]: {
        name: "Anatomical Location (PO Anatomy)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "plant_anatomy"
    },
    [annotationTypes.TEMPORAL_EXPRESSION]: {
        name: "Temporal Expression (PO Dev. Stage)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "plant_structure_development_stage"
    },
    [annotationTypes.PROTEIN_INTERACTION]: {
        name: "Protein Interaction",
        format: annotationFormats.GENE_GENE
    },
    [annotationTypes.COMMENT]: {
        name: "Comment",
        format: annotationFormats.COMMENT
    }
};

export const validationStates = {
    NOT_VALIDATED: "NOT_VALIDATED",
    VALIDATING: "VALIDATING",
    VALID: "VALID",
    INVALID: "INVALID",
};
