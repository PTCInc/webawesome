import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/tag/tag.js';

const meta: Meta = {
  title: 'Components/Tag',
  component: 'wa-tag',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Compact label, chip, or category marker." } },
    actions: { handles: ["wa-remove"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Tag text (slot content)"
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
              description: "The tag's theme variant. Defaults to `neutral` if not within another element with a variant.",
              table: {
                    defaultValue: {
                          summary: "neutral"
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
              description: "The tag's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "filled-outlined"
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
              description: "The tag's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        withRemove: {
              control: "boolean",
              description: "Show the remove button (with-remove)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        pill: {
              control: "boolean",
              description: "Draws a pill-style tag with rounded edges.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Tag",
        variant: "neutral",
        appearance: "filled-outlined",
        size: "m",
        withRemove: false,
        pill: false
  },
  render: (args) => html`
    <wa-tag
      variant=${args.variant}
      appearance=${args.appearance}
      size=${args.size}
      ?with-remove=${args.withRemove}
      ?pill=${args.pill}
    >${args.label}</wa-tag>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
