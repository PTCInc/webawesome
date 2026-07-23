import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js';
import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'wa-dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Button-triggered menu of options." } },
    actions: { handles: ["wa-show","wa-after-show","wa-hide","wa-after-hide","wa-select"] }
  },
  argTypes: {
        placement: {
              control: "select",
              options: [
                    "top",
                    "top-start",
                    "top-end",
                    "bottom",
                    "bottom-start",
                    "bottom-end",
                    "right",
                    "right-start",
                    "right-end",
                    "left",
                    "left-start",
                    "left-end"
              ],
              description: "The placement of the dropdown menu in reference to the trigger. The menu will shift to a more optimal location if\nthe preferred placement doesn't have enough room.",
              table: {
                    defaultValue: {
                          summary: "bottom-start"
                    }
              }
        },
        size: {
              control: "select",
              options: [
                    "xs",
                    "s",
                    "m",
                    "l",
                    "xl"
              ],
              description: "The dropdown's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        distance: {
              control: "number",
              description: "Gap between trigger and menu (px)",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        skidding: {
              control: "number",
              description: "Offset along the trigger edge (px)",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        }
  },
  args: {
        placement: "bottom-start",
        size: "m",
        distance: 0,
        skidding: 0
  },
  render: (args) => html`
    <wa-dropdown placement=${args.placement} size=${args.size} distance=${args.distance} skidding=${args.skidding}>
      <wa-button slot="trigger" with-caret>Menu</wa-button>
      <wa-dropdown-item>Profile</wa-dropdown-item>
      <wa-dropdown-item>Settings</wa-dropdown-item>
      <wa-dropdown-item disabled>Disabled item</wa-dropdown-item>
      <wa-divider></wa-divider>
      <wa-dropdown-item>Sign out</wa-dropdown-item>
    </wa-dropdown>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
