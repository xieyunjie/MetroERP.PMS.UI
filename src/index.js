import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva(); 
app.use(createLoading());
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/projectModel').default)
app.model(require('./models/homeModel').default)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
