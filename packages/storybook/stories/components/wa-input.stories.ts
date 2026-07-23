import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';

const meta: Meta = {
  title: 'Components/Input',
  component: 'wa-input',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Single-line text field." } },
    actions: { handles: ["input","change","blur","focus","wa-clear","wa-invalid"] }
  },
  argTypes: {
        type: {
              control: "select",
              options: [
                    "date",
                    "datetime-local",
                    "email",
                    "number",
                    "password",
                    "search",
                    "tel",
                    "text",
                    "time",
                    "url"
              ],
              description: "The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults\nto `text`.",
              table: {
                    defaultValue: {
                          summary: "text"
                    }
              }
        },
        label: {
              control: "text",
              description: "The input's label. If you need to display HTML, use the `label` slot instead."
        },
        hint: {
              control: "text",
              description: "Helper text below the field (hint attr)"
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
        withClear: {
              control: "boolean",
              description: "Show clear button (with-clear)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        passwordToggle: {
              control: "boolean",
              description: "Show password toggle (password-toggle)",
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
        },
        spellcheck: {
              control: "boolean",
              description: "Enables spell checking on the input.",
              table: {
                    defaultValue: {
                          summary: "true"
                    }
              }
        },
        inputmode: {
              control: "select",
              options: [
                    "none",
                    "text",
                    "decimal",
                    "numeric",
                    "tel",
                    "search",
                    "email",
                    "url"
              ],
              description: "Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual\nkeyboard on supportive devices."
        }
  },
  args: {
        type: "text",
        label: "Label",
        hint: "",
        placeholder: "Placeholder…",
        value: "",
        size: "m",
        appearance: "outlined",
        withClear: false,
        passwordToggle: false,
        disabled: false,
        readonly: false,
        required: false,
        spellcheck: true
  },
  render: (args) => html`
    <wa-input
      type=${args.type}
      label=${args.label}
      hint=${args.hint}
      placeholder=${args.placeholder}
      value=${args.value}
      size=${args.size}
      appearance=${args.appearance}
      inputmode=${args.inputmode || undefined}
      ?with-clear=${args.withClear}
      ?password-toggle=${args.passwordToggle}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?spellcheck=${args.spellcheck}
    ></wa-input>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
