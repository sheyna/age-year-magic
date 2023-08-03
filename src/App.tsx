import { useState } from 'react'

// Date handling
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// types
import census from './typeCensus';
import options from './typeOptions';
import ageObj from './typeAgeObj';

// other components
import Button from '@mui/material/Button';
import DrawerMenu from './components/DrawerMenu';
import ResultsTable from './components/ResultsTable';
import Alert from '@mui/material/Alert';

// modules
import makeCensusList from './census';

// css
import './App.css'

type resultsType = {
  display: boolean,
  btnText: string,
  btnVariant: string,
  results: Array<ageObj>,
  dateWritten: string
}

type errorDataType = {
  errorType: string,
  errorMsg: string,
  isAnError: boolean
}

function makeAgeInstance(age: Dayjs, censusDate: census) {
  return {
    age: age,
    censusName: censusDate.censusName,
    censusDate: censusDate.censusObj,
    dateWritten: censusDate.censusObj.format('D MMM YYYY')
  }
}

function getAges(birthDate: Dayjs, censusData: Array<census> | null) {
  const agesArr: Dayjs[] = [];
  (censusData && censusData.length > 0) && censusData.forEach((cen: census) => {
    // calcuate age
    if (cen.censusObj.year() >= birthDate.year()) {
      const age = cen.censusObj.diff(birthDate, 'year');
      agesArr.push(makeAgeInstance(age, cen));
    }
  });
  return agesArr;
}

// create default dates for date picker
const today = dayjs();
const minDate = dayjs('1670-01-01 01:00');
let displayBtn = false;


function App() {
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [censusOptions, setCensusOptions] = useState<options>({
    showUSCensuses: true,
    show1890Census: false,
    showKansasCensus: true
  });
  const [resultsView, setResultsView] = useState<resultsType>({
    display: false,
    btnText: 'Find Age',
    results: [],
    btnVariant: 'contained',
    dateWritten: ''
  });

  const [error, setError] = useState<errorDataType>({
    errorType: 'warning',
    errorMsg: '',
    isAnError: false
  });
  
  const handleCheckboxChange =(newCensusOptions: options) => {
    console.log("in app checkbox change")
    console.log(newCensusOptions);
    setCensusOptions(newCensusOptions);
  };

  const handleUpdateCensusListResults =() => {
    console.log(censusOptions);
    if (!birthDate) {
      setError({
        errorType: 'warning',
        errorMsg: 'Please enter birth date first',
        isAnError: false
      }); 
    } else {
      const censusList: Array<census> = makeCensusList(censusOptions) || [];
      const ages: Array<ageObj> = birthDate && getAges(birthDate, censusList);
      const dateWritten: string | null = birthDate && birthDate.format('D MMM YYYY');
      setResultsView({
        display: true,
        btnText: 'Update Age',
        btnVariant: 'text',
        results: ages,
        dateWritten: dateWritten || ''
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <header>
        <h1>Age Year Magic</h1>
        <h2>Age calculator</h2>
        <p>Narrow down the birthdate of an ancestor<br/>
          by comparing their ages at census dates.<br/>
          Enter an approximate birthdate to start</p>
        <DrawerMenu
          update={handleUpdateCensusListResults}
          censusOptions={censusOptions}
          handleCheckboxChange={handleCheckboxChange}
        />
      </header>
      <main>
        {error.isAnError && 
          <Alert severity={error.errorType}>{error.errorMsg}</Alert>
        }
        <form id="ageEntry">
          <DatePicker
            name='birthDate'
            value={birthDate}
            maxDate={today}
            minDate={minDate}
            format='DD/MM/YYYY'
            label='Approx Birth Date'
            disableFuture
            views={['day', 'month', 'year']}
            onYearChange={() => displayBtn = true}
            onChange={(newValue: Dayjs) => {
              // TODO make this better:
              if (
                newValue
                && !Number.isNaN(newValue.year())
                && !Number.isNaN(newValue.date())
                && !Number.isNaN(newValue.month())
              ) {
                displayBtn = true;
              }
              setBirthDate(newValue);
            }}
          />

          {displayBtn && (
            <Button
              variant={resultsView.btnVariant}
              onClick={handleUpdateCensusListResults}
            >
              {resultsView.btnText}
            </Button>
          )}
        </form>
        {resultsView.display && (
          <>
            <p>From a birthdate of {resultsView.dateWritten}</p>
            <ResultsTable agesData={resultsView.results} />
          </>
        )}
        <footer>
          <div className='note'>
            <p>Remember that ages reported in census records are often approximate.</p>
            <p>Use this tool to help you find the most likely approximate birthdate.</p>
          </div>

          <p className='credit'>© Sheyna Watkins</p>
        </footer>
      </main>
    </LocalizationProvider>
  )
}

export default App;
