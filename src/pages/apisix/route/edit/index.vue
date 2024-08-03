<template>
  <div>
    <div class="form-step-container">
      <t-loading :loading="dataLoading" show-overlay>
        <!-- 简单步骤条 -->
        <t-card :bordered="false">
          <t-steps class="step-container" :current="activeStep - 1" status="process">
            <t-step-item
              :title="$t('pages.apisixRouteEdit.step1.title')"
              :content="$t('pages.apisixRouteEdit.step1.subtitle')"
            />
            <t-step-item
              :title="$t('pages.apisixRouteEdit.step2.title')"
              :content="$t('pages.apisixRouteEdit.step2.subtitle')"
            />
            <t-step-item
              :title="$t('pages.apisixRouteEdit.step3.title')"
              :content="$t('pages.apisixRouteEdit.step3.subtitle')"
            />
            <t-step-item
              :title="$t('pages.apisixRouteEdit.step4.title')"
              :content="$t('pages.apisixRouteEdit.step4.subtitle')"
            />
          </t-steps>
        </t-card>

        <!-- 分步表单1 设置路由信息 -->
        <!-- <div v-show="activeStep === 1" class="rule-tips">
          <t-alert theme="info" :title="t('pages.apisixRouteEdit.step1.rules')" :close="true">
            <template #message>
              <p>
                {{ $t('pages.apisixRouteEdit.step1.rule1') }}
              </p>
              <p>{{ $t('pages.apisixRouteEdit.step1.rule2') }}</p>
              <p>{{ $t('pages.apisixRouteEdit.step1.rule3') }}</p>
            </template>
          </t-alert>
        </div> -->

        <t-divider align="left">{{ t('pages.apisixRouteEdit.step1.basic') }}</t-divider>

        <t-form
          v-show="activeStep === 1"
          class="step-form"
          :data="formData"
          :rules="FORM_RULES_1"
          @submit="(result: SubmitContext) => onSubmitToNextForm(result, 2)"
        >
          <t-form-item :label="t('pages.apisixRouteEdit.step1.name')" name="name">
            <t-input
              v-model="formData.name"
              :style="{ width: '480px' }"
              :placeholder="t('pages.apisixRouteEdit.step1.namePlaceholder')"
            />
          </t-form-item>
          <t-form-item :label="t('pages.apisixRouteEdit.step1.desc')" name="desc">
            <t-input
              v-model="formData.desc"
              :style="{ width: '480px' }"
              :placeholder="t('pages.apisixRouteEdit.step1.descPlaceholder')"
            />
          </t-form-item>
          <t-form-item :label="t('pages.apisixRouteEdit.step1.host')" name="host">
            <t-input
              v-model="formData.host"
              :style="{ width: '480px' }"
              :placeholder="t('pages.apisixRouteEdit.step1.hostPlaceholder')"
            />
          </t-form-item>
          <t-form-item :label="t('pages.apisixRouteEdit.step1.methods')" name="methods">
            <t-select
              v-model="formData.methods"
              multiple
              :style="{ width: '480px' }"
              class="demo-select-base"
              clearable
            >
              <t-option v-for="(item, index) in METHOD_OPTIONS" :key="index" :value="item.value" :label="item.label">
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item :label="t('pages.apisixRouteEdit.step1.uri')" name="uri">
            <t-input
              v-model="formData.uri"
              :style="{ width: '480px' }"
              :placeholder="t('pages.apisixRouteEdit.step1.uriPlaceholder')"
            />
          </t-form-item>

          <t-divider align="left">{{ t('pages.apisixRouteEdit.step1.upstream') }}</t-divider>

          <t-form-item
            :label="t('pages.apisixRouteEdit.step1.upstreamInner.upstreamType')"
            name="upstream.upstreamType"
          >
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
            :label="t('pages.apisixRouteEdit.step1.upstreamInner.nodes')"
            name="upstream.nodes"
          >
            <!-- 这个div是转换成block -->
            <div>
              <t-form
                v-for="(nodeItem, index) in formData.upstream
                  ?.nodes as ApisixAdminRoutesGet200ResponseListInnerValueUpstreamNodesAnyOfInner[]"
                :key="index"
                style="margin-bottom: var(--td-comp-margin-xxl)"
                layout="inline"
                :data="nodeItem"
                :rules="UPSTREAM_NODES_RULE"
              >
                <t-form-item
                  :label="$t('pages.apisixRouteEdit.step1.upstreamInner.nodesInner.host')"
                  name="upstream.nodes.host"
                >
                  <t-input
                    v-model="nodeItem.host"
                    :placeholder="$t('pages.apisixRouteEdit.step1.upstreamInner.nodesInner.hostPlaceholder')"
                  />
                </t-form-item>
                <t-form-item
                  :label="$t('pages.apisixRouteEdit.step1.upstreamInner.nodesInner.port')"
                  name="upstream.nodes.port"
                >
                  <t-input-number
                    v-model="nodeItem.port"
                    theme="normal"
                    :placeholder="$t('pages.apisixRouteEdit.step1.upstreamInner.nodesInner.portPlaceholder')"
                  />
                </t-form-item>
                <t-form-item
                  :label="$t('pages.apisixRouteEdit.step1.upstreamInner.nodesInner.weight')"
                  name="upstream.nodes.weight"
                >
                  <t-input-number
                    v-model="nodeItem.weight"
                    theme="normal"
                    :placeholder="$t('pages.apisixRouteEdit.step1.upstreamInner.nodesInner.weightPlaceholder')"
                  />
                </t-form-item>
                <t-button
                  theme="danger"
                  style="margin-left: var(--td-comp-margin-xxl)"
                  @click="onRemoveUpstreamNode(index)"
                >
                  {{ $t('pages.apisixRouteEdit.step1.upstreamInner.removeNode') }}
                </t-button>
              </t-form>
              <t-button @click="onAddUpstreamNode">
                {{ $t('pages.apisixRouteEdit.step1.upstreamInner.addNode') }}
              </t-button>
            </div>
          </t-form-item>

          <t-form-item
            v-if="upstreamType === UPSTREAM_TYPE.DISCOVERY"
            :label="t('pages.apisixRouteEdit.step1.upstreamInner.discovery_type')"
            name="upstream.discovery_type"
          >
            <enum-select-input
              v-model="
                computed({
                  get: () => formData.upstream?.discovery_type,
                  set: (v) => {
                    if (!formData.upstream) {
                      formData.upstream = {};
                    }
                    formData.upstream.discovery_type = v;
                  },
                }).value
              "
              clearable
              allow-input
              :style="{ width: '480px' }"
              :options="Object.values(DISCOVERY_TYPE)"
            />
          </t-form-item>

          <t-form-item
            v-if="upstreamType === UPSTREAM_TYPE.DISCOVERY"
            :label="t('pages.apisixRouteEdit.step1.upstreamInner.service_name')"
            name="upstream.service_name"
          >
            <t-input
              v-model="
                computed({
                  get: () => formData.upstream?.service_name,
                  set: (v) => {
                    if (!formData.upstream) {
                      formData.upstream = {};
                    }
                    formData.upstream.service_name = v;
                  },
                }).value
              "
              :style="{ width: '480px' }"
              :placeholder="t('pages.apisixRouteEdit.step1.upstreamInner.service_namePlaceholder')"
            />
          </t-form-item>

          <t-form-item>
            <t-button disabled theme="default" variant="base" @click="onPreStep(0)">
              {{ $t('pages.apisixRouteEdit.preStep') }}
            </t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixRouteEdit.nextStep') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单2 插件配置 -->
        <t-form
          v-show="activeStep === 2"
          class="step-form"
          :data="formData"
          :rules="FORM_RULES_2"
          @submit="(result: SubmitContext) => onSubmitToNextForm(result, 3)"
        >
          <t-form-item :label="$t('pages.apisixRouteEdit.step2.title')">
            <highlightjs aria-readonly="true" language="json" :code="formDataJsonStr" style="width: 100%" />
          </t-form-item>
          <t-form-item>
            <t-button theme="default" variant="base" @click="onPreStep(1)">{{
              $t('pages.apisixRouteEdit.preStep')
            }}</t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixRouteEdit.nextStep') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单3 预览 -->
        <t-form
          v-show="activeStep === 3"
          class="step-form"
          :data="formData"
          :rules="FORM_RULES_3"
          @submit="(result: SubmitContext) => onSubmit(result, 4)"
        >
          <t-form-item :label="$t('pages.apisixRouteEdit.step3.title')">
            <highlightjs aria-readonly="true" language="json" :code="formDataJsonStr" style="width: 100%" />
          </t-form-item>
          <t-form-item>
            <t-button theme="default" variant="base" @click="onPreStep(2)">{{
              $t('pages.apisixRouteEdit.preStep')
            }}</t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixRouteEdit.submit') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单4 完成 -->
        <div v-show="activeStep === 4" class="result-success">
          <t-icon class="result-success-icon" name="check-circle" />
          <div class="result-success-title">{{ $t('pages.apisixRouteEdit.step4.successTitle') }}</div>
          <div class="result-success-describe">{{ $t('pages.apisixRouteEdit.step4.successDescribe') }}</div>
          <div>
            <t-button @click="onComplete">
              {{ $t('pages.apisixRouteEdit.step4.complete') }}
            </t-button>
            <t-button theme="default" @click="onReapply">
              {{ $t('pages.apisixRouteEdit.step4.reapply') }}
            </t-button>
          </div>
        </div>
      </t-loading>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ApisixRouteEdit',
};

