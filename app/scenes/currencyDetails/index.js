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
    activeTabText: {
        textAlign: 'center',
        color: '#000000',
    },
    inactiveTabText: {
        textAlign: 'center',
        color: '#919191',
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
                instruction: InstructionStore.mySentiment,
            },
            {
                label: 'Community',
                icon: 'group',
                instruction: InstructionStore.communitySentiment,
            },
            {
                label: 'Feed',
                icon: 'rss-feed',
                instruction: InstructionStore.feed,
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
                    <Text
                        style={
                            isTabActive ? styles.activeTabText : styles.inactiveTabText
                        }
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
                                store.setInstructionVisible(true);
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
                    // eslint-disable-next-line no-unused-vars
                    onChangeTab={(tab) => {
                        store.setCurrentPageIndex(tab.i);
                    }}
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
                    title={tabs[store.currentPageIndex].instruction.title}
                    text={tabs[store.currentPageIndex].instruction.text}
                    visible={store.isInstructionVisible}
                    onRequestToClose={(): void => {
                        store.setInstructionVisible(false);
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

    componentWillMount() {
        const { store } = this.props;
        store.setCurrentPageIndex(0);
    }
}

CurrencyDetails.propTypes = propTypes;

export default CurrencyDetails;
