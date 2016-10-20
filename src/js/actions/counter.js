"use strict"


export const INCREMEMENT_COUNTER = "INCREMEMENT_COUNTER";
export const DECREMEMENT_COUNTER = "DECREMEMENT_COUNTER";
export const RESET_COUNTER = "RESET_COUNTER";

export function incrementCounter() {
	return {
		type: INCREMEMENT_COUNTER
	}
}

export function decrementCounter() {
	return {
		type: DECREMEMENT_COUNTER
	}
}

export function resetCounter() {
	return {
		type: RESET_COUNTER
	}
}
