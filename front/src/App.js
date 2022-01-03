import ScrollToTop from './component/common/scrollToTop';
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles';
import Router from './routes';

const App = () => (
  <ThemeConfig>
    <ScrollToTop />
    <GlobalStyles />
    <Router />
  </ThemeConfig>
);

export default App;
