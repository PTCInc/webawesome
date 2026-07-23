import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';

const meta: Meta = {
  title: 'Components/Select',
  component: 'wa-select',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Dropdown list for single or multi-selection." } },
    actions: { handles: ["input","change","focus","blur","wa-clear","wa-show","wa-after-show","wa-hide","wa-after-hide","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "The select's label. If you need to display HTML, use the `label` slot instead."
        },
        hint: {
              control: "text",
              description: "The select's hint. If you need to display HTML, use the `hint` slot instead."
        },
        placeholder: {
              control: "text",
              description: "Placeholder text to show as a hint when the select is empty."
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
              description: "The select's size.",
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
              description: "The select's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "outlined"
                    }
              }
        },
        multiple: {
              control: "boolean",
              description: "Allows more than one option to be selected.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        maxOptionsVisible: {
              control: "number",
              description: "Max visible options (max-options-visible)",
              table: {
                    defaultValue: {
                          summary: "3"
                    }
              }
        },
        withClear: {
              control: "boolean",
              description: "Show clear button (with-clear)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the select control.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        required: {
              control: "boolean",
              description: "The select's required attribute.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Choose an option",
        hint: "",
        placeholder: "Select…",
        size: "m",
        appearance: "outlined",
        multiple: false,
        maxOptionsVisible: 3,
        withClear: false,
        disabled: false,
        required: false
  },
  render: (args) => html`
    <wa-select
      label=${args.label}
      hint=${args.hint}
      placeholder=${args.placeholder}
      size=${args.size}
      appearance=${args.appearance}
      max-options-visible=${args.maxOptionsVisible}
      ?multiple=${args.multiple}
      ?with-clear=${args.withClear}
      ?disabled=${args.disabled}
      ?required=${args.required}
    >
      <wa-option value="opt1">Option 1</wa-option>
      <wa-option value="opt2">Option 2</wa-option>
      <wa-option value="opt3">Option 3</wa-option>
      <wa-option value="opt4" disabled>Option 4 (disabled)</wa-option>
    </wa-select>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
