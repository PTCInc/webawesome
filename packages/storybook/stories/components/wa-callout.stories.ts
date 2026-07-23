import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

const meta: Meta = {
  title: 'Components/Callout',
  component: 'wa-callout',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Highlighted inline notice for important messages." } },
    actions: { handles: [] }
  },
  argTypes: {
        variant: {
              control: "select",
              options: [
                    "brand",
                    "neutral",
                    "success",
                    "warning",
                    "danger"
              ],
              description: "The callout's theme variant. Defaults to `brand` if not within another element with a variant.",
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
                    "plain",
                    "filled-outlined"
              ],
              description: "The callout's visual appearance."
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
              description: "The callout's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        }
  },
  args: {
        variant: "brand",
        appearance: "accent",
        size: "m"
  },
  render: (args) => html`
    <wa-callout variant=${args.variant} appearance=${args.appearance} size=${args.size}>
      <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
      <strong>Notice</strong> — this is a callout message. Use the controls to change variant and appearance.
    </wa-callout>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
