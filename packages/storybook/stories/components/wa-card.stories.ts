import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Components/Card',
  component: 'wa-card',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Container for grouped related content." } },
    actions: { handles: [] }
  },
  argTypes: {
        appearance: {
              control: "select",
              options: [
                    "accent",
                    "filled",
                    "outlined",
                    "filled-outlined",
                    "plain"
              ],
              description: "The card's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "outlined"
                    }
              }
        },
        orientation: {
              control: "select",
              options: [
                    "horizontal",
                    "vertical"
              ],
              description: "Renders the card's orientation *",
              table: {
                    defaultValue: {
                          summary: "vertical"
                    }
              }
        },
        withHeader: {
              control: "boolean",
              description: "Show the header slot (with-header)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        withFooter: {
              control: "boolean",
              description: "Show the footer slot (with-footer)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        appearance: "outlined",
        orientation: "vertical",
        withHeader: true,
        withFooter: false
  },
  render: (args) => html`
    <wa-card
      appearance=${args.appearance}
      orientation=${args.orientation}
      ?with-header=${args.withHeader}
      ?with-footer=${args.withFooter}
      style="max-width:320px"
    >
      <span slot="header">Card Header</span>
      <p>Main card body content. Toggle with-header and with-footer to show/hide those slots.</p>
      <div slot="footer"><wa-button size="s" variant="brand">Action</wa-button></div>
    </wa-card>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
