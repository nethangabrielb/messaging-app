import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuLink className="cursor-pointer select-none" asChild>
          <Link to="/chat">Chats</Link>
        </NavigationMenuLink>
        <NavigationMenuLink className="cursor-pointer select-none" asChild>
          <Link to="/people">People</Link>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
