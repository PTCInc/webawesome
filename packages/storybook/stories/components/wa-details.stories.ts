import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/details/details.js';

const meta: Meta = {
  title: 'Components/Details',
  component: 'wa-details',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Summary/expand disclosure widget (like the HTML <details> element)." } },
    actions: { handles: ["wa-show","wa-after-show","wa-hide","wa-after-hide"] }
  },
  argTypes: {
        summary: {
              control: "text",
              description: "Summary text (summary attr/slot)"
        },
        appearance: {
              control: "select",
              options: [
                    "filled",
                    "outlined",
                    "filled-outlined",
                    "plain"
              ],
              description: "The element's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "outlined"
                    }
              }
        },
        iconPlacement: {
              control: "select",
              options: [
                    "start",
                    "end"
              ],
              description: "Toggle icon position (icon-placement)",
              table: {
                    defaultValue: {
                          summary: "end"
                    }
              }
        },
        open: {
              control: "boolean",
              description: "Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you\ncan use the `show()` and `hide()` methods and this attribute will reflect the details' open state.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the details so it can't be toggled.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        summary: "Click to expand",
        appearance: "outlined",
        iconPlacement: "end",
        open: false,
        disabled: false
  },
  render: (args) => html`
    <wa-details
      summary=${args.summary}
      appearance=${args.appearance}
      icon-placement=${args.iconPlacement}
      ?open=${args.open}
      ?disabled=${args.disabled}
    >
      Expanded content goes here. This can contain any HTML.
    </wa-details>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
