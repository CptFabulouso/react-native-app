import { CustomFormConfig, withCustomFields } from 'src/Lib/DynamicForm';
import { Field } from 'formik';
import { FloatingLabelTextInput } from './Fields/FloatingLabelTextInput/FloatingLabelTextInput';
import { SimpleTextInput } from './Fields/SimpleTextInput/SimpleTextInput';
import FormPresets from './helpers/formPresets';

const DynamicForm = withCustomFields((props, field) => {
	if (field.type === 'floatLabelTextInput') {
		return (
			<Field
				// Formik Field props
				key={field.name}
				name={field.name}
				component={FloatingLabelTextInput}
				// injected props
				dynamic={props}
			/>
		);
	}
	if (field.type === 'textInput') {
		return (
			<Field
				// Formik Field props
				key={field.name}
				name={field.name}
				component={SimpleTextInput}
				// injected props
				dynamic={props}
			/>
		);
	}

	return null;
});

export type CustomFormConfig<V> = CustomFormConfig<
	['floatLabelTextInput', 'textInput'],
	V
>;

export { DynamicForm, FormPresets };
