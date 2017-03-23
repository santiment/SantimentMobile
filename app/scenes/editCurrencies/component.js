/**
 * Created by workplace on 09/02/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {ListView, View, StyleSheet} = ReactNative;

import {Icon, List} from 'react-native-elements'

import NavigationBar from 'react-native-navbar'

import Cell from './cell';
import {observer} from 'mobx-react/native'

@observer
export default class EditCurrencies extends React.Component {
    render() {
        const {navigator, store} = this.props;

        const renderRow = (rowData, sectionID) => {
            return (
                <Cell
                    symbol={rowData}
                    onDelete={store.removeSymbol}
                />
            )
        };

        return (
            <View style={{ flex: 1, }}>
                <NavigationBar
                    title={{title: "Edit Portfolio"}}
                    rightButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="done"
                            onPress={ () => {
                                navigator.pop();
                            }}
                        />
                    }
                />
                <List containerStyle={{flex: 1, marginTop: 0}}>
                    <ListView
                        renderRow={renderRow}
                        dataSource={store.dataSource}
                        enableEmptySections={true}
                        removeClippedSubviews={false}
                    />
                </List>
            </View>
        );
    }
}

EditCurrencies.propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired
    }),
    store: React.PropTypes.shape({
        removeSymbol: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.any.isRequired,
    }),
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbarButton: {
        padding: 10,
    }
});