import { View } from 'react-native';
import React, { Component } from 'react';

import { KeyboardDismissView, LabelTextInput, TextInput } from 'src/components';

type Props = {};
type State = {
	val: string;
	floatVal: string;
};

class LoginScreen extends Component<Props, State> {
	state = {
		val: 'Test',
		floatVal: '',
	};

	render() {
		return (
			<KeyboardDismissView
				style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ccc' }}
			>
				<LabelTextInput
					// multiline
					onChangeText={val => this.setState({ floatVal: val })}
					value={this.state.floatVal}
					label={'L'}
					floatingLabel

					// underlineColor="black"
					// numberOfLines={3}
				/>
				<LabelTextInput
					// multiline
					onChangeText={val => this.setState({ floatVal: val })}
					value={this.state.floatVal}
					label={'Label'}
					editable={false}
					floatingLabel
					description="some description"
					renderRight={() => {
						return (
							<View
								style={{ height: 50, width: 50, backgroundColor: 'brown' }}
							/>
						);
					}}
					// underlineColor="black"
					// numberOfLines={3}
				/>

				<LabelTextInput
					// multiline
					onChangeText={val => this.setState({ floatVal: val })}
					value={this.state.floatVal}
					label={'Label mnohem víííííííc'}
					touched
					error="error"
					description="some description"
					// underlineColor="black"
					// numberOfLines={3}
				/>

				<LabelTextInput
					// multiline
					onChangeText={val => this.setState({ floatVal: val })}
					value={this.state.floatVal}
					label={'Label mnohem víííííííc uplně moc nejvíc největší text života'}
					// underlineColor="black"
					// numberOfLines={3}
				/>

				<View style={{ height: 20 }} />
				<TextInput
					onChangeText={val => this.setState({ val })}
					value={this.state.val}
					underlineColorAndroid="black"
				/>
				<View style={{ height: 20 }} />
				{/* <TextInput
					multiline
					onChangeText={val => this.setState({ val })}
					value={this.state.val}
					underlineColor="black"
					numberOfLines={3}
				/> */}
				<View style={{ height: 20 }} />
				<TextInput
					onChangeText={val => this.setState({ val })}
					value={this.state.val}
					underlineColor="black"
				/>
				<View style={{ height: 20 }} />
				<TextInput
					onChangeText={val => this.setState({ val })}
					value={this.state.val}
				/>
				<View style={{ height: 20 }} />
				{/* <TextInput
					multiline
					onChangeText={val => this.setState({ val })}
					value={this.state.val}
				/> */}
			</KeyboardDismissView>
		);
	}
}

export default LoginScreen;
