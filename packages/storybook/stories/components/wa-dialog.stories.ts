import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/button/button.js';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'wa-dialog',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: "Modal dialog for critical information or user decisions." } },
    actions: { handles: ["wa-show","wa-after-show","wa-hide","wa-after-hide"] }
  },
  argTypes: {
        label: {
              control: "text",
              description: "Dialog title (label attr)"
        },
        open: {
              control: "boolean",
              description: "Whether the dialog is visible",
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
        label: "Dialog title",
        open: false,
        withoutHeader: false,
        withFooter: true,
        lightDismiss: false
  },
  render: (args) => html`
    <wa-button
      @click=${(e: Event) => {
        const dialog = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement & { open: boolean };
        dialog.open = true;
      }}
      >Open dialog</wa-button
    >
    <wa-dialog
      label=${args.label}
      ?open=${args.open}
      ?without-header=${args.withoutHeader}
      ?with-footer=${args.withFooter}
      ?light-dismiss=${args.lightDismiss}
    >
      <p>Dialog body content goes here. Confirm or cancel to dismiss.</p>
      <wa-button slot="footer" appearance="outlined" data-dialog="close">Cancel</wa-button>
      <wa-button slot="footer" variant="brand" data-dialog="close">Confirm</wa-button>
    </wa-dialog>
  `
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