export const METHOD_OPTIONS = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'PATCH', value: 'PATCH' },
  { label: 'HEAD', value: 'HEAD' },
  { label: 'OPTIONS', value: 'OPTIONS' },
  { label: 'CONNECT', value: 'CONNECT' },
  { label: 'TRACE', value: 'TRACE' },
  { label: 'PURGE', value: 'PURGE' },
];
</script>

<script setup lang="ts">
import { AxiosError, AxiosResponse } from 'axios';
import { cloneDeep } from 'lodash';
import { MessagePlugin, SubmitContext } from 'tdesign-vue-next';
import { computed, onActivated, ref } from 'vue';
import { useRouter } from 'vue-router';

import { RouteApi } from '@/api/apisix/admin';
import {
  ApisixAdminRoutesGet200ResponseListInnerValueUpstreamNodesAnyOfInner,
  ApisixAdminRoutesPost201Response,
  ApisixAdminRoutesPostRequest,
  RouteApiApisixAdminRoutesIdPatchRequest,
  RouteApiApisixAdminRoutesPostRequest,
} from '@/api/apisix/admin/typescript-axios';
import EnumSelectInput from '@/components/enum-select-input/index.vue';
import { t } from '@/locales';

import {
  DISCOVERY_TYPE,
  // ADDRESS_OPTIONS,
  FORM_RULES_1,
  FORM_RULES_2,
  FORM_RULES_3,
  UPSTREAM_NODES_RULE,
  // INITIAL_DATA1,
  // INITIAL_DATA2,
  // INITIAL_DATA3,
  UPSTREAM_TYPE,
  UPSTREAM_TYPE_OPTIONS,
  // DISCOVERY_TYPE_OPTIONS,
  // TYPE_OPTIONS,
} from './constants';

