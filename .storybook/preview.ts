/** @type { import('@storybook/html-vite').Preview } */
import "../src/components/button/button.css";
import "../src/components/card/card.css";
import "../src/components/input/input.css";
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
