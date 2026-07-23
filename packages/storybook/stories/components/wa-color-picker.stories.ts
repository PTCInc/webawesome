import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';

const meta: Meta = {
  title: 'Components/Color Picker',
  component: 'wa-color-picker',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Visual color selection widget." } },
    actions: { handles: ["change","input","wa-show","wa-after-show","wa-hide","wa-after-hide","blur","focus","wa-invalid"] }
  },
  argTypes: {
        value: {
              control: "text",
              description: "Color value (hex, rgb, hsl…)"
        },
        label: {
              control: "text",
              description: "The color picker's label. This will not be displayed, but it will be announced by assistive devices. If you need to\ndisplay HTML, you can use the `label` slot` instead."
        },
        format: {
              control: "select",
              options: [
                    "hex",
                    "rgb",
                    "hsl",
                    "hsv"
              ],
              description: "The format to use. If opacity is enabled, these will translate to HEXA, RGBA, HSLA, and HSVA respectively. The color\npicker will accept user input in any format (including CSS color names) and convert it to the desired format.",
              table: {
                    defaultValue: {
                          summary: "hex"
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
              description: "Determines the size of the color picker's trigger",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        opacity: {
              control: "boolean",
              description: "Enable the opacity slider",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        swatches: {
              control: "text",
              description: "Semicolon-separated swatch colors"
        },
        disabled: {
              control: "boolean",
              description: "Disables the color picker.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        value: "#0073e6",
        label: "Color",
        format: "hex",
        size: "m",
        opacity: false,
        swatches: "",
        disabled: false
  },
  render: (args) => html`
    <wa-color-picker
      value=${args.value}
      label=${args.label}
      format=${args.format}
      size=${args.size}
      swatches=${args.swatches}
      ?opacity=${args.opacity}
      ?disabled=${args.disabled}
    ></wa-color-picker>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
