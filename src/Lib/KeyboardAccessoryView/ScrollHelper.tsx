import { Platform } from 'react-native';
import React, { Component, ComponentType, ReactNode } from 'react';

type Props = {
	stick: boolean;
	isKeyboardVisible: boolean;
	visibleBottom: number;
	keyboardHeightAndroid: number;
	children: ReactNode;
	ScrollComponent: ComponentType<any>;
	onHandleShouldScroll: (ref: any, position: number) => void;
	scrollEventThrottle: number;
};

class ScrollHelper extends Component<Props> {
	static defaultProps = {
		stick: true,
		scrollEventThrottle: 16,
	};

	scroll: any = React.createRef();
	currentScrollPosition: number = 0;

	componentDidUpdate(prevProps: Props) {
		if (
			this.props.stick &&
			prevProps.isKeyboardVisible !== this.props.isKeyboardVisible &&
			this.props.isKeyboardVisible
		) {
			const scrollToPosition =
				Platform.OS === 'ios'
					? this.currentScrollPosition + this.props.visibleBottom
					: this.props.keyboardHeightAndroid;
			if (this.scroll.current) {
				this.props.onHandleShouldScroll(this.scroll.current, scrollToPosition);
			}
		}
	}

	render() {
		const { ScrollComponent } = this.props;
		return (
			<ScrollComponent
				{...this.props}
				ref={this.scroll}
				onScroll={(event: any) => {
					this.currentScrollPosition = event.nativeEvent.contentOffset.y;
				}}
				scrollEventThrottle={this.props.scrollEventThrottle}
			>
				{this.props.children}
			</ScrollComponent>
		);
	}
}

export default ScrollHelper;
