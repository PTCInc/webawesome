import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/progress-bar/progress-bar.js';

const meta: Meta = {
  title: 'Components/Progress Bar',
  component: 'wa-progress-bar',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Horizontal progress indicator." } },
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
        },
        indeterminate: {
              control: "boolean",
              description: "Unknown-progress animation",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        value: 40,
        label: "Loading…",
        indeterminate: false
  },
  render: (args) => html`
    <wa-progress-bar value=${args.value} label=${args.label} ?indeterminate=${args.indeterminate}></wa-progress-bar>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
