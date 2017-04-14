/**
 * Created by workplace on 31/01/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {Text, View, StyleSheet} = ReactNative;

import {Icon} from 'react-native-elements'
import NavigationBar from 'react-native-navbar'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import {observer} from 'mobx-react/native'

import MySentimentScene from './mySentiment'
import CommunitySentimentScene from './communitySentiment'
import FeedScene from './feed'

@observer
export default class CurrencyDetails extends React.Component {

    componentDidMount() {
        const {store} = this.props;

        // store.refresh();
    }

    render() {
        const {navigator, store} = this.props;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={{title: store.title}}
                    style={styles.navBar}
                    leftButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="keyboard-arrow-left"
                            onPress={ () => {
                                navigator.pop();
                            }}
                        />
                    }
                />

                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabView.DefaultTabBar />}
                    ref={(tabView) => { }}
                    tabBarPosition={"top"}
                    locked={true}
                >
                    <MySentimentScene tabLabel="Me" store={store.mySentiment}/>
                    <CommunitySentimentScene tabLabel="Community" store={undefined}/>
                    <FeedScene tabLabel="Feed" store={undefined}/>
                </ScrollableTabView>
            </View>
        );
    }
}

CurrencyDetails.propTypes = {
    navigator: React.PropTypes.object,
    store: React.PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#cccccc",
    },
    toolbarButton: {
        padding: 10,
    }
});