import { BASE_URL } from "./env";

export const navData = {
  navMain: [
    {
      title: "Reports",
      items: [
        {
          title: "Sales Report",
          url: `${BASE_URL}/dashboard/salesreport`,
        },
        {
          title: "Stock Report",
          url: `${BASE_URL}/dashboard/stockreport`,
        },
      ],
    },
    {
      title: "Manage Items",
      items: [
        {
          title: "Manage Category",
          url: `${BASE_URL}/dashboard/managecategory`,
        },
        {
          title: "Manage Item",
          url: `${BASE_URL}/dashboard/manageitem`,
        },
      ],
    },
    {
      title: "Transactions",
      items: [
        {
          title: "Create Transaction",
          url: `${BASE_URL}/dashboard/createtransaction`,
        },
      ],
    },
  ],
};
