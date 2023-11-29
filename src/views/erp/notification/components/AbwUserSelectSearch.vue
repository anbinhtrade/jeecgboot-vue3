<template>
  <a-select
    :value="selectedOption"
    show-search
    placeholder="Type to search"
    mode="multiple"
    :filter-option="false"
    @change="handleChange"
    @search="debouncedSearch">
    <a-select-option v-for="item in itemList" :key="item?.id" :value="item?.id">
      {{ item?.id }} - {{ item?.fullName }} - {{ item?.stockAccount }}
    </a-select-option>
  </a-select>
</template>

<script>
import {debounce, split, map} from 'lodash';
import {defHttp} from '/@/utils/http/axios';


export default {
  props: {
    value: Array,
  },
  data() {
    return {
      selectedOption: null,
      itemList: [],
      updatingFromComponent: false
    };
  },
  watch: {
      value(newValue) {
          console.log('watch: ', newValue)
          if (!this.updatingFromComponent) {
              this.fetchItemList('', newValue);
              this.selectedOption = split(newValue, ',');
              // parse to int
              this.selectedOption = map(this.selectedOption, (item) => parseInt(item));
          }
      },
  },

  methods: {
    handleChange(value) {
      this.selectedOption = value;
      this.updatingFromComponent = true;
      this.$emit('update', value);
      this.updatingFromComponent = false;

    },
    debouncedSearch: debounce(function (searchTerm) {
      this.fetchItemList(searchTerm, '');
    }, 300),
    async fetchItemList(searchTerm, ids) {
      try {
        const params = { 'searchTerm': searchTerm, 'ids': ids};
        const response = await defHttp.get({url: '/users/search', params}, {isTransformResponse: false});
        if (response && !response.code) {
          this.itemList = response;
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>
