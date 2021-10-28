import Link from "next/link";
import { navLinks } from "../utils/menu";

const Header = () =>  {
  return (
    <header>
      <div className="brand">
        <h3>Exemple</h3>
      </div>
      <nav>
        {navLinks.map((menu, index) => {
          return (
            <ul key={index}>
              <Link href={menu.path} passHref>
                <li key={index}>{menu.name}</li>
              </Link>
            </ul>
          );
        })}
      </nav>
    </header>
  )
}

export default Header;
