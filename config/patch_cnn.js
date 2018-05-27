
function reset_replace(prm) {

  const {pouch} = $p.wsql;
  const {local} = pouch || {};
  const destroy_ram = pouch && local.ram && local.ram.destroy.bind(local.ram);
  const destroy_doc = pouch && local.doc && local.doc.destroy.bind(local.doc);

  const do_reload = () => {
    setTimeout(() => {
      $p.eve.redirect = true;
      location.replace(prm.host);
    }, 1000);
  };
  const do_replace = destroy_ram ?
    () => destroy_ram()
      .then(destroy_doc)
      .catch(destroy_doc)
      .then(do_reload)
      .catch(do_reload)
    :
    do_reload;

  setTimeout(do_replace, 10000);

  dhtmlx.confirm({
    title: "Новый сервер",
    text: `Зона №${prm.zone} перемещена на выделенный сервер ${prm.host}`,
    cancel: $p.msg.cancel,
    callback: do_replace
  });
}

/**
 * предопределенные зоны
 */
export const predefined = {
  'eco-paperless.': {zone: 21, host: "https://eco-paperless.oknosoft.ru/"},
  //'ecookna.': {zone: 21, host: "https://paperless.ecookna.ru/"},
}

/**
 * патч зоны по умолчанию
 */
export function patch_prm(settings) {
  return (prm) => {
    settings(prm);
    for(const elm in predefined){
      if(location.host.match(elm)){
        prm.zone = predefined[elm].zone;
        break;
      }
    }
    return prm;
  }
}

/**
 * патч параметров подключения
 */
export function patch_cnn() {

  const {job_prm, wsql} = $p;

  for(const elm in predefined){
    const prm = predefined[elm];
    if(location.host.match(elm) && wsql.get_user_param("zone") != prm.zone){
      wsql.set_user_param("zone", prm.zone);
    }
  }
  if(!location.host.match("localhost")){
    for(const elm in predefined){
      const prm = predefined[elm];
      if(prm.host && wsql.get_user_param("zone") == prm.zone && !location.host.match(elm)){
        reset_replace(prm);
      }
    }
  }
}
