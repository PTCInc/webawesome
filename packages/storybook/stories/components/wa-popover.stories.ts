import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/popover/popover.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Components/Popover',
  component: 'wa-popover',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Floating contextual panel anchored to a trigger via the `for` attribute." } },
    actions: { handles: ["wa-show","wa-after-show","wa-hide","wa-after-hide"] }
  },
  argTypes: {
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
              description: "The preferred placement of the popover. Note that the actual placement may vary as needed to keep the popover\ninside of the viewport.",
              table: {
                    defaultValue: {
                          summary: "top"
                    }
              }
        },
        distance: {
              control: "number",
              description: "The distance in pixels from which to offset the popover away from its target.",
              table: {
                    defaultValue: {
                          summary: "8"
                    }
              }
        },
        skidding: {
              control: "number",
              description: "The distance in pixels from which to offset the popover along its target.",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        withoutArrow: {
              control: "boolean",
              description: "Hide the arrow (without-arrow)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        open: {
              control: "boolean",
              description: "Whether the popover is visible",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        placement: "top",
        distance: 8,
        skidding: 0,
        withoutArrow: false,
        open: false
  },
  render: (args) => html`
    <wa-button id="popover-anchor">Toggle popover</wa-button>
    <wa-popover
      for="popover-anchor"
      placement=${args.placement}
      distance=${args.distance}
      skidding=${args.skidding}
      ?without-arrow=${args.withoutArrow}
      ?open=${args.open}
    >
      <div style="max-width:240px">
        <strong>Popover heading</strong>
        <p style="margin:0.5rem 0 0">Popover body content.</p>
      </div>
    </wa-popover>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
