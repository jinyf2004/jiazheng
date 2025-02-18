<template>
  <div class="legal-container">
    <h2>{{ $route.meta.title }}</h2>
    <article class="content-box">
      <!-- 动态加载条款内容 -->
      <Markdown :source="legalContent" />
    </article>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

export default {
  name: 'Legal',
  components: {
    Markdown
  },
  data() {
    return {
      legalContent: ''
    };
  },
  mounted() {
    // 根据路由动态加载对应的法律条款内容
    switch (this.$route.name) {
      case 'PrivacyPolicy':
        this.legalContent = `# 隐私政策

## 1. 引言
我们尊重您的隐私权，并承诺保护您的个人信息。本隐私政策旨在向您说明我们在处理个人信息时的规则和措施。

## 2. 信息收集
我们可能会收集以下类型的信息：
- 基本信息：如姓名、联系方式等。
- 使用数据：包括访问时间、页面浏览记录等。

## 3. 信息使用
我们仅将收集到的信息用于提供服务，改善用户体验以及满足法律法规的要求。

## 4. 信息安全
我们将采取合理的技术和管理措施来保护您的个人信息安全，防止信息泄露、丢失或被滥用。`;
        break;
      case 'TermsOfService':
        this.legalContent = `# 服务条款

## 1. 引言
欢迎使用我们的服务。请在使用前仔细阅读并同意本服务条款。

## 2. 用户行为
用户必须遵守所有适用的法律法规，并且不得从事任何非法活动。

## 3. 服务变更
我们保留随时修改或终止服务的权利，恕不另行通知。

## 4. 免责声明
我们不对因使用服务而产生的任何直接或间接损失承担责任。`;
        break;
      default:
        this.legalContent = '未找到相关法律条款。';
    }
  }
};
</script>

<style scoped>
.legal-container {
  padding: 20px;
}

.content-box {
  margin-top: 20px;
}
</style>