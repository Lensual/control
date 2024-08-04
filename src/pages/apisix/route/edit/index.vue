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
        <t-divider align="left">{{ t('pages.apisixRouteEdit.step1.basic') }}</t-divider>

        <t-form v-show="activeStep === 1" class="step-form" :data="formData" :rules="FORM_RULES_1" @submit="onNextStep">
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

          <upstream-form
            v-show="activeStep === 1"
            v-model="
              computed({
                get: () => {
                  if (!formData.upstream) {
                    formData.upstream = {};
                  }
                  return formData.upstream;
                },
                set: (v) => {
                  if (!formData.upstream) {
                    formData.upstream = {};
                  }
                  formData.upstream = v;
                },
              }).value
            "
            style="margin-bottom: var(--td-comp-margin-xxl)"
          >
          </upstream-form>

          <t-form-item>
            <t-button disabled theme="default" variant="base" @click="onPreStep">
              {{ $t('pages.apisixRouteEdit.preStep') }}
            </t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixRouteEdit.nextStep') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单2 插件配置 -->
        <t-form v-show="activeStep === 2" class="step-form" :data="formData" :rules="FORM_RULES_2" @submit="onNextStep">
          <t-form-item :label="$t('pages.apisixRouteEdit.step2.title')">
            <highlightjs
              aria-readonly="true"
              language="json"
              :code="JSON.stringify(formData, null, 2)"
              style="width: 100%"
            />
          </t-form-item>
          <t-form-item>
            <t-button theme="default" variant="base" @click="onPreStep">{{
              $t('pages.apisixRouteEdit.preStep')
            }}</t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixRouteEdit.nextStep') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单3 预览 -->
        <t-form v-show="activeStep === 3" class="step-form" :data="formData" :rules="FORM_RULES_3" @submit="onSubmit">
          <t-form-item :label="$t('pages.apisixRouteEdit.step3.title')">
            <highlightjs
              aria-readonly="true"
              language="json"
              :code="JSON.stringify(formData, null, 2)"
              style="width: 100%"
            />
          </t-form-item>
          <t-form-item>
            <t-button theme="default" variant="base" @click="onPreStep">{{
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
  ApisixAdminRoutesPost201Response,
  ApisixAdminRoutesPostRequest,
  RouteApiApisixAdminRoutesIdPatchRequest,
  RouteApiApisixAdminRoutesPostRequest,
} from '@/api/apisix/admin/typescript-axios';
import UpstreamForm from '@/components/apisix/upstream-form.vue';
import { t } from '@/locales';

import { FORM_RULES_1, FORM_RULES_2, FORM_RULES_3 } from './constants';

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

const onNextStep = (result: SubmitContext) => {
  if (result.validateResult !== true) {
    return;
  }

  activeStep.value++;
};
const onPreStep = (_e: MouseEvent) => {
  activeStep.value--;
};
const onReset = () => {
  activeStep.value = 1;
  INITIAL_DATA = {};
  formData.value = cloneDeep(INITIAL_DATA);
};
const onReapply = () => {
  onReset();
  router.replace({ query: null }); // clean query id
};
const onSubmit = async (result: SubmitContext) => {
  if (result.validateResult !== true) {
    return;
  }

  dataLoading.value = true;
  let res: AxiosResponse<ApisixAdminRoutesPost201Response>;
  try {
    if (formData.value.id) {
      res = await update();
    } else {
      res = await create();
    }
    onNextStep(result);
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
  return RouteApi.apisixAdminRoutesPost(req);
};
const update = () => {
  const req: RouteApiApisixAdminRoutesIdPatchRequest = {
    id: formData.value.id as string,
    apisixAdminRoutesPostRequest: formData.value,
  };
  return RouteApi.apisixAdminRoutesIdPatch(req);
};
const onComplete = () => {
  router.back();
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
