import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
import '@awesome.me/webawesome/dist/components/radio/radio.js';

const meta: Meta = {
  title: 'Components/Radio Group',
  component: 'wa-radio-group',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Mutually-exclusive set of radio options." } },
    actions: { handles: ["input","change","wa-invalid"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot\ninstead."
        },
        hint: {
              control: "text",
              description: "The radio groups's hint. If you need to display HTML, use the `hint` slot instead."
        },
        value: {
              control: "text",
              description: "Currently selected value"
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
              description: "The radio group's size. When present, this size will be applied to all `<wa-radio>` items inside."
        },
        orientation: {
              control: "select",
              options: [
                    "horizontal",
                    "vertical"
              ],
              description: "The orientation in which to show radio items.",
              table: {
                    defaultValue: {
                          summary: "vertical"
                    }
              }
        },
        required: {
              control: "boolean",
              description: "Ensures a child radio is checked before allowing the containing form to submit.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        disabled: {
              control: "boolean",
              description: "Disables the radio group and all child radios.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Choose one",
        hint: "",
        value: "a",
        size: "m",
        orientation: "vertical",
        required: false,
        disabled: false
  },
  render: (args) => html`
    <wa-radio-group
      label=${args.label}
      hint=${args.hint}
      value=${args.value}
      size=${args.size}
      orientation=${args.orientation}
      ?required=${args.required}
      ?disabled=${args.disabled}
    >
      <wa-radio value="a">Option A</wa-radio>
      <wa-radio value="b">Option B</wa-radio>
      <wa-radio value="c">Option C</wa-radio>
    </wa-radio-group>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
