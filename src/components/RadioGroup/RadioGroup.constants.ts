const CLASS_PREFIX = 'md-radio';

const DEFAULTS = {
  GROUP_DISABLED: false,
  GROUP_READONLY: false,
  GROUP_LABEL: undefined,
  GROUP_ORIENTATION: 'vertical',
  GROUP_ARIA_LABEL: 'radio button group',
  OPTION_DISABLED: false,
};

const STYLE = {
  group: `${CLASS_PREFIX}-group`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
  selected: `${CLASS_PREFIX}-selected`,
  notSelected: `${CLASS_PREFIX}-not-selected`,
  focus: `${CLASS_PREFIX}-focus`,
  icon: `${CLASS_PREFIX}-icon`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };