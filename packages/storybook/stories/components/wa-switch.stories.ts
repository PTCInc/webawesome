import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/switch/switch.js';

const meta: Meta = {
  title: 'Components/Switch',
  component: 'wa-switch',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Toggle for immediate on/off actions. The label is slot content." } },
    actions: { handles: ["change","input","blur","focus","wa-invalid"] }
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
              description: "The value of the switch, submitted as a name/value pair with form data."
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
              description: "The switch's size.",
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
        disabled: {
              control: "boolean",
              description: "Disables the switch.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        required: {
              control: "boolean",
              description: "Makes the switch a required field.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Enable feature",
        hint: "",
        value: "on",
        size: "m",
        checked: false,
        disabled: false,
        required: false
  },
  render: (args) => html`
    <wa-switch
      value=${args.value}
      size=${args.size}
      hint=${args.hint}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?required=${args.required}
    >${args.label}</wa-switch>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
