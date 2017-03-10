/**
 * Created by workplace on 01/02/2017.
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';

let {View, StyleSheet} = ReactNative;
import {Icon, SearchBar} from 'react-native-elements'
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scrollview'

import NavigationBar from 'react-native-navbar'

import {observer} from 'mobx-react/native'

import Cell from './cell'


@observer
export default class AddCurrency extends React.Component {
    render() {
        const {navigator, store} = this.props;

        const renderRow = (rowData, sectionID) => {
            return (
                <Cell
                    key={sectionID}
                    symbol={rowData}
                    onPress={() => {
                        store.addToPortfolio(rowData);
                        navigator.pop();
                        store.updateQuery('');
                    }}
                />
            )
        };

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={{title: "Add Currency"}}
                    leftButton={
                         <Icon
                            containerStyle={styles.toolbarButton}
                            name="close"
                            onPress={ () => {
                                navigator.pop();
                            }}
                        />
                    }
                />

                <SearchBar
                    lightTheme
                    onChangeText={store.updateQuery}
                    placeholder='Search Coins'
                    autoCorrect={false}
                    autoCapitalize="none"
                />

                <KeyboardAwareListView
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='always'
                    style={styles.listView}
                    renderRow={renderRow}
                    dataSource={store.addCurrencyDS}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                />
            </View>
        );
    }
}

AddCurrency.propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired
    }),
    store: React.PropTypes.shape({
        addToPortfolio: React.PropTypes.func.isRequired,
        updateQuery: React.PropTypes.func.isRequired,
        addCurrencyDS: React.PropTypes.any.isRequired,
    }),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listView: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 0,
    },
    toolbarButton: {
        padding: 10,
    }
});
