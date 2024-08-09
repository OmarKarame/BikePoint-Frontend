const svgWhiteHomeIcon = `
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="44" height="44" fill="url(#pattern0_631_95)"/>
<defs>
<pattern id="pattern0_631_95" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_631_95" transform="scale(0.0113636)"/>
</pattern>
<image id="image0_631_95" width="88" height="88" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`

export default svgWhiteHomeIcon
