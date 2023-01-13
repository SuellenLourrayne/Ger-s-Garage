import { Link, useLocation } from 'react-router-dom';

import './styles.css';

const SideBarItem = ({ item, active }) => {
    let trustMultiple = 100;
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    if(params.get("t") == 1 || params.get("t") == 2) { trustMultiple = 4 };
    if(params.get("t") == item.trust || trustMultiple == item.trust || item.trust == 5) {
        return (
            
            <Link 
                to={item.path+location.search} 
                className={active ? 'sidebar-item-active' : 'sidebar-item'} >
                    <img 
                        src={item.icon}
                        alt={`icon-${item.icon}`}
                        className='sidebar-item-icon' />
                    <span className='sidebar-item-label'>{item.title}</span>
            </Link>
        
        )
    }
    else
        return "";
  
}
export default SideBarItem;
