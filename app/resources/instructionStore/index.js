/**
 * @flow
 */

import Instruction from './instruction';

import TextGenerator from '../../utils/textGenerator';

class InstructionStore {

    static get mySentiment(): Instruction {
        /**
         * Obtain title for instruction.
         */
        const title = 'My Sentiment';

        /**
         * Obtain text for instruction.
         */
        const ipsumDolor = new TextGenerator().generateIpsumDolor(8000);
        const text = `Instruction for My Sentiment screen. ${ipsumDolor}`;

        /**
         * Return instruction.
         */
        return new Instruction(
            title,
            text,
        );
    }

    static get communitySentiment(): Instruction {
        /**
         * Obtain title for instruction.
         */
        const title = 'Community Sentiment';

        /**
         * Obtain text for instruction.
         */
        const ipsumDolor = new TextGenerator().generateIpsumDolor(8000);
        const text = `Instruction for Community Sentiment screen. ${ipsumDolor}`;

        /**
         * Return instruction.
         */
        return new Instruction(
            title,
            text,
        );
    }

    static get feed(): Instruction {
        /**
         * Obtain title for instruction.
         */
        const title = 'Feed';

        /**
         * Obtain text for instruction.
         */
        const ipsumDolor = new TextGenerator().generateIpsumDolor(8000);
        const text = `Instruction for Feed screen. ${ipsumDolor}`;

        /**
         * Return instruction.
         */
        return new Instruction(
            title,
            text,
        );
    }
}

export default InstructionStore;
