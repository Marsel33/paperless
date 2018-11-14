// шрифты и стили подгрузим асинхронно
import('font-awesome/css/font-awesome.min.css');
import './styles/roboto/font.css';
import './styles/global.css';

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// метод инициализации хранилища состояния приложения
import configureStore, {history} from './redux';

// метод для вычисления need_meta, need_user для location.pathname
import {item_props} from './components/App/menu';

// заставка "загрузка занных"
import DumbScreen from './components/DumbScreen';

// корневыой контейнер приложения
import AppView from './components/App';

// дополняем-переопределяем тему оформления
import theme from './styles/muiTheme';

// типовой RootView, в котором подключается Router и основной макет приложения
import RootView from 'metadata-react/App/RootView';

// создаём redux-store
const store = configureStore();

class RootProvider extends Component {

  componentDidMount() {

    import('metadata-react/styles/react-data-grid.css');

    // скрипт инициализации структуры метаданных и модификаторы
    import('./metadata')
      .then((module) => module.init(store));
  }

  render() {
    return <Provider key="root" store={store}>
      <RootView
        history={history}
        item_props={item_props}
        theme={theme}
        DumbScreen={DumbScreen}
        AppView={AppView}
        disableAutoLogin
      />
    </Provider>;
  }
}

render(<RootProvider/>, document.getElementById('root'));
