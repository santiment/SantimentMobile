/**
 * @flow
 */

/**
 * Makes colors by specified parameters.
 */
class ColorGenerator {

    /**
     * Generates color by its RGB code and opacity.
     *
     * Example of usage:
     *
     * ```javascript
     * const color = ColorGenerator.colorWithOpacity(
     *      '#00ff00', // green color
     *      0x80, // opacity
     * );
     *
     * console.log(color); // '#00ff0080'
     * ```
     *
     * RGB code, passed as parameter, may or may not start with sharp.
     * So, if you send `00ff00` instead of `#00ff00`,
     * it will be handled correctly too.
     *
     * For better readability, it's recommended to send
     * hexademical value for opacity.
     * Use `0x80` instead of `128`.
     *
     * @param {string} rgb RGB code.
     *      Should contain 6 hexademical symbols.
     *      RGB code with 3 hexademical symbols will cause error.
     *      May or may not start with sharp.
     * @param {number} opacity Opacity for new color.
     * @return String that starts with sharp and contains RGBA code.
     */
    static colorWithOpacity = (
        rgb: string,
        opacity: number = 0xff,
    ): string => {
        /**
         * Obtain length of source RGB string.
         */
        const sourceRGBStringLength = rgb.length;

        /**
         * Check whether first symbol from RGB string is a sharp.
         */
        const firstSymbolIsSharp = rgb.length < 1 ? false : rgb.substring(0, 1) === '#';

        /**
         * Check that RGB string's length is not less than required.
         * If less, return empty string.
         */
        const lengthOfRGBCodeWithoutSharp = 6;
        const rgbCodeStartPositionWithoutSharp = firstSymbolIsSharp ? 1 : 0;
        const requiredLengthOfRGBSourceString = rgbCodeStartPositionWithoutSharp + lengthOfRGBCodeWithoutSharp;

        if (sourceRGBStringLength < requiredLengthOfRGBSourceString) {
            return '';
        }

        /**
         * Extract clean RGB code from source string.
         */
        const cleanRGBCodeWithoutSharp = rgb.substr(
            rgbCodeStartPositionWithoutSharp,
            lengthOfRGBCodeWithoutSharp,
        );

        /**
         * Obtain opacity code.
         */
        const opacityCode = opacity.toString(16);

        /**
         * Return RGBA string.
         */
        const rgba = `#${cleanRGBCodeWithoutSharp}${opacityCode}`;
        return rgba;
    }
}

export default ColorGenerator;
