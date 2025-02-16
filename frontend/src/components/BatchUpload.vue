<template>
  <el-upload
    action="/api/upload"
    :before-upload="checkFileType"
    multiple>
    <el-button type="primary">批量上传CSV</el-button>
  </el-upload>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const checkFileType = (file) => {
      const isCSV = file.type === 'text/csv';
      if (!isCSV) {
        alert('只能上传CSV文件');
      }
      return isCSV;
    };

    return {
      checkFileType,
    };
  },
};
</script>