import React from "react";
import CMS from "netlify-cms-app"
import { CmsWidgetControlProps, CmsWidgetPreviewProps } from "netlify-cms-core";

console.log("HELLO");

class CategoriesControl extends React.Component<CmsWidgetControlProps<string[]>> {
  handleChange = (e) => {
    const separator = this.props.field.get('separator', ', ')
    this.props.onChange(e.target.value.split(separator).map((e) => e.trim()));
  }

  render() {
    const separator = this.props.field.get('separator', ', ');
    var value = this.props.value;

    const props = {
      id: this.props.forID,
      className: this.props.classNameWrapper,
      type: 'text',
      value: value ? value.join(separator) : '',
      onChange: this.handleChange,
    };

    return <input {...props} />
  }
};

class CategoriesPreview extends React.Component<CmsWidgetPreviewProps<string[]>> {
  render() {
    return (
      <ul>{this.props.value.map(function(val, index) {
        return (<li key={index}>{val}</li>);
      })}</ul>
    )
  }
};

var schema = {
  properties: {
    separator: { type: 'string' },
  },
}

CMS.registerWidget('categories', CategoriesControl, CategoriesPreview, schema);
