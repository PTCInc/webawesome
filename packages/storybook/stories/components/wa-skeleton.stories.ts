import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/skeleton/skeleton.js';

const meta: Meta = {
  title: 'Components/Skeleton',
  component: 'wa-skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Content placeholder while data is loading." } },
    actions: { handles: [] }
  },
  argTypes: {
        effect: {
              control: "select",
              options: [
                    "pulse",
                    "sheen",
                    "none"
              ],
              description: "Loading animation effect",
              table: {
                    defaultValue: {
                          summary: "none"
                    }
              }
        }
  },
  args: {
        effect: "sheen"
  },
  render: (args) => html`
    <div style="display:flex;flex-direction:column;gap:0.5rem;width:240px">
      <wa-skeleton effect=${args.effect} style="width:80%;height:1.5rem;border-radius:4px"></wa-skeleton>
      <wa-skeleton effect=${args.effect} style="width:100%;height:1rem;border-radius:4px"></wa-skeleton>
      <wa-skeleton effect=${args.effect} style="width:90%;height:1rem;border-radius:4px"></wa-skeleton>
      <wa-skeleton effect=${args.effect} style="width:40px;height:40px;border-radius:50%"></wa-skeleton>
    </div>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
