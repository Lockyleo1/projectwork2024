import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Component/Navbar';
import ChartComponent from './Component/ChartComponent';
import ChartComponentInProgettazione from './Component/ChartComponentInProgettazione';
import ChartComponentInEsecuzione from './Component/ChartComponentInEsecuzione';
import ChartComponentInCollaudo from './Component/ChartComponentInCollaudo';

const regionOptions = [
  { value: '', label: 'Seleziona una regione' },
  { value: 'Abruzzo', label: 'Abruzzo' },
  { value: 'Basilicata', label: 'Basilicata' },
  { value: 'Calabria', label: 'Calabria' },
  { value: 'Campania', label: 'Campania' },
  { value: 'Emilia Romagna', label: 'Emilia Romagna' },
  { value: 'Friuli Venezia Giulia', label: 'Friuli Venezia Giulia' },
  { value: 'Lazio', label: 'Lazio' },
  { value: 'Liguria', label: 'Liguria' },
  { value: 'Lombardia', label: 'Lombardia' },
  { value: 'Marche', label: 'Marche' },
  { value: 'Molise', label: 'Molise' },
  { value: 'Piemonte', label: 'Piemonte' },
  { value: 'Puglia', label: 'Puglia' },
  { value: 'Sardegna', label: 'Sardegna' },
  { value: 'Sicilia', label: 'Sicilia' },
  { value: 'Toscana', label: 'Toscana' },
  { value: 'Trentino Alto Adige', label: 'Trentino Alto Adige' },
  { value: 'Umbria', label: 'Umbria' },
  { value: "Valle d'Aosta", label: "Valle d'Aosta" },
  { value: 'Veneto', label: 'Veneto' },
];

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [region, setRegion] = useState('');
  const [dataTerminati, setDataTerminati] = useState(null);
  const [dataInProgettazione, setDataInProgettazione] = useState(null);
  const [dataInEsecuzione, setDataInEsecuzione] = useState(null);
  const [dataInCollaudo, setDataInCollaudo] = useState(null);

  const handleComponentChange = (e) => {
    setSelectedComponent(e.target.value);
    setRegion('');
    setDataTerminati(null);
    setDataInProgettazione(null);
    setDataInEsecuzione(null);
    setDataInCollaudo(null);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const fetchData = async (endpoint, setData) => {
    if (region) {
      try {
        const response = await axios.get(`http://localhost:5000/${endpoint}/${region}`);
        setData(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati', error);
      }
    }
  };

  const fetchTerminati = () => fetchData('dataTerminati', setDataTerminati);
  const fetchInProgettazione = () => fetchData('dataInProgettazione', setDataInProgettazione);
  const fetchInEsecuzione = () => fetchData('dataInEsecuzione', setDataInEsecuzione);
  const fetchInCollaudo = () => fetchData('dataInCollaudo', setDataInCollaudo);

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <h1 className="title">Stato Lavori - Progetto Banda Ultra Larga (BUL)</h1>
        <p className="description">
          Il progetto Banda Ultra Larga (BUL) rappresenta un pilastro fondamentale nell'evoluzione delle infrastrutture di connettività in Italia. L'obiettivo principale è fornire accesso ad Internet ad alta velocità a una vasta gamma di utenti, migliorando significativamente la qualità della connettività. Quest'applicazione web permette di monitorare lo stato dei lavori BUL nelle diverse regioni italiane, offrendo una panoramica dettagliata sulla copertura, la qualità del servizio e lo stato di avanzamento dei cantieri.
        </p>
        <div className="dropdown-container">
          <select value={selectedComponent} onChange={handleComponentChange} className="select-box">
            <option value="">Seleziona un componente</option>
            <option value="terminati">Lavori Terminati</option>
            <option value="inProgettazione">Lavori in Progettazione</option>
            <option value="inEsecuzione">Lavori in Esecuzione</option>
            <option value="inCollaudo">Lavori in Collaudo</option>
          </select>
        </div>
        {selectedComponent && (
          <>
            <div className="select-container">
              <select value={region} onChange={handleRegionChange} className="select-box">
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  switch (selectedComponent) {
                    case 'terminati':
                      fetchTerminati();
                      break;
                    case 'inProgettazione':
                      fetchInProgettazione();
                      break;
                    case 'inEsecuzione':
                      fetchInEsecuzione();
                      break;
                    case 'inCollaudo':
                      fetchInCollaudo();
                      break;
                    default:
                      break;
                  }
                }}
              >
                Visualizza Dati
              </button>
            </div>
            {selectedComponent === 'terminati' && dataTerminati && (
              <div className="chart-container">
                <h2 className="chart-title">Lavori Terminati</h2>
                <ChartComponent data={dataTerminati} />
                <div className="chart-description">
                  <p>Questo grafico mostra lo stato dei lavori terminati per la tecnologia FWA e Fibra in una determinata regione.</p>
                  <p>Include sia i lavori chiusi sia quelli in collaudo. Speriamo che le conclusioni tratte da questa analisi possano essere utili per valutare lo stato attuale dei progetti.</p>
                </div>
              </div>
            )}
            {selectedComponent === 'inProgettazione' && dataInProgettazione && (
              <div className="chart-container">
                <h2 className="chart-title">Lavori in Progettazione</h2>
                <ChartComponentInProgettazione data={dataInProgettazione} />
                <div className="chart-description">
                  <p>Questo grafico illustra i lavori attualmente in fase di progettazione per la tecnologia FWA e Fibra in una determinata regione.</p>
                  <p>Questa fase indica che il piano potrebbe non essere ancora stato emesso o che il progetto del cantiere è ancora in fase di progettazione.</p>
                </div>
              </div>
            )}
            {selectedComponent === 'inEsecuzione' && dataInEsecuzione && (
              <div className="chart-container">
                <h2 className="chart-title">Lavori in Esecuzione</h2>
                <ChartComponentInEsecuzione data={dataInEsecuzione} />
                <div className="chart-description">
                  <p>Questo grafico evidenzia i lavori attualmente in esecuzione per la tecnologia FWA e Fibra in una determinata regione.</p>
                  <p>Questa fase indica che i cantieri sono attualmente in esecuzione e i lavori sono in corso di realizzazione.</p>
                </div>
              </div>
            )}
            {selectedComponent === 'inCollaudo' && dataInCollaudo && (
              <div className="chart-container">
                <h2 className="chart-title">Lavori in Collaudo</h2>
                <ChartComponentInCollaudo data={dataInCollaudo} />
                <div className="chart-description">
                  <p>Questo grafico mostra i lavori che sono attualmente in fase di collaudo per la tecnologia FWA e Fibra in una determinata regione.</p>
                  <p>Questa fase indica che i lavori sono stati completati e la fibra è in fase di collaudo per il test o è già stata collaudata e funzionante.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
