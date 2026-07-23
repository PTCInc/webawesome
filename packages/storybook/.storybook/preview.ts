/**
 * Storybook global preview config for Web Awesome.
 *
 * Everything imported here runs before every story.
 */
import type { Preview } from '@storybook/web-components';
// `withActions` wires up `parameters.actions.handles` so custom DOM events
// dispatched by the components (e.g. `wa-change`, `wa-invalid`) show up in the
// Actions panel with their payloads.
import { withActions } from 'storybook/actions/decorator';

// ── Web Awesome base styles ───────────────────────────────────────────────────
// `webawesome.css` pulls in the cascade layers, native resets, utilities and the
// default theme (design tokens / palette). It must load before any component so
// the `--wa-*` custom properties are defined.
import '@awesome.me/webawesome/dist/styles/webawesome.css';

const preview: Preview = {
  // Applied to every story; reads each story's `parameters.actions.handles`.
  decorators: [withActions],

  parameters: {
    // Render an autodocs page for every component.
    docs: {
      toc: true
    },

    // Default viewport presets (Storybook 10 `options` format).
    viewport: {
      options: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } }
      }
    },

    // Background presets for light/dark testing (Storybook 10 `options` format).
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#ffffff' },
        surface: { name: 'Surface', value: '#f6f6f6' },
        dark: { name: 'Dark', value: '#282f35' }
      }
    },

    // a11y addon — runs axe-core on every story.
    a11y: {
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
        }
      }
    }
  },

  initialGlobals: {
    backgrounds: { value: 'light' }
  }
};

export default preview;