let INITIAL_DATA: ApisixAdminRoutesPostRequest = {};

const formData = ref<ApisixAdminRoutesPostRequest>(INITIAL_DATA);
const activeStep = ref(1);

const router = useRouter();

onActivated(async () => {
  onReset();

  if (!router.currentRoute.value.query.id) {
    return;
  }
  const id = router.currentRoute.value.query.id.toString();
  fetchData(id);
});

const dataLoading = ref(false);
const fetchData = async (id: string) => {
  dataLoading.value = true;
  try {
    const res = await RouteApi.apisixAdminRoutesIdGet({ id });
    INITIAL_DATA = res.data.value;
    formData.value = cloneDeep(INITIAL_DATA);
  } catch (e) {
    console.error(e);
  }
  dataLoading.value = false;
};

const onSubmitToNextForm = (result: SubmitContext, nextForm: number) => {
  if (result.validateResult !== true) {
    return;
  }

  activeStep.value = nextForm;
};
const onPreStep = (preForm: number) => {
  activeStep.value = preForm;
};
const onReset = () => {
  activeStep.value = 1;
  INITIAL_DATA = {};
  formData.value = cloneDeep(INITIAL_DATA);
};
const onReapply = () => {
  onReset();
  router.push('/apisix/route/edit'); // clean query id
};
const onSubmit = async (result: SubmitContext, nextForm: number) => {
  dataLoading.value = true;
  let res: AxiosResponse<ApisixAdminRoutesPost201Response>;
  try {
    if (formData.value.id) {
      res = await update();
    } else {
      res = await create();
    }
    onSubmitToNextForm(result, nextForm);
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.data.error_msg) {
        MessagePlugin.error(t('pages.apisixRouteEdit.submitError', { message: e.response.data.error_msg }));
      }
    }
    console.error(e);
  }
  dataLoading.value = false;
};
const create = () => {
  const req: RouteApiApisixAdminRoutesPostRequest = {
    apisixAdminRoutesPostRequest: formData.value,
  };
  return RouteApi.apisixAdminRoutesPost(req); // TODO
};
const update = () => {
  const req: RouteApiApisixAdminRoutesIdPatchRequest = {
    id: formData.value.id as string,
    apisixAdminRoutesPostRequest: formData.value,
  };
  return RouteApi.apisixAdminRoutesIdPatch(req); // TODO
};
const onComplete = () => {
  router.push({ path: '..' });
};
const upstreamType = ref<UPSTREAM_TYPE>(UPSTREAM_TYPE.NODES);
const formDataJsonStr = computed({
  get: () => JSON.stringify(formData.value, null, 2),
  set: () => {},
});
const onAddUpstreamNode = () => {
  if (!formData.value.upstream) {
    formData.value.upstream = {};
  }
  if (!formData.value.upstream.nodes) {
    formData.value.upstream.nodes = [];
  }
  (formData.value.upstream.nodes as Array<unknown>).push({});
};
const onRemoveUpstreamNode = (i: number) => {
  (formData.value.upstream.nodes as Array<unknown>).splice(i, 1);
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
