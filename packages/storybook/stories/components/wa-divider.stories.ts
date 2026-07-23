import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/divider/divider.js';

const meta: Meta = {
  title: 'Components/Divider',
  component: 'wa-divider',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Visual separator between sections." } },
    actions: { handles: [] }
  },
  argTypes: {
        orientation: {
              control: "select",
              options: [
                    "horizontal",
                    "vertical"
              ],
              description: "Line direction (orientation attr)",
              table: {
                    defaultValue: {
                          summary: "horizontal"
                    }
              }
        }
  },
  args: {
        orientation: "horizontal"
  },
  render: (args) => html`
    <div
      style="display:flex;flex-direction:${args.orientation === 'vertical'
        ? 'row'
        : 'column'};gap:1rem;align-items:center;height:${args.orientation === 'vertical' ? '80px' : 'auto'}"
    >
      <span>${args.orientation === 'vertical' ? 'Left' : 'Above'}</span>
      <wa-divider
        orientation=${args.orientation}
        style=${args.orientation === 'vertical' ? 'height:100%;align-self:stretch' : ''}
      ></wa-divider>
      <span>${args.orientation === 'vertical' ? 'Right' : 'Below'}</span>
    </div>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
