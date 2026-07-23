import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Components/Button',
  component: 'wa-button',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Triggers actions and navigation." } },
    actions: { handles: ["blur","focus","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Slot content (button label)"
        },
        variant: {
              control: "select",
              options: [
                    "neutral",
                    "brand",
                    "success",
                    "warning",
                    "danger"
              ],
              description: "The button's theme variant. Defaults to `neutral` if not within another element with a variant.",
              table: {
                    defaultValue: {
                          summary: "neutral"
                    }
              }
        },
        appearance: {
              control: "select",
              options: [
                    "accent",
                    "filled",
                    "outlined",
                    "filled-outlined",
                    "plain"
              ],
              description: "The button's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "accent"
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
              description: "The button's size.",
              table: {
                    defaultValue: {
                          summary: "m"
                    }
              }
        },
        type: {
              control: "select",
              options: [
                    "button",
                    "submit",
                    "reset"
              ],
              description: "The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native\n`<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.",
              table: {
                    defaultValue: {
                          summary: "button"
                    }
              }
        },
        href: {
              control: "text",
              description: "Renders as an <a> link when set"
        },
        target: {
              control: "select",
              options: [
                    "_blank",
                    "_parent",
                    "_self",
                    "_top"
              ],
              description: "Tells the browser where to open the link. Only used when `href` is present."
        },
        disabled: {
              control: "boolean",
              description: "Disables the button.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        loading: {
              control: "boolean",
              description: "Draws the button in a loading state.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        pill: {
              control: "boolean",
              description: "Fully rounded corners",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        withCaret: {
              control: "boolean",
              description: "Show dropdown caret (with-caret)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Button",
        variant: "neutral",
        appearance: "accent",
        size: "m",
        type: "button",
        href: "",
        target: "_self",
        disabled: false,
        loading: false,
        pill: false,
        withCaret: false
  },
  render: (args) => html`
    <wa-button
      variant=${args.variant}
      appearance=${args.appearance}
      size=${args.size}
      type=${args.type}
      href=${args.href || undefined}
      target=${args.target}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?pill=${args.pill}
      ?with-caret=${args.withCaret}
    >${args.label}</wa-button>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
