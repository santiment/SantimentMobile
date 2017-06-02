/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
    Modal,
    StyleSheet,
} from 'react-native';

const propTypes = {
    text: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    },
    contentWrapper: {
    },
});

class UserInstruction extends React.PureComponent {

    render() {
        /**
         * Obtain properties.
         */
        const {
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
                <View style={styles.contentWrapper}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            </Modal>
        );
    }
}

UserInstruction.propTypes = propTypes;

export default UserInstruction;
