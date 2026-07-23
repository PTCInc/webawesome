import type { StorybookConfig } from '@storybook/web-components-vite';

/**
 * Storybook 10 configuration for the Web Awesome component library.
 *
 * Stories render the real `wa-*` custom elements from the built
 * `@awesome.me/webawesome` package (packages/webawesome/dist). Run the package
 * build once before starting Storybook:
 *
 *   npm run build --workspace @awesome.me/webawesome
 */
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],

  // In Storybook 10 the old `addon-essentials` bundle is gone: controls, actions,
  // viewport, backgrounds and toolbars ship in core. Docs live in `addon-docs`.
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-a11y'],

  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },

  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Keep a single copy of lit so the webawesome components and any story
      // helpers share the same reactive-element registry.
      resolve: {
        dedupe: ['lit', '@lit/reactive-element', 'lit-html', 'lit-element']
      },
      optimizeDeps: {
        include: ['lit', 'lit/decorators.js', 'lit/directives/unsafe-html.js']
      }
    });
  }
};

export default config;
