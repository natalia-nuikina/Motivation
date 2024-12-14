<script setup>
import store from '../store.js';
import { EditOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const division = defineModel('division');
const post = defineModel('post');
const organization = defineModel('organization');
const fullName = defineModel('fullName');
const personnelNumber = defineModel('personnelNumber');

const filterOptionInput = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const open = ref(false);
const handleOk = (e) => {
  console.log(e);
  store.changeKpi(id.value, kpi.value);
  open.value = false;
  console.log(kpi)
};
const kpi = ref('');
const comment = ref('');
const id = ref('');

const columns = [
  {
    title: 'Организация',
    dataIndex: 'organization',
  },
  {
    title: 'Подразделение',
    dataIndex: 'division',
  },
  {
    title: 'Физическое лицо',
    dataIndex: 'fullName',
  },
  {
    title: 'GUID Физлица',
    dataIndex: 'guid',
  },
  {
    title: 'Должность',
    dataIndex: 'post',
  },
  {
    title: 'Табельный номер',
    dataIndex: 'personnelNumber',
  },
  {
    title: 'KPI (%)',
    dataIndex: 'kpi',
  },
]
</script>

<template>
  <div class="wrapper">
    <header>
      <h2>Управление мотивацией</h2>
    </header>
    <main>
      <div class="filters">
        <div class="organization">
          <div>Организация:</div>
          <a-select
            class="select"
            v-model:value ="organization"
            mode="multiple"
            placeholder="Выберите организецию"
            :options="store.organizations"
            :filter-option="filterOptionInput"
            @change="store.updateList(organization, 'organization')"
          >
          </a-select>
        </div>
        <div class="division">
          <div>Подразделение:</div>
          <a-select
            class="select"
            v-model:value ="division"
            mode="multiple"
            placeholder="Выберите подразделение"
            :options="store.divisions"
            :filter-option="filterOptionInput"
            @change="store.updateList(division, 'division')"
          >
          </a-select>
        </div>
        <div class="fullName">
          <div>Физическое лицо:</div>
          <a-select
            class="select"
            v-model:value ="fullName"
            mode="multiple"
            placeholder="Выберите физическое лицо"
            :options="store.people"
            :filter-option="filterOptionInput"
            @change="store.updateList(fullName, 'fullName')"
          >
          </a-select>
        </div>
        <div class="post">
          <div>Должность:</div>
          <a-select
            class="select"
            v-model:value ="post"
            mode="multiple"
            placeholder="Выберите должность"
            :options="store.posts"
            :filter-option="filterOptionInput"
            @change="store.updateList(post, 'post')"
          >
          </a-select>
        </div>
        <div class="personnelNumber">
          <div>Табельный номер:</div>
          <a-select
            class="select"
            v-model:value ="personnelNumber"
            mode="multiple"
            placeholder="Выберите табельный номер"
            :options="store.personnelNumbers"
            :filter-option="filterOptionInput"
            @change="store.updateList(personnelNumber, 'personnelNumber')"
          >
          </a-select>
        </div>
      </div>
      <div class="table">
        <a-table bordered :data-source="store.filteredStaff" :columns="columns">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'kpi'">
              <div class="editable-cell">
                  {{ text || ' ' }}
                  <EditOutlined @click="open = true, kpi = text, id = record.id" class="editable-cell-icon"/>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <a-modal v-model:open="open" title="KPI" @ok="handleOk">
        <div>Введите новое значение KPI:</div>
        <a-input v-model:value="kpi" placeholder="KPI" />
        <div>Введите комментарий:</div>
        <a-input v-model="comment" placeholder="Комментарий" />
      </a-modal>
    </main>
  </div>
</template>

<style scoped>

.editable-cell {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.select {
  width: 300px;
}

.editable-cell-icon:hover {
    color: #108ee9;
  }
</style>
