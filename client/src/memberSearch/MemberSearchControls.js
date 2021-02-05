/**
 * @Author:     Jeff Hatton
 * @Created:    2021.2.2
 *
 * @Description: returns button controls for navigating results of member search as well as input for how many results to display, out of how many;
 *
 */
import React, {useState, useEffect} from 'react';
import Button from "../common/forms/Button";
import PropTypes from "prop-types";


function MemberSearchControls(props) {
    const {currentNumResults, currentFirstResult, numOfResultsAvailable, onChangeNumResults, onChangeStartIndex} = props;
    const [numResults,setNumResults] = useState(currentNumResults);
    const [proposedNumResults, setProposedNumResults] = useState(numResults)
    const [firstResult,setFirstResult] = useState(currentFirstResult);
    const handleFirstClick = () => {
        setFirstResult(0);
    }
    const handleLastClick = () => {
        setFirstResult(numOfResultsAvailable-(numOfResultsAvailable%numResults)<numOfResultsAvailable?numOfResultsAvailable-(numOfResultsAvailable%numResults):numOfResultsAvailable-numResults)
    }
    const handlePreviousClick = () => {
        setFirstResult((firstResult-numResults>=0)?firstResult-numResults:0)
    }
    const handleNextClick = () => {
        setFirstResult((
            firstResult+numResults<numOfResultsAvailable)
            ?firstResult+numResults
            :(numOfResultsAvailable%numResults>0)
                ?numOfResultsAvailable-(numOfResultsAvailable%numResults)
                :numOfResultsAvailable-numResults
        );
    }
    const handleUpdateClick = () => {
        setNumResults(proposedNumResults);
    }

    useEffect(() => {
        onChangeNumResults(
            numResults
        )
    }, [numResults]);

    useEffect(() => {
        onChangeStartIndex(
            firstResult
        )
    }, [firstResult]);

    return(
        <div>
            <Button value={"First"} onClick={handleFirstClick}/>
            <Button value={"Previous"} onClick={handlePreviousClick}/>
            <input
                type="number"
                min={1}
                max={numOfResultsAvailable}
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
MemberSearchControls.propTypes = {
    currentNumResults: PropTypes.number.isRequired,
    currentFirstResult: PropTypes.number.isRequired,
    numOfResultsAvailable: PropTypes.number.isRequired,
    onChangeNumResults: PropTypes.func.isRequired,
    onChangeStartIndex: PropTypes.func.isRequired
}
export default MemberSearchControls;