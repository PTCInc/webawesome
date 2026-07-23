import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'wa-checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Binary on/off toggle. The label is slot content." } },
    actions: { handles: ["change","blur","focus","input","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Label (slot content)"
        },
        hint: {
              control: "text",
              description: "Helper text (hint attr)"
        },
        value: {
              control: "text",
              description: "The value of the checkbox, submitted as a name/value pair with form data."
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
              description: "The checkbox's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        checked: {
              control: "boolean",
              description: "The default value of the form control. Primarily used for resetting the form control."
        },
        indeterminate: {
              control: "boolean",
              description: "Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a \"select\nall/none\" behavior when associated checkboxes have a mix of checked and unchecked states.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the checkbox.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        required: {
              control: "boolean",
              description: "Makes the checkbox a required field.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Checkbox label",
        hint: "",
        value: "on",
        size: "m",
        checked: false,
        indeterminate: false,
        disabled: false,
        required: false
  },
  render: (args) => html`
    <wa-checkbox
      value=${args.value}
      size=${args.size}
      hint=${args.hint}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      ?required=${args.required}
    >${args.label}</wa-checkbox>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
