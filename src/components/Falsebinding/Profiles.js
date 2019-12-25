/**
 * Профили текущего контура
 *
 * @module Profiles
 *
 * Created by Evgeniy Malyarov on 20.12.2019.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TabularSection from 'metadata-react/TabularSection';
import Typography from '@material-ui/core/Typography';

class Profiles extends React.Component {

  constructor(props, context) {
    super(props, context);
    const {cat, utils} = $p;
    cat.scheme_settings.find_rows({obj: 'cat.characteristics.coordinates'}, (scheme) => {
      if(scheme.name.endsWith('falsebinding')) {
        this.scheme = scheme;
        this.ox = cat.characteristics.get();
        this._meta = utils._clone(this.ox._metadata('coordinates'));
        this._meta.fields.len.type.fraction = 0;
      }
    });
  }

  filter = (collection) => {
    const res = [];
    collection.clear();
    const {contour: {fillings}} = this.props;

    for(const filling of fillings) {
      if(!filling.visible) {
        continue;
      }
      for(const onlay of filling.imposts) {
        collection.add({
          nom: onlay.nom,
          len: onlay.length.round(),
          elm: 1,
        });
      }
    }
    collection.group_by(['nom', 'len'], ['elm']);
    collection.sort('len');
    collection.forEach((row) => {
      res.push(row);
    });
    return res;
  };

  render() {
    const {ox, scheme, filter} = this;
    return scheme ?
      <div style={{maxHeight: 600, minHeight: 400}}>
        <TabularSection
          _obj={ox}
          _meta={this._meta}
          _tabular="coordinates"
          scheme={scheme}
          filter={filter}
          denyReorder
          hideToolbar
        />
      </div>
      :
      <Typography key="err-nom" color="error">
        {`Не найден элемент scheme_settings {obj: "cat.characteristics.coordinates", name: "characteristics.coordinates.falsebinding"}`}
      </Typography>;
  }

}

Profiles.propTypes = {
  ox: PropTypes.object.isRequired,
  cnstr: PropTypes.number.isRequired,
  contour: PropTypes.object.isRequired,
};

export default Profiles;