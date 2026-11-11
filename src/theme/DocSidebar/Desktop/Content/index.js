import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import SidebarHeader from '@site/src/components/SidebarHeader';
import ThemeSwitch from '@site/src/components/ThemeSwitch';

// ヘッダーを置かない代わりに、サイドバーの一番上にロゴと検索窓、一番下に配色の切り替えを出す
export default function ContentWithHeader(props) {
  return (
    <>
      <SidebarHeader />
      <Content {...props} />
      <ThemeSwitch />
    </>
  );
}
