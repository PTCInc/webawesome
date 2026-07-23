/**
 * Generates Storybook stories for the Web Awesome (`wa-*`) components.
 *
 *   node scripts/gen-stories.mjs
 *
 * The controls, options, default values and event handles for every story are
 * derived directly from the component library's Custom Elements Manifest
 * (`@awesome.me/webawesome/dist/custom-elements.json`). That guarantees the
 * generated stories always match the real component API — the render templates
 * (curated, human-readable examples) are the only hand-written part.
 *
 * Adapted from the cds-wc-library Storybook generator; ported from `cds-*` to
 * the upstream `wa-*` components and upgraded for Storybook 10.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Load the Custom Elements Manifest ─────────────────────────────────────────
const cemPath = require.resolve('@awesome.me/webawesome/dist/custom-elements.json');
const cem = JSON.parse(readFileSync(cemPath, 'utf8'));

const TAGS = {};
for (const mod of cem.modules ?? []) {
  for (const decl of mod.declarations ?? []) {
    if (decl.tagName) TAGS[decl.tagName] = decl;
  }
}

// ── CEM helpers ───────────────────────────────────────────────────────────────
const SIZE_SYNONYMS = new Set(['small', 'medium', 'large']);

function decl(tag) {
  const d = TAGS[tag];
  if (!d) throw new Error(`Unknown tag in CEM: ${tag}`);
  return d;
}

function attrOf(tag, name) {
  const a = (decl(tag).attributes ?? []).find(x => x.name === name);
  if (!a) throw new Error(`[${tag}] attribute "${name}" is not in the CEM`);
  return a;
}

function eventsOf(tag) {
  return (decl(tag).events ?? []).map(e => e.name);
}

/** Extract quoted string-literal members of a TS union type. */
function unionLiterals(typeText) {
  if (!typeText) return [];
  return [...typeText.matchAll(/'([^']*)'/g)].map(m => m[1]);
}

/** Turn a CEM `default` string into a real JS value. */
function parseDefault(raw) {
  if (raw === undefined || raw === null) return undefined;
  const s = String(raw).trim();
  if (s === '' || s === "''" || s === '""') return '';
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null') return null;
  if (s === 'undefined') return undefined;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  const q = s.match(/^'(.*)'$/s) || s.match(/^"(.*)"$/s);
  return q ? q[1] : s;
}

/**
 * Build an argType + initial arg value for a control.
 *
 * @param {string} tag   host tag (for CEM lookup)
 * @param {object} ctrl  { key, attr?, virtual?, control?, options?, default?, description? }
 */
function buildControl(tag, ctrl) {
  const argType = {};
  let argValue;

  if (ctrl.virtual) {
    // Slot content / style-only control — fully hand-specified.
    argType.control = ctrl.control ?? 'text';
    if (ctrl.options) argType.options = ctrl.options;
    if (ctrl.description) argType.description = ctrl.description;
    argValue = ctrl.default;
    return { argType, argValue };
  }

  const attr = attrOf(tag, ctrl.attr);
  const type = attr.type?.text ?? '';
  const cemDefault = parseDefault(attr.default);

  // Control kind + options.
  if (ctrl.control) {
    argType.control = ctrl.control;
    if (ctrl.options) argType.options = ctrl.options;
  } else if (type === 'boolean') {
    argType.control = 'boolean';
  } else {
    let opts = ctrl.options ?? unionLiterals(type);
    // Drop long-form size synonyms when the short forms are present.
    if (opts.includes('m') && opts.some(o => SIZE_SYNONYMS.has(o))) {
      opts = opts.filter(o => !SIZE_SYNONYMS.has(o));
    }
    if (opts.length >= 2) {
      argType.control = 'select';
      argType.options = opts;
    } else if (/\bnumber\b/.test(type) && !/\bstring\b/.test(type)) {
      argType.control = 'number';
    } else {
      argType.control = 'text';
    }
  }

  argType.description = ctrl.description ?? attr.description ?? undefined;
  if (argType.description === undefined) delete argType.description;

  // Document the component's real default in the docs table.
  if (cemDefault !== undefined && cemDefault !== null && cemDefault !== '') {
    argType.table = { defaultValue: { summary: String(cemDefault) } };
  }

  argValue = 'default' in ctrl ? ctrl.default : cemDefault;
  return { argType, argValue };
}

// ── Story file serialization ──────────────────────────────────────────────────
const unquoteKeys = s => s.replace(/"([A-Za-z_$][A-Za-z0-9_$]*)":/g, '$1:');

function componentImports(deps) {
  return deps.map(d => `import '@awesome.me/webawesome/dist/components/${d}/${d}.js';`).join('\n');
}

function generate(cfg) {
  const argTypes = {};
  const args = {};
  for (const ctrl of cfg.controls) {
    const { argType, argValue } = buildControl(cfg.tag, ctrl);
    argTypes[ctrl.key] = argType;
    if (argValue !== undefined) args[ctrl.key] = argValue;
  }

  const handles = cfg.handles ?? eventsOf(cfg.tag);

  const at = unquoteKeys(JSON.stringify(argTypes, null, 6)).replace(/\n/g, '\n  ');
  const a = unquoteKeys(JSON.stringify(args, null, 6)).replace(/\n/g, '\n  ');

  return `import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
${componentImports(cfg.deps)}

const meta: Meta = {
  title: '${cfg.title}',
  component: '${cfg.tag}',
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: ${JSON.stringify(cfg.description)} } },
    actions: { handles: ${JSON.stringify(handles)} }
  },
  argTypes: ${at},
  args: ${a},
  render: ${cfg.render}
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
`;
}

