<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="handleCreate"> {{ t('pages.apisixRoute.create') }} </t-button>
          <t-button variant="base" theme="default" :disabled="!selectedRowKeys.length">
            {{ $t('pages.apisixRoute.export') }}</t-button
          >
          <p v-if="!!selectedRowKeys.length" class="selected-count">
            {{ $t('pages.apisixRoute.select') }} {{ selectedRowKeys.length }} {{ t('pages.apisixRoute.items') }}
          </p>
        </div>
        <div class="search-input">
          <t-input v-model="searchValue" :placeholder="t('pages.apisixRoute.placeholder')" clearable>
            <template #suffix-icon>
              <search-icon size="16px" />
            </template>
          </t-input>
        </div>
      </t-row>
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="top"
        :hover="true"
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :header-affixed-top="headerAffixedTop"
        table-layout="auto"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        @select-change="(value: number[]) => rehandleSelectChange(value)"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #value.labels="{ row }">
          <t-space size="small">
            <t-tag v-for="(value, key) in row.value.labels" :key="key" variant="light-outline">
              {{ key }}:{{ value }}
            </t-tag>
          </t-space>
        </template>

        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #value.status="{ row }">
          <t-tag v-if="row.value.status === 0" theme="danger" variant="light-outline">
            {{ $t('pages.apisixRoute.value.statusEnum.0') }}
          </t-tag>
          <t-tag v-if="row.value.status === 1" theme="success" variant="light-outline">
            {{ $t('pages.apisixRoute.value.statusEnum.1') }}
          </t-tag>
        </template>

        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #value.plugins="{ row }">
          <t-space size="small">
            <t-tag v-for="(value, key) in row.value.plugins" :key="key" variant="light-outline">
              {{ key }}
            </t-tag>
          </t-space>
        </template>

        <template #op="slotProps: BaseTableCellParams<Item>">
          <t-space>
            <t-link theme="primary" @click="handleClickDetail(slotProps)">
              {{ $t('pages.apisixRoute.operations.detail') }}</t-link
            >
            <t-link theme="primary" @click="handleClickEdit(slotProps)">
              {{ $t('pages.apisixRoute.operations.edit') }}</t-link
            >
            <t-link theme="danger" @click="handleClickDelete(slotProps)">
              {{ $t('pages.apisixRoute.operations.delete') }}</t-link
            >
          </t-space>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      v-model:visible="confirmVisible"
      :header="t('pages.apisixRoute.deleteConfirm.header')"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    >
      <p v-if="deleteIdx.length === 1">
        {{
          $t('pages.apisixRoute.deleteConfirm.deleteOne', {
            name: data[deleteIdx[0]]?.value?.name,
          })
        }}
      </p>
      <p v-if="deleteIdx.length > 1">
        {{
          $t('pages.apisixRoute.deleteConfirm.deleteMulti', {
            name: data[deleteIdx[0]]?.value?.name,
            num: deleteIdx.length,
          })
        }}
      </p>
    </t-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ApisixRoute',
};
</script>

<script setup lang="ts">
import { AxiosPromise } from 'axios';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { BaseTableCellParams, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { RouteApi } from '@/api/apisix/admin';
import {
  ApisixAdminRoutesGet200ResponseListInner as Item,
  ApisixAdminRoutesIdDelete200Response,
} from '@/api/apisix/admin/typescript-axios';
import { prefix } from '@/config/global';
import { t } from '@/locales';
import { useSettingStore } from '@/store';

const store = useSettingStore();

const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: t('pages.apisixRoute.value.name'),
    colKey: 'value.name',
    fixed: 'left',
  },
  {
    title: t('pages.apisixRoute.value.id'),
    colKey: 'value.id',
  },
  {
    title: t('pages.apisixRoute.value.host'),
    colKey: 'value.host',
  },
  {
    title: t('pages.apisixRoute.value.uri'),
    colKey: 'value.uri',
  },
  {
    title: t('pages.apisixRoute.value.desc'),
    colKey: 'value.desc',
  },
  {
    title: t('pages.apisixRoute.value.labels'),
    colKey: 'value.labels',
  },
  // {
  //   title: t('pages.apisixRoute.value.API_VERSION'),
  //   colKey: 'value.API_VERSION',
  // },
  {
    title: t('pages.apisixRoute.value.status'),
    colKey: 'value.status',
  },
  {
    title: t('pages.apisixRoute.value.plugins'),
    colKey: 'value.plugins',
  },
  {
    title: t('pages.apisixRoute.operation'),
    align: 'left',
    fixed: 'right',
    colKey: 'op',
  },
];

const data = ref<Item[]>([]);
const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});

const searchValue = ref('');

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const res = await RouteApi.apisixAdminRoutesGet();
    const { list } = res.data;

    data.value = list;
    pagination.value = {
      ...pagination.value,
      total: list.length,
    };
  } catch (e) {
    console.error(e);
  }
  dataLoading.value = false;
};

const deleteIdx = ref<number[]>([]);

onMounted(() => {
  fetchData();
});

const confirmVisible = ref(false);

const selectedRowKeys = ref([1, 2]);

const router = useRouter();

const resetIdx = () => {
  deleteIdx.value = [];
};

const onConfirmDelete = async () => {
  // 真实业务请发起请求
  const ps: AxiosPromise<ApisixAdminRoutesIdDelete200Response>[] = [];
  deleteIdx.value.forEach((rowIndex) => {
    const { id } = data.value[rowIndex].value;
    const p = RouteApi.apisixAdminRoutesIdDelete({
      id: id.toString(),
      force: 'false',
    });
    ps.push(p);
  });
  const resArr = await Promise.all(ps);

  const successResArr = resArr.filter((res) => {
    return res.status === 200 && res.data.deleted;
  });

  resetIdx();
  confirmVisible.value = false;
  MessagePlugin.success(t('pages.apisixRoute.deleteMessage.success', { num: successResArr.length }));

  await fetchData();
};

const onCancel = () => {
  resetIdx();
};

const rowKey = 'key';

const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val;
};
const rehandlePageChange = (curr: unknown, pageInfo: unknown) => {
  console.log('分页变化', curr, pageInfo);
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};
const handleClickDetail = (slotProps: BaseTableCellParams<Item>) => {
  router.push(`/detail/base?id=${slotProps.row.value.id}`);
};
const handleClickEdit = (slotProps: BaseTableCellParams<Item>) => {
  router.push(`/apisix/route/edit?id=${slotProps.row.value.id}`);
};
const handleCreate = () => {
  router.push('/apisix/route/edit');
};
const handleClickDelete = (slotProps: BaseTableCellParams<Item>) => {
  deleteIdx.value = [slotProps.rowIndex];
  confirmVisible.value = true;
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    }) as any,
);
</script>

<style lang="less" scoped>
.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: var(--td-comp-margin-s);
  }
}

.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.left-operation-container {
  display: flex;
  align-items: center;
  margin-bottom: var(--td-comp-margin-xxl);

  .selected-count {
    display: inline-block;
    margin-left: var(--td-comp-margin-l);
    color: var(--td-text-color-secondary);
  }
}

.search-input {
  width: 360px;
}
</style>
