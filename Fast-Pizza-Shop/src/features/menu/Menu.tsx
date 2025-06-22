import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurants';
import MenuItem, { type PizzaItem } from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((pizza: PizzaItem) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
