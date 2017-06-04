/**
 * @flow
 */

/**
 * Generates text.
 */
class TextGenerator {
    
    /**
     * Creates "Ipsum Dolor" text of required length.
     *
     * @param {number} length Required length of generated text.
     * @return "Ipsum Dolor" text of required length.
     */
    generateIpsumDolor = (length: number): string => {
        /**
         * Source text.
         */
        const source = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ';
        
        /**
         * Fill result text with copy of source text until
         * its length is equal to or more than required.
         */
        let resultText = '';

        while (resultText.length < length) {
            resultText += source;
        }

        /**
         * Remove unnecessary symbols at the end of result text
         * so its length would be equal to required.
         */
        const numberOfUnnecessarySymbolsInTheEnd = resultText.length - length;

        if (numberOfUnnecessarySymbolsInTheEnd > 0) {
            resultText = resultText.slice(
                0,
                -numberOfUnnecessarySymbolsInTheEnd,
            );
        }
        
        /**
         * Return result text.
         */
        return resultText;
    }
}

export default TextGenerator;
