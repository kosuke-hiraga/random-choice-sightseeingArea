const Device = {
    mobile: `(max-width: 600px)`,
    tablet: `(min-width: 600px) and (max-width: 1023px)`,
    laptop: `(min-width: 1023px)`,
}


export const ScreenType = {
    Mobile: "mobile",
    Tablet: "tablet",
    Laptop: "laptop"
}

export const ViewportState = getViewportState();


/**
 * @desc 画面の横幅から使用している端末を定義する
 * @returns "mobile" "tablet" "laptop"
 */
export function getViewportState() {
    let viewportState;
    if (window.matchMedia(Device.mobile).matches) {
        viewportState = ScreenType.Mobile;
    } else if (window.matchMedia(Device.tablet).matches) {
        viewportState = ScreenType.Tablet;
    } else if (window.matchMedia(Device.laptop).matches) {
        viewportState = ScreenType.Laptop;
    }
    return viewportState
}

export default Device;