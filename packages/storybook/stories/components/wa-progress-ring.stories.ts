import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/progress-ring/progress-ring.js';

const meta: Meta = {
  title: 'Components/Progress Ring',
  component: 'wa-progress-ring',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Circular progress indicator." } },
    actions: { handles: [] }
  },
  argTypes: {
        value: {
              control: "number",
              description: "The current progress as a percentage, 0 to 100.",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        label: {
              control: "text",
              description: "Accessible label"
        }
  },
  args: {
        value: 65,
        label: "Upload progress"
  },
  render: (args) => html`
    <wa-progress-ring value=${args.value} label=${args.label}>${args.value}%</wa-progress-ring>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
