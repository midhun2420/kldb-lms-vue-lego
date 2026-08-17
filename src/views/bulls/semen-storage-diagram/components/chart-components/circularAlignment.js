const createSequenceArray = function (start, end, no) {
    const stepValue = (end - start) / no;
    let value = start;
    const sequenceArray = [];
    while (value < end) {
        sequenceArray.push(value);
        value = value + stepValue;
    }
    return sequenceArray;
};
const theta = [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * (Math.PI / 3), 3 * (Math.PI / 4), 5 * (Math.PI / 6), Math.PI, 7 * (Math.PI / 6), 5 * (Math.PI / 4), 4 * (Math.PI / 3), 3 * (Math.PI / 2), 5 * (Math.PI / 3), 7 * (Math.PI / 4), 11 * (Math.PI / 6)];

const createCircleElement = function (radiusVal, mainHeight, circleArray, angle) {
    const circle = document.createElement('div');
    circle.innerHTML = circleArray.length + 1;
    circle.className = 'font-poppins-medium';
    circleArray.push(circle);
    const lastIdx = circleArray.length - 1;
    circleArray[lastIdx].posx = Math.round(radiusVal * (Math.cos(angle))) + 'px';
    circleArray[lastIdx].posy = Math.round(radiusVal * (Math.sin(angle))) + 'px';
    circleArray[lastIdx].style.position = 'relative';
    circleArray[lastIdx].style.top = ((mainHeight / 2) - parseInt(circleArray[lastIdx].posy.slice(0, -2))) + 'px';
    circleArray[lastIdx].style.left = ((mainHeight / 2) + parseInt(circleArray[lastIdx].posx.slice(0, -2))) + 'px';
    return circleArray[lastIdx];
};
export default { createCircleElement, createSequenceArray, theta };
