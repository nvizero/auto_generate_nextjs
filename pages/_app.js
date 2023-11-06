// pages/_app.js
import { MyProvider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>
  )
}

export default MyApp;

