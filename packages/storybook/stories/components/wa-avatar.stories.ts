import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/avatar/avatar.js';

const meta: Meta = {
  title: 'Components/Avatar',
  component: 'wa-avatar',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Person or object avatar with image, initials, or icon." } },
    actions: { handles: ["wa-error"] }
  },
  argTypes: {
        image: {
              control: "text",
              description: "Image URL"
        },
        label: {
              control: "text",
              description: "Accessible label"
        },
        initials: {
              control: "text",
              description: "Fallback initials (1–2 chars)"
        },
        shape: {
              control: "select",
              options: [
                    "circle",
                    "square",
                    "rounded"
              ],
              description: "The shape of the avatar.",
              table: {
                    defaultValue: {
                          summary: "circle"
                    }
              }
        },
        loading: {
              control: "select",
              options: [
                    "eager",
                    "lazy"
              ],
              description: "Indicates how the browser should load the image.",
              table: {
                    defaultValue: {
                          summary: "eager"
                    }
              }
        }
  },
  args: {
        image: "",
        label: "John Doe",
        initials: "JD",
        shape: "circle",
        loading: "eager"
  },
  render: (args) => html`
    <wa-avatar
      image=${args.image}
      label=${args.label}
      initials=${args.initials}
      shape=${args.shape}
      loading=${args.loading}
    ></wa-avatar>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
