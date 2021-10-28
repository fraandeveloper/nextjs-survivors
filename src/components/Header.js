import Link from "next/link";

import { navLinks } from "../utils/menu";

import styles from "../styles/Header.module.scss";

const Header = () =>  {
  return (
    <header className={styles.menu}>
      <div className={styles.menu__container}>
        <div className={styles.menu__brand}>
          🐞 <p>survivors</p>
        </div>
      </div>
      <div className={styles.menu__section}>
        <p>Menu</p>
      </div>
      <nav className={styles.menu__menuContainer}>
        {navLinks.map((menu, index) => {
          return (
            <ul className={styles.menu__menuContainer_item} key={index}>
              <Link href={menu.path} passHref>
                <li key={index}><div></div><p>{menu.name}</p></li>
              </Link>
            </ul>
          );
        })}
      </nav>
    </header>
  )
}

export default Header;
