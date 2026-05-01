export async function getPostsByBusinessId(businessId) {
    const mockPosts = [
        {
            id: 'post-001',
            title: 'Weekend Brunch Special',
            summary: 'Join us this weekend for our new brioche French toast and locally roasted espresso.',
            date: 'April 28, 2026',
            views: 1420,
            likes: 220,
            comments: 34,
            engagementRate: 18.5,
        },
        {
            id: 'post-002',
            title: 'Fresh Tomato Basil Focaccia',
            summary: 'Our sourdough focaccia is back with garden-fresh tomatoes and basil from local farms.',
            date: 'April 21, 2026',
            views: 980,
            likes: 140,
            comments: 18,
            engagementRate: 16.2,
        },
        {
            id: 'post-003',
            title: 'Community Coffee Tasting',
            summary: 'Reserve your seat for our free coffee tasting event this Thursday evening.',
            date: 'April 14, 2026',
            views: 1105,
            likes: 174,
            comments: 23,
            engagementRate: 17.8,
        },
    ];

    return Promise.resolve(mockPosts);
}
