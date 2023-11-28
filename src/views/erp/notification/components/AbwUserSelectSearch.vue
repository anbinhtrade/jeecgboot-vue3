<template>
  <a-select
    v-model="selectedOption"
    show-search
    placeholder="Type to search"
    mode="multiple"
    :filter-option="false"
    @search="debouncedSearch"
  >
    <a-select-option v-for="item in itemList" :key="item?.id" :value="item?.id">
      {{ item?.id }} - {{ item?.fullName }}
    </a-select-option>
  </a-select>
</template>

<script>
import {debounce} from 'lodash';
import {defHttp} from '/@/utils/http/axios';


export default {
  data() {
    return {
      selectedOption: null,
      itemList: [],
    };
  },
  created() {
    // Initial fetch
    this.fetchItemList('');
  },
  methods: {
    debouncedSearch: debounce(function (searchTerm) {
      this.fetchItemList(searchTerm);
    }, 300),
    async fetchItemList(searchTerm) {
      try {
        // Adjust the API endpoint and query parameters based on your API
        const params = { 'searchTerm': searchTerm};
        const response = await defHttp.get({url: '/users/search', params}, {isTransformResponse: false});
        // check if response is valid, no code number here.
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
