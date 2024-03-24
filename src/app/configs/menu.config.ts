const menuItems = [
  {
    action: 'SUBMENU',
    color: '#EB3E8E',
    icon_name: 'star',
    id: 1,
    is_active: true,
    menu: 1,
    order: 1,
    sub_menu_items: [
      {
        has_cap: true,
        icon_name: 'bell',
        id: 1,
        is_active: true,
        menu_item: 1,
        order: 1,
        title_bn: 'Sub menu',
        title_en: 'Sub menu',
        url: `/`,
      },
      {
        has_cap: true,
        icon_name: 'house',
        id: 2,
        is_active: true,
        menu_item: 1,
        order: 1,
        title_bn: 'Sub menu 1',
        title_en: 'Sub menu 1',
        url: `/about`,
      },
    ],
    title_bn: 'Menu',
    title_en: 'Menu',
    url: '',
  },
];

export default menuItems;
