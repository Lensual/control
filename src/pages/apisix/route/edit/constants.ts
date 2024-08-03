import { merge } from 'lodash';
import { FormRule } from 'tdesign-vue-next';

import { ApisixAdminRoutesPostRequest } from '@/api/apisix/admin/typescript-axios';
import { t } from '@/locales';

export const FORM_RULES_1: Record<string, FormRule[]> = {
  name: [{ required: true, type: 'error' }],
  uri: [{ required: true, type: 'error' }],
  'upstream.nodes': [{ required: true, type: 'error' }],
  'upstream.discovery_type': [{ required: true, type: 'error' }],
  'upstream.service_name': [{ required: true, type: 'error' }],
};

export const UPSTREAM_NODES_RULE: Record<string, FormRule[]> = {
  host: [{ required: true, type: 'error' }],
  weight: [{ required: true, type: 'error' }],
};

export const FORM_RULES_2: Record<string, FormRule[]> = merge(FORM_RULES_1, {});
export const FORM_RULES_3: Record<string, FormRule[]> = merge(FORM_RULES_1, {});

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

// export const TYPE_OPTIONS = [
//   { label: 'Type A', value: '1' },
//   { label: 'Type B', value: '2' },
//   { label: 'Type C', value: '3' },
// ];

// export const ADDRESS_OPTIONS = [
//   { label: '广东省深圳市南山区', value: '1' },
//   { label: '北京市海淀区', value: '2' },
//   { label: '上海市徐汇区', value: '3' },
//   { label: '四川省成都市高新区', value: '4' },
//   { label: '广东省广州市天河区', value: '5' },
//   { label: '陕西省西安市高新区', value: '6' },
// ];

export const INITIAL_DATA1: ApisixAdminRoutesPostRequest = {};

// export const INITIAL_DATA2 = {
//   title: '',
//   taxNum: '',
//   address: '',
//   bank: '',
//   bankAccount: '',
//   email: '',
//   tel: '',
// };

// export const INITIAL_DATA3 = {
//   consignee: '',
//   mobileNum: '',
//   deliveryAddress: '',
//   fullAddress: '',
// };
