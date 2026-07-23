import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'wa-tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Brief contextual text shown on hover/focus. Anchored to another element via the `for` attribute." } },
    actions: { handles: ["wa-show","wa-after-show","wa-hide","wa-after-hide"] }
  },
  argTypes: {
        content: {
              control: "text",
              description: "Tooltip text (default slot)"
        },
        placement: {
              control: "select",
              options: [
                    "top",
                    "top-start",
                    "top-end",
                    "right",
                    "right-start",
                    "right-end",
                    "bottom",
                    "bottom-start",
                    "bottom-end",
                    "left",
                    "left-start",
                    "left-end"
              ],
              description: "The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip\ninside of the viewport.",
              table: {
                    defaultValue: {
                          summary: "top"
                    }
              }
        },
        trigger: {
              control: "text",
              description: "Space-separated: hover focus click manual",
              table: {
                    defaultValue: {
                          summary: "hover focus"
                    }
              }
        },
        distance: {
              control: "number",
              description: "Gap between tooltip and anchor (px)",
              table: {
                    defaultValue: {
                          summary: "8"
                    }
              }
        },
        skidding: {
              control: "number",
              description: "The distance in pixels from which to offset the tooltip along its target.",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        withoutArrow: {
              control: "boolean",
              description: "Hide the arrow tip (without-arrow)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        showDelay: {
              control: "number",
              description: "Show delay in ms (show-delay)",
              table: {
                    defaultValue: {
                          summary: "150"
                    }
              }
        },
        hideDelay: {
              control: "number",
              description: "Hide delay in ms (hide-delay)",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the tooltip so it won't show when triggered.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        content: "This is a tooltip",
        placement: "top",
        trigger: "hover focus",
        distance: 8,
        skidding: 0,
        withoutArrow: false,
        showDelay: 150,
        hideDelay: 0,
        disabled: false
  },
  render: (args) => html`
    <wa-button id="tooltip-anchor">Hover me</wa-button>
    <wa-tooltip
      for="tooltip-anchor"
      placement=${args.placement}
      trigger=${args.trigger}
      distance=${args.distance}
      skidding=${args.skidding}
      show-delay=${args.showDelay}
      hide-delay=${args.hideDelay}
      ?without-arrow=${args.withoutArrow}
      ?disabled=${args.disabled}
      >${args.content}</wa-tooltip
    >
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
