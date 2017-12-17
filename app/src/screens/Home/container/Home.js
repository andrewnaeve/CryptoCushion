import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';
import { Plaid } from '../../Plaid/container/Plaid';
import { height, width } from '../../../utils/styleConstants';
import { showPlaid } from '../../../redux/actions/plaid-actions';

class Home extends Component {
	launchPlaid = () => {
		const { showPlaid } = this.props;
		showPlaid(true);
	};

	closePlaid = () => {
		const { showPlaid } = this.props;
		showPlaid(false);
	};

	render() {
		const { showPlaidModal, navigation } = this.props;
		return (
			<HomeContainer navigation={navigation}>
				<Body />
				<Button onPress={this.launchPlaid}>
					<Text>Launch Plaid</Text>
				</Button>
				<Plaid visible={showPlaidModal} closePlaid={this.closePlaid} />
			</HomeContainer>
		);
	}
}

const HomeContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
`;

const Body = styled.View`
	flex: 1;
`;

const Button = styled.TouchableOpacity`
	width: ${width * 0.8};
	height: 50;
	margin-bottom: 30;
	border-width: 2;
	border-color: blue;
	border-radius: 10;
	align-items: center;
	justify-content: center;
`;

const mapStateToProps = ({ plaid: { showPlaidModal } }) => {
	return { showPlaidModal };
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ showPlaid }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
