import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import './App.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import DrawerMenu from './components/DrawerMenu';
import ResultsTable from './components/ResultsTable';
import makeCensusList from './census';


type census = {
  censusObj: Dayjs,
  censusName: string
}

type options = {
  showUSCensuses: boolean,
  show1890Census: boolean,
  showKansasCensus: boolean
}

type ageObj = {
  age: number;
  censusName: string;
  censusDate: Dayjs;
  dateWritten: string;
}

// class AgeInstance {
//   constructor(age: Dayjs, censusDate: census) {
//     this.age = age;
//     this.censusName = censusDate.censusName;
//     this.censusDate = censusDate.censusObj;
//     this.dateWritten = censusDate.censusObj.format('D MMM YYYY');
//   }
// }

function makeAgeInstance(age: Dayjs, censusDate: census) {
  return {
    age: age,
    censusName: censusDate.censusName,
    censusDate: censusDate.censusObj,
    dateWritten: censusDate.censusObj.format('D MMM YYYY')
  }
}

function getAges(birthDate: Dayjs, censusData: Array<census>) {
  const agesArr:Dayjs[] = [];
  // console.log(birthDate);
  // console.log(censusData);
  censusData.length > 0 && censusData.forEach((cen: census) => {
    // calcuate age
    console.log(cen);
    if (cen.censusObj.$y >= birthDate.$y) {
      const age = cen.censusObj.diff(birthDate, 'year');
      console.log(age);
      agesArr.push(makeAgeInstance(age, cen));
    }
  });
  // console.log(agesArr);
  return agesArr;
}

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
  const [resultsView, setResultsView] = useState({
    display: false,
    btnText: 'Find Age',
    results: [],
    dateWritten: ''
  });
  const censusList:Array<census | null> = makeCensusList(censusOptions) || [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DrawerMenu/>
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
            console.log(newValue);
            // TODO make this better:
            if (!Number.isNaN(newValue.$y) && !Number.isNaN(newValue.$D && !Number.isNaN(newValue.$M))) {
             displayBtn = true;
            }
            setBirthDate(newValue);
          }} 
        />
      
      {displayBtn && (
        <Button 
          variant="text"
          onClick={() => {
            const ages:Array<ageObj | null> = birthDate && getAges(birthDate, censusList);
            const dateWritten:string | null = birthDate && birthDate.format('D MMM YYYY');
            console.log(ages);
            setResultsView({
              display: true,
              btnText: 'Update Age',
              results: ages || [],
              dateWritten: dateWritten || ''
            });
          }}
        >
          {resultsView.btnText}
        </Button>
      )}
      {resultsView.display && (
        <>
        <p>From a birthdate of {resultsView.dateWritten}</p>
        <ResultsTable agesData={resultsView.results}/>
        </>
      )}
    </LocalizationProvider>
  )
}

export default App
