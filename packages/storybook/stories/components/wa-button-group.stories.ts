import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/button-group/button-group.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Components/Button Group',
  component: 'wa-button-group',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Groups related buttons visually and semantically." } },
    actions: { handles: [] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Accessible label for the group"
        },
        orientation: {
              control: "select",
              options: [
                    "horizontal",
                    "vertical"
              ],
              description: "The button group's orientation.",
              table: {
                    defaultValue: {
                          summary: "horizontal"
                    }
              }
        }
  },
  args: {
        label: "Action group",
        orientation: "horizontal"
  },
  render: (args) => html`
    <wa-button-group label=${args.label} orientation=${args.orientation}>
      <wa-button>First</wa-button>
      <wa-button>Second</wa-button>
      <wa-button>Third</wa-button>
    </wa-button-group>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
