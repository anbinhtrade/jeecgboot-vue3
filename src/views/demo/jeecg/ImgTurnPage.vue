<template>
  <div style="min-width: 800px">
    <a-row>
      <!-- 左侧文件树 -->
      <a-col :span="6">
        <a-tree
          showLine
          :treeData="treeData"
          :expandedKeys="[expandedKeys[0]]"
          :selectedKeys="selectedKeys"
          :style="{ height: '500px', 'border-right': '2px solid #c1c1c1', 'overflow-y': 'auto' }"
          @expand="onExpand"
          @select="onSelect"
        ></a-tree>
      </a-col>

      <!--右侧缩略图-->
      <a-col :span="18">
        <a-row style="margin-top: 10px; padding-left: 2%">
          <a-col :span="24" style="margin-bottom: 10px">
            <a-button @click="prev" preIcon="ant-design:left-outlined" type="primary">PREVIOUS</a-button>
            <a-button @click="next" preIcon="ant-design:right-outlined" style="margin-left: 8px" type="primary">NEXT</a-button>
            <span style="margin-left: 100px; font-weight: bolder">{{ navName }}</span>
          </a-col>
          <a-col :span="24">
            <img :src="imgUrl" preview />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, onMounted } from 'vue';
  //mock数据
  const mockdata = [
    {
      title: 'Page 1',
      key: '0-0',
      children: [
        {
          title: '1 page',
          key: '0-0-0',
          imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg',
        },
        {
          title: '2 pages',
          key: '0-0-1',
          imgUrl: 'https://static.jeecg.com/upload/test/u27356337152749454924fm27gp0_1588149731821.jpg',
        },
      ],
    },
    {
      title: 'Page II',
      key: '0-1',
      children: [
        {
          title: '1 page',
          key: '0-1-0',
          imgUrl: 'https://static.jeecg.com/upload/test/u24454681402491956848fm27gp0_1588149712663.jpg',
        },
        {
          title: '2 pages',
          key: '0-1-1',
          imgUrl: 'https://static.jeecg.com/upload/test/u8891206113801177793fm27gp0_1588149704459.jpg',
        },
      ],
    },
    {
      title: 'Page 3',
      key: '0-2',
      children: [
        {
          title: '1 page',
          key: '0-2-0',
          imgUrl: 'https://static.jeecg.com/upload/test/1374962_1587621329085.jpg',
        },
      ],
    },
  ];
  /**
   * Tree data on the left
   */
  const treeData = ref(mockdata);
  //选中的key
  const selectedKeys = ref([]);
  //展开的key
  const expandedKeys = ref([]);
  const sort = ref(0);
  //图片链接
  const imgUrl = ref('');
  //页码标题
  const navName = ref('');
  //图片集合
  const imgList = ref([]);

  onMounted(getImgList);

  /**
   * Load the image collection
   */
  function getImgList() {
    var count = 0;
    for (var i = 0; i < unref(treeData).length; i++) {
      for (var j = 0; j < unref(treeData)[i].children.length; j++) {
        imgList.value.push({
          key: unref(treeData)[i].children[j].key,
          pkey: unref(treeData)[i].key,
          sort: count++,
          imgUrl: unref(treeData)[i].children[j].imgUrl,
          navName: unref(treeData)[i].title + '/' + unref(treeData)[i].children[j].title,
        });
      }
    }
    setValue(imgList.value[unref(sort)]);
  }
  /**
   * NODE SELECTED EVENT
   */
  function onSelect(selectedKeys, info) {
    for (var i = 0; i < unref(imgList).length; i++) {
      if (unref(imgList)[i].key === selectedKeys[0]) {
        sort.value = unref(imgList)[i].sort;
        setValue(unref(imgList)[i]);
        break;
      }
    }
  }
  /**
   * Node expansion event
   */
  function onExpand(expandedKey) {
    expandedKeys.value = [];
    if (expandedKey !== null && expandedKey !== '') {
      expandedKeys.value[0] = expandedKey[1];
    }
  }
  /**
   * 上一页
   */
  function prev() {
    if (unref(sort) === 0) {
      sort.value = unref(imgList).length - 1;
    } else {
      sort.value = sort.value - 1;
    }
    setValue(unref(imgList)[unref(sort)]);
  }
  /**
   * NEXT
   */
  function next() {
    if (unref(sort) === unref(imgList).length - 1) {
      sort.value = 0;
    } else {
      sort.value = unref(sort) + 1;
    }
    setValue(unref(imgList)[unref(sort)]);
  }

  // 设置受控节点值
  function setValue(value) {
    selectedKeys.value = [];
    imgUrl.value = value.imgUrl;
    selectedKeys.value[0] = value.key;
    expandedKeys.value[0] = value.pkey;
    navName.value = value.navName;
  }
</script>
