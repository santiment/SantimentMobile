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

import Palette from '../../resources/colors';

import ColorGenerator from '../../utils/colorGenerator';

const propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    onRequestToClose: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    },
    navbar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Palette.silver,
    },
    navbarButton: {
        padding: 10,
    },
    contentWrapper: {
        backgroundColor: ColorGenerator.colorWithOpacity(Palette.justBlack, 0xdd),
        width: '100%',
        height: '100%',
    },
    text: {
        color: Palette.justWhite,
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
            onRequestToClose,
        } = this.props;

        /**
         * Return layout.
         */
        return (
            <Modal
                animationType={'fade'}
                transparent
                visible={visible}
                onRequestToClose={(): void => {
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
            </Modal>
        );
    }
}

UserInstruction.propTypes = propTypes;

export default UserInstruction;
