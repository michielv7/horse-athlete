type Item = {
  name: string;
  items: {
    name: string;
    slug: string;
    description?: string;
    isDisabled?: boolean;
    forFitter?: boolean;
    forAdmin?: boolean;
    isPublic?: boolean;
    isHidden?: boolean;
  }[];
};

export const demos: Item[] = [
  {
    name: 'overview',
    items: [
      {
        name: 'Login',
        slug: 'login',
        description: 'Login page',
        isHidden: true,
      },
      {
        name: 'Order Overview',
        slug: 'order-overview',
        description: 'view your saddles',
        forFitter: true,
        forAdmin: true,
      },
      {
        name: 'Add Order',
        slug: 'add-order',
        description: 'add an order',
        forFitter: true,
        forAdmin: true,
      },
      {
        name: 'News Forum',
        slug: 'news-forum',
        description: 'See the latests updates',
        isPublic: true,
      },
      {
        name: 'Saddles',
        slug: 'saddles',
        description: 'See, create and edit your saddles',
        forAdmin: true,
      },
    ],
  },
  {
    name: 'Your Profile',
    items: [
      {
        name: 'Personal Account',
        slug: 'personal-account',
        description: 'Display personal account',
        forFitter: true,
        forAdmin: true,
      },
      {
        name: 'User overview',
        slug: 'user-overview',
        description: 'View all the users',
        forAdmin: true,
      },
    ],
  },
];
