const Device = {
    mobile: `(max-width: 600px)`,
    tablet: `(min-width: 600px) and (max-width: 1024px)`,
    laptop: `(min-width: 1024px)`,
    // desktop: `(min-width: ${Size.desktop})`,
}


export const ViewportState = getViewportState();


function getViewportState() {
    let viewportState;
    if (window.matchMedia(Device.mobile).matches) {
        viewportState = "mobile";
    } else if (window.matchMedia(Device.tablet).matches) {
        viewportState = "tablet";
    } else if (window.matchMedia(Device.laptop).matches) {
        viewportState = "laptop";
    } else {
        viewportState = "mobile";
    }
    return viewportState
}




export default Device