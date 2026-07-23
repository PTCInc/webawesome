import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/badge/badge.js';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'wa-badge',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Compact status, count, or label indicator." } },
    actions: { handles: [] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Badge content (slot)"
        },
        variant: {
              control: "select",
              options: [
                    "brand",
                    "neutral",
                    "success",
                    "warning",
                    "danger"
              ],
              description: "The badge's theme variant. Defaults to `brand` if not within another element with a variant.",
              table: {
                    defaultValue: {
                          summary: "brand"
                    }
              }
        },
        appearance: {
              control: "select",
              options: [
                    "accent",
                    "filled",
                    "outlined",
                    "filled-outlined"
              ],
              description: "The badge's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "accent"
                    }
              }
        },
        attention: {
              control: "select",
              options: [
                    "none",
                    "pulse",
                    "bounce"
              ],
              description: "Animated attention effect",
              table: {
                    defaultValue: {
                          summary: "none"
                    }
              }
        },
        pill: {
              control: "boolean",
              description: "Fully rounded pill shape",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "12",
        variant: "brand",
        appearance: "accent",
        attention: "none",
        pill: false
  },
  render: (args) => html`
    <wa-badge variant=${args.variant} appearance=${args.appearance} attention=${args.attention} ?pill=${args.pill}
      >${args.label}</wa-badge
    >
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
