import React from 'react';
import { Spinner } from 'react-bootstrap'
import './App.css';
import { OpmetForm } from './components/OpmetForm';
import type { AggregatedResults } from './model/AggregatedResults';
import { OpmetHelper } from './api/OpmetHelper';
import { OpmetTable } from './components/OpmetTable';

function App() {
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ error, setError ] = React.useState<string | null>(null);
  const [ data, setData ] = React.useState<AggregatedResults>({});

  const formSubmit = React.useCallback((reports: ('METAR' | 'SIGMET' | 'TAF')[], stations?: string[], countries?: string[]) => {
    // Exit if already working
    if (loading)
      return;
    setLoading(true);
    // Query Opmet Service and
    OpmetHelper.query(reports, stations, countries)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setData({});
        setError((err as Error).message);
      })
      .finally(() => setLoading(false));
  }, [loading]);

  return (
    <div className="App">
      <h1>Pilot Briefing - IDT Assessment</h1>
      <OpmetForm key='opmet_form' onSubmit={formSubmit} disabled={loading} />
      {loading ?
        <Spinner style={{ marginTop: '20pt' }} />
          :
        <OpmetTable key='opmet_table' error={error} data={data} />
      }
    </div>
  );
}

export default App;
