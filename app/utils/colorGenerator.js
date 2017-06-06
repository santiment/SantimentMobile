/**
 * @flow
 */

class ColorGenerator {

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
