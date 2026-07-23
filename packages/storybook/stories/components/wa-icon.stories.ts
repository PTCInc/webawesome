import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'wa-icon',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Scalable vector icon from the Font Awesome icon library. Requires a Font Awesome kit or a registered icon library to display." } },
    actions: { handles: ["wa-load","wa-error"] }
  },
  argTypes: {
        name: {
              control: "text",
              description: "Icon name (e.g. star, user, home)"
        },
        label: {
              control: "text",
              description: "Accessible label. Leave empty for decorative icons."
        },
        variant: {
              control: "select",
              options: [
                    "solid",
                    "regular",
                    "light",
                    "thin",
                    "duotone",
                    "brands"
              ],
              description: "Font Awesome style variant"
        },
        size: {
              control: "text",
              description: "Font-size CSS value"
        }
  },
  args: {
        name: "star",
        label: "",
        variant: "regular",
        size: "1.5rem"
  },
  render: (args) => html`
    <wa-icon
      name=${args.name}
      label=${args.label}
      variant=${args.variant}
      style="font-size:${args.size}"
    ></wa-icon>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
