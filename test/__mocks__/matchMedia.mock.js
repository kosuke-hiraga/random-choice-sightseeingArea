Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: getViewportState(query),
    media: query,
    // onchange: null,
    // addListener: jest.fn(), // deprecated
    // removeListener: jest.fn(), // deprecated
    // addEventListener: jest.fn(),
    // removeEventListener: jest.fn(),
    // dispatchEvent: jest.fn(),
  })),
});

const Device = {
  mobile: `(max-width: 600px)`,
  tablet: `(min-width: 600px) and (max-width: 1024px)`,
  laptop: `(min-width: 1024px)`,
}

function getViewportState(query) {
  let viewportState;
  if (query === Device.mobile) {
    viewportState = "mobile";
  } else if (query === Device.tablet) {
    viewportState = "tablet";
  } else if (query === Device.laptop) {
    viewportState = "laptop";
  } else {
    viewportState = "no match";
  }
  return viewportState
}