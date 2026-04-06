import SearchResult from './search-result';

function SearchPanel() {
  return (
    <>
      <div className='bg-gray-100 p-4 border'>
        <h2 className='text-lg font-bold uppercase'>Search</h2>
      </div>
      <p className='text-center text-sm text-muted-foreground'>
        Just add your <span className='font-bold'>keyword</span> on form and
        click <span className='font-bold'>Search</span>
      </p>
      <SearchResult />
    </>
  );
}

export default SearchPanel;
