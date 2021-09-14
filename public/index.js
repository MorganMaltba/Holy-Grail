// Data component used in each section component ----------
function Data(props) {
  return (
    <div>
      Header: {props.data.header} <br />
      Left: {props.data.left} <br />
      Article: {props.data.article} <br />
      Right: {props.data.right} <br />
      Footer: {props.data.footer} <br />
    </div>
  )
};
// ----------------------------------------------------------

// PlusMinus component used in each section component -------
function PlusMinus(props) {
  function handle(event) {
    if (event.target.id === 'minus') {
      props.handle({ name: props.section, value: -1 });
      return;
    }
    props.handle({ name: props.section, value: 1 });
  };

  return (<>
    <img src='icons/plus.png' id='plus' onClick={(e) => handle(e)} />
    <img src='icons/minus.png' id='minus' onClick={(e) => handle(e)} />
  </>)
}
// ------------------------------------------------------------

// Promise functions call to Express Routes -------------------
function update(section, value) {
  return new Promise((resolve, reject) => {
    const url = `/update/${section}/${value}`;
    superagent
      .get(url)
      .end((err, res) => {
        err ? reject(null) : resolve(res.body);
      });
  });
};

function read() {
  return new Promise((resolve, reject) => {
    const url = `/data`;
    superagent
      .get(url)
      .end((err, res) => {
        err ? reject(null) : resolve(res.text);
        // Breakpoint res.text to determine whats being returned
        // EX: Use res.body for JSON ...
      });
  });
};
// ------------------------------------------------------------

// Main App component to be rendered in the root element ------
function App() {
  // Breakpoint to pause render
  const [data, setData] = React.useState({
    header: 0,
    left: 0,
    article: 0,
    right: 0,
    footer: 0
  });

  React.useEffect( () => {
    read()
      .then( res => {
        setData(res)
      });
  }, []);
  // Reads DB and updates local UI data state

  function handle(section) {
    const response = update(section.name, section.value)
      .then( res => {
        setData(res)
      });
  };
  // Updates DB amd local UI data state

  return (
    <div className='grid'>
      <Header handle={handle} data={data} />
      <Left handle={handle} data={data} />
      <Article handle={handle} data={data} />
      <Right handle={handle} data={data} />
      <Footer handle={handle} data={data} />
    </div>
  );
};
// ------------------------------------------------------------

// Use ReactDOM to render the App component in the DOM --------
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// ------------------------------------------------------------