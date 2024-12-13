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
const handleOk = e => {
  console.log(e);
  open.value = false;
};

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
            v-model:value ="organization"
            mode="multiple"
            style="width: 500px"
            placeholder="Select a organization"
            :options="store.organizations"
            :filter-option="filterOptionInput"
            @change="store.updateList(organization, 'organization')"
          >
          </a-select>
        </div>
        <div class="division">
          <div>Подразделение:</div>
          <a-select
            v-model:value ="division"
            mode="multiple"
            style="width: 500px"
            placeholder="Select a division"
            :options="store.divisions"
            :filter-option="filterOptionInput"
            @change="store.updateList(division, 'division')"
          >
          </a-select>
        </div>
        <div class="fullName">
          <div>Физическое лицо:</div>
          <a-select
            v-model:value ="fullName"
            mode="multiple"
            style="width: 500px"
            placeholder="Select a person"
            :options="store.people"
            :filter-option="filterOptionInput"
            @change="store.updateList(fullName, 'fullName')"
          >
          </a-select>
        </div>
        <div class="post">
          <div>Должность:</div>
          <a-select
            v-model:value ="post"
            mode="multiple"
            style="width: 500px"
            placeholder="Select a post"
            :options="store.posts"
            :filter-option="filterOptionInput"
            @change="store.updateList(post, 'post')"
          >
          </a-select>
        </div>
        <div class="personnelNumber">
          <div>Табельный номер:</div>
          <a-select
            v-model:value ="personnelNumber"
            mode="multiple"
            style="width: 500px"
            placeholder="Select a personnel number"
            :options="store.personnelNumbers"
            :filter-option="filterOptionInput"
            @change="store.updateList(personnelNumber, 'personnelNumber')"
          >
          </a-select>
        </div>
      </div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Организация</th>
              <th>Подразделение</th>
              <th>Физическое лицо</th>
              <th>GUID Физлица</th>
              <th>Должность</th>
              <th>Табельный номер</th>
              <th>KPI (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="person in store.filteredStaff"
              :key="person.id"
            >
            <td>{{ person.organization }}</td>
            <td>{{ person.division }}</td>
            <td>{{ person.fullName }}</td>
            <td>{{ person.guid }}</td>
            <td>{{ person.post }}</td>
            <td>{{ person.personnelNumber }}</td>
            <td>
              {{ person.kpi }}
              <a-button @click="open = true">
                <EditOutlined />
              </a-button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
      <a-modal v-model:open="open" title="KPI" @ok="handleOk">
        <div>Введите новое значение KPI</div>
      </a-modal>
    </main>
  </div>
</template>

<style scoped>

</style>
