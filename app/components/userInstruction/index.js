/**
 * @flow
 */

import React from 'react';

import {
    ScrollView,
    Text,
    Modal,
    StyleSheet,
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import {
    Icon,
} from 'react-native-elements';

import AndroidBackButton from 'android-back-button';

import getStyles from './styles';

const propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    onRequestToClose: React.PropTypes.func.isRequired,
};

class UserInstruction extends React.PureComponent {

    render() {
        /**
         * Obtain properties.
         */
        const {
            title,
            text,
            visible,
            onRequestToClose,
        } = this.props;

        /**
         * Obtain styles.
         */
        const styles = getStyles();

        /**
         * Return layout.
         */
        return (
            <Modal
                animationType={'fade'}
                transparent
                visible={visible}
                onRequestClose={(): void => {
                }}
            >
                <NavigationBar
                    style={styles.navbar}
                    title={{
                        title,
                    }}
                    leftButton={
                        <Icon
                            style={styles.navbarButton}
                            containerStyle={styles.navButton}
                            name="keyboard-arrow-left"
                            onPress={() => {
                                onRequestToClose();
                            }}
                        />
                    }
                />
                <ScrollView style={styles.contentWrapper}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </ScrollView>

                <AndroidBackButton
                    onPress={() => {
                        onRequestToClose();
                        return true;
                    }}
                />
            </Modal>
        );
    }
}

UserInstruction.propTypes = propTypes;

export default UserInstruction;
