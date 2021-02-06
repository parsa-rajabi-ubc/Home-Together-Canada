/**
 * @Author:     Jeff Hatton
 * @Created:    2021.2.2
 *
 * @Description: returns button controls for navigating results of member search as well as input for how many results to display, out of how many;
 *
 */
import React, {useState} from 'react';
import Button from "../forms/Button";
import PropTypes from "prop-types";
import {lastPageStartIndex, nextPageStartIndex, previousPageStartIndex} from "../utils/ListingUtils";


function SearchListingsControls(props) {
    const {currentNumResults, currentFirstResult, totalNumResults, onChangeNumResults, onChangeStartIndex} = props;
    const numDisplayedResults = currentNumResults;
    const [proposedNumResults, setProposedNumResults] = useState(numDisplayedResults)
    const firstResult = currentFirstResult;
    const handleFirstClick = () => {
        onChangeStartIndex(0);
    }
    const handleLastClick = () => {
        onChangeStartIndex(lastPageStartIndex(totalNumResults, numDisplayedResults));
    }
    const handlePreviousClick = () => {
        onChangeStartIndex(previousPageStartIndex(totalNumResults, numDisplayedResults, firstResult));
    }
    const handleNextClick = () => {
        onChangeStartIndex(nextPageStartIndex(totalNumResults, numDisplayedResults, firstResult));
    }
    const handleUpdateClick = () => {
        onChangeNumResults(proposedNumResults);
    }

    return(
        <div>
            <Button value={"First"} onClick={handleFirstClick}/>
            <Button value={"Previous"} onClick={handlePreviousClick}/>
            <input
                type="number"
                min={1}
                max={totalNumResults}
                step="1"
                value={proposedNumResults}
                onChange={(e) => setProposedNumResults(parseInt(e.target.value))}
            />
            <Button value={"Update Page Size"} onClick={handleUpdateClick}/>
            <Button value={"Next"} onClick={handleNextClick}/>
            <Button value={"Last"} onClick={handleLastClick}/>
        </div>
    )
}
SearchListingsControls.propTypes = {
    currentNumResults: PropTypes.number.isRequired,
    currentFirstResult: PropTypes.number.isRequired,
    totalNumResults: PropTypes.number.isRequired,
    onChangeNumResults: PropTypes.func.isRequired,
    onChangeStartIndex: PropTypes.func.isRequired
}
export default SearchListingsControls;