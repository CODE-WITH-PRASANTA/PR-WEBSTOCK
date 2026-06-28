import React from 'react'
import './SocialMediaManagement.css'
import Marketing from '../../Components/Marketing/Marketing'
import Webomind from '../../Components/Webomindapp/Webomind'
import Ourservice from '../../Components/Ourservice/Ourservice'
import HowSocialMedia from "../../Components/HowSocialMedia/HowSocialMedia";
import Growyourbrand from "../../Components/Growyourbrand/Growyourbrand";
import SocialMediaBreadcrum from "../../Components/SocialMediaBreadcrum/SocialMediaBreadcrum"
import Platform from '../../Components/platform/Platform'
import Industries from '../../Components/Industries/Industries'
import Result from '../../Components/Results/Results'
import Reviews from '../../Components/Reviews/Reviews'


const SocialMediaManagement = () => {
  return (
    <div>
        <SocialMediaBreadcrum/>
        <Marketing />
        <Webomind/>
        <Ourservice/>
        <HowSocialMedia/>
        <Growyourbrand/>
        <Platform/>
        <Industries/>
        <Result/>
        <Reviews/>
    </div>
  )
}

export default SocialMediaManagement