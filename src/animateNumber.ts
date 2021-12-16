interface ElemTextObjType {
    leadingChars: string;
    endingChars: string;
    decimalPlaces: number;
}

function updateTextContent(
    elem: HTMLElement,
    value: number,
    elemTextObj: ElemTextObjType
) {
    const localeStringOptions = {
        minimumFractionDigits: elemTextObj.decimalPlaces,
        maximumFractionDigits: elemTextObj.decimalPlaces
    };
    elem.textContent =
        elemTextObj.leadingChars +
        Number(value).toLocaleString(undefined, localeStringOptions) +
        elemTextObj.endingChars;
}

export function animateNumber(elem: HTMLElement, { startValue, endValue }) {

    if (elem.textContent === null) {
        return;
    }

    const duration = 500;

    const numberString = (elem.textContent.match(
        /[0-9]*\.?[0-9]+/g
    ) as RegExpExecArray).join("");
    const isDecimalNumber = numberString.indexOf(".") !== -1 ? true : false;

    const elemTextObj = {
        leadingChars: (elem.textContent.match(
            /^[^0-9.]*/g
        ) as RegExpExecArray).join(""),
        endingChars: (elem.textContent.match(/[^0-9]*$/g) as RegExpExecArray).join(
            ""
        ),
        decimalPlaces: isDecimalNumber
            ? numberString.length - 1 - numberString.lastIndexOf(".")
            : 0
    };

    return {
        duration,
        tick: (t: number) => {
            const newValue = startValue + Math.trunc((endValue - startValue) * t);
            updateTextContent(elem, newValue, elemTextObj);
        }
    };
}