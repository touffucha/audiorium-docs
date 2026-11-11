import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import SidebarHeader from '@site/src/components/SidebarHeader';

// ヘッダーを置かない代わりに、サイドバーの一番上にロゴと検索窓を出す
export default function ContentWithHeader(props) {
  return (
    <>
      <SidebarHeader />
      <Content {...props} />
    </>
  );
}
