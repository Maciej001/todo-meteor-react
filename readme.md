# React

## Props
```
//position & size is props made up by the  author of that component.
//Using anything other than a string you need to wrap your props in {}

< MyComponent position="fixed" size={24}/> 
```

[Prop types](http://facebook.github.io/react/docs/reusable-components.html)
```
// you can specify prop types
propTypes: {
  size: React.PropTypes.number,
  position: React.PropTypes.string.isRequired
}

```