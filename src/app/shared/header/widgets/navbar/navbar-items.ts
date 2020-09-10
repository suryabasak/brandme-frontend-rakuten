// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	megaMenuType?: string; // small, medium, large
	image?: string;
	children?: Menu[];
}

export const MENUITEMS: Menu[] = [ 
	{
		title: 'Shop',
		type: 'link',
		path: "",
	},	
	{
		title: 'Brands', type: 'sub', megaMenu: true, megaMenuType: 'large', children: [
			{
				title: 'mens-fashion', type: 'link', children: [
					{ path: '/shop/search/sports-wear', title: 'sports-wear', type: 'link' },
					{ path: '/shop/search/top', title: 'top', type: 'link' },
					{ path: '/shop/search/bottom', title: 'bottom', type: 'link' },
					{ path: '/shop/search/ethic-wear', title: 'ethic-wear', type: 'link' },
					{ path: '/shop/search/sports-wear', title: 'sports-wear', type: 'link' },
					{ path: '/shop/search/shirt', title: 'shirts', type: 'link' }
				]
			},
			{
				title: 'women-fashion', type: 'link', children: [
					{ path: '/shop/search/dresses', title: 'dresses', type: 'link' },
					{ path: '/shop/search/skirts', title: 'skirts', type: 'link' },
					{ path: '/shop/search/westarn-wear', title: 'westarn-wear', type: 'link' },
					{ path: '/shop/search/ethic-wear', title: 'ethic-wear', type: 'link' },
					{ path: '/shop/search/sports-wear', title: 'sports-wear', type: 'link' },
					{ path: '/shop/search/bottom-wear', title: 'bottom-wear', type: 'link' }
				]
			},
			{
				title: 'kids-fashion', type: 'link', children: [
					{ path: '/shop/search/sports-wear', title: 'sports-wear', type: 'link' },
					{ path: '/shop/search/ethic-wear', title: 'ethic-wear', type: 'link' },
					{ path: '/shop/search/sports-wear', title: 'sports-wear', type: 'link' },
					{ path: '/shop/search/top', title: 'top', type: 'link' },
					{ path: '/shop/search/bottom-wear', title: 'bottom-wear', type: 'link' },
					{ path: '/shop/search/ethic-wear', title: 'ethic-wear', type: 'link' }
				]
			},
			{
				title: 'accessories', type: 'link', children: [
					{ path: '/shop/search/fashion-jewellery', title: 'fashion-jewellery', type: 'link' },
					{ path: '/shop/search/caps-and-hats', title: 'caps-and-hats', type: 'link' },
					{ path: '/shop/search/precious-jewellery', title: 'precious-jewellery', type: 'link' },
					{ path: '/shop/search/necklaces', title: 'necklaces', type: 'link' },
					{ path: '/shop/search/earrings', title: 'earrings', type: 'link' },
					{ path: '/shop/search/rings-wrist-wear', title: 'rings-wrist-wear', type: 'link' }
				]
			},
			{
				title: 'men-accessories', type: 'link', children: [
					{ path: '/shop/search/ties', title: 'ties', type: 'link' },
					{ path: '/shop/search/cufflinks', title: 'cufflinks', type: 'link' },
					{ path: '/shop/search/apockets-squaresll', title: 'pockets-squares', type: 'link' },
					{ path: '/shop/search/helmets', title: 'helmets', type: 'link' },
					{ path: '/shop/search/scarves', title: 'scarves', type: 'link' },
					{ path: '/shop/search/phone-cases', title: 'phone-cases', type: 'link' }
				]
			},
		]
	},
	{
		title: 'Share',
		type: 'link',
		path: "/share/active/received",
	},
	{
		title: 'Stash',
		type: 'link',
		path: "/stash",
	},	
]