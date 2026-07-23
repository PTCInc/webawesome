import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/breadcrumb/breadcrumb.js';
import '@awesome.me/webawesome/dist/components/breadcrumb-item/breadcrumb-item.js';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  component: 'wa-breadcrumb',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Navigation trail showing the current page hierarchy." } },
    actions: { handles: [] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Accessible label for the nav landmark"
        }
  },
  args: {
        label: "Breadcrumb"
  },
  render: (args) => html`
    <wa-breadcrumb label=${args.label}>
      <wa-breadcrumb-item href="/">Home</wa-breadcrumb-item>
      <wa-breadcrumb-item href="/components">Components</wa-breadcrumb-item>
      <wa-breadcrumb-item>Breadcrumb</wa-breadcrumb-item>
    </wa-breadcrumb>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