// ── Component catalog ─────────────────────────────────────────────────────────
// Each entry: tag, title, description, deps (component dirs to import),
// controls (attribute- or slot-backed), and a curated render template.
const COMPONENTS = [
  {
    tag: 'wa-button',
    title: 'Components/Button',
    description: 'Triggers actions and navigation.',
    deps: ['button'],
    controls: [
      { key: 'label', virtual: true, control: 'text', default: 'Button', description: 'Slot content (button label)' },
      { key: 'variant', attr: 'variant' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'size', attr: 'size' },
      { key: 'type', attr: 'type' },
      { key: 'href', attr: 'href', control: 'text', default: '', description: 'Renders as an <a> link when set' },
      { key: 'target', attr: 'target', default: '_self' },
      { key: 'disabled', attr: 'disabled' },
      { key: 'loading', attr: 'loading' },
      { key: 'pill', attr: 'pill', description: 'Fully rounded corners' },
      { key: 'withCaret', attr: 'with-caret', description: 'Show dropdown caret (with-caret)' }
    ],
    render: `(args) => html\`
    <wa-button
      variant=\${args.variant}
      appearance=\${args.appearance}
      size=\${args.size}
      type=\${args.type}
      href=\${args.href || undefined}
      target=\${args.target}
      ?disabled=\${args.disabled}
      ?loading=\${args.loading}
      ?pill=\${args.pill}
      ?with-caret=\${args.withCaret}
    >\${args.label}</wa-button>
  \``
  },

  {
    tag: 'wa-button-group',
    title: 'Components/Button Group',
    description: 'Groups related buttons visually and semantically.',
    deps: ['button-group', 'button'],
    controls: [
      { key: 'label', attr: 'label', default: 'Action group', description: 'Accessible label for the group' },
      { key: 'orientation', attr: 'orientation' }
    ],
    render: `(args) => html\`
    <wa-button-group label=\${args.label} orientation=\${args.orientation}>
      <wa-button>First</wa-button>
      <wa-button>Second</wa-button>
      <wa-button>Third</wa-button>
    </wa-button-group>
  \``
  },

  {
    tag: 'wa-dropdown',
    title: 'Components/Dropdown',
    description: 'Button-triggered menu of options.',
    deps: ['dropdown', 'dropdown-item', 'button', 'divider'],
    controls: [
      { key: 'placement', attr: 'placement' },
      { key: 'size', attr: 'size' },
      { key: 'distance', attr: 'distance', description: 'Gap between trigger and menu (px)' },
      { key: 'skidding', attr: 'skidding', description: 'Offset along the trigger edge (px)' }
    ],
    render: `(args) => html\`
    <wa-dropdown placement=\${args.placement} size=\${args.size} distance=\${args.distance} skidding=\${args.skidding}>
      <wa-button slot="trigger" with-caret>Menu</wa-button>
      <wa-dropdown-item>Profile</wa-dropdown-item>
      <wa-dropdown-item>Settings</wa-dropdown-item>
      <wa-dropdown-item disabled>Disabled item</wa-dropdown-item>
      <wa-divider></wa-divider>
      <wa-dropdown-item>Sign out</wa-dropdown-item>
    </wa-dropdown>
  \``
  },

  {
    tag: 'wa-input',
    title: 'Components/Input',
    description: 'Single-line text field.',
    deps: ['input'],
    controls: [
      { key: 'type', attr: 'type' },
      { key: 'label', attr: 'label', default: 'Label' },
      { key: 'hint', attr: 'hint', default: '', description: 'Helper text below the field (hint attr)' },
      { key: 'placeholder', attr: 'placeholder', default: 'Placeholder…' },
      { key: 'value', attr: 'value', control: 'text', default: '' },
      { key: 'size', attr: 'size' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'withClear', attr: 'with-clear', description: 'Show clear button (with-clear)' },
      { key: 'passwordToggle', attr: 'password-toggle', description: 'Show password toggle (password-toggle)' },
      { key: 'disabled', attr: 'disabled' },
      { key: 'readonly', attr: 'readonly' },
      { key: 'required', attr: 'required' },
      { key: 'spellcheck', attr: 'spellcheck' },
      { key: 'inputmode', attr: 'inputmode' }
    ],
    render: `(args) => html\`
    <wa-input
      type=\${args.type}
      label=\${args.label}
      hint=\${args.hint}
      placeholder=\${args.placeholder}
      value=\${args.value}
      size=\${args.size}
      appearance=\${args.appearance}
      inputmode=\${args.inputmode || undefined}
      ?with-clear=\${args.withClear}
      ?password-toggle=\${args.passwordToggle}
      ?disabled=\${args.disabled}
      ?readonly=\${args.readonly}
      ?required=\${args.required}
      ?spellcheck=\${args.spellcheck}
    ></wa-input>
  \``
  },

  {
    tag: 'wa-textarea',
    title: 'Components/Textarea',
    description: 'Multi-line text input.',
    deps: ['textarea'],
    controls: [
      { key: 'label', attr: 'label', default: 'Label' },
      { key: 'hint', attr: 'hint', default: '' },
      { key: 'placeholder', attr: 'placeholder', default: 'Enter text…' },
      { key: 'value', attr: 'value', control: 'text', default: '' },
      { key: 'size', attr: 'size' },
      { key: 'rows', attr: 'rows' },
      { key: 'resize', attr: 'resize' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'withCount', attr: 'with-count', description: 'Show character count (with-count)' },
      { key: 'disabled', attr: 'disabled' },
      { key: 'readonly', attr: 'readonly' },
      { key: 'required', attr: 'required' }
    ],
    render: `(args) => html\`
    <wa-textarea
      label=\${args.label}
      hint=\${args.hint}
      placeholder=\${args.placeholder}
      value=\${args.value}
      size=\${args.size}
      rows=\${args.rows}
      resize=\${args.resize}
      appearance=\${args.appearance}
      ?with-count=\${args.withCount}
      ?disabled=\${args.disabled}
      ?readonly=\${args.readonly}
      ?required=\${args.required}
    ></wa-textarea>
  \``
  },

  {
    tag: 'wa-checkbox',
    title: 'Components/Checkbox',
    description: 'Binary on/off toggle. The label is slot content.',
    deps: ['checkbox'],
    controls: [
      { key: 'label', virtual: true, control: 'text', default: 'Checkbox label', description: 'Label (slot content)' },
      { key: 'hint', attr: 'hint', default: '', description: 'Helper text (hint attr)' },
      { key: 'value', attr: 'value', control: 'text', default: 'on' },
      { key: 'size', attr: 'size' },
      { key: 'checked', attr: 'checked', default: false },
      { key: 'indeterminate', attr: 'indeterminate' },
      { key: 'disabled', attr: 'disabled' },
      { key: 'required', attr: 'required' }
    ],
    render: `(args) => html\`
    <wa-checkbox
      value=\${args.value}
      size=\${args.size}
      hint=\${args.hint}
      ?checked=\${args.checked}
      ?indeterminate=\${args.indeterminate}
      ?disabled=\${args.disabled}
      ?required=\${args.required}
    >\${args.label}</wa-checkbox>
  \``
  },

  {
    tag: 'wa-checkbox-group',
    title: 'Components/Checkbox Group',
    description: 'Fieldset wrapper for related checkboxes.',
    deps: ['checkbox-group', 'checkbox'],
    controls: [
      { key: 'label', attr: 'label', default: 'Pick options' },
      { key: 'hint', attr: 'hint', default: '' },
      { key: 'size', attr: 'size', default: 'm' },
      { key: 'orientation', attr: 'orientation' },
      { key: 'required', attr: 'required' }
    ],
    render: `(args) => html\`
    <wa-checkbox-group
      label=\${args.label}
      hint=\${args.hint}
      size=\${args.size}
      orientation=\${args.orientation}
      ?required=\${args.required}
    >
      <wa-checkbox value="a">Option A</wa-checkbox>
      <wa-checkbox value="b" checked>Option B</wa-checkbox>
      <wa-checkbox value="c">Option C</wa-checkbox>
    </wa-checkbox-group>
  \``
  },

  {
    tag: 'wa-radio',
    title: 'Components/Radio',
    description: 'Single radio option — use inside a wa-radio-group.',
    deps: ['radio', 'radio-group'],
    controls: [
      { key: 'label', virtual: true, control: 'text', default: 'Option A', description: 'Label (slot content)' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'size', attr: 'size', default: 'm' },
      { key: 'disabled', attr: 'disabled' }
    ],
    render: `(args) => html\`
    <wa-radio-group label="Choose one" value="a">
      <wa-radio value="a" appearance=\${args.appearance} size=\${args.size} ?disabled=\${args.disabled}
        >\${args.label}</wa-radio
      >
      <wa-radio value="b" appearance=\${args.appearance} size=\${args.size}>Option B</wa-radio>
      <wa-radio value="c" appearance=\${args.appearance} size=\${args.size}>Option C</wa-radio>
    </wa-radio-group>
  \``
  },

  {
    tag: 'wa-radio-group',
    title: 'Components/Radio Group',
    description: 'Mutually-exclusive set of radio options.',
    deps: ['radio-group', 'radio'],
    controls: [
      { key: 'label', attr: 'label', default: 'Choose one' },
      { key: 'hint', attr: 'hint', default: '' },
      { key: 'value', attr: 'value', control: 'text', default: 'a', description: 'Currently selected value' },
      { key: 'size', attr: 'size', default: 'm' },
      { key: 'orientation', attr: 'orientation' },
      { key: 'required', attr: 'required' },
      { key: 'disabled', attr: 'disabled' }
    ],
    render: `(args) => html\`
    <wa-radio-group
      label=\${args.label}
      hint=\${args.hint}
      value=\${args.value}
      size=\${args.size}
      orientation=\${args.orientation}
      ?required=\${args.required}
      ?disabled=\${args.disabled}
    >
      <wa-radio value="a">Option A</wa-radio>
      <wa-radio value="b">Option B</wa-radio>
      <wa-radio value="c">Option C</wa-radio>
    </wa-radio-group>
  \``
  },

  {
    tag: 'wa-select',
    title: 'Components/Select',
    description: 'Dropdown list for single or multi-selection.',
    deps: ['select', 'option'],
    controls: [
      { key: 'label', attr: 'label', default: 'Choose an option' },
      { key: 'hint', attr: 'hint', default: '' },
      { key: 'placeholder', attr: 'placeholder', default: 'Select…' },
      { key: 'size', attr: 'size' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'multiple', attr: 'multiple' },
      { key: 'maxOptionsVisible', attr: 'max-options-visible', description: 'Max visible options (max-options-visible)' },
      { key: 'withClear', attr: 'with-clear', description: 'Show clear button (with-clear)' },
      { key: 'disabled', attr: 'disabled' },
      { key: 'required', attr: 'required' }
    ],
    render: `(args) => html\`
    <wa-select
      label=\${args.label}
      hint=\${args.hint}
      placeholder=\${args.placeholder}
      size=\${args.size}
      appearance=\${args.appearance}
      max-options-visible=\${args.maxOptionsVisible}
      ?multiple=\${args.multiple}
      ?with-clear=\${args.withClear}
      ?disabled=\${args.disabled}
      ?required=\${args.required}
    >
      <wa-option value="opt1">Option 1</wa-option>
      <wa-option value="opt2">Option 2</wa-option>
      <wa-option value="opt3">Option 3</wa-option>
      <wa-option value="opt4" disabled>Option 4 (disabled)</wa-option>
    </wa-select>
  \``
  },

  {
    tag: 'wa-switch',
    title: 'Components/Switch',
    description: 'Toggle for immediate on/off actions. The label is slot content.',
    deps: ['switch'],
    controls: [
      { key: 'label', virtual: true, control: 'text', default: 'Enable feature', description: 'Label (slot content)' },
      { key: 'hint', attr: 'hint', default: '', description: 'Helper text (hint attr)' },
      { key: 'value', attr: 'value', control: 'text', default: 'on' },
      { key: 'size', attr: 'size' },
      { key: 'checked', attr: 'checked', default: false },
      { key: 'disabled', attr: 'disabled' },
      { key: 'required', attr: 'required' }
    ],
    render: `(args) => html\`
    <wa-switch
      value=\${args.value}
      size=\${args.size}
      hint=\${args.hint}
      ?checked=\${args.checked}
      ?disabled=\${args.disabled}
      ?required=\${args.required}
    >\${args.label}</wa-switch>
  \``
  },

  {
    tag: 'wa-slider',
    title: 'Components/Slider',
    description: 'Range slider for numeric values.',
    deps: ['slider'],
    controls: [
      { key: 'label', attr: 'label', default: 'Volume' },
      { key: 'hint', attr: 'hint', default: '' },
      { key: 'value', attr: 'value', control: 'number', default: 50 },
      { key: 'min', attr: 'min' },
      { key: 'max', attr: 'max' },
      { key: 'step', attr: 'step' },
      { key: 'size', attr: 'size' },
      { key: 'orientation', attr: 'orientation' },
      { key: 'withTooltip', attr: 'with-tooltip', description: 'Show value tooltip while dragging (with-tooltip)' },
      { key: 'withMarkers', attr: 'with-markers', description: 'Show step markers (with-markers)' },
      { key: 'disabled', attr: 'disabled' }
    ],
    render: `(args) => html\`
    <wa-slider
      label=\${args.label}
      hint=\${args.hint}
      value=\${args.value}
      min=\${args.min}
      max=\${args.max}
      step=\${args.step}
      size=\${args.size}
      orientation=\${args.orientation}
      ?with-tooltip=\${args.withTooltip}
      ?with-markers=\${args.withMarkers}
      ?disabled=\${args.disabled}
    ></wa-slider>
  \``
  },

  {
    tag: 'wa-color-picker',
    title: 'Components/Color Picker',
    description: 'Visual color selection widget.',
    deps: ['color-picker'],
    controls: [
      { key: 'value', attr: 'value', control: 'text', default: '#0073e6', description: 'Color value (hex, rgb, hsl…)' },
      { key: 'label', attr: 'label', default: 'Color' },
      { key: 'format', attr: 'format' },
      { key: 'size', attr: 'size' },
      { key: 'opacity', attr: 'opacity', description: 'Enable the opacity slider' },
      { key: 'swatches', attr: 'swatches', control: 'text', default: '', description: 'Semicolon-separated swatch colors' },
      { key: 'disabled', attr: 'disabled' }
    ],
    render: `(args) => html\`
    <wa-color-picker
      value=\${args.value}
      label=\${args.label}
      format=\${args.format}
      size=\${args.size}
      swatches=\${args.swatches}
      ?opacity=\${args.opacity}
      ?disabled=\${args.disabled}
    ></wa-color-picker>
  \``
  },

  {
    tag: 'wa-number-input',
    title: 'Components/Number Input',
    description: 'Numeric input with optional stepper buttons.',
    deps: ['number-input'],
    controls: [
      { key: 'label', attr: 'label', default: 'Quantity' },
      { key: 'hint', attr: 'hint', default: '' },
      { key: 'value', attr: 'value', control: 'number', default: 0 },
      { key: 'min', attr: 'min', control: 'number', default: 0 },
      { key: 'max', attr: 'max', control: 'number', default: 100 },
      { key: 'step', attr: 'step', control: 'number' },
      { key: 'size', attr: 'size' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'withoutSteppers', attr: 'without-steppers', description: 'Hide the +/− buttons (without-steppers)' },
      { key: 'disabled', attr: 'disabled' },
      { key: 'readonly', attr: 'readonly' },
      { key: 'required', attr: 'required' }
    ],
    render: `(args) => html\`
    <wa-number-input
      label=\${args.label}
      hint=\${args.hint}
      value=\${args.value}
      min=\${args.min}
      max=\${args.max}
      step=\${args.step}
      size=\${args.size}
      appearance=\${args.appearance}
      ?without-steppers=\${args.withoutSteppers}
      ?disabled=\${args.disabled}
      ?readonly=\${args.readonly}
      ?required=\${args.required}
    ></wa-number-input>
  \``
  },

  {
    tag: 'wa-rating',
    title: 'Components/Rating',
    description: 'Star rating widget.',
    deps: ['rating'],
    controls: [
      { key: 'label', attr: 'label', default: 'Rating', description: 'Accessible label' },
      { key: 'value', attr: 'value', control: 'number', default: 3 },
      { key: 'max', attr: 'max' },
      { key: 'precision', attr: 'precision', description: 'Fractional step (0.5 = half stars)' },
      { key: 'size', attr: 'size' },
      { key: 'readonly', attr: 'readonly' },
      { key: 'disabled', attr: 'disabled' }
    ],
    render: `(args) => html\`
    <wa-rating
      label=\${args.label}
      value=\${args.value}
      max=\${args.max}
      precision=\${args.precision}
      size=\${args.size}
      ?readonly=\${args.readonly}
      ?disabled=\${args.disabled}
    ></wa-rating>
  \``
  },

  {
    tag: 'wa-accordion',
    title: 'Components/Accordion',
    description: 'Vertically stacked expandable sections.',
    deps: ['accordion', 'accordion-item'],
    controls: [
      { key: 'mode', attr: 'mode', description: 'How many items can be open at once' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'iconPlacement', attr: 'icon-placement', description: 'Toggle icon position (icon-placement)' },
      {
        key: 'headingLevel',
        attr: 'heading-level',
        control: 'select',
        options: [1, 2, 3, 4, 5, 6],
        default: 3,
        description: 'Heading element level for a11y (heading-level)'
      }
    ],
    render: `(args) => html\`
    <wa-accordion
      mode=\${args.mode}
      appearance=\${args.appearance}
      icon-placement=\${args.iconPlacement}
      heading-level=\${args.headingLevel}
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
  \``
  },

  {
    tag: 'wa-breadcrumb',
    title: 'Components/Breadcrumb',
    description: 'Navigation trail showing the current page hierarchy.',
    deps: ['breadcrumb', 'breadcrumb-item'],
    controls: [{ key: 'label', attr: 'label', default: 'Breadcrumb', description: 'Accessible label for the nav landmark' }],
    render: `(args) => html\`
    <wa-breadcrumb label=\${args.label}>
      <wa-breadcrumb-item href="/">Home</wa-breadcrumb-item>
      <wa-breadcrumb-item href="/components">Components</wa-breadcrumb-item>
      <wa-breadcrumb-item>Breadcrumb</wa-breadcrumb-item>
    </wa-breadcrumb>
  \``
  },

  {
    tag: 'wa-tab-group',
    title: 'Components/Tab Group',
    description: 'Shows one content panel at a time via a tab strip.',
    deps: ['tab-group', 'tab', 'tab-panel'],
    controls: [
      { key: 'placement', attr: 'placement' },
      { key: 'activation', attr: 'activation', description: 'auto = activate on focus; manual = Enter/Space' },
      { key: 'withoutScrollControls', attr: 'without-scroll-controls', description: 'Hide overflow scroll arrows' }
    ],
    render: `(args) => html\`
    <wa-tab-group
      placement=\${args.placement}
      activation=\${args.activation}
      ?without-scroll-controls=\${args.withoutScrollControls}
    >
      <wa-tab slot="nav" panel="general">General</wa-tab>
      <wa-tab slot="nav" panel="advanced">Advanced</wa-tab>
      <wa-tab slot="nav" panel="preview">Preview</wa-tab>
      <wa-tab slot="nav" panel="disabled" disabled>Disabled</wa-tab>

      <wa-tab-panel name="general">General settings content goes here.</wa-tab-panel>
      <wa-tab-panel name="advanced">Advanced settings content goes here.</wa-tab-panel>
      <wa-tab-panel name="preview">Preview content goes here.</wa-tab-panel>
      <wa-tab-panel name="disabled">This tab is disabled.</wa-tab-panel>
    </wa-tab-group>
  \``
  },

  {
    tag: 'wa-tree',
    title: 'Components/Tree',
    description: 'Hierarchical selectable tree list.',
    deps: ['tree', 'tree-item'],
    controls: [{ key: 'selection', attr: 'selection', description: 'Selection mode' }],
    handles: ['wa-selection-change', 'wa-expand', 'wa-collapse'],
    render: `(args) => html\`
    <wa-tree selection=\${args.selection}>
      <wa-tree-item>
        Documents
        <wa-tree-item>
          Reports
          <wa-tree-item>Q1 Report.pdf</wa-tree-item>
          <wa-tree-item>Q2 Report.pdf</wa-tree-item>
        </wa-tree-item>
        <wa-tree-item>Invoices</wa-tree-item>
      </wa-tree-item>
      <wa-tree-item>
        Images
        <wa-tree-item>Logo.png</wa-tree-item>
        <wa-tree-item>Banner.jpg</wa-tree-item>
      </wa-tree-item>
      <wa-tree-item disabled>Archive (disabled)</wa-tree-item>
    </wa-tree>
  \``
  },

  {
    tag: 'wa-dialog',
    title: 'Components/Dialog',
    description: 'Modal dialog for critical information or user decisions.',
    deps: ['dialog', 'button'],
    controls: [
      { key: 'label', attr: 'label', default: 'Dialog title', description: 'Dialog title (label attr)' },
      { key: 'open', attr: 'open', description: 'Whether the dialog is visible' },
      { key: 'withoutHeader', attr: 'without-header', description: 'Hide the header (without-header)' },
      { key: 'withFooter', attr: 'with-footer', default: true, description: 'Show the footer slot (with-footer)' },
      { key: 'lightDismiss', attr: 'light-dismiss', description: 'Close on overlay click (light-dismiss)' }
    ],
    render: `(args) => html\`
    <wa-button
      @click=\${(e: Event) => {
        const dialog = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement & { open: boolean };
        dialog.open = true;
      }}
      >Open dialog</wa-button
    >
    <wa-dialog
      label=\${args.label}
      ?open=\${args.open}
      ?without-header=\${args.withoutHeader}
      ?with-footer=\${args.withFooter}
      ?light-dismiss=\${args.lightDismiss}
    >
      <p>Dialog body content goes here. Confirm or cancel to dismiss.</p>
      <wa-button slot="footer" appearance="outlined" data-dialog="close">Cancel</wa-button>
      <wa-button slot="footer" variant="brand" data-dialog="close">Confirm</wa-button>
    </wa-dialog>
  \``
  },

  {
    tag: 'wa-drawer',
    title: 'Components/Drawer',
    description: 'Slide-in side panel for contextual content.',
    deps: ['drawer', 'button'],
    controls: [
      { key: 'label', attr: 'label', default: 'Drawer' },
      { key: 'placement', attr: 'placement' },
      { key: 'open', attr: 'open' },
      { key: 'withoutHeader', attr: 'without-header', description: 'Hide the header (without-header)' },
      { key: 'withFooter', attr: 'with-footer', default: true, description: 'Show the footer slot (with-footer)' },
      { key: 'lightDismiss', attr: 'light-dismiss', description: 'Close on overlay click (light-dismiss)' }
    ],
    render: `(args) => html\`
    <wa-button
      @click=\${(e: Event) => {
        const drawer = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement & { open: boolean };
        drawer.open = true;
      }}
      >Open drawer</wa-button
    >
    <wa-drawer
      label=\${args.label}
      placement=\${args.placement}
      ?open=\${args.open}
      ?without-header=\${args.withoutHeader}
      ?with-footer=\${args.withFooter}
      ?light-dismiss=\${args.lightDismiss}
    >
      <p>Drawer body content.</p>
      <wa-button slot="footer" data-drawer="close">Close</wa-button>
    </wa-drawer>
  \``
  },

  {
    tag: 'wa-tooltip',
    title: 'Components/Tooltip',
    description: 'Brief contextual text shown on hover/focus. Anchored to another element via the `for` attribute.',
    deps: ['tooltip', 'button'],
    controls: [
      { key: 'content', virtual: true, control: 'text', default: 'This is a tooltip', description: 'Tooltip text (default slot)' },
      { key: 'placement', attr: 'placement' },
      { key: 'trigger', attr: 'trigger', control: 'text', default: 'hover focus', description: 'Space-separated: hover focus click manual' },
      { key: 'distance', attr: 'distance', description: 'Gap between tooltip and anchor (px)' },
      { key: 'skidding', attr: 'skidding' },
      { key: 'withoutArrow', attr: 'without-arrow', description: 'Hide the arrow tip (without-arrow)' },
      { key: 'showDelay', attr: 'show-delay', description: 'Show delay in ms (show-delay)' },
      { key: 'hideDelay', attr: 'hide-delay', description: 'Hide delay in ms (hide-delay)' },
      { key: 'disabled', attr: 'disabled' }
    ],
    render: `(args) => html\`
    <wa-button id="tooltip-anchor">Hover me</wa-button>
    <wa-tooltip
      for="tooltip-anchor"
      placement=\${args.placement}
      trigger=\${args.trigger}
      distance=\${args.distance}
      skidding=\${args.skidding}
      show-delay=\${args.showDelay}
      hide-delay=\${args.hideDelay}
      ?without-arrow=\${args.withoutArrow}
      ?disabled=\${args.disabled}
      >\${args.content}</wa-tooltip
    >
  \``
  },

  {
    tag: 'wa-popover',
    title: 'Components/Popover',
    description: 'Floating contextual panel anchored to a trigger via the `for` attribute.',
    deps: ['popover', 'button'],
    controls: [
      { key: 'placement', attr: 'placement' },
      { key: 'distance', attr: 'distance' },
      { key: 'skidding', attr: 'skidding' },
      { key: 'withoutArrow', attr: 'without-arrow', description: 'Hide the arrow (without-arrow)' },
      { key: 'open', attr: 'open', description: 'Whether the popover is visible' }
    ],
    render: `(args) => html\`
    <wa-button id="popover-anchor">Toggle popover</wa-button>
    <wa-popover
      for="popover-anchor"
      placement=\${args.placement}
      distance=\${args.distance}
      skidding=\${args.skidding}
      ?without-arrow=\${args.withoutArrow}
      ?open=\${args.open}
    >
      <div style="max-width:240px">
        <strong>Popover heading</strong>
        <p style="margin:0.5rem 0 0">Popover body content.</p>
      </div>
    </wa-popover>
  \``
  },

  {
    tag: 'wa-callout',
    title: 'Components/Callout',
    description: 'Highlighted inline notice for important messages.',
    deps: ['callout', 'icon'],
    controls: [
      { key: 'variant', attr: 'variant' },
      { key: 'appearance', attr: 'appearance', default: 'accent' },
      { key: 'size', attr: 'size' }
    ],
    render: `(args) => html\`
    <wa-callout variant=\${args.variant} appearance=\${args.appearance} size=\${args.size}>
      <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
      <strong>Notice</strong> — this is a callout message. Use the controls to change variant and appearance.
    </wa-callout>
  \``
  },

  {
    tag: 'wa-badge',
    title: 'Components/Badge',
    description: 'Compact status, count, or label indicator.',
    deps: ['badge'],
    controls: [
      { key: 'label', virtual: true, control: 'text', default: '12', description: 'Badge content (slot)' },
      { key: 'variant', attr: 'variant' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'attention', attr: 'attention', description: 'Animated attention effect' },
      { key: 'pill', attr: 'pill', description: 'Fully rounded pill shape' }
    ],
    render: `(args) => html\`
    <wa-badge variant=\${args.variant} appearance=\${args.appearance} attention=\${args.attention} ?pill=\${args.pill}
      >\${args.label}</wa-badge
    >
  \``
  },

  {
    tag: 'wa-spinner',
    title: 'Components/Spinner',
    description: 'Animated loading indicator. Size and color are controlled with CSS (font-size, --track-color, --indicator-color).',
    deps: ['spinner'],
    controls: [
      { key: 'size', virtual: true, control: 'text', default: '2rem', description: 'Spinner size (font-size CSS value)' }
    ],
    handles: [],
    render: `(args) => html\`
    <wa-spinner style="font-size:\${args.size}"></wa-spinner>
  \``
  },

  {
    tag: 'wa-progress-bar',
    title: 'Components/Progress Bar',
    description: 'Horizontal progress indicator.',
    deps: ['progress-bar'],
    controls: [
      { key: 'value', attr: 'value', control: 'number', default: 40 },
      { key: 'label', attr: 'label', default: 'Loading…', description: 'Accessible label' },
      { key: 'indeterminate', attr: 'indeterminate', description: 'Unknown-progress animation' }
    ],
    render: `(args) => html\`
    <wa-progress-bar value=\${args.value} label=\${args.label} ?indeterminate=\${args.indeterminate}></wa-progress-bar>
  \``
  },

  {
    tag: 'wa-progress-ring',
    title: 'Components/Progress Ring',
    description: 'Circular progress indicator.',
    deps: ['progress-ring'],
    controls: [
      { key: 'value', attr: 'value', control: 'number', default: 65 },
      { key: 'label', attr: 'label', default: 'Upload progress', description: 'Accessible label' }
    ],
    render: `(args) => html\`
    <wa-progress-ring value=\${args.value} label=\${args.label}>\${args.value}%</wa-progress-ring>
  \``
  },

  {
    tag: 'wa-skeleton',
    title: 'Components/Skeleton',
    description: 'Content placeholder while data is loading.',
    deps: ['skeleton'],
    controls: [{ key: 'effect', attr: 'effect', default: 'sheen', description: 'Loading animation effect' }],
    handles: [],
    render: `(args) => html\`
    <div style="display:flex;flex-direction:column;gap:0.5rem;width:240px">
      <wa-skeleton effect=\${args.effect} style="width:80%;height:1.5rem;border-radius:4px"></wa-skeleton>
      <wa-skeleton effect=\${args.effect} style="width:100%;height:1rem;border-radius:4px"></wa-skeleton>
      <wa-skeleton effect=\${args.effect} style="width:90%;height:1rem;border-radius:4px"></wa-skeleton>
      <wa-skeleton effect=\${args.effect} style="width:40px;height:40px;border-radius:50%"></wa-skeleton>
    </div>
  \``
  },

  {
    tag: 'wa-card',
    title: 'Components/Card',
    description: 'Container for grouped related content.',
    deps: ['card', 'button'],
    controls: [
      { key: 'appearance', attr: 'appearance' },
      { key: 'orientation', attr: 'orientation' },
      { key: 'withHeader', attr: 'with-header', default: true, description: 'Show the header slot (with-header)' },
      { key: 'withFooter', attr: 'with-footer', description: 'Show the footer slot (with-footer)' }
    ],
    render: `(args) => html\`
    <wa-card
      appearance=\${args.appearance}
      orientation=\${args.orientation}
      ?with-header=\${args.withHeader}
      ?with-footer=\${args.withFooter}
      style="max-width:320px"
    >
      <span slot="header">Card Header</span>
      <p>Main card body content. Toggle with-header and with-footer to show/hide those slots.</p>
      <div slot="footer"><wa-button size="s" variant="brand">Action</wa-button></div>
    </wa-card>
  \``
  },

  {
    tag: 'wa-divider',
    title: 'Components/Divider',
    description: 'Visual separator between sections.',
    deps: ['divider'],
    controls: [{ key: 'orientation', attr: 'orientation', description: 'Line direction (orientation attr)' }],
    handles: [],
    render: `(args) => html\`
    <div
      style="display:flex;flex-direction:\${args.orientation === 'vertical'
        ? 'row'
        : 'column'};gap:1rem;align-items:center;height:\${args.orientation === 'vertical' ? '80px' : 'auto'}"
    >
      <span>\${args.orientation === 'vertical' ? 'Left' : 'Above'}</span>
      <wa-divider
        orientation=\${args.orientation}
        style=\${args.orientation === 'vertical' ? 'height:100%;align-self:stretch' : ''}
      ></wa-divider>
      <span>\${args.orientation === 'vertical' ? 'Right' : 'Below'}</span>
    </div>
  \``
  },

  {
    tag: 'wa-avatar',
    title: 'Components/Avatar',
    description: 'Person or object avatar with image, initials, or icon.',
    deps: ['avatar'],
    controls: [
      { key: 'image', attr: 'image', control: 'text', default: '', description: 'Image URL' },
      { key: 'label', attr: 'label', default: 'John Doe', description: 'Accessible label' },
      { key: 'initials', attr: 'initials', default: 'JD', description: 'Fallback initials (1–2 chars)' },
      { key: 'shape', attr: 'shape' },
      { key: 'loading', attr: 'loading' }
    ],
    render: `(args) => html\`
    <wa-avatar
      image=\${args.image}
      label=\${args.label}
      initials=\${args.initials}
      shape=\${args.shape}
      loading=\${args.loading}
    ></wa-avatar>
  \``
  },

  {
    tag: 'wa-tag',
    title: 'Components/Tag',
    description: 'Compact label, chip, or category marker.',
    deps: ['tag'],
    controls: [
      { key: 'label', virtual: true, control: 'text', default: 'Tag', description: 'Tag text (slot content)' },
      { key: 'variant', attr: 'variant' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'size', attr: 'size' },
      { key: 'withRemove', attr: 'with-remove', description: 'Show the remove button (with-remove)' },
      { key: 'pill', attr: 'pill' }
    ],
    render: `(args) => html\`
    <wa-tag
      variant=\${args.variant}
      appearance=\${args.appearance}
      size=\${args.size}
      ?with-remove=\${args.withRemove}
      ?pill=\${args.pill}
    >\${args.label}</wa-tag>
  \``
  },

  {
    tag: 'wa-icon',
    title: 'Components/Icon',
    description:
      'Scalable vector icon from the Font Awesome icon library. Requires a Font Awesome kit or a registered icon library to display.',
    deps: ['icon'],
    controls: [
      { key: 'name', attr: 'name', control: 'text', default: 'star', description: 'Icon name (e.g. star, user, home)' },
      { key: 'label', attr: 'label', default: '', description: 'Accessible label. Leave empty for decorative icons.' },
      {
        key: 'variant',
        attr: 'variant',
        control: 'select',
        options: ['solid', 'regular', 'light', 'thin', 'duotone', 'brands'],
        default: 'regular',
        description: 'Font Awesome style variant'
      },
      { key: 'size', virtual: true, control: 'text', default: '1.5rem', description: 'Font-size CSS value' }
    ],
    render: `(args) => html\`
    <wa-icon
      name=\${args.name}
      label=\${args.label}
      variant=\${args.variant}
      style="font-size:\${args.size}"
    ></wa-icon>
  \``
  },

  {
    tag: 'wa-details',
    title: 'Components/Details',
    description: 'Summary/expand disclosure widget (like the HTML <details> element).',
    deps: ['details'],
    controls: [
      { key: 'summary', attr: 'summary', control: 'text', default: 'Click to expand', description: 'Summary text (summary attr/slot)' },
      { key: 'appearance', attr: 'appearance' },
      { key: 'iconPlacement', attr: 'icon-placement', description: 'Toggle icon position (icon-placement)' },
      { key: 'open', attr: 'open' },
      { key: 'disabled', attr: 'disabled' }
    ],
    render: `(args) => html\`
    <wa-details
      summary=\${args.summary}
      appearance=\${args.appearance}
      icon-placement=\${args.iconPlacement}
      ?open=\${args.open}
      ?disabled=\${args.disabled}
    >
      Expanded content goes here. This can contain any HTML.
    </wa-details>
  \``
  },

  {
    tag: 'wa-split-panel',
    title: 'Components/Split Panel',
    description: 'Two resizable panels separated by a draggable divider.',
    deps: ['split-panel'],
    controls: [
      { key: 'position', attr: 'position', control: 'number', default: 50, description: 'Divider position (0–100%)' },
      { key: 'orientation', attr: 'orientation', description: 'Layout direction (orientation attr)' },
      { key: 'primary', attr: 'primary', description: 'Panel that keeps its size on resize' },
      { key: 'disabled', attr: 'disabled', description: 'Lock the divider' },
      { key: 'snap', attr: 'snap', control: 'text', default: '', description: 'Snap points (e.g. "100px 50%")' },
      { key: 'snapThreshold', attr: 'snap-threshold', description: 'Snap range in px (snap-threshold)' },
      { key: 'positionInPixels', attr: 'position-in-pixels', description: 'Use a pixel position instead of % (position-in-pixels)' }
    ],
    render: `(args) => html\`
    <wa-split-panel
      position=\${args.position}
      orientation=\${args.orientation}
      primary=\${args.primary}
      snap=\${args.snap}
      snap-threshold=\${args.snapThreshold}
      ?disabled=\${args.disabled}
      ?position-in-pixels=\${args.positionInPixels}
      style="height:200px;border:1px solid var(--wa-color-surface-border,#ccc);border-radius:4px"
    >
      <div slot="start" style="padding:1rem;height:100%;box-sizing:border-box">Start panel</div>
      <div slot="end" style="padding:1rem;height:100%;box-sizing:border-box">End panel</div>
    </wa-split-panel>
  \``
  }
];

