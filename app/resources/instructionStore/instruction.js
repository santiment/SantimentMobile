/**
 * @flow
 */

class Instruction {

    /**
     * Intsruction's title.
     */
    title: string;

    /**
     * Instruction's text.
     */
    text: string;

    constructor(
        title: string,
        text: string,
    ) {
        /**
         * Initialize title.
         */
        this.title = title;

        /**
         * Initialize text.
         */
        this.text = text;
    }
}

export default Instruction;
