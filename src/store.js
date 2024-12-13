import { reactive } from 'vue';
import fixtures from '../fixtures/staff.json'
import { uniq, intersection } from 'lodash';

const getItems = (value) => {
  const values = uniq(fixtures.staff.reduce((acc, item) => [...acc, item[value]], []))
  return values.map((value) =>  ({ label: value, value }))
}

const store = reactive({
  staff: fixtures.staff,
  divisions: getItems('division'),
  posts: getItems('post'),
  organizations: getItems('organization'),
  people: getItems('fullName'),
  personnelNumbers: getItems('personnelNumber'),
  filteredStaff: fixtures.staff,
  filters: {
    organization: [],
    division: [],
    post: [],
    fullName: [],
    personnelNumber: [],
  },

  getStaff() {
    return this.filteredStaff;
  },

  getFilterKeys() {
    return Object.keys(this.filters)
  },

  changeKpi(id, newValue) {
    this.staff = this.staff.map((item) => {
      if (item.id === id) {
        item.kpi = newValue;
        return item;
      }
      return item;
    });
  },

  updateList(filterArr, marker) {

    this.filters[marker] = filterArr;
    console.log(Object.keys(this.filters))
    const filters = Object.entries(this.filters);
    const AllFilteredLists = [];
    filters.forEach(([filter, values]) => {
      if (values.length > 0) {
        const oneFiltered = this.staff.reduce((acc, person) => {
          return (this.filters[filter].includes(person[filter])) ? [...acc, person] : acc;
        }, [])
        AllFilteredLists.push(oneFiltered)
      } else {
        AllFilteredLists.push(this.staff)
      }
    })
    const newList = intersection(...AllFilteredLists);
    this.filteredStaff = newList;
  }

})

export default store;
