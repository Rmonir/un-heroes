export const SearchFilters = [{
    title: 'Email',
    type: 'text'
},
{
    title: 'Phone',
    type: 'text'
},
{
    title: 'Name',
    type: 'text'
    
},
{
    title: 'Company',
    type: 'text'
},
{
    title: 'Country',
    type: 'dropdown',
    api: 'http://countryapi.gear.host/v1/Country/getCountries?pLimit=25&pPage=1',
    multiple: false,
},
{
    title: 'Date',
    type: 'date',
    //mindate and max date added just for performance and UX
    minDate:'',
    maxDate:''
}];