import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/tree/tree.js';
import '@awesome.me/webawesome/dist/components/tree-item/tree-item.js';

const meta: Meta = {
  title: 'Components/Tree',
  component: 'wa-tree',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Hierarchical selectable tree list." } },
    actions: { handles: ["wa-selection-change","wa-expand","wa-collapse"] }
  },
  argTypes: {
        selection: {
              control: "select",
              options: [
                    "single",
                    "multiple",
                    "leaf",
                    "leaf-multiple"
              ],
              description: "Selection mode",
              table: {
                    defaultValue: {
                          summary: "single"
                    }
              }
        }
  },
  args: {
        selection: "single"
  },
  render: (args) => html`
    <wa-tree selection=${args.selection}>
      <wa-tree-item>
        Documents
        <wa-tree-item>
          Reports
          <wa-tree-item>Q1 Report.pdf</wa-tree-item>
          <wa-tree-item>Q2 Report.pdf</wa-tree-item>
        </wa-tree-item>
        <wa-tree-item>Invoices</wa-tree-item>
      </wa-tree-item>
      <wa-tree-item>
        Images
        <wa-tree-item>Logo.png</wa-tree-item>
        <wa-tree-item>Banner.jpg</wa-tree-item>
      </wa-tree-item>
      <wa-tree-item disabled>Archive (disabled)</wa-tree-item>
    </wa-tree>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
