import { merge } from 'lodash';
import { FormRule } from 'tdesign-vue-next';

export const FORM_RULES_1: Record<string, FormRule[]> = {};

export const FORM_RULES_2: Record<string, FormRule[]> = merge({}, FORM_RULES_1, {});
