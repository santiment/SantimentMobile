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

const propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    },
    navbar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cccccc',
    },
    contentWrapper: {
        backgroundColor: '#000000A0',
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'white',
        padding: 20,
    },
});

class UserInstruction extends React.PureComponent {

    render() {
        /**
         * Obtain properties.
         */
        const {
            title,
            text,
            visible,
        } = this.props;

        /**
         * Return layout.
         */
        return (
            <Modal
                animationType={'fade'}
                transparent
                visible={visible}
            >
                <NavigationBar
                    title={title}
                />
                <ScrollView style={styles.contentWrapper}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </ScrollView>
            </Modal>
        );
    }
}

UserInstruction.propTypes = propTypes;

export default UserInstruction;
