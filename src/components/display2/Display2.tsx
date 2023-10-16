import { SummaryDetails, SummaryImage, SummaryTitle, SummaryDescription, SummaryPrice } from "../../pages/summary/Summary.style"
import { convertToCurrency } from "../../helpers/convertToCurrency"


export const Display2 = ({summaryData}) => {
return(
         <>
         <SummaryDetails>
                 <SummaryImage src={summaryData.image} alt="" />
                 <SummaryImage src={summaryData.image2} alt="" />
             <SummaryTitle>{summaryData.name} / {summaryData.name2}</SummaryTitle>
             <SummaryDescription>
                 {summaryData.text} / {summaryData.text2} {`(${summaryData.slices}) pedaços`}
             </SummaryDescription>
             <SummaryPrice>{convertToCurrency(summaryData.price)}</SummaryPrice>
         </SummaryDetails>
     </>
    )
}