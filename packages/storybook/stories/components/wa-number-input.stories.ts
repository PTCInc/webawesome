import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/number-input/number-input.js';

const meta: Meta = {
  title: 'Components/Number Input',
  component: 'wa-number-input',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Numeric input with optional stepper buttons." } },
    actions: { handles: ["input","change","blur","focus","beforeinput","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "The input's label. If you need to display HTML, use the `label` slot instead."
        },
        hint: {
              control: "text",
              description: "The input's hint. If you need to display HTML, use the `hint` slot instead."
        },
        value: {
              control: "number",
              description: "The default value of the form control. Primarily used for resetting the form control."
        },
        min: {
              control: "number",
              description: "The input's minimum value."
        },
        max: {
              control: "number",
              description: "The input's maximum value."
        },
        step: {
              control: "number",
              description: "Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is\nimplied, allowing any numeric value.",
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
              description: "The input's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        appearance: {
              control: "select",
              options: [
                    "filled",
                    "outlined",
                    "filled-outlined"
              ],
              description: "The input's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "outlined"
                    }
              }
        },
        withoutSteppers: {
              control: "boolean",
              description: "Hide the +/− buttons (without-steppers)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the form control.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        readonly: {
              control: "boolean",
              description: "Makes the input readonly.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        required: {
              control: "boolean",
              description: "Makes the input a required field.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Quantity",
        hint: "",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        size: "m",
        appearance: "outlined",
        withoutSteppers: false,
        disabled: false,
        readonly: false,
        required: false
  },
  render: (args) => html`
    <wa-number-input
      label=${args.label}
      hint=${args.hint}
      value=${args.value}
      min=${args.min}
      max=${args.max}
      step=${args.step}
      size=${args.size}
      appearance=${args.appearance}
      ?without-steppers=${args.withoutSteppers}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
    ></wa-number-input>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
