import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/popup/popup.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Utilities/Popup',
  component: 'wa-popup',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Low-level positioning primitive that anchors one element to another. Used internally by Dropdown, Popover, Select and Tooltip. Use it directly when you need custom anchor-based positioning." } },
    actions: { handles: ["wa-reposition"] }
  },
  argTypes: {
        placement: {
              control: "select",
              options: [
                    "top",
                    "top-start",
                    "top-end",
                    "bottom",
                    "bottom-start",
                    "bottom-end",
                    "right",
                    "right-start",
                    "right-end",
                    "left",
                    "left-start",
                    "left-end"
              ],
              description: "Preferred placement relative to the anchor",
              table: {
                    defaultValue: {
                          summary: "top"
                    }
              }
        },
        distance: {
              control: {
                    type: "number",
                    min: 0,
                    max: 40
              },
              description: "The distance in pixels from which to offset the panel away from its anchor.",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        skidding: {
              control: {
                    type: "number",
                    min: -40,
                    max: 40
              },
              description: "The distance in pixels from which to offset the panel along its anchor.",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        arrow: {
              control: "boolean",
              description: "Show an arrow pointing to the anchor",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        active: {
              control: "boolean",
              description: "Activates positioning — popup is visible when true",
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
        arrow: false,
        active: true
  },
  render: (args) => html`
    <div style="display:flex;justify-content:center;padding:80px 0;">
      <wa-popup
        placement=${args.placement}
        distance=${args.distance}
        skidding=${args.skidding}
        ?arrow=${args.arrow}
        ?active=${args.active}
      >
        <wa-button slot="anchor">Anchor</wa-button>
        <div
          style="background:var(--wa-color-surface-raised,#fff);border:1px solid var(--wa-color-surface-border,#ccc);border-radius:var(--wa-border-radius-m,6px);padding:var(--wa-space-s,0.5rem) var(--wa-space-m,1rem);"
        >
          Popup content
        </div>
      </wa-popup>
    </div>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
