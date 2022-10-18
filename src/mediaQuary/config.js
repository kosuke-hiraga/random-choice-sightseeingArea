const Device = {
    mobile: `(max-width: 600px)`,
    tablet: `(min-width: 600px) and (max-width: 1023px)`,
    laptop: `(min-width: 1023px)`,
    // desktop: `(min-width: ${Size.desktop})`,
}


export const ViewportState = getViewportState();


export function getViewportState() {
    let viewportState;
    if (window.matchMedia(Device.mobile).matches) {
        viewportState = "mobile";
    } else if (window.matchMedia(Device.tablet).matches) {
        viewportState = "tablet";
    } else if (window.matchMedia(Device.laptop).matches) {
        viewportState = "laptop";
        // } else {
        //     // viewportState = "mobile";
        //     console.log(Device.laptop);
        //     viewportState = "pp2";
    }
    return viewportState
}

export default Device;