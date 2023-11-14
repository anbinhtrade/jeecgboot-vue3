<template>
  <PageWrapper title="CONCERNING">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">JeecgBoot</a>
         It is a BPM-based low-code platform with a front-end and back-end separation architecture SpringBoot 2.x，SpringCloud，Ant Design&Vue, Mybatis-plus, Shiro, JWT, support for microservices.
          The powerful code generator allows one-click generation of front-end and back-end code for low-code development! Jeecg Boot is leading the way in a new low-code development model OnlineCoding-> Code Generator - > HANDMADE MERGE,
          Help Java projects solve 70% of repetitive work, so that development can focus more on business, which can not only quickly improve efficiency, save R&D costs, but also lose flexibility! A series of low-code capabilities: Online forms, Online reports, Online charts, form design, process design, report design, large screen design Wait a minute...
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { GITHUB_URL, SITE_URL, DOC_URL } from '/@/settings/siteSetting';

  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, name, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: 'VERSION',
      field: 'version',
      render: commonTagRender('blue'),
    },
    {
      label: 'Last compilation time',
      field: 'lastBuildTime',
      render: commonTagRender('blue'),
    },
    {
      label: 'Document address',
      field: 'doc',
      render: commonLinkRender('Document address'),
    },
    {
      label: 'Preview the address',
      field: 'preview',
      render: commonLinkRender('Preview the address'),
    },
    {
      label: 'Github',
      field: 'github',
      render: commonLinkRender('Github'),
    },
  ];

  const infoData = {
    version,
    lastBuildTime,
    doc: DOC_URL,
    preview: SITE_URL,
    github: GITHUB_URL,
  };

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  const [register] = useDescription({
    title: 'Production dependencies',
    data: dependencies,
    schema: schema,
    column: 3,
  });

  const [registerDev] = useDescription({
    title: 'Development environment dependencies',
    data: devDependencies,
    schema: devSchema,
    column: 3,
  });

  const [infoRegister] = useDescription({
    title: 'Project information',
    data: infoData,
    schema: infoSchema,
    column: 2,
  });
</script>
