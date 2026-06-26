export interface Service {
  id: string;
  title: string;
  description: string;
}

export const portal = {
  title: "我们提供的服务",
  description:
    "从网站开发到系统维护，Amertarva 为中小企业与教育机构提供完整的数字化解决方案。",
};

export const services: Service[] = [
  {
    id: "landing-page",
    title: "落地页 / 企业形象网站",
    description: "单页式网站，用于展示业务，适合刚起步的中小企业或个人品牌。",
  },
  {
    id: "ecommerce",
    title: "电商网站",
    description: "中小规模线上商店，含商品目录与基础支付整合。",
  },
  {
    id: "lms",
    title: "学习管理系统（LMS）",
    description: "面向培训机构或教育机构的数字化学习平台。",
  },
  {
    id: "custom-web-app",
    title: "定制化 Web 应用",
    description:
      "根据客户具体需求开发，例如预约系统、内部仪表盘或数据核验工具。",
  },
  {
    id: "maintenance",
    title: "维护与更新服务",
    description: "上线后的持续性服务，包括内容更新、漏洞修复与小功能迭代。",
  },
];
