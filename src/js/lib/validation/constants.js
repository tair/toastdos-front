"use strict";

export const name = "validation";

export const validationStates = {
    NOT_VALIDATED: "NOT_VALIDATED",
    VALIDATING: "VALIDATING",
    VALID: "VALID",
    INVALID: "INVALID",
};

export function getNotValidated() {
    return {
        validationState: validationStates.NOT_VALIDATED,
        validationError: "",
    };
}

export function getValidating() {
    return {
        validationState: validationStates.VALIDATING,
        validationError: "",
    };
}

export function getValid() {
    return {
        validationState: validationStates.VALID,
        validationError: "",
    };
}

export function getInvalid(error) {
    return {
        validationState: validationStates.INVALID,
        validationError: error,
    };
}
