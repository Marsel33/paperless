import React from 'react';
import IconChart from '@material-ui/icons/InsertChart';
import IconDoc from '@material-ui/icons/EventNote';
import IconInfo from '@material-ui/icons/Info';
import IconPerson from '@material-ui/icons/Person';
import IconSettings from '@material-ui/icons/Settings';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import IconDownload from '@material-ui/icons/CloudDownload';
import IconHelp from '@material-ui/icons/Help';
// import IconDrafts from '@material-ui/icons/Drafts';
// import IconList from '@material-ui/icons/List';

const items = [
  {
    text: 'Статьи',
    icon: <LibraryBooks/>,
    id: 'articles',
    //bold: true,
    navigate: '/articles/',
    need_meta: true,
  },
  {
    text: 'Файлы',
    icon: <IconDownload/>,
    id: 'files',
    //bold: true,
    navigate: '/files/',
    need_meta: true,
  },
  {
    text: 'Flowcon',
    icon: <Flask/>,
    open: false,
    id: 'flowcon',
    items: [
      {
        text: 'Flowcon - что это',
        id: 'readme',
        navigate: '/articles/flowcon-readme',
        need_meta: true,
        icon: <IconHelp/>
      },
      {
        text: 'Задачи',
        id: 'issues',
        navigate: '/doc.issue/list',
        icon: <IconDoc/>,
        need_meta: true,
        need_user: true,
      },
      {
        text: 'Отчеты',
        icon: <IconChart/>,
        open: false,
        id: 'practice',
        items: [
          {
            text: 'Диаграмма эффективности',
            id: 'diagram',
            navigate: '/flowcon/diagram',
            need_meta: true,
            need_user: true,
          },
          {
            text: 'Таблица',
            id: 'list',
            navigate: '/flowcon/list',
            need_meta: true,
            need_user: true,
          },
        ],

      },
    ]
  },
  {
    divider: true,
  },
  {
    text: 'Профиль',
    navigate: '/login',
    need_meta: true,
    icon: <IconPerson/>
  },
  {
    text: 'Настройки',
    navigate: '/settings',
    need_meta: true,
    icon: <IconSettings/>,
  },
  {
    text: 'О сайте',
    navigate: '/about',
    icon: <IconInfo/>
  }
];

function path_ok(path, item) {
  const pos = item.navigate && item.navigate.indexOf(path);
  return pos === 0 || pos === 1;
}

function with_recursion(path, parent) {
  if(path && path != '/'){
    for(const item of parent){
      const props = item.items ? with_recursion(path, item.items) : path_ok(path, item) && item;
      if(props){
        return props;
      }
    }
  }
}

export function item_props(path) {
  if(!path){
    path = location.pathname;
  }
  if(path.endsWith('/')) {
    path = path.substr(0, path.length - 1);
  }
  // здесь можно переопределить нужность meta и авторизованности для корневой страницы
  let res = with_recursion(path, items);
  if(!res && path.indexOf('/') !== -1) {
    res = with_recursion(path.substr(0, path.lastIndexOf('/')), items);
  }
  if(!res && path.match(/\/(doc|cat|ireg|cch|rep)\./)){
    res = {need_meta: true, need_user: true};
  }
  return res || {};
}

export const description = 'Сайт для владельцев и руководителей о решении проблем управления бизнесом';

export default items;
