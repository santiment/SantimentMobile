/**
 * Created by workplace on 01/02/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';

let {View, StyleSheet, BackAndroid} = ReactNative;
import {Icon, SearchBar} from 'react-native-elements'
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scrollview'

import NavigationBar from 'react-native-navbar'

import {observer} from 'mobx-react/native'

import Cell from './cell'

import AndroidBackButton from 'android-back-button'

@observer
export default class AddCurrency extends React.Component {
    
    render() {
        const {navigator, store} = this.props;

        const renderRow = (data, sectionID) => {
            return (
                <Cell
                    key={sectionID}
                    symbol={data.displaySymbol}
                    onPress={() => {
                        store.addSymbol(data.symbol);
                        navigator.pop();
                        store.setQuery('');
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
                                store.setQuery('');
                            }}
                        />
                    }
                />

                <SearchBar
                    lightTheme
                    onChangeText={store.setQuery}
                    placeholder='Search Coins'
                    autoCorrect={false}
                    autoCapitalize="none"
                />

                <KeyboardAwareListView
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='always'
                    style={styles.listView}
                    renderRow={renderRow}
                    dataSource={store.dataSource}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                />

                <AndroidBackButton
                    onPress={() => {
                        navigator.pop();
                        store.setQuery('');
                        return true;
                    }}
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
        addSymbol: React.PropTypes.func.isRequired,
        setQuery: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.any.isRequired,
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
