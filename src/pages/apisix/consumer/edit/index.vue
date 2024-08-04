<template>
  <div>
    <div class="form-step-container">
      <t-loading :loading="dataLoading" show-overlay>
        <!-- 简单步骤条 -->
        <t-card :bordered="false">
          <t-steps class="step-container" :current="activeStep - 1" status="process">
            <t-step-item
              :title="$t('pages.apisixConsumerEdit.step1.title')"
              :content="$t('pages.apisixConsumerEdit.step1.subtitle')"
            />
            <t-step-item
              :title="$t('pages.apisixConsumerEdit.step2.title')"
              :content="$t('pages.apisixConsumerEdit.step2.subtitle')"
            />
            <t-step-item
              :title="$t('pages.apisixConsumerEdit.step3.title')"
              :content="$t('pages.apisixConsumerEdit.step3.subtitle')"
            />
            <t-step-item
              :title="$t('pages.apisixConsumerEdit.step4.title')"
              :content="$t('pages.apisixConsumerEdit.step4.subtitle')"
            />
          </t-steps>
        </t-card>

        <!-- 分步表单1 设置路由信息 -->
        <t-divider align="left">{{ t('pages.apisixConsumerEdit.step1.basic') }}</t-divider>

        <t-form v-show="activeStep === 1" class="step-form" :data="formData" :rules="FORM_RULES_1" @submit="onNextStep">
          <t-form-item :label="t('pages.apisixConsumerEdit.step1.username')" name="username">
            <t-input
              v-model="formData.username"
              :style="{ width: '480px' }"
              :placeholder="t('pages.apisixConsumerEdit.step1.usernamePlaceholder')"
            />
          </t-form-item>

          <t-form-item :label="t('pages.apisixConsumerEdit.step1.desc')" name="desc">
            <t-input
              v-model="formData.desc"
              :style="{ width: '480px' }"
              :placeholder="t('pages.apisixConsumerEdit.step1.descPlaceholder')"
            />
          </t-form-item>

          <t-form-item :label="t('pages.apisixConsumerEdit.step1.group_id')" name="group_id"> TODO </t-form-item>

          <t-form-item :label="t('pages.apisixConsumerEdit.step1.labels')" name="labels"> TODO </t-form-item>

          <t-form-item>
            <t-button disabled theme="default" variant="base" @click="onPreStep">
              {{ $t('pages.apisixConsumerEdit.preStep') }}
            </t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixConsumerEdit.nextStep') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单2 插件配置 -->
        <t-form v-show="activeStep === 2" class="step-form" :data="formData" :rules="FORM_RULES_2" @submit="onNextStep">
          <t-form-item :label="$t('pages.apisixConsumerEdit.step2.title')">
            <highlightjs
              aria-readonly="true"
              language="json"
              :code="JSON.stringify(formData, null, 2)"
              style="width: 100%"
            />
          </t-form-item>
          <t-form-item>
            <t-button theme="default" variant="base" @click="onPreStep">{{
              $t('pages.apisixConsumerEdit.preStep')
            }}</t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixConsumerEdit.nextStep') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单3 预览 -->
        <t-form v-show="activeStep === 3" class="step-form" :data="formData" :rules="FORM_RULES_3" @submit="onSubmit">
          <t-form-item :label="$t('pages.apisixConsumerEdit.step3.title')">
            <highlightjs
              aria-readonly="true"
              language="json"
              :code="JSON.stringify(formData, null, 2)"
              style="width: 100%"
            />
          </t-form-item>
          <t-form-item>
            <t-button theme="default" variant="base" @click="onPreStep">{{
              $t('pages.apisixConsumerEdit.preStep')
            }}</t-button>
            <t-button type="submit" theme="primary"> {{ $t('pages.apisixConsumerEdit.submit') }} </t-button>
          </t-form-item>
        </t-form>

        <!-- 分步表单4 完成 -->
        <div v-show="activeStep === 4" class="result-success">
          <t-icon class="result-success-icon" name="check-circle" />
          <div class="result-success-title">{{ $t('pages.apisixConsumerEdit.step4.successTitle') }}</div>
          <div class="result-success-describe">{{ $t('pages.apisixConsumerEdit.step4.successDescribe') }}</div>
          <div>
            <t-button @click="onComplete">
              {{ $t('pages.apisixConsumerEdit.step4.complete') }}
            </t-button>
            <t-button theme="default" @click="onReapply">
              {{ $t('pages.apisixConsumerEdit.step4.reapply') }}
            </t-button>
          </div>
        </div>
      </t-loading>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ApisixConsumerEdit',
};
</script>

<script setup lang="ts">
import { AxiosError, AxiosResponse } from 'axios';
import { cloneDeep } from 'lodash';
import { MessagePlugin, SubmitContext } from 'tdesign-vue-next';
import { onActivated, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ConsumerApi } from '@/api/apisix/admin';
import {
  ApisixAdminConsumersPutRequest,
  ApisixAdminRoutesPost201Response,
  ConsumerApiApisixAdminConsumersPutRequest,
} from '@/api/apisix/admin/typescript-axios';
import { t } from '@/locales';

import { FORM_RULES_1, FORM_RULES_2, FORM_RULES_3 } from './constants';

let INITIAL_DATA: ApisixAdminConsumersPutRequest = {
  username: '',
};

const formData = ref<ApisixAdminConsumersPutRequest>(INITIAL_DATA);
const activeStep = ref(1);

const router = useRouter();

onActivated(async () => {
  onReset();

  if (!router.currentRoute.value.query.username) {
    return;
  }
  const username = router.currentRoute.value.query.username.toString();
  fetchData(username);
});

const dataLoading = ref(false);
const fetchData = async (username: string) => {
  dataLoading.value = true;
  try {
    const res = await ConsumerApi.apisixAdminConsumersUsernameGet({ username });
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
  INITIAL_DATA = {
    username: '',
  };
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
    // if (formData.value.username) {
    //   res = await update();
    // } else {
    //   res = await create();
    // }
    res = await create();
    onNextStep(result);
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.data.error_msg) {
        MessagePlugin.error(t('pages.apisixConsumerEdit.submitError', { message: e.response.data.error_msg }));
      }
    }
    console.error(e);
  }
  dataLoading.value = false;
};
const create = () => {
  const req: ConsumerApiApisixAdminConsumersPutRequest = {
    apisixAdminConsumersPutRequest: formData.value,
  };
  return ConsumerApi.apisixAdminConsumersPut(req);
};
// const update = () => {
//   throw new Error('//TODO: Update is Not Support');
// };
const onComplete = () => {
  router.back();
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
