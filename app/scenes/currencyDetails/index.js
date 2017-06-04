/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';

import {
    Icon,
} from 'react-native-elements';

import NavigationBar from 'react-native-navbar';

import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import {
    observer,
} from 'mobx-react/native';

import AndroidBackButton from 'android-back-button';

import MySentimentScene from './mySentiment';

import CommunitySentimentScene from './communitySentiment';

import FeedScene from './feed';

import UserInstruction from '../../components/userInstruction';

import InstructionStore from '../../resources/instructionStore';

const propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired,
    }).isRequired,
    store: React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        mySentiment: React.PropTypes.any.isRequired,
        communitySentiment: React.PropTypes.any.isRequired,
        feed: React.PropTypes.any.isRequired,
        refresh: React.PropTypes.func.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cccccc',
    },
    navButton: {
        padding: 10,
    },
    tabBar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButton: {
        padding: 10,
        flex: 1,
    },
    tabText: {
        textAlign: 'center',
    },
    underline: {
        backgroundColor: 'black',
        height: 0,
    },
});

@observer
class CurrencyDetails extends React.Component {
    
    render() {
        const { navigator, store } = this.props;

        const tabs = [
            {
                label: 'Me',
                icon: 'person',
            },
            {
                label: 'Community',
                icon: 'group',
            },
            {
                label: 'Feed',
                icon: 'rss-feed',
            },
        ];

        const screen = Dimensions.get('window');

        const renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => (
            <TouchableWithoutFeedback
                onPress={() => onPressHandler(page)}
                key={`${name}_${page}`}
            >
                <View style={styles.tabButton}>
                    <Icon
                        name={tabs[page].icon}
                        onLayout={onLayoutHandler}
                        color={isTabActive ? '#000000' : '#919191'}
                    />
                    <Text style={[
                        styles.tabText,
                            { color: isTabActive ? '#000000' : '#919191' },
                    ]}
                    >
                        {tabs[page].label}
                    </Text>
                </View>

            </TouchableWithoutFeedback>
            );

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={{ title: store.title }}
                    style={styles.navBar}
                    leftButton={
                        <Icon
                            containerStyle={styles.navButton}
                            name="keyboard-arrow-left"
                            onPress={() => {
                                navigator.pop();
                            }}
                        />
                    }
                    rightButton={
                        <Icon
                            containerStyle={styles.navButton}
                            name="help"
                            onPress={() => {
                                store.mySentiment.setInstructionVisible(true);
                            }}
                        />
                    }
                />

                <ScrollableTabView
                    renderTabBar={() => (
                        <DefaultTabBar
                            renderTab={renderTab}
                            backgroundColor={'#f2f2f2'}
                            underlineStyle={[styles.underline, {
                                width: 30,
                                marginLeft: ((screen.width / tabs.length) - 30) / 2,
                            }]}
                            style={styles.tabBar}
                            activeTextColor={'green'}
                            inactiveTextColor={'red'}
                        />
                    )}
                    ref={(tabView) => {}}
                    tabBarPosition={'bottom'}
                    locked
                >
                    <MySentimentScene
                        tabLabel={tabs[0].label}
                        store={store.mySentiment}
                    />
                    <CommunitySentimentScene
                        tabLabel={tabs[1].label}
                        store={store.communitySentiment}
                    />
                    <FeedScene
                        tabLabel={tabs[2].label}
                        store={store.feed}
                    />
                </ScrollableTabView>

                <UserInstruction
                    title={InstructionStore.mySentiment.title}
                    text={InstructionStore.mySentiment.text}
                    visible={store.mySentiment.isInstructionVisible}
                    onRequestToClose={(): void => {
                        store.mySentiment.setInstructionVisible(false);
                    }}
                />

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

CurrencyDetails.propTypes = propTypes;

export default CurrencyDetails;
