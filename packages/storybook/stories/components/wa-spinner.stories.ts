import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/spinner/spinner.js';

const meta: Meta = {
  title: 'Components/Spinner',
  component: 'wa-spinner',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Animated loading indicator. Size and color are controlled with CSS (font-size, --track-color, --indicator-color)." } },
    actions: { handles: [] }
  },
  argTypes: {
        size: {
              control: "text",
              description: "Spinner size (font-size CSS value)"
        }
  },
  args: {
        size: "2rem"
  },
  render: (args) => html`
    <wa-spinner style="font-size:${args.size}"></wa-spinner>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
