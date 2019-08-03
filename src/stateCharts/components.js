import React from 'react';

const processStyle = selected => ({
	width: '90%',
	border: 'none',
	borderRadius: '2rem',
	margin: '.5rem 5px',
	padding: '.5rem',
	cursor: selected ? 'not-allowed' : 'pointer',
	backgroundColor: selected ? 'black' : 'blue',
	color: selected ? 'silver' : 'white',
});

export const Process = ({title, onClick, selected, style={} }) => {
	const theStyle = {...processStyle(selected), ...style};
  return <button
		style={theStyle}
		disabled={selected}
		onClick={onClick}
  >
    {title}
  </button>;
}

export const Pre = React.memo(({data, name='', raw=false}) => {
  // console.log('rendering', name);
  data = raw ? data : JSON.stringify(data, null, 2);
  return <pre>{data}</pre>;
});

export const Col = props => {
  const { children, width, height='90vh', show=true, ...rest } = props;
  const display = show ? 'inline-block' : 'none';
  return (
    <div style={{
      verticalAlign: 'top',
      display,
      width,
      height
    }} {...rest}>
      {props.children}
    </div>
  );
};

export const H4 = ({ children }) => (
	<h4 style={{
		fontFamily: 'Ubuntu',
		fontWeight: 400,
		margin: '.5em 1.5em',
	}}>{children}</h4>
);
