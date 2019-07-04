const CLICK_ANIMATION_FREQ_MS = 15;
const CLICK_DEPTH_PX = 3;
const CLICK_ANIMATION_LENGTH = CLICK_DEPTH_PX * 2;

export default function click({style}) {
    let pos = 0;
    let count = 0;
    let id = setInterval(() => {
        if (count++ === CLICK_ANIMATION_LENGTH) {
            clearInterval(id);
        } else {
            pos += Math.sign(CLICK_DEPTH_PX - count + 0.1); // math magic
            style.top = style.left = pos + "px";
        }
    }, CLICK_ANIMATION_FREQ_MS);
}