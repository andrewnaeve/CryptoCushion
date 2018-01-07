import React, { Component } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { width } from '../../../utils/styleConstants';

export class ErrorMessage extends Component {
	constructor() {
		super();
		this.slideAnimation = new Animated.Value(1);
		this.opaqueAnimation = new Animated.Value(0);
	}
	componentWillReceiveProps() {
		this._animate();
	}
	render() {
		const { error } = this.props;

		return (
			<ErrorContainer>
				<AnimatedErrorText
					style={{
						transform: [{ translateY: this.slideAnimation }],
						opacity: this.opaqueAnimation
					}}
				>
					{error}
				</AnimatedErrorText>
			</ErrorContainer>
		);
	}
	_animate = () => {
		this.slideAnimation.setValue(20);
		this.opaqueAnimation.setValue(0);
		Animated.stagger(3000, [
			Animated.parallel([
				Animated.timing(this.opaqueAnimation, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true
				}),
				Animated.spring(this.slideAnimation, {
					toValue: 0,
					friction: 5,
					tension: 30,
					useNativeDriver: true
				})
			]),
			Animated.parallel([
				Animated.timing(this.opaqueAnimation, {
					toValue: 0,
					duration: 400,
					easing: Easing.ease,
					useNativeDriver: true
				}),
				Animated.timing(this.slideAnimation, {
					toValue: 20,
					duration: 400,
					easing: Easing.back(2),
					useNativeDriver: true
				})
			])
		]).start();
	};
}

const ErrorContainer = styled.View`
	height: 70px;
	width: ${width * 0.8};
	background-color: transparent;
	align-items: center;
	justify-content: center;
`;

const ErrorText = styled.Text`
	color: red;
`;

const AnimatedErrorText = Animated.createAnimatedComponent(ErrorText);