// ── Utilities catalog ─────────────────────────────────────────────────────────
const UTILITIES = [
  {
    tag: 'wa-popup',
    title: 'Utilities/Popup',
    description:
      'Low-level positioning primitive that anchors one element to another. Used internally by Dropdown, ' +
      'Popover, Select and Tooltip. Use it directly when you need custom anchor-based positioning.',
    deps: ['popup', 'button'],
    controls: [
      { key: 'placement', attr: 'placement', description: 'Preferred placement relative to the anchor' },
      { key: 'distance', attr: 'distance', control: { type: 'number', min: 0, max: 40 }, default: 8 },
      { key: 'skidding', attr: 'skidding', control: { type: 'number', min: -40, max: 40 }, default: 0 },
      { key: 'arrow', attr: 'arrow', description: 'Show an arrow pointing to the anchor' },
      { key: 'active', attr: 'active', default: true, description: 'Activates positioning — popup is visible when true' }
    ],
    render: `(args) => html\`
    <div style="display:flex;justify-content:center;padding:80px 0;">
      <wa-popup
        placement=\${args.placement}
        distance=\${args.distance}
        skidding=\${args.skidding}
        ?arrow=\${args.arrow}
        ?active=\${args.active}
      >
        <wa-button slot="anchor">Anchor</wa-button>
        <div
          style="background:var(--wa-color-surface-raised,#fff);border:1px solid var(--wa-color-surface-border,#ccc);border-radius:var(--wa-border-radius-m,6px);padding:var(--wa-space-s,0.5rem) var(--wa-space-m,1rem);"
        >
          Popup content
        </div>
      </wa-popup>
    </div>
  \``
  }
];

// ── Emit ──────────────────────────────────────────────────────────────────────
function tagToFile(tag) {
  return tag; // e.g. wa-button -> wa-button.stories.ts
}

const compDir = join(root, 'stories', 'components');
const utilDir = join(root, 'stories', 'utilities');
mkdirSync(compDir, { recursive: true });
mkdirSync(utilDir, { recursive: true });

let count = 0;
for (const cfg of COMPONENTS) {
  writeFileSync(join(compDir, `${tagToFile(cfg.tag)}.stories.ts`), generate(cfg));
  console.log(`✓ ${cfg.tag}`);
  count++;
}
for (const cfg of UTILITIES) {
  writeFileSync(join(utilDir, `${tagToFile(cfg.tag)}.stories.ts`), generate(cfg));
  console.log(`✓ ${cfg.tag} (utility)`);
  count++;
}

console.log(`\n✅ Generated ${count} stories from the Web Awesome CEM.`);
