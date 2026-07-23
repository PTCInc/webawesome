import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';

const meta: Meta = {
  title: 'Components/Textarea',
  component: 'wa-textarea',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Multi-line text input." } },
    actions: { handles: ["blur","change","focus","input","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "The textarea's label. If you need to display HTML, use the `label` slot instead."
        },
        hint: {
              control: "text",
              description: "The textarea's hint. If you need to display HTML, use the `hint` slot instead."
        },
        placeholder: {
              control: "text",
              description: "Placeholder text to show as a hint when the input is empty."
        },
        value: {
              control: "text",
              description: "The default value of the form control. Primarily used for resetting the form control."
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
              description: "The textarea's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        rows: {
              control: "number",
              description: "The number of rows to display by default.",
              table: {
                    defaultValue: {
                          summary: "4"
                    }
              }
        },
        resize: {
              control: "select",
              options: [
                    "none",
                    "vertical",
                    "horizontal",
                    "both",
                    "auto"
              ],
              description: "Controls how the textarea can be resized.",
              table: {
                    defaultValue: {
                          summary: "vertical"
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
              description: "The textarea's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "outlined"
                    }
              }
        },
        withCount: {
              control: "boolean",
              description: "Show character count (with-count)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the textarea.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        readonly: {
              control: "boolean",
              description: "Makes the textarea readonly.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        required: {
              control: "boolean",
              description: "Makes the textarea a required field.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Label",
        hint: "",
        placeholder: "Enter text…",
        value: "",
        size: "m",
        rows: 4,
        resize: "vertical",
        appearance: "outlined",
        withCount: false,
        disabled: false,
        readonly: false,
        required: false
  },
  render: (args) => html`
    <wa-textarea
      label=${args.label}
      hint=${args.hint}
      placeholder=${args.placeholder}
      value=${args.value}
      size=${args.size}
      rows=${args.rows}
      resize=${args.resize}
      appearance=${args.appearance}
      ?with-count=${args.withCount}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
    ></wa-textarea>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
