import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/accordion/accordion.js';
import '@awesome.me/webawesome/dist/components/accordion-item/accordion-item.js';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'wa-accordion',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Vertically stacked expandable sections." } },
    actions: { handles: ["wa-expand","wa-after-expand","wa-collapse","wa-after-collapse"] }
  },
  argTypes: {
        mode: {
              control: "select",
              options: [
                    "single",
                    "single-collapsible",
                    "multiple"
              ],
              description: "How many items can be open at once",
              table: {
                    defaultValue: {
                          summary: "multiple"
                    }
              }
        },
        appearance: {
              control: "select",
              options: [
                    "filled",
                    "outlined",
                    "filled-outlined",
                    "plain"
              ],
              description: "The accordion's visual appearance.",
              table: {
                    defaultValue: {
                          summary: "outlined"
                    }
              }
        },
        iconPlacement: {
              control: "select",
              options: [
                    "start",
                    "end"
              ],
              description: "Toggle icon position (icon-placement)",
              table: {
                    defaultValue: {
                          summary: "end"
                    }
              }
        },
        headingLevel: {
              control: "select",
              options: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
              ],
              description: "Heading element level for a11y (heading-level)",
              table: {
                    defaultValue: {
                          summary: "3"
                    }
              }
        }
  },
  args: {
        mode: "multiple",
        appearance: "outlined",
        iconPlacement: "end",
        headingLevel: 3
  },
  render: (args) => html`
    <wa-accordion
      mode=${args.mode}
      appearance=${args.appearance}
      icon-placement=${args.iconPlacement}
      heading-level=${args.headingLevel}
    >
      <wa-accordion-item>
        <span slot="label">Section One</span>
        Content for section one. Click the header to expand or collapse.
      </wa-accordion-item>
      <wa-accordion-item>
        <span slot="label">Section Two</span>
        Content for section two.
      </wa-accordion-item>
      <wa-accordion-item disabled>
        <span slot="label">Section Three (disabled)</span>
        This section cannot be toggled.
      </wa-accordion-item>
    </wa-accordion>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
