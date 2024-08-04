<template>
  <t-form :data="root" :rules="FORM_RULES">
    <t-form-item :label="t('components.apisixUpstreamForm.name')" name="name">
      <t-input
        v-model="root.name"
        :style="{ width: '480px' }"
        :placeholder="t('components.apisixUpstreamForm.namePlaceholder')"
      />
    </t-form-item>
    <t-form-item :label="t('components.apisixUpstreamForm.desc')" name="desc">
      <t-input
        v-model="root.desc"
        :style="{ width: '480px' }"
        :placeholder="t('components.apisixUpstreamForm.descPlaceholder')"
      />
    </t-form-item>

    <t-form-item :label="t('components.apisixUpstreamForm.upstreamType')" name="upstreamType">
      <t-radio-group v-model="upstreamType">
        <t-radio-button
          v-for="(item, index) in UPSTREAM_TYPE_OPTIONS"
          :key="index"
          :label="item"
          :value="Number(index)"
        />
      </t-radio-group>
    </t-form-item>

    <t-form-item
      v-if="upstreamType === UPSTREAM_TYPE.NODES"
      :label="t('components.apisixUpstreamForm.nodes')"
      name="nodes"
    >
      <!-- 这个div是转换成block -->
      <div>
        <t-form
          v-for="(
            nodeItem, index
          ) in root.nodes as ApisixAdminRoutesGet200ResponseListInnerValueUpstreamNodesAnyOfInner[]"
          :key="index"
          style="margin-bottom: var(--td-comp-margin-xxl)"
          layout="inline"
          :data="nodeItem"
          :rules="UPSTREAM_NODES_RULE"
        >
          <t-form-item :label="$t('components.apisixUpstreamForm.nodesInner.host')" name="nodes.host">
            <t-input
              v-model="nodeItem.host"
              :placeholder="$t('components.apisixUpstreamForm.nodesInner.hostPlaceholder')"
            />
          </t-form-item>
          <t-form-item :label="$t('components.apisixUpstreamForm.nodesInner.port')" name="nodes.port">
            <t-input-number
              v-model="nodeItem.port"
              theme="normal"
              :placeholder="$t('components.apisixUpstreamForm.nodesInner.portPlaceholder')"
            />
          </t-form-item>
          <t-form-item :label="$t('components.apisixUpstreamForm.nodesInner.weight')" name="nodes.weight">
            <t-input-number
              v-model="nodeItem.weight"
              theme="normal"
              :placeholder="$t('components.apisixUpstreamForm.nodesInner.weightPlaceholder')"
            />
          </t-form-item>
          <t-button theme="danger" style="margin-left: var(--td-comp-margin-xxl)" @click="onRemoveUpstreamNode(index)">
            {{ $t('components.apisixUpstreamForm.removeNode') }}
          </t-button>
        </t-form>
        <t-button @click="onAddUpstreamNode">
          {{ $t('components.apisixUpstreamForm.addNode') }}
        </t-button>
      </div>
    </t-form-item>

    <t-form-item
      v-if="upstreamType === UPSTREAM_TYPE.DISCOVERY"
      :label="t('components.apisixUpstreamForm.discovery_type')"
      name="discovery_type"
    >
      <enum-select-input
        v-model="root.discovery_type"
        clearable
        allow-input
        :style="{ width: '480px' }"
        :options="Object.values(DISCOVERY_TYPE)"
      />
    </t-form-item>

    <t-form-item
      v-if="upstreamType === UPSTREAM_TYPE.DISCOVERY"
      :label="t('components.apisixUpstreamForm.service_name')"
      name="service_name"
    >
      <t-input
        v-model="root.service_name"
        :style="{ width: '480px' }"
        :placeholder="t('components.apisixUpstreamForm.service_namePlaceholder')"
      />
    </t-form-item>
    <slot></slot>
  </t-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';

import {
  ApisixAdminRoutesGet200ResponseListInnerValueUpstreamNodesAnyOfInner,
  ApisixAdminRoutesPostRequestUpstream,
} from '@/api/apisix/admin/typescript-axios';
import EnumSelectInput from '@/components/enum-select-input/index.vue';
import { t } from '@/locales';

import { DISCOVERY_TYPE, FORM_RULES, UPSTREAM_NODES_RULE, UPSTREAM_TYPE, UPSTREAM_TYPE_OPTIONS } from './constants';

const root = defineModel({
  type: Object as PropType<ApisixAdminRoutesPostRequestUpstream>,
  default: {},
  local: false,
});

const upstreamType = ref<UPSTREAM_TYPE>(UPSTREAM_TYPE.NODES);

const onAddUpstreamNode = () => {
  if (!root.value.nodes) {
    root.value.nodes = [];
  }
  (root.value.nodes as Array<unknown>).push({});
};
const onRemoveUpstreamNode = (i: number) => {
  (root.value.nodes as Array<unknown>).splice(i, 1);
};
</script>
