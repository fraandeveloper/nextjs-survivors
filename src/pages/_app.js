import '../styles/globals.css'

import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <section className="dashboard">
      <Header />
        <div className="workspace">
        <Component {...pageProps} />
        </div>
    </section>
  ) 
}

export default MyApp
