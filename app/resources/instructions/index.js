/**
 * @flow
 */

import {
    TextGenerator,
} from '../../utils/textGenerator';

export const Instructions = {
    mySentiment: `My Sentiment. ${TextGenerator.generateIpsumDolor(8000)}`,
    communitySentiment: `Community Sentiment. ${TextGenerator.generateIpsumDolor(8000)}`,
    feed: `Feed. ${TextGenerator.generateIpsumDolor(8000)}`,
};
