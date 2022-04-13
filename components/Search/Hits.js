import { connectStateResults } from "react-instantsearch-dom"

function Hits({ searchState, searchResults }) {
    const validQuery = searchState.query?.length >= 3 // 3 is the minimum query length

    return (
        <>
            {searchResults?.hits.length === 0 && validQuery && (
                <p>No results found!</p>
            )}

            {searchResults?.hits.length > 0 && validQuery && (
                <>
                    {searchResults.hits.map((hit, index) => (
                        <div tabIndex={index} key={hit.objectID}>
                            <p>{hit.title}</p>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default connectStateResults(Hits)