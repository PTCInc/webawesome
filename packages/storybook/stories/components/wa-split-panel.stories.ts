import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/split-panel/split-panel.js';

const meta: Meta = {
  title: 'Components/Split Panel',
  component: 'wa-split-panel',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Two resizable panels separated by a draggable divider." } },
    actions: { handles: ["wa-reposition"] }
  },
  argTypes: {
        position: {
              control: "number",
              description: "Divider position (0–100%)",
              table: {
                    defaultValue: {
                          summary: "50"
                    }
              }
        },
        orientation: {
              control: "select",
              options: [
                    "horizontal",
                    "vertical"
              ],
              description: "Layout direction (orientation attr)",
              table: {
                    defaultValue: {
                          summary: "horizontal"
                    }
              }
        },
        primary: {
              control: "select",
              options: [
                    "start",
                    "end"
              ],
              description: "Panel that keeps its size on resize"
        },
        disabled: {
              control: "boolean",
              description: "Lock the divider",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        snap: {
              control: "text",
              description: "Snap points (e.g. \"100px 50%\")"
        },
        snapThreshold: {
              control: "number",
              description: "Snap range in px (snap-threshold)",
              table: {
                    defaultValue: {
                          summary: "12"
                    }
              }
        },
        positionInPixels: {
              control: "number",
              description: "Use a pixel position instead of % (position-in-pixels)"
        }
  },
  args: {
        position: 50,
        orientation: "horizontal",
        disabled: false,
        snap: "",
        snapThreshold: 12
  },
  render: (args) => html`
    <wa-split-panel
      position=${args.position}
      orientation=${args.orientation}
      primary=${args.primary}
      snap=${args.snap}
      snap-threshold=${args.snapThreshold}
      ?disabled=${args.disabled}
      ?position-in-pixels=${args.positionInPixels}
      style="height:200px;border:1px solid var(--wa-color-surface-border,#ccc);border-radius:4px"
    >
      <div slot="start" style="padding:1rem;height:100%;box-sizing:border-box">Start panel</div>
      <div slot="end" style="padding:1rem;height:100%;box-sizing:border-box">End panel</div>
    </wa-split-panel>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
