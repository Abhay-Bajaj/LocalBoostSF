export async function getBusinessForCurrentOwner() {
    return Promise.resolve({
        id: 'business-001',
        name: 'SoMa Sourdough Co.',
        category: 'Bakery & Cafe',
        address: '123 Market Street, San Francisco, CA',
        phone: '(415) 555-0123',
        email: 'hello@somasourdough.com',
        description:
            'A modern neighborhood bakery serving freshly baked sourdough, coffee, and seasonal pastries.',
        followers: 5280,
        monthlyReach: 18740,
        rating: 4.8,
        reviewCount: 152,
        hours: 'Mon–Sat 7am–4pm',
    });
}
