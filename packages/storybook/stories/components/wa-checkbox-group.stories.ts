import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/checkbox-group/checkbox-group.js';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';

const meta: Meta = {
  title: 'Components/Checkbox Group',
  component: 'wa-checkbox-group',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Fieldset wrapper for related checkboxes." } },
    actions: { handles: [] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "The checkbox group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot\ninstead."
        },
        hint: {
              control: "text",
              description: "The checkbox group's hint. If you need to display HTML, use the `hint` slot instead."
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
              description: "The group's size. When present, this size will be applied to all `<wa-checkbox>` and `<wa-switch>` items inside."
        },
        orientation: {
              control: "select",
              options: [
                    "horizontal",
                    "vertical"
              ],
              description: "The orientation in which to show grouped checkboxes.",
              table: {
                    defaultValue: {
                          summary: "vertical"
                    }
              }
        },
        required: {
              control: "boolean",
              description: "Indicates that at least one option should be selected. This only adds a visual indicator to the label. To enforce\nthe requirement, use the `required` attribute on the individual checkboxes and/or their `setCustomValidity()`\nmethod.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Pick options",
        hint: "",
        size: "m",
        orientation: "vertical",
        required: false
  },
  render: (args) => html`
    <wa-checkbox-group
      label=${args.label}
      hint=${args.hint}
      size=${args.size}
      orientation=${args.orientation}
      ?required=${args.required}
    >
      <wa-checkbox value="a">Option A</wa-checkbox>
      <wa-checkbox value="b" checked>Option B</wa-checkbox>
      <wa-checkbox value="c">Option C</wa-checkbox>
    </wa-checkbox-group>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
