import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/rating/rating.js';

const meta: Meta = {
  title: 'Components/Rating',
  component: 'wa-rating',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Star rating widget." } },
    actions: { handles: ["change","wa-hover","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Accessible label"
        },
        value: {
              control: "number",
              description: "The current rating.",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        max: {
              control: "number",
              description: "The highest rating to show.",
              table: {
                    defaultValue: {
                          summary: "5"
                    }
              }
        },
        precision: {
              control: "number",
              description: "Fractional step (0.5 = half stars)",
              table: {
                    defaultValue: {
                          summary: "1"
                    }
              }
        },
        size: {
              control: "select",
              options: [
                    "xs",
                    "s",
                    "m",
                    "l",
                    "xl"
              ],
              description: "The component's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        readonly: {
              control: "boolean",
              description: "Makes the rating readonly.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the rating.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Rating",
        value: 3,
        max: 5,
        precision: 1,
        size: "m",
        readonly: false,
        disabled: false
  },
  render: (args) => html`
    <wa-rating
      label=${args.label}
      value=${args.value}
      max=${args.max}
      precision=${args.precision}
      size=${args.size}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
    ></wa-rating>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
