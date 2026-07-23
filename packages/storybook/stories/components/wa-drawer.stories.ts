import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/drawer/drawer.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Components/Drawer',
  component: 'wa-drawer',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Slide-in side panel for contextual content." } },
    actions: { handles: ["wa-show","wa-after-show","wa-hide","wa-after-hide"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "The drawer's label as displayed in the header. You should always include a relevant label, as it is required for\nproper accessibility. If you need to display HTML, use the `label` slot instead."
        },
        placement: {
              control: "select",
              options: [
                    "top",
                    "end",
                    "bottom",
                    "start"
              ],
              description: "The direction from which the drawer will open.",
              table: {
                    defaultValue: {
                          summary: "end"
                    }
              }
        },
        open: {
              control: "boolean",
              description: "Indicates whether or not the drawer is open. Toggle this attribute to show and hide the drawer.",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        withoutHeader: {
              control: "boolean",
              description: "Hide the header (without-header)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        withFooter: {
              control: "boolean",
              description: "Show the footer slot (with-footer)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        },
        lightDismiss: {
              control: "boolean",
              description: "Close on overlay click (light-dismiss)",
              table: {
                    defaultValue: {
                          summary: "false"
                    }
              }
        }
  },
  args: {
        label: "Drawer",
        placement: "end",
        open: false,
        withoutHeader: false,
        withFooter: true,
        lightDismiss: false
  },
  render: (args) => html`
    <wa-button
      @click=${(e: Event) => {
        const drawer = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement & { open: boolean };
        drawer.open = true;
      }}
      >Open drawer</wa-button
    >
    <wa-drawer
      label=${args.label}
      placement=${args.placement}
      ?open=${args.open}
      ?without-header=${args.withoutHeader}
      ?with-footer=${args.withFooter}
      ?light-dismiss=${args.lightDismiss}
    >
      <p>Drawer body content.</p>
      <wa-button slot="footer" data-drawer="close">Close</wa-button>
    </wa-drawer>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
