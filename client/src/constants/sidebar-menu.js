import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import Bookings from '../assets/icons/booking.png';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/Dashboard?t=1',
        title: 'Dashboard',
        trust: 1,
    },
    {
        id: 2,
        icon: Bookings,
        path: '/Bookings?t=1',
        title: 'Bookings',
        trust: 1,
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/products?t=1',
        title: 'Products',
        trust: 1,
    },
    {
        id: 4,
        icon: UserIcon,
        path: '/profile?t=1',
        title: 'My account',
        trust: 1,
    },
    {
        id: 5,
        icon: Bookings,
        path: '/BookingList?t=1',
        title: 'Booking List',
        trust: 1,
    }
]

export default sidebar_menu;