import { Avatar } from 'antd';

import styles from '../styles/Home.module.scss'

const About = () => {
  return (
    <section>
      <div className={styles.home__header}>
        <div className={styles.home__header_title}>
        <h1>Last 5 Registrations</h1>
        </div>
      </div>
    </section>
  )
}

export default About;