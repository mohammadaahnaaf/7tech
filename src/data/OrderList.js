export const orders = [
    {
        id: 1,
        name: 'Mohammed Ahnaf',
        phone: '01633312573',
        createdAt: '2 days ago',
        city: 'Dhaka',
        zone: 'Mirpur 10',
        area: 'Kazipara',
        address: '20/2 - 5/B1',
        payment: 'cash on delevery',
        total: (3500*1)+(3000*2),
        qty: 3,

        products: [
            {
                id: 1,
                name: 'ReDragon M612 Predator Gaming Mouse',
                href: '#',
                quantity: 1,
                category: 'Mouse',
                imageSrc: '/productss/6.jpg',
                imageAlt: "product alt name",
                price: 3500,
                color: 'Black',
            },
            {
                id: 2,
                name: 'ReDragon M686 Vampire Elite Wireless Gaming Mouse',
                href: '#',
                quantity: 2,
                category: 'Mouse',
                imageSrc: '/productss/7.jpg',
                imageAlt: "product alt name",
                price: 3000,
                color: 'Black',
            },
        ]
    },
    {
        id: 2,
        name: 'Tanvir',
        phone: '01720636876',
        createdAt: '3 days ago',
        city: 'Dhaka',
        zone: 'Uttara',
        area: 'Uttara',
        address: 'Dhaka - 1230',
        payment: 'cash on delevery',
        total: (3500*3)+(3000*2),
        qty: 5,

        products: [
            {
                id: 1,
                name: 'ReDragon M612 Predator Gaming Mouse',
                href: '#',
                quantity: 3,
                category: 'Mouse',
                imageSrc: '/productss/6.jpg',
                imageAlt: "product alt name",
                price: 3500,
                color: 'Black',
            },
            {
                id: 2,
                name: 'ReDragon M686 Vampire Elite Wireless Gaming Mouse',
                href: '#',
                quantity: 2,
                category: 'Mouse',
                imageSrc: '/productss/7.jpg',
                imageAlt: "product alt name",
                price: 3000,
                color: 'Black',
            },
        ]
    }
]