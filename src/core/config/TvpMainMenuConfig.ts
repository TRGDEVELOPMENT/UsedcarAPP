export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        keenthemesIcon: "car-2",
        sub:[],
      },
    ],
  },
  {
    heading: "ตั้งค่า",
    route: "/",
    pages: [
      {
        sectionTitle: "ตั้งค่า",
        route: "/",
        keenthemesIcon: "car-2",
        sub: [
          {
            heading: "ตั้งค่าลูกค้า",
            route: "/customersetting",
          },
          {
            heading: "ประเมินสะภาพ",
            route: "/assesssetting",
          },
          {
            heading: "เหตุผลขอยกเลิก",
            route: "/remark",
          },
          {
            heading: "User role",
            route: "/role",
          },
          {
            heading: "User management",
            route: "/usermanagement",
          },
        ],
      },
      
    ],
  },
];

export default MainMenuConfig;
