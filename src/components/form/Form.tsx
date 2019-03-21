import { CustomFormConfig, withCustomFields } from 'src/Lib/DynamicForm';
import { FloatingLabelTextInput } from './Fields/FloatingLabelTextInput/FloatingLabelTextInput';
import { SimpleTextInput } from './Fields/SimpleTextInput/SimpleTextInput';
import FormPresets from './helpers/formPresets';
import dynamicFormToTextInput from './helpers/dynamicFormToTextInput';

const DynamicForm = withCustomFields({
	floatLabelTextInput: dynamicFormToTextInput(FloatingLabelTextInput),
	textInput: dynamicFormToTextInput(SimpleTextInput),
});

export type CustomFormConfig<V> = CustomFormConfig<
	['floatLabelTextInput', 'textInput'],
	V
>;

export { DynamicForm, FormPresets };
