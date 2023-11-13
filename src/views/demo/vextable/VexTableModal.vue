<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" width="70%">
    <a-form ref="formRef" :model="orderMainModel" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="validatorRules">
      <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
          <a-form-item label="Order number" name="orderCode">
            <a-input v-model:value="orderMainModel.orderCode" placeholder="Please enter your order number" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="The type of order">
            <a-select placeholder="Please select an order type" v-model:value="orderMainModel.ctype">
              <a-select-option value="1">Domestic orders</a-select-option>
              <a-select-option value="2">International Orders</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="The date of the order">
            <a-date-picker showTime valueFormat="YYYY-MM-DD HH:mm:ss" v-model:value="orderMainModel.orderDate" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
          <a-form-item label="The amount of the order">
            <a-input v-model:value="orderMainModel.orderMoney" placeholder="Please enter the amount of your order" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="Order notes">
            <a-input v-model:value="orderMainModel.content" placeholder="Please enter a remark for your order" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="Customer Information" key="1">
          <vxe-toolbar>
            <template #buttons>
              <vxe-button icon="fa fa-plus" @click="insertEvent()">New</vxe-button>
              <vxe-button @click="$refs.xTable.removeCheckboxRow()">Delete the selection</vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-table
            border
            show-overflow
            keep-source
            ref="xTable"
            max-height="400"
            :data="orderMainModel.jeecgOrderCustomerList"
            :edit-config="{ trigger: 'click', mode: 'row', icon: 'fa fa-pencil', showStatus: true }"
          >
            <vxe-column type="checkbox" width="60" align="center"></vxe-column>
            <vxe-column type="seq" width="60" align="center"></vxe-column>
            <vxe-column field="name" title="Customer name" sortable :edit-render="{ name: 'input', defaultValue: '' }"></vxe-column>
            <vxe-column field="sex" title="Gender" :edit-render="{ name: '$select', options: sexList }"></vxe-column>
            <vxe-column field="idcard" title="Identity Card" sortable :edit-render="{ name: 'input', defaultValue: '' }"></vxe-column>
            <vxe-column field="telphone" title="Cell Phone" sortable :edit-render="{ name: 'input', defaultValue: '' }"></vxe-column>
          </vxe-table>
        </a-tab-pane>

        <a-tab-pane tab="Ticket information" key="2" forceRender> </a-tab-pane>
      </a-tabs>
    </a-form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { VxeTableInstance } from 'vxe-table';
  export default defineComponent({
    name: 'VexTableModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const isUpdate = ref(true);
      const xTable = ref({} as VxeTableInstance);
      const rowId = ref('');
      const formRef = ref();
      const labelCol = reactive({
        xs: { span: 24 },
        sm: { span: 5 },
      });
      const wrapperCol = reactive({
        xs: { span: 24 },
        sm: { span: 16 },
      });
      const sexList = ref([
        { label: '', value: '' },
        { label: 'Man', value: '1' },
        { label: 'Woman', value: '2' },
      ]);
      const validatorRules = {
        orderCode: [{ required: true, message: 'The order number cannot be empty', trigger: 'blur' }],
      };
      const orderMainModel = reactive({
        id: null,
        orderCode: '',
        orderMoney: '',
        ctype: '',
        content: '',
        jeecgOrderCustomerList: [],
        jeecgOrderTicketList: [],
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        orderMainModel.orderCode = '';
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          orderMainModel.orderCode = data.record.orderCode;
        }
      });
      const tableData = ref([]);
      const getTitle = computed(() => (!unref(isUpdate) ? 'New' : 'Edit'));

      //动态添加行
      async function insertEvent(row: any) {
        const $table = xTable.value;
        const record = {
          name: '',
          sex: '1',
          idcard: '',
          telphone: '',
        };
        const { row: newRow } = await $table.insertAt(record, row);
        await $table.setActiveCell(newRow, 'sex');
      }

      async function handleSubmit() {
        formRef.value
          .validate()
          .then(() => {
            try {
              const $table = xTable.value;
              const { fullData } = $table.getTableData();
              orderMainModel.jeecgOrderCustomerList = fullData;
              console.log('formData', JSON.stringify(orderMainModel));
              setModalProps({ confirmLoading: true });
              closeModal();
              emit('success', { isUpdate: unref(isUpdate), values: { id: rowId.value } });
            } finally {
              setModalProps({ confirmLoading: false });
            }
          })
          .catch((error: ValidateErrorEntity<any>) => {
            console.log('error', error);
          });
      }

      return {
        xTable,
        tableData,
        sexList,
        formRef,
        validatorRules,
        orderMainModel,
        registerModal,
        getTitle,
        labelCol,
        wrapperCol,
        insertEvent,
        handleSubmit,
      };
    },
  });
</script>
<style scoped>
  .ant-btn {
    padding: 0 10px;
    margin-left: 3px;
  }

  .ant-form-item-control {
    line-height: 0px;
  }

  /** Main form row spacing */
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

  /** Tab page line spacing */
  .ant-tabs-content .ant-form-item {
    margin-bottom: 0px;
  }
</style>
