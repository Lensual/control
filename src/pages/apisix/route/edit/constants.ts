import { merge } from 'lodash';
import { FormRule } from 'tdesign-vue-next';

export const FORM_RULES_1: Record<string, FormRule[]> = {
  name: [{ required: true, type: 'error' }],
  uri: [{ required: true, type: 'error' }],
};

export const FORM_RULES_2: Record<string, FormRule[]> = merge(FORM_RULES_1, {});
export const FORM_RULES_3: Record<string, FormRule[]> = merge(FORM_RULES_1, {});
