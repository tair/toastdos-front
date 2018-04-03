"use strict";

export const name = "annotation";

export const annotationFormats = {
    COMMENT: "COMMENT",
    GENE_TERM: "GENE_TERM",
    GENE_GENE: "GENE_GENE"
};

export const annotationStatusFormats = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected"
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
        keywordScope: "molecular_function",
        descriptor: "functions in"
    },
    [annotationTypes.BIOLOGICAL_PROCESS]: {
        name: "Biological Process (GO Process)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "biological_process",
        descriptor: "involved in (biological process)"
    },
    [annotationTypes.SUBCELLULAR_LOCATION]: {
        name: "Subcellular Location (GO Component)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "cellular_component",
        descriptor: "located in"
    },
    [annotationTypes.ANATOMICAL_LOCATION]: {
        name: "Anatomical Location (PO Anatomy)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "plant_anatomy",
        descriptor: "anatomically located in"
    },
    [annotationTypes.TEMPORAL_EXPRESSION]: {
        name: "Temporal Expression (PO Dev. Stage)",
        format: annotationFormats.GENE_TERM,
        keywordScope: "plant_structure_development_stage",
        descriptor: "expressed in"
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

export const goEvidenceCodeNameMap = {
    "EXP": "inferred from experiment",
    "IDA": "inferred from direct assay",
    "IPI": "inferred from physical interaction",
    "IMP": "inferred from mutant phenotype",
    "IGI": "inferred from genetic interaction",
    "IEP": "inferred from expression pattern",
    "HTP": "inferred from high throughput experiment",
    "HDA": "inferred from high throughput direct assay",
    "HMP": "inferred from high throughput mutant phenotype",
    "HGI": "inferred from high throughput genetic interaction",
    "HEP": "inferred from high throughput expression pattern",
    "ISS": "inferred from sequence or structural similarity",
    "ISO": "inferred from sequence orthology",
    "ISA": "inferred from sequence alignment",
    "ISM": "inferred from sequence model",
    "IGC": "inferred from genomic context",
    "IBA": "inferred from biological aspect of ancestor",
    "IBD": "inferred from biological aspect of descendant",
    "IKR": "inferred from key residues",
    "IRD": "inferred from rapid divergence",
    "RCA": "inferred from reviewed computational analysis",
    "TAS": "traceable author statement",
    "NAS": "non-traceable author statement",
    "IC": "inferred by curator",
    "ND": "no biological data available",
    "IEA": "inferred from electronic annotation",
};
