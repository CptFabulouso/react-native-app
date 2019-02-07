// @flow

type FormikCommonField<TYPE> = { [key: string]: TYPE };

type FormikCommonErrors = FormikCommonField<string>;
type FormikCommonTouched = FormikCommonField<boolean>;
type FormikCommonValues = FormikCommonField<string>;

export type FormikActions = {|
	/** Manually set top level status. */
	setStatus(status?: any): void,
	/**
	 * Manually set top level error
	 * @deprecated since 0.8.0
	 */
	setError(e: any): void,
	/** Manually set errors object */
	setErrors(errors: FormikCommonErrors): void,
	/** Manually set isSubmitting */
	setSubmitting(isSubmitting: boolean): void,
	/** Manually set touched object */
	setTouched(touched: FormikCommonTouched): void,
	/** Manually set values object  */
	setValues(values: FormikCommonValues): void,
	/** Set value of form field directly */
	setFieldValue(field: string, value: string, shouldValidate?: boolean): void,
	/** Set error message of a form field directly */
	setFieldError(field: string, message: string): void,
	/** Set whether field has been touched directly */
	setFieldTouched(
		field: string,
		isTouched?: boolean,
		shouldValidate?: boolean
	): void,
	/** Validate form values */
	validateForm(values?: any): void,
	/** Reset form */
	resetForm(nextValues?: any): void,
	/** Submit the form imperatively */
	submitForm(): void,
	/** Set Formik state, careful! */
	setFormikState(
		f: (prevState: $ReadOnly<FormikState>, props: any) => $Shape<FormikState>,
		callback?: () => any
	): void,
|};

export type FormikState = {
	/** Form values */
	values: FormikCommonValues,
	/**
	 * Top level error, in case you need it
	 * @deprecated since 0.8.0
	 */
	error?: any,
	/** map of field names to specific error for that field */
	errors: FormikCommonValues,
	/** map of field names to whether the field has been touched */
	touched: FormikCommonTouched,
	/** whether the form is currently submitting */
	isSubmitting: boolean,
	/** Top level status state, in case you need it */
	status?: any,
	/** Number of times user tried to submit the form */
	submitCount: number,
};
