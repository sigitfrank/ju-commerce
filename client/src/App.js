import { BrowserRouter as Router } from 'react-router-dom'
import RoutesApp from './routes/Routes'
import './index.css'
const App = () => {
  return (
    <Router>
      {/* <img src={`data:image/jpeg;base64,${binary_data}`} /> */}
      <RoutesApp />
    </Router>
  )
}

export default App;
