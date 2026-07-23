import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/slider/slider.js';

const meta: Meta = {
  title: 'Components/Slider',
  component: 'wa-slider',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Range slider for numeric values." } },
    actions: { handles: ["change","blur","focus","input","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "The slider's label. If you need to provide HTML in the label, use the `label` slot instead."
        },
        hint: {
              control: "text",
              description: "The slider hint. If you need to display HTML, use the hint slot instead."
        },
        value: {
              control: "number",
              description: "The default value of the form control. Primarily used for resetting the form control."
        },
        min: {
              control: "number",
              description: "The minimum value allowed.",
              table: {
                    defaultValue: {
                          summary: "0"
                    }
              }
        },
        max: {
              control: "number",
              description: "The maximum value allowed.",
              table: {
                    defaultValue: {
                          summary: "100"
                    }
              }
        },
        step: {
              control: "number",
              description: "The granularity the value must adhere to when incrementing and decrementing.",
              table: {
                    defaultValue: {
                          summary: "1"
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
              description: "The slider's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        orientation: {
              control: "select",
              options: [
                    "horizontal",
                    "vertical"
              ],
              description: "The orientation of the slider.",
              table: {
                    defaultValue: {
                          summary: "horizontal"
                    }
              }
        },
        withTooltip: {
              control: "boolean",
              description: "Show value tooltip while dragging (with-tooltip)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        withMarkers: {
              control: "boolean",
              description: "Show step markers (with-markers)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the slider.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Volume",
        hint: "",
        value: 50,
        min: 0,
        max: 100,
        step: 1,
        size: "m",
        orientation: "horizontal",
        withTooltip: false,
        withMarkers: false,
        disabled: false
  },
  render: (args) => html`
    <wa-slider
      label=${args.label}
      hint=${args.hint}
      value=${args.value}
      min=${args.min}
      max=${args.max}
      step=${args.step}
      size=${args.size}
      orientation=${args.orientation}
      ?with-tooltip=${args.withTooltip}
      ?with-markers=${args.withMarkers}
      ?disabled=${args.disabled}
    ></wa-slider>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
