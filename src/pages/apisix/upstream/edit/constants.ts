import { merge } from 'lodash';
import { FormRule } from 'tdesign-vue-next';

import { t } from '@/locales';

export const FORM_RULES_1: Record<string, FormRule[]> = {
  name: [{ required: true, type: 'error' }],
};

export const UPSTREAM_NODES_RULE: Record<string, FormRule[]> = {
  host: [{ required: true, type: 'error' }],
  weight: [{ required: true, type: 'error' }],
};

export const FORM_RULES_2: Record<string, FormRule[]> = merge({}, FORM_RULES_1, {});
export const FORM_RULES_3: Record<string, FormRule[]> = merge({}, FORM_RULES_1, {});

export enum UPSTREAM_TYPE {
  NODES,
  DISCOVERY,
}
export const UPSTREAM_TYPE_OPTIONS: Record<UPSTREAM_TYPE, string> = {
  [UPSTREAM_TYPE.NODES]: t('pages.apisixRouteEdit.step1.upstreamInner.upstreamTypeInner.nodes'),
  [UPSTREAM_TYPE.DISCOVERY]: t('pages.apisixRouteEdit.step1.upstreamInner.upstreamTypeInner.discovery'),
};

export enum DISCOVERY_TYPE {
  DNS = 'dns',
  CONSUL = 'consul',
  CONSUL_KV = 'consul_kv',
  NACOS = 'nacos',
  EUREKA = 'eureka',
  KUBERNETES = 'kubernetes',
}
export const DISCOVERY_TYPE_OPTIONS: Record<DISCOVERY_TYPE, string> = {
  [DISCOVERY_TYPE.DNS]: t('pages.apisixRouteEdit.step1.upstreamInner.discoveryTypeInner.dns'),
  [DISCOVERY_TYPE.CONSUL]: t('pages.apisixRouteEdit.step1.upstreamInner.discoveryTypeInner.consul'),
  [DISCOVERY_TYPE.CONSUL_KV]: t('pages.apisixRouteEdit.step1.upstreamInner.discoveryTypeInner.consul_kv'),
  [DISCOVERY_TYPE.NACOS]: t('pages.apisixRouteEdit.step1.upstreamInner.discoveryTypeInner.nacos'),
  [DISCOVERY_TYPE.EUREKA]: t('pages.apisixRouteEdit.step1.upstreamInner.discoveryTypeInner.eureka'),
  [DISCOVERY_TYPE.KUBERNETES]: t('pages.apisixRouteEdit.step1.upstreamInner.discoveryTypeInner.kubernetes'),
};
