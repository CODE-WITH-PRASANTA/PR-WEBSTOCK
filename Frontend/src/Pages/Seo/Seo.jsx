import React from "react";

import SeoHero from "../../Components/SeoHero/SeoHero";
import FirstPageResults from "../../Components/SeoFirstPageResults/FirstPageResults";
import SeoServicesForAgency from "../../Components/SeoServicesForAgency/SeoServicesForAgency";
// import BenefitsOfOurSerVices from "../../Components/SeoBenefitsOfOurServices/BenefitsOfOurSerVices";
import SeoStrtegic from "../../Components/SeoStrategic/SeoStrtegic";
import SeoRole from "../../Components/SeoRole/SeoRole";
import SeoDigitalproducts from "../../Components/SeoDigitalproducts/SeoDigitalproducts";
import SeoPagination from "../../Components/SeoPegination/SeoPagination";
import SeoFeatures from "../../Components/SeoFeatures/SeoFeatures";
import SeoWorkResult from "../../Components/SeoWorkResult/SeoWorkResult";

const Seo = () => {


  return (
    <div>
      <SeoHero/>
      <FirstPageResults/>
      <SeoServicesForAgency/>
      {/* <BenefitsOfOurSerVices/> */}
      <SeoStrtegic/>
      <SeoRole/>
      <SeoDigitalproducts/>
      <SeoPagination />
      <SeoFeatures/>
      <SeoWorkResult/>
    </div>
  );
};

export default Seo;
