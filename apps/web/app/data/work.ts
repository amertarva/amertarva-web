export const work = {
  title: "我们的作品",
  description: "我们持续为客户提供高质量的数字产品，以下是部分案例展示。",
};

export interface WorkItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  isPlaceholder: boolean;
}

export const workItems: WorkItem[] = [
  {
    id: "placeholder-1",
    category: "企业官网",
    title: "案例标题待补充",
    description: "案例简介待补充——上线后将替换为真实项目说明。",
    image: "/images/work/placeholder-1.jpg",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    category: "电商系统",
    title: "案例标题待补充",
    description: "案例简介待补充——上线后将替换为真实项目说明。",
    image: "/images/work/placeholder-2.jpg",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    category: "教育科技平台",
    title: "案例标题待补充",
    description: "案例简介待补充——上线后将替换为真实项目说明。",
    image: "/images/work/placeholder-3.jpg",
    isPlaceholder: true,
  },
];
