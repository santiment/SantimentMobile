/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
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

import InstructionStore from '../../resources/instructions';

import Palette from '../../resources/colors';

import getStyles from './styles';

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

@observer
class CurrencyDetails extends React.Component {

    componentWillMount() {
        const {
            store,
        } = this.props;

        store.setCurrentPageIndex(0);
    }
    
    render() {
        const {
            navigator,
            store,
        } = this.props;

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

        const screenDimensions = Dimensions.get('window');

        const styles = getStyles(
            screenDimensions,
            tabs.length,
        );

        const renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => (
            <TouchableWithoutFeedback
                onPress={() => onPressHandler(page)}
                key={`${name}_${page}`}
            >
                <View style={styles.tabButton}>
                    <Icon
                        name={tabs[page].icon}
                        onLayout={onLayoutHandler}
                        color={isTabActive ? Palette.justBlack : Palette.suvaGray}
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
                            backgroundColor={Palette.concrete}
                            underlineStyle={styles.underline}
                            style={styles.tabBar}
                            activeTextColor={Palette.justGreen}
                            inactiveTextColor={Palette.justRed}
                        />
                    )}
                    // eslint-disable-next-line no-unused-vars
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
}

CurrencyDetails.propTypes = propTypes;

export default CurrencyDetails;
