/**
 * @Author:     Jeff Hatton
 * @Created:    2021.2.5
 *
 * @Description: util Functions used by listings common components;
 *
 */

export function lastPageStartIndex(totalNumResults, numDisplayedResults){
    const startIndex =
        //if the last page isn't a full page because there is a remainder
        totalNumResults%numDisplayedResults > 0
            //Show the remainder
        ? totalNumResults-(totalNumResults%numDisplayedResults)
            //Show the last page as a full page, not an empty one.
        : totalNumResults-numDisplayedResults;
    return startIndex;
}

export function nextPageStartIndex(totalNumResults, numDisplayedResults, currentStartIndex){
    const startIndex =
        //if new index will be in bounds
        (currentStartIndex+numDisplayedResults<totalNumResults)
            //set new index
        ? currentStartIndex+numDisplayedResults
            //else, last page
        : (totalNumResults%numDisplayedResults > 0)
            ?totalNumResults-(totalNumResults%numDisplayedResults)
            :totalNumResults-numDisplayedResults;
    return startIndex;
}

export function previousPageStartIndex(totalNumResults, numDisplayedResults, currentStartIndex){
    const startIndex =
        //if new index will be in bounds
        (currentStartIndex-numDisplayedResults>=0)
            // set index
            ? currentStartIndex-numDisplayedResults
            // else set to lowest available index
            : 0;
    return startIndex;
}