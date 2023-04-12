import React from 'react'
import { useState } from 'react'
import { Score } from './Score'
export const SingleReport = ({ Results }) => {

    const [selectedResult, setselectedResult] = useState({})
    const [ViewResult, setViewResult] = useState({})

    function isRequired(score) {
        const notRequired = [
            "Image Quality Score",
        ];
        if (score == notRequired[0]) return false
        return true
    }

    function GetFullyear(date) {
        let dateobj = new Date(date)
        return `${dateobj.getFullYear()}-${dateobj.getMonth()}-${dateobj.getDate()}`
    }

    function extractTime(dateString) {
        const date = new Date(dateString);
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        const second = String(date.getSeconds()).padStart(2, "0");

        return `${hour}:${minute}:${second}`;
    }

    return (
        <div className='singleReport'>
            {Object.keys(ViewResult).length == 0 &&
                <>
                    <div className="heading">Report History</div>
                    <div className="historyWrapper">
                        {Results.map((result, i) => {
                            return (
                                <div className={`resultHistory ${selectedResult.createdAt == result.createdAt ? "selected" : ""}`} key={i} onClick={() => setselectedResult(result)}>{GetFullyear(result.createdAt)} {extractTime(result.createdAt)}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => setViewResult(selectedResult)}>View Report</button>
                </>
            }

            {Object.keys(ViewResult).length != 0 &&
                <div className='ResultBox'>
                    <h3 className='date'>{ViewResult.email} {GetFullyear(ViewResult.createdAt)} {extractTime(ViewResult.createdAt)}</h3>
                    {ViewResult.maskedData[0].map((result, i) => {
                        if (result?.result?.area_results?.length != undefined && result?.result?.area_results?.length != 0) {

                            if (isRequired(result?.result?.area_results[0]?.main_metric?.name)) {
                                return (
                                    <Score key={i} name={result?.result?.area_results[0]?.main_metric?.name} AreaResults={result?.result?.area_results} />
                                )
                            }

                        }

                        //    
                    })}
                    <button onClick={() => { setViewResult({}) }}>Back to Reports</button>

                </div>

            }

        </div>

    )
}