import Products from '../assets/icons/box-seam-fill.svg';
import Profile from '../assets/icons/person-vcard-fill.svg';
import Users from '../assets/icons/people-fill.svg';
import Bookings from '../assets/icons/calendar-event-fill.svg';

/**************** TRUST LEVELS  ****************/


/**************** TRUST LEVELS  ****************/

const sidebar_menu = [
    {
        id: 1,
        icon: Bookings,
        path: '/BookingList',
        title: 'Bookings',
        trust: 5,
    },
    {
        id: 2,
        icon: Products,
        path: '/Products',
        title: 'Products',
        trust: 1,
    },
    {
        id: 3,
        icon: Users,
        path: '/Staff',
        title: 'Staff',
        trust: 1,
    },
    {
        id: 4,
        icon: Users,
        path: '/Clients',
        title: 'Clients',
        trust: 1,
    },
    {
        id: 5,
        icon: Profile,
        path: '/Profile',
        title: 'Profile',
        trust: 4,
    },
    {
        id: 6,
        icon: Bookings,
        path: '/BookingsClient',
        title: 'New Booking',
        trust: 3,
    }
]

export default sidebar_menu;