// @flow

import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import { Style } from 'flow-types';

export type KeyboardDismissViewProps = {|
	...State,
	...Props,
|};

type Props = {|
	style?: Style,
	children: React.Node | (KeyboardDismissViewProps => React.Element<any>),
|};

type State = {|
	keyboardShown: boolean,
	keyboardHeight: number,
	visibleHeight: number,
	visibleWidth: number,
	pageHeight: number,
	pageWidth: number,
|};

class KeyboardDismissView extends React.Component<Props, State> {
	_keyboardDidShow: any => void;
	_keyboardDidHide: () => void;
	_setPageLayout: any => void;
	keyboardDidShowListener: any;
	keyboardDidHideListener: any;

	constructor(props: Props) {
		super(props);

		this._keyboardDidShow = this._keyboardDidShow.bind(this);
		this._keyboardDidHide = this._keyboardDidHide.bind(this);
		this._setPageLayout = this._setPageLayout.bind(this);

		this.state = {
			keyboardShown: false,
			keyboardHeight: 0,
			visibleHeight: 0,
			visibleWidth: 0,
			pageHeight: 0,
			pageWidth: 0,
		};
	}

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this._keyboardDidHide
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	_keyboardDidShow(data) {
		this.setStateIfWithProps({
			keyboardShown: true,
			visibleHeight: this.state.pageHeight - data.endCoordinates.height,
			keyboardHeight: data.endCoordinates.height,
		});
	}

	_keyboardDidHide() {
		this.setStateIfWithProps({
			keyboardShown: false,
			visibleHeight: this.state.pageHeight,
		});
	}

	_setPageLayout(e) {
		const { width, height } = e.nativeEvent.layout;
		if (!this.state.pageHeight) {
			this.setStateIfWithProps({
				visibleHeight: height,
				visibleWidth: width,
				pageHeight: height,
				pageWidth: width,
			});
			return;
		}
		let visibleHeight;
		if (this.state.keyboardShown) {
			visibleHeight = height - this.state.keyboardHeight;
		} else {
			visibleHeight = height;
		}
		this.setStateIfWithProps({
			visibleHeight: visibleHeight,
			visibleWidth: width,
			pageHeight: height,
			pageWidth: width,
		});
	}

	setStateIfWithProps(newState: $Shape<State>) {
		if (typeof this.props.children !== 'function') {
			return;
		}
		this.setState(newState);
	}

	render() {
		const { children } = this.props;
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<View onLayout={this._setPageLayout} style={this.props.style}>
					{typeof children === 'function'
						? children({ ...this.state, ...this.props })
						: children}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export { KeyboardDismissView };
