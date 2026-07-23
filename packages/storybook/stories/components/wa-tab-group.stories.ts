import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/tab-group/tab-group.js';
import '@awesome.me/webawesome/dist/components/tab/tab.js';
import '@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js';

const meta: Meta = {
  title: 'Components/Tab Group',
  component: 'wa-tab-group',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Shows one content panel at a time via a tab strip." } },
    actions: { handles: ["wa-tab-show","wa-tab-hide"] }
  },
  argTypes: {
        placement: {
              control: "select",
              options: [
                    "top",
                    "bottom",
                    "start",
                    "end"
              ],
              description: "The placement of the tabs.",
              table: {
                    defaultValue: {
                          summary: "top"
                    }
              }
        },
        activation: {
              control: "select",
              options: [
                    "auto",
                    "manual"
              ],
              description: "auto = activate on focus; manual = Enter/Space",
              table: {
                    defaultValue: {
                          summary: "auto"
                    }
              }
        },
        withoutScrollControls: {
              control: "boolean",
              description: "Hide overflow scroll arrows",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        placement: "top",
        activation: "auto",
        withoutScrollControls: false
  },
  render: (args) => html`
    <wa-tab-group
      placement=${args.placement}
      activation=${args.activation}
      ?without-scroll-controls=${args.withoutScrollControls}
    >
      <wa-tab slot="nav" panel="general">General</wa-tab>
      <wa-tab slot="nav" panel="advanced">Advanced</wa-tab>
      <wa-tab slot="nav" panel="preview">Preview</wa-tab>
      <wa-tab slot="nav" panel="disabled" disabled>Disabled</wa-tab>

      <wa-tab-panel name="general">General settings content goes here.</wa-tab-panel>
      <wa-tab-panel name="advanced">Advanced settings content goes here.</wa-tab-panel>
      <wa-tab-panel name="preview">Preview content goes here.</wa-tab-panel>
      <wa-tab-panel name="disabled">This tab is disabled.</wa-tab-panel>
    </wa-tab-group>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
