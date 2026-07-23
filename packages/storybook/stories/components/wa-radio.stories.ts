import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/radio/radio.js';
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'wa-radio',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Single radio option — use inside a wa-radio-group." } },
    actions: { handles: ["blur","focus"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Label (slot content)"
        },
        appearance: {
              control: "select",
              options: [
                    "default",
                    "button"
              ],
              description: "The radio's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "default"
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
              description: "The radio's size. When used inside a radio group, the size will be determined by the radio group's size, which will\noverride this attribute."
        },
        disabled: {
              control: "boolean",
              description: "Disables the radio.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Option A",
        appearance: "default",
        size: "m",
        disabled: false
  },
  render: (args) => html`
    <wa-radio-group label="Choose one" value="a">
      <wa-radio value="a" appearance=${args.appearance} size=${args.size} ?disabled=${args.disabled}
        >${args.label}</wa-radio
      >
      <wa-radio value="b" appearance=${args.appearance} size=${args.size}>Option B</wa-radio>
      <wa-radio value="c" appearance=${args.appearance} size=${args.size}>Option C</wa-radio>
    </wa-radio-group>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
