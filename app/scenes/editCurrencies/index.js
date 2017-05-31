/**
 * @flow
 */

import React from 'react';
import { ListView, View, StyleSheet } from 'react-native';

import { observer } from 'mobx-react/native';

import AndroidBackButton from 'android-back-button';

import { Icon, List } from 'react-native-elements';

import NavigationBar from 'react-native-navbar';

import Cell from './cell';

const propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired,
    }).isRequired,
    store: React.PropTypes.shape({
        removeSymbol: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.any.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbarButton: {
        padding: 10,
    },
});

@observer
class EditCurrencies extends React.PureComponent {

    render() {
        const { navigator, store } = this.props;

        const renderRow = (data, sectionID) => (
            <Cell
                symbol={data.displaySymbol}
                onDelete={() => store.removeSymbol(data.symbol)}
            />
        );

        return (
            <View style={{ flex: 1 }}>

                <NavigationBar
                    title={{ title: 'Edit Portfolio' }}
                    rightButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="done"
                            onPress={() => {
                                navigator.pop();
                            }}
                        />
                    }
                />

                <List containerStyle={{ flex: 1, marginTop: 0 }}>
                    <ListView
                        renderRow={renderRow}
                        dataSource={store.dataSource}
                        enableEmptySections
                        removeClippedSubviews={false}
                    />
                </List>

                <AndroidBackButton
                    onPress={() => {
                        navigator.pop();
                        return true;
                    }}
                />
            </View>
        );
    }
}

EditCurrencies.propTypes = propTypes;

export default EditCurrencies;

