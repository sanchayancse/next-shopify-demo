import algoliasearch from "algoliasearch/lite";
import SearchBox from "../components/Search/SearchBox";
import Hits from "../components/Search/Hits";
import { InstantSearch }
    from "react-instantsearch-dom";

    const searchClient = algoliasearch(
      'HQVOQMXDDN',
      '15f0547a6287ff6af05a37a9c17d4b33',
    );
    
export default function SearchBar() {
    return (
      <>
        <InstantSearch 
          searchClient={searchClient} 
          indexName="shopify_devpocproducts">
    
          {/* Adding Search Box */}
          <SearchBox />
          {/* Adding Data */}
          <Hits />
        </InstantSearch>
      </>
    );
  }