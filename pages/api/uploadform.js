require('dotenv').config()
var pdf = require('html-pdf');
var fs = require('fs');
var FormData = require('form-data');

export default async function handler(req, res) {

    let userdata = req.body.userdata;
    let userFormData = req.body.userFormData
    console.log(userdata)
    var options = { format: 'a4', pageBreak: '.page-break', timeout: 60000, "height": "11in", "width": "10in", };


    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enrollment Form</title>
        <style>
        .container {
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            padding: 20px;
            overflow-x: hidden;
            /* white-space: pre-wrap; */
            font-size:.7em;
        }
    
        .t-align-center {
            text-align: center;
    
        }
    
        p {
            white-space: pre-wrap;
        }
    
        h1 {
            text-align: center;
            /* margin: 0%; */
        }
    
        .heading {
            font-weight: bold;
            margin-bottom: 5px;
            margin-top: 10px;
        }
    
        .input {
            width: 200px;
            height: 15px;
            border: 1px solid black;
            display: inline-block;
            padding: 2px;
        }
    
        .d-block {
            display: block;
        }
    
        p {
            width: 100%;
    
        }
    
        .img {
            width: 200px;
    
        }
    
    
        .img img {
            width: 100%;
            height: 100%;
        }
    
        .d-ib {
            display: inline-block;
    
        }
    
        .space {
            margin-top: 50px;
        }
    
        .page-break {
            height: 20px;
            page-break-after: always;
    
        }
    
        .w-25 {
            width: 25%;
        }
    
        .w-40 {
            width: 40%;
        }
    
        .w-60 {
          width: 60%;
      }
        .w-70 {
            width: 70%;
        }
    
        .w-85 {
            width: 85%;
        }
    
        .w-100 {
            width: 100%;
        }
    </style>
    </head>
        <body>
        <div class="container">
        <div class="logo">
                <img src="http://www.ccst.eyedropperstaging.com.au/wp-content/uploads/2022/04/Child-Care-Services-Training_281x100-1.png"
                    alt="">
                <h1>Enrollment Form Submission </h1>
            </div>
            <span class="d-block w-85">
            All answers to your completed enrollment form can be found in this document.
            Please retain this information in a safe place for your records. <br>
            For further information, please contact us by email at contact@ccst.com
            </span>
            <div class="space"></div>
    
            
            <!-- Course -->
            <div class="block">
                <div class="heading">Select the course you are enrolling in</div class="heading">
                <input type="radio" id="" name="" value="30" ${userFormData.radio_18.includes("HLTAID012") ? "checked" : ""} >
                <label for="age1">HLTAID012 Provide First Aid in an Education and Care Setting</label><br>
                <input type="radio" id="" name="" value="60" ${userFormData.radio_18.includes("CHC30121") ? "checked" : ""}>
                <label for="age2">CHC30121 Certificate III in Early Childhood Education and Care</label><br>
                <input type="radio" id="" name="" value="60" ${userFormData.radio_18.includes("CHC50121") ? "checked" : ""}>
                <label for="age2">CHC50121 Diploma in Early Childhood Education and Care</label><br>
                <div class="space"></div>
            </div>
    
            <!-- USI String -->
            <div class="block">
            <span class="heading">Your Unique Student Identifier (USI)</span>
            <span class="input d-block">${userFormData.text_14}</span>
            <div class="space"></div>
            </div>
    
            <!-- CONTACT Name -->
            <h2>Address Details</h2>
    
            <!-- Title -->
            <div class="block">
                <div class="heading">Title</div class="heading">
                <input type="radio"  value="30" ${userFormData.radio_1.toLowerCase() == "mr" ? "checked" : ""}>
                <label for="age1">Mr</label><br>
                <input type="radio"  value="60" ${userFormData.radio_1.toLowerCase() == "mrs" ? "checked" : ""}>
                <label for="age1">Mrs</label><br>
                <input type="radio"  value="60" ${userFormData.radio_1.toLowerCase() == "miss" ? "checked" : ""}>
                <label for="age1">Miss</label><br>
                <input type="radio"  value="60" ${userFormData.radio_1.toLowerCase() == "other" ? "checked" : ""}>
                <label for="age1">Other</label><br><br>
                <span class="wrapper">
                    <span class="heading d-block">Other</span>
                    <span class="input">${userFormData?.text_2 ? userFormData?.text_2 : ""}</span>
                </span>
    
                <div class="space"></div>
            </div>
    
            <!-- NAMES -->
            <div class="block">
                <span class="wrapper">
                    <span class="heading d-block">Last Name</span>
                    <span class="input w-85">${userFormData.name_1}</span>
                </span>
    
                <span class="wrapper">
                    <span class="heading d-block">First Name</span>
                    <span class="input w-85">${userFormData.name_2}</span>
                </span>
    
                <span class="wrapper d-ib w-40">
                    <span class="heading d-block">Middle Name</span>
                    <span class="input w-85">${userFormData.name_3}</span>
                </span>
                <span class="wrapper d-ib w-40">
                    <span class="heading d-block">Preferred Name</span>
                    <span class="input w-85">${userFormData.name_4}</span>
                </span>
                <span class="wrapper d-ib w-40">
                    <span class="heading d-block">Date of Birth</span>
                    <span class="input w-85">${userFormData.date_1}</span>
                </span>
    
                <div class="space"></div>
            </div>
    
            <!-- PhotoID -->
            <div class="block">
                <h2>PhotoID</h2>
                <div class="img"><img
                        src="${userFormData.upload_1}"
                        alt=""></div>
                <div class="space"></div>
            </div>
    
            <!-- Emergency contact -->
            <div class="block">
                <h2>Emergency Contact</h2>
                <span class="wrapper">
                    <span class="heading d-block">Name</span>
                    <span class="input w-85">${userFormData.name_5}</span>
                </span>
    
                <span class="wrapper">
                    <span class="heading d-block">Relationship to enrolee</span>
                    <span class="input w-85">${userFormData.text_15}</span>
                </span>
    
                <span class="wrapper">
                    <span class="heading d-block">Address</span>
                    <span class="input w-85">${userFormData.text_16}</span>
                </span>
    
    
                <span class="wrapper d-ib w-40">
                    <span class="heading d-block">Subrub</span>
                    <span class="input w-85">${userFormData.text_17}</span>
                </span>
                <span class="wrapper d-ib w-40">
                    <span class="heading d-block">Postcode</span>
                    <span class="input w-85">${userFormData.text_18}</span>
                </span>
    
                <span class="wrapper">
                    <span class="heading d-block">Phone</span>
                    <span class="input w-85">${userFormData.phone_4}</span>
                </span>
    
                <div class="space"></div>
                <!-- <div class="skip"></div> -->
            </div>
    
            <div class="page-break"></div>
    
            <!-- PART A eligibility -->
            <div class="block">
                <h2>Part a) Eligibility</h2>
                <h4>1. Residency Details</h4>
                <span class="wrapper d-ib w-40">
                    <span class=" d-block">In which country were you born?</span>
                    <input type="radio" id="age2" name="age" value="60" ${userFormData.radio_2.toLowerCase() == "australia" ? "checked" : ""}>
                    <label for="age1">Australia</label><br>
                    <input type="radio" id="age2" name="age" value="60" ${userFormData.radio_2.toLowerCase() != "australia" ? "checked" : ""}>
                    <label for="age1">Other – please specify</label><br><br>
                </span>
                <span class="wrapper d-ib w-40">
                    <span class="heading d-block">please specify</span>
                    <span class="input w-85">${userFormData?.text_19 ? userFormData.text_19 : ""}</span>
                </span>
    
                <!-- IF Australia -->
                <h4>Resident Type</h4>
                <span class="wrapper">
                    <input type="radio" id="age2" name="age" value="60" ${parseInt(userFormData.radio_14) == 1 ? "checked" : ""}>
                    <label for="age1">Australian citizen</label><br>
                    <input type="radio" id="age2" name="age" value="60" ${parseInt(userFormData.radio_14) == 2 ? "checked" : ""}>
                    <label for="age1">Permanent Australian Resident</label><br>
                    <input type="radio" id="age2" name="age" value="60" ${parseInt(userFormData.radio_14) == 3 ? "checked" : ""}>
                    <label for="age1">New Zealand citizen living in South Australia</label><br>
                    <input type="radio" id="age2" name="age" value="60" ${parseInt(userFormData.radio_14) == 4 ? "checked" : ""}>
                    <label for="age1">Visa type – check (Go to 2)</label><br>
                </span>
    
                <!-- visa -->
                <h4>2. Visa type (if applicable) </h4>
                <span class="wrapper">
                    <input type="radio" name="visa" value="subclass-475-495" ${userFormData?.radio_3?.includes("495") ? "checked" : ""} />
                    <label>Skilled – Regional sponsored (provisional) Visa, subclass 475 and subclass 495</label>
                    <br />
    
                    <input type="radio" name="visa" value="subclass-487" ${userFormData?.radio_3?.includes("487") ? "checked" : ""}/>
                    <label>Skilled – Regional sponsored (provisional) Visa, subclass 487</label>
    
                    <br />
                    <input type="radio" name="visa" value="subclass-489" ${userFormData?.radio_3?.includes("489") ? "checked" : ""}/>
                    <label>Skilled – Regional sponsored (provisional) Visa, subclass 489</label>
    
                    <br />
                    <input type="radio" name="visa" value="subclass-163" ${userFormData?.radio_3?.includes("163") ? "checked" : ""}/>
                    <label>State/Territory Sponsored Business Owner (provisional) Visa, subclass 163</label>
    
                    <br />
                    <input type="radio" name="visa" value="subclass-164" ${userFormData?.radio_3?.includes("164") ? "checked" : ""}/>
                    <label>State/Territory Sponsored Senior Executive (provisional) Visa, subclass 164</label>
    
                    <br />
                    <input type="radio" name="visa" value="subclass-165" ${userFormData?.radio_3?.includes("165") ? "checked" : ""}/>
                    <label>State/Territory Sponsored Investor (provisional) Visa, subclass 165</label>
                    <br />
                </span>
    
                <!-- Highest Education -->
                <h4>3. Highest level of Education</h4>
                <p>Have you SUCCESSFULLY completed any of the following qualifications in AUSTRALIA? If yes tick
                applicable box and attach copies.</p>
                <span class="wrapper">
                    <input type="checkbox" name="education" value="higher-degree" ${HighestEducation(8) ? "checked" : ""}/>
                    <label>
                        Bachelor Degree for Higher Degree level
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="advanced-diploma" ${HighestEducation(410) ? "checked" : ""}/>
                    <label>
                        Advanced Diploma or Associate Degree level
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="diploma" ${HighestEducation(420) ? "checked" : ""}/>
                    <label>
                        Diploma
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="certificate-iv" ${HighestEducation(511) ? "checked" : ""}/>
                    <label>
                        Certificate IV (or advanced certificate/technician)
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="certificate-iii" ${HighestEducation(514) ? "checked" : ""}/>
                    <label>
                        Certificate III(or trade certificate)
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="certificate-ii" ${HighestEducation(521) ? "checked" : ""}/>
                    <label>
                        Certificate II
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="certificate-i" ${HighestEducation(524) ? "checked" : ""}/>
                    <label>
                        Certificate I
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="other" ${HighestEducation(990) ? "checked" : ""}/>
                    <label>
                        Other education (including certificates or overseas qualifications not listed above)
                    </label>
                    <br />
                    <input type="checkbox" name="education" value="no-qualification" ${HighestEducation(0) ? "checked" : ""}/>
                    <label>
                        No post school qualifications
                    </label>
                    <br />
                </span>
                <div class="page-break"></div>
    
                <!-- Concession -->
                <span class="wrapper">
                    <h4>4. Concession</h4>
                    <p>Do you have any of the following concessions?</p>
                    <span class="wrapper">
                        <input type="checkbox" name="card" value="health-care" ${concession("Health") ? "checked" : ""} />
                        <label>
                            Health Care Card
                        </label>
                        <br />
                        <input type="checkbox" name="card" value="pensioners-concession" ${concession("Pensioners") ? "checked" : ""}/>
                        <label>
                            Pensioners Concession card
                        </label>
                        <br />
                        <input type="checkbox" name="card" value="veterans-affairs" ${concession("Veterans") ? "checked" : ""}/>
                        <label>
                            Veterans Affairs Concession Card
                        </label>
                        <br />
                        <input type="checkbox" name="card" value="none" ${concession("None") ? "checked" : ""}/>
                        <label>
                            None
                        </label>
                        <br />
    
                    </span>
                </span>
    
                <span class="wrapper">
                    <span class="heading d-block">Date</span>
                    <span class="input w-40">${userFormData?.date_3 ? userFormData?.date_3 : ""}</span>
                </span>
                <div class="space"></div>
              
                <!-- Upload 2 -->
                ${userFormData?.upload_2 ? `
                <span class="wrapper d-block">
                <span class="heading">Photo</span>
                <div class="img"><img src="${userFormData?.upload_2}" alt=""></div>
                </span>
                `: ""}
    
                <!-- 5. Centrelink benefit expiry -->
                <span class="wrapper">
                    <span class="heading d-block">5. Centrelink benefit expiry Date</span>
                    <span class="input w-40">${userFormData?.date_2}</span>
                </span>
                <div class="space"></div>
    
                <!--6. Prisoner -->
                <span class="wrapper">
                    <span class="heading d-block">6. Prisoner</span>
                    <input type="radio" id="yes" name="contact" value="yes" ${userFormData.radio_4 != "No" ? "checked" : ""}>
                    <label for="yes">Yes (If yes contact the Skills for All info line 1800 506 266)</label><br>
                    <input type="radio" id="no" name="contact" value="no" ${userFormData.radio_4 == "No" ? "checked" : ""}>
                    <label for="no">No</label><br>
                </span>
                <div class="space"></div>
    
                <!-- 7. Were you/are you under the Guardianship of the minister? -->
                <span class="wrapper">
                    <span class="heading d-block">7. Were you/are you under the Guardianship of the minister?</span>
                    <input type="radio" name="work_ready" value="yes" id="yes-radio" ${userFormData.radio_5 != "No" ? "checked" : ""}>
                    <label for="yes-radio">Yes (If yes contact the WorkReady info line 1800 506 266)</label><br>
    
                    <input type="radio" name="work_ready" value="no" id="no-radio"${userFormData.radio_5 == "No" ? "checked" : ""}>
                    <label for="no-radio">No</label>
    
                </span>
                <div class="space"></div>
    
                <!-- 8. Are you currently enrolled in secondary school? -->
                <span class="wrapper">
                    <span class="heading d-ib w-40">8. Are you currently enrolled in secondary school?</span>
                    <span class="input d-ib "></span><br>
                    <input type="radio" name="work_ready" value="yes" id="yes-radio" ${userFormData.radio_6 != "No" ? "checked" : ""}>
                    <label for="yes-radio">Yes</label><br>
    
                    <input type="radio" name="work_ready" value="no" id="no-radio" ${userFormData.radio_6 == "No" ? "checked" : ""}>
                    <label for="no-radio">No</label>
    
                </span>
                <div class="space"></div>
                
                <!-- training -->
                <span class="wrapper">
                <span class="heading d-block">If yes which of the following applies:</span><br>
                
                <input type="checkbox" id="sba" name="sba" value="sba" ${TraningArea("Apprenticeship") ? "checked" : ""}>
                <label for="sba">School Based Apprenticeship,Training Contract</label><br>
    
                <input type="checkbox" id="tgs" name="tgs" value="tgs" ${TraningArea("SACE") ? "checked" : ""}>
                <label for="tgs">Training Guarantee for SACE Students</label><br>
    
                <input type="checkbox" id="efs" name="efs" value="efs" ${TraningArea("Exemption") ? "checked" : ""}>
                <label for="efs">Exemption from attending School</label><br>
    
            </span>
            <div class="page-break"></div>
            
            <!-- Part b) Demographic -->
            <span class="wrapper">
            <h2 class="heading">Part b) Demographic – Mandatory information for
                AVETMISS reporting</h2>
            <p>All of these questions must be answered by the student</p>
        </span>
        <div class="space"></div>
    
        <!-- 10.What is your highest COMPLETED school level? -->
        <span class="wrapper">
            <span class="heading d-block">10.What is your highest COMPLETED school level?</span>
            <input type="radio" id="year12" name="education" value="year12" ${parseInt(userFormData.radio_7) == 12 ? "checked" : ""}>
            <label for="year12">Year 12 or Equivalent</label><br>
            <input type="radio" id="year11" name="education" value="year11"  ${parseInt(userFormData.radio_7) == 11 ? "checked" : ""}>
            <label for="year11">Year 11 or Equivalent</label><br>
            <input type="radio" id="year10" name="education" value="year10"  ${parseInt(userFormData.radio_7) == 10 ? "checked" : ""}>
            <label for="year10">Year 10 or Equivalent</label><br>
            <input type="radio" id="year9" name="education" value="year9"  ${parseInt(userFormData.radio_7) == 9 ? "checked" : ""}>
            <label for="year9">Year 9 or Equivalent</label><br>
            <input type="radio" id="year8" name="education" value="year8"  ${parseInt(userFormData.radio_7) == 8 ? "checked" : ""}>
            <label for="year8">Year 8 or below</label><br>
            <input type="radio" id="never" name="education" value="never"  ${parseInt(userFormData.radio_7) == 2 ? "checked" : ""}>
            <label for="never">Never attended school</label><br>
        </span>
        <div class="space"></div>
    
        <!-- 11.Employment Information -->
                <span class="wrapper">
                    <span class="heading">11.Employment Information</span>
                    <p>Of the following categories, which BEST describes your current employment status</p>
                    <input type="radio" id="fulltime" name="employment" value="fulltime"  ${parseInt(userFormData.radio_15) == 1 ? "checked" : ""}>
                    <label for="fulltime">Full-time employment</label><br>
                    <input type="radio" id="parttime" name="employment" value="parttime" ${parseInt(userFormData.radio_15) == 2 ? "checked" : ""}>
                    <label for="parttime">Part-time employment</label><br>
                    <input type="radio" id="selfemployed1" name="employment" value="selfemployed1" ${parseInt(userFormData.radio_15) == 3 ? "checked" : ""}>
                    <label for="selfemployed1">Self-employed - not employing others</label><br>
                    <input type="radio" id="selfemployed2" name="employment" value="selfemployed2" ${parseInt(userFormData.radio_15) == 4 ? "checked" : ""}>
                    <label for="selfemployed2">Self-employed – employing others</label><br>
                    <input type="radio" id="unpaidworker" name="employment" value="unpaidworker" ${parseInt(userFormData.radio_15) == 5 ? "checked" : ""}>
                    <label for="unpaidworker">Employed – unpaid worker in a family business</label><br>
                    <input type="radio" id="unemployedfull" name="employment" value="unemployedfull" ${parseInt(userFormData.radio_15) == 6 ? "checked" : ""}>
                    <label for="unemployedfull">Unemployed – seeking full-time work</label><br>
                    <input type="radio" id="unemployedpart" name="employment" value="unemployedpart" ${parseInt(userFormData.radio_15) == 7 ? "checked" : ""}>
                    <label for="unemployedpart">Unemployed – seeking part-time work</label><br>
                    <input type="radio" id="notemployed" name="employment" value="notemployed" ${parseInt(userFormData.radio_15) == 8 ? "checked" : ""}>
                    <label for="notemployed">Not employed – not seeking employment</label><br>
    
                    <!-- Area of Employment -->
                    <span class="wrapper d-ib w-40">
                        <span class="heading d-block">Suburb of employment</span>
                        <span class="input w-70">${userFormData?.text_21 ? userFormData.text_21 : ""}</span>
                    </span>
                    <span class="wrapper d-ib w-40">
                        <span class="heading d-block">Post code of employment </span>
                        <span class="input w-70">${userFormData?.text_22 ? userFormData.text_22 : ""}</span>
                    </span>
    
                </span>
                <div class="space"></div>
    
                <!-- 12.Do you speak a language other than English at home? -->
                <span class="wrapper">
                    <span class="heading">12.Do you speak a language other than English at home?</span>
                    <p>(If you speak more than one language, indicate the one that is spoken most often.)</p>
                    <span class="wrapper d-ib w-40">
    
                        <input type="radio"  value="english" ${userFormData.radio_8.includes("No") ? "checked" : ""}>
                        <label>English only</label><br>
    
                        <input type="radio"  value="other" ${!userFormData.radio_8.includes("No") ? "checked" : ""}>
                        <label>Yes, other</label>
                    </span>
    
                    <span class="wrapper d-ib w-40">
                        <span class="heading d-block">Please specify</span>
                        <span class="input w-70">${userFormData?.text_23 ? userFormData?.text_23 : ""}</span>
                    </span>
    
                </span>
                <div class="space"></div>
    
                <!-- 13.How well do you speak English? -->
                <span class="wrapper">
                    <span class="heading d-block">13.How well do you speak English?</span>
                    <input type="radio"  value="very-well" ${userFormData?.radio_16 ? parseInt(userFormData.radio_16) == 3 ? "checked" : "" : ""}>
                    <label>
                        Very well
                    </label>
                    <br>
    
                    <input type="radio" value="well" ${userFormData?.radio_16 ? parseInt(userFormData.radio_16) == 2 ? "checked" : "" : ""}>
                    <label>
                        Well
                    </label>
                    <br>
    
                    <input type="radio"  value="not-well" ${userFormData?.radio_16 ? parseInt(userFormData.radio_16) == 1 ? "checked" : "" : ""}>
                    <label>
                        Not well
                    </label>
                    <br>
    
                    <input type="radio" value="not-at-all" ${userFormData?.radio_16 ? parseInt(userFormData.radio_16) == 0 ? "checked" : "" : ""}>
                    <label>
                        Not at all
                    </label>
                    <br>
    
                </span>
                <div class="page-break"></div>
    
                <!-- 14.Are you of Aboriginal or Torres Strait Islander origin? -->
                <span class="wrapper">
                    <span class="heading d-block">14.Are you of Aboriginal or Torres Strait Islander origin?</span>
                    <p>(For persons of both Aboriginal and Torres Strait islander origin, mark both boxes ‘Yes’)</p>
                    <input type="radio"  value="no" ${parseInt(userFormData.radio_17) == 4 ? "checked" : ""}>
                    <label>
                        No
                    </label>
                    <br>
                    <input type="radio"  value="aboriginal" ${parseInt(userFormData.radio_17) == 1 ? "checked" : ""}>
                    <label>
                        Yes, Aboriginal
                    </label>
                    <br>
                    <input type="radio"  value="torres-strait-islander" ${parseInt(userFormData.radio_17) == 2 ? "checked" : ""}>
                    <label>
                        Yes, Torres Strait Islander
                    </label>
    
                </span>
                <div class="space"></div>
    
                <!-- 15.Do you consider yourself to have a disability, impairment or long- term condition? -->
                <span class="wrapper">
                    <span class="heading d-block">15.Do you consider yourself to have a disability, impairment or long- term
                        condition?</span>
                    <input type="radio"  value="yes" ${userFormData.radio_9 == "Yes" ? "checked" : ""}>
                    <label>
                        Yes
                    </label>
                    <br>
    
                    <input type="radio"  value="no" ${!userFormData.radio_9 == "Yes" ? "checked" : ""}>
                    <label>
                        No
                    </label>
                    <p>If YES, then please indicate the areas of disability, impairment or long-term condition. (You may
                        indicate more than one area.)</p>
                    <input type="checkbox" id="hearing" name="disability[]" value="hearing" ${disability(11) ? "checked" : ""}>
                    <label for="hearing">Hearing/Deaf</label><br>
                    <input type="checkbox" id="physical" name="disability[]" value="physical" ${disability(12) ? "checked" : ""}>
                    <label for="physical">Physical</label><br>
                    <input type="checkbox" id="intellectual" name="disability[]" value="intellectual" ${disability(13) ? "checked" : ""}>
                    <label for="intellectual">Intellectual</label><br>
                    <input type="checkbox" id="learning" name="disability[]" value="learning" ${disability(14) ? "checked" : ""}>
                    <label for="learning">Learning</label><br>
                    <input type="checkbox" id="mental" name="disability[]" value="mental" ${disability(15) ? "checked" : ""}>
                    <label for="mental">Mental Illness</label><br>
                    <input type="checkbox" id="brain" name="disability[]" value="brain" ${disability(16) ? "checked" : ""}>
                    <label for="brain">Acquired Brain Impairment</label><br>
                    <input type="checkbox" id="vision" name="disability[]" value="vision" ${disability(17) ? "checked" : ""}>
                    <label for="vision">Vision</label><br>
                    <input type="checkbox" id="medical" name="disability[]" value="medical" ${disability(18) ? "checked" : ""}>
                    <label for="medical">Medical condition</label><br>
                    <input type="checkbox" id="other" name="disability[]" value="other" ${disability(19) ? "checked" : ""}>
                    <label for="other">Other</label><br>
    
                </span>
                <div class="space"></div>
    
                <!-- 16.Your major reason for study? -->
                <span class="wrapper">
                    <span class="heading d-block">16.Your major reason for study?</span>
                    <input type="checkbox" id="get-job" value="get-job" ${StudyReason("Get-a-Job") ? "checked" : ""}>
                    <label for="get-job">Get a Job</label><br>
                    <input type="checkbox" id="develop-business" value="develop-business" ${StudyReason("To-develop-my-Existing-business") ? "checked" : ""}>
                    <label for="develop-business">To develop my Existing business</label><br>
                    <input type="checkbox" id="start-business" value="start-business" ${StudyReason("To-start-my-own-business") ? "checked" : ""}>
                    <label for="start-business">To start my own business</label><br>
                    <input type="checkbox" id="different-career" value="different-career" ${StudyReason("To-try-for-a-different-career") ? "checked" : ""}>
                    <label for="different-career">To try for a different career</label><br>
                    <input type="checkbox" id="better-job" value="better-job" ${StudyReason("To-get-a-better-job-or-promotion") ? "checked" : ""}>
                    <label for="better-job">To get a better job or promotion</label><br>
                    <input type="checkbox" id="job-requirement" value="job-requirement" ${StudyReason("it-was-a-requirement-of-my-job") ? "checked" : ""}>
                    <label for="job-requirement">It was a requirement of my job</label><br>
                    <input type="checkbox" id="extra-skills" value="extra-skills" ${StudyReason("I-wanted-extra-skills-for-my-job") ? "checked" : ""}>
                    <label for="extra-skills">I wanted extra skills for my job</label><br>
                    <input type="checkbox" id="study-course" value="study-course" ${StudyReason("To-get-into-another-course-of-study") ? "checked" : ""}>
                    <label for="study-course">To get into another course of study</label><br>
                    <input type="checkbox" id="personal-interest" value="personal-interest" ${StudyReason("For-personal-interest-or-self-development") ? "checked" : ""}>
                    <label for="personal-interest">For personal interest or self-development</label><br>
                    <input type="checkbox" id="other" value="other" ${StudyReason("Other-reasons") ? "checked" : ""}>
                    <label for="other">Other reasons</label><br>
    
                </span>
                <div class="space"></div>
    
                <!-- 17.Are you registered with an Employment Service Provider? -->
                <span class="wrapper">
                    <span class="heading d-block">17.Are you registered with an Employment Service Provider?</span>
    
                    <input type="radio" id="yes" name="agree" value="yes" ${!userFormData.radio_10 == "No" ? "checked" : ""}>
                    <label for="yes">Yes</label><br>
                    <input type="radio" id="no" name="agree" value="no" ${userFormData.radio_10 == "No" ? "checked" : ""}>
                    <label for="no">No</label><br>
    
                    <p>If Yes the following information must be supplied</p>
                    <span class="wrapper d-ib w-40">
                        <span class="heading d-block">Name of Provider</span>
                        <span class="input w-70">${userFormData?.text_24 ? userFormData?.text_24 : ""}</span>
                    </span>
                    <span class="wrapper d-ib w-40">
                        <span class="heading d-block">Job Seeker ID</span>
                        <span class="input w-70">${userFormData?.text_25 ? userFormData?.text_25 : ""}</span>
                    </span>
                </span>
                <div class="space"></div>
    
                <!-- STUDENT   DECLARATION -->
                <div class="block">
                    <h4 class="heading t-align-center">STUDENT DECLARATION</h4>
                    <br><br>
                    <span class="d-block w-85">
                        I declare that the information I have provided to the best of my knowledge is true and correct.
                        <br> I understand any offer or any subsequent enrolment in a WorkReady training place made of false
                        or misleading information may be withdrawn by the WorkReady Training Provider and/or the
                        Minister for Employment, Higher Education and Skills.
                        <br> I agree to provide photo ID as proof of identity as required by WorkReady guidelines 8.3.
                        <br> I agree to provide my Unique Student Identification number as per the Australian Government
                        requirements.
                        <br> I agree to follow Child Care Services Training’s Policies and Procedures and Code of Practice.
                        <br> I understand that enrolment into this WorkReady subsidised course may impact my future
                        entitlement to government subsidised training.
                        <br> I hereby consent to the collection and use of my personal information in the manner outlined in
                        Child Care Services Training - Confidentiality Statement
                        <br> <br> Under the Data Provision Requirements 2012, Child Care Services Training is required to
                        collect
                        personal information about you and to disclose that personal information to the National Centre
                        for Vocational Education Research Ltd (NCVER).
                        <br> I understand my personal information (including the personal information contained on this
                        enrolment form), may be used or disclosed by Child Care Services Training for statistical,
                        administrative, regulatory and research purposes. Child Care Services Training may disclose my
                        <br> personal information for these purposes to:
                        <br><br> •Commonwealth and State or Territory government departments and authorised agencies; an
                        <br> •NCVER
                        <br> Personal information that has been disclosed to NCVER may be used or disclosed by NCVER for
                        <br> the following purposes:
                        <br> •populating authenticated VET transcripts;
                        <br> •facilitating statistics and research relating to education, including surveys and data
                        linkage;
                        <br> •pre-populating RTO student enrolment forms;
                        <br> understanding how the VET market operates, for policy, workforce planning and consumer
                        information; and
                        •
                        <br> •administering VET, including program administration, regulation, monitoring and evaluation.
                        <br><br> I may receive a student survey which may be administered by a government department or
                        NCVER employee, agent or third party contractor or other authorised agencies. Please note you
                        may opt out of the survey at the time of being contacted.NCVER will collect, hold, use and
                        disclose your personal information in accordance with the Privacy Act 1988 (Cth), the National
                        VET Data Policy and all NCVER policies and protocols (including those published on NCVER's
                        website at www.ncver.edu.au).
    
                    </span>
                    <span class="heading d-block">Signature</span>
                    <div class="img"><img
                            src="${userFormData.signature_1}"
                            alt=""></div>
                    <div class="page-break"></div>
    
                    <span class="heading d-block">PRINT FULL NAME OF GUARDIAN IF UNDER 18</span>
                    <span class="input w-85">${userFormData.name_13}</span>
    
                    <span class="heading d-block">SIGNATURE OF GUARDIAN</span>
                    <div class="img"><img
                            src="${userFormData?.signature_4 ? userFormData.signature_4 : ""}"
                            alt=""></div>
                    </div>
                <div class="page-break"></div>
    
                <!-- Payment of Fees -->
                <div class="block">
                    <h4 class="heading t-align-center">Payment of Fees</h4>
                    <h4><b> *Fees to be paid in full prior to course start date* </b></h4>
                    <p>Cost Student co-contribution fee $350.00</p>
                    <input type="radio" id="student" name="fee-responsibility" value="student" ${!userFormData.radio_11.includes("Workplace-responsible-for-fee") ? "checked" : ""}>
                    <label for="student">Student responsible for fee</label><br>
                    <input type="radio" id="workplace" name="fee-responsibility" value="workplace" ${userFormData.radio_11.includes("Workplace-responsible-for-fee") ? "checked" : ""}>
                    <label for="workplace">Workplace responsible for fee</label><br>
                    <p>If workplace please complete: </p>
                    <span class="wrapper ">
                        <span class="heading d-block">Workplace</span>
                        <span class="input w-85">${userFormData?.text_27 ? userFormData.text_27 : ""}</span>
                    </span>
                    <span class="wrapper d-ib w-40">
                        <span class="heading d-block">Contact Name</span>
                        <span class="input w-85">${userFormData?.name_8 ? userFormData.name_8 : ""}</span>
                    </span>
                    <span class="wrapper d-ib w-40">
                        <span class="heading d-block">Phone</span>
                        <span class="input w-85">${userFormData?.phone_5 ? userFormData.phone_5 : ""}</span>
                    </span>
                    <span class="wrapper">
                        <span class="heading d-block">Email</span>
                        <span class="input w-85">${userFormData?.email_2 ? userFormData.email_2 : ""}</span>
                    </span>
                </div>
                <div class="page-break"></div>
    
                <!-- APPENDIX 1 -  PARTICIPANT AGREEMENT -->
                <div class="block">
                    <div class=""><img
                            src="https://lh3.googleusercontent.com/pw/AJFCJaUAmIHk0uQkxKlRBOV8LuCxchB5Ww60lvVSrmRT9NE3sc-0vIwiwUasDatGbyFKSuGXF8-LcGJjwv91kCqlc2RUV6-t5N9hcI3rDWNMFRDYHf0dB1IHXCq63km2lWNcBQD-eX3eh4FLWj5tZ0J_ixgYEMp9futN2iaxOuOf6PjqkkuHPWrMiNF9gl_7fySaeKQVytMNCdGA0Ix0Xn35z-4m8vZOxjsjtyaVAAxpodE1yZMPY7N_2NrKcNjcwFTRk0hsRGAfV5IfHnUznyTu4EllFtnLmI9tLMjoHFlGPPa20Z6n3y0YiiAZtI33mn-iyhLRO7QlDddB64uSG-SN7utuzAJ_PmA0rwv5cSVGFh0v4SDm9SzAs9byL8UTj27GUMtpCGiMnwIqwvbZLalWK61QFKA0HLgdi3EwQxJFH53WgHPRTYlEKK1Ocan3f-w7g0bF70Jb3kmGpVxJ0X4-WvvVmfvU2Ogal0BWCluSRi0KDIN8ifM1bb7r1TOgSnpRBCHbJPMkar9nDYIu33RYa2n7Z8w2ZQpCQSiVkdN8uFDC0LWYsafXwQX5NHA1ct21KojjWOI6VtcLnEHsHx0A8AWqQQtRjKHMfBUzB-WzaCw3zwA9hxguSiekI_TxZRRZlnfAcJeMBqCxA3yHtHVpahWYspeTzxI78QE4d8MgpgelwXasSKTH8a03iRRobqubThmq7iM_yDJfUkfV6P53oPYbVRX9fnCA8eZgTmiVvH_-bm-G-Yy6aXxzRLMbEcHqPhFrucYhJXR1JojCAOaUhpTk6rEY83FnC6_mTiopJlXONEzk1jtJ4nGCueYbnW9Y-TfQIQDjY5HiFjryc3Gd85r8V_r_LKThY00w-3h9zO57J8bPbhid-iyG8J4fsV8GFpxl-lWSaHkgPvYGvyPKNAbzHdYh2V8RmhbJTxLkP2jH0tjFzUkbF1hbiLgoku9450LeLfw2txZDas129Mu9qVmg4wRd9oYJG9wcIvHDxejq2U1Z2wtSSJ0Tuo4pJ2k-=w709-h118-s-no?authuser=0"
                            alt=""></div>
                    <h4 class="heading ">APPENDIX 1 - PARTICIPANT AGREEMENT</h4>
                    <h4 class="heading">COLLECTION AND USE OF PERSONAL INFORMATION</h4>
    
                    <p>I acknowledge and agree that:</p>
                    <span class="d-block w-85">
                        1. I wish to participate in an activity funded by the Skills and Employment Division in the
                        Department for Industry and Skills;
                        <br> 2.I accept that the Minister for Industry and Skills <b>(Minister)</b> will allocate to me a
                        <b>Participant</b>
                        <b> Number,</b> to be used to record my participation in, and the results of,activities funded by
                        the Skills and Employment Division in the Department for Industry and Skills;
                        <br> 3. I accept that the assessment as to whether I am eligible to enrol in any specific activity
                        funded by
                        the Skills and Employment Division in the Department for Industry and Skills will be undertaken
                        by a training provider who has a WorkReady contract with the Minister;
                        <br> 4. I consent to the Minister, its employees, agents and contractors collecting from the
                        training
                        provider my results in all courses which I have been enrolled and using this information for the
                        purpose of determining whether I am eligible to enrol in an activity funded by the Skills and
                        Employment Division in the Department for Industry and Skills. I consent to the Minister, its
                        employees, agents and contractors using this information for the Department for Industry and
                        Skills’ performance measurement and reporting activities;
                        <br> 5. I consent to the Minister, its employees, agents and contractors collecting and usingany
                        student
                        identifier (as that term is defined in the Student Identifiers Act 2014) assigned to or relating to
                        meand using that student identifier to obtain transcripts and other information relating to me
                        and using this information to determine my eligibility for an activity funded by the Skills and
                        Employment Division in the Department for Industry and Skillsand to record and track my
                        progress through the activities funded by the Skills and Employment Division in the Department
                        for Industry and Skills;
                        <br> 6.I accept and agree that the Minister, its employees, agents and contractors will be in
                        receipt of
                        my <b> Personal Information </b> and that they may be required to share my personal information
                        with:
    
                        •registered training organisations who have a current WorkReady contract with the Minister;
                        other South Australian government agencies (including regulators) responsible and/or involved in
                        training and education (whether accredited or not), including but not limited to funding,
                        monitoring training and/or compliance;
                        •
                        Commonwealth government agencies (including regulators) responsible and/or involved in
                        training and education (whether accredited or not), including but not limited to policy,
                        development, funding, monitoring and/or compliance; and
                        •
                        government agencies (including regulators) in other Australian states and territories responsible
                        and/or involved in the training and education (whether accredited or not), including but not limited
                        to policy, development, funding, monitoring and/or compliance.
                        <br> 7. By providing my Personal Information as outlined above, I am consenting to the Minister, its
                        employees, agents and contractors contacting me during or after I have ceased my training or
                        education for the purposes of:
    
                        •statistical reporting and analysisin respect to training outcomes;
                        •undertaking an evaluation of the training;
                        promoting the training and WorkReady (or any other program run by the Minister which relates to
                        training);
                        •assessing quality of training;
                        •recording the information about my training;
                        reporting on the WorkReady Program (or any other program run by the Minister which relates to
                        training).
                        <br> 8. I agree to notify the Minister if the Personal Information outlined above changes;
                        <br>9. Where required by the Minister, I agree to access my student profile maintained by the
                        Minister
                        and its employees, agents and contractors and advise if any of the Personal Information
                        contained in my student profile is incorrect;
                        <br> 10. I agree to participate in data collection activities (including surveys, workshops, focus
                        groups and
                        other methods of collecting information from participants) conducted by the Department for
                        Industry and Skills to evaluate skills and employment programs.
                    </span>
    
                </div>
    
                <span class="wrapper">
                    <span class="heading d-block">PRINT FULL NAME</span>
                    <span class="input w-85">${userFormData?.name_12 ? userFormData?.name_12 : ""}</span>
                    <span class="heading d-block">Signature</span>
                    <div class="img"><img
                            src="${userFormData.signature_1}"
                            alt=""></div>
                    <div class="space"></div>
                    <span class="heading d-block">PRINT FULL NAME OF GUARDIAN IF UNDER 18</span>
                    <span class="input w-85">${userFormData.name_13}</span>
                    <span class="heading d-block">Signature OF GUARDIAN</span>
                    <div class="img"><img
                            src="${userFormData?.signature_4 ? userFormData?.signature_4 : ""}"
                            alt=""></div>
    
    
    
    
                </span>
    
    
        </div>
    
    
    </body>
    </html>
    
    
    `



    const portfolioUrl = 'https://childcareservicestraining.app.axcelerate.com/api/contact/portfolio/'
    const headers = {
      apitoken: process.env.APITOKEN,
      wstoken: process.env.WSTOKEN,
    };

    let portfolioData = await fetch(`${portfolioUrl}?${new URLSearchParams({contactID:userdata.CONTACTID,portfolioTypeID:42072})}`,{method:"POST",headers})

    // let portfolioData = await fetch(`${portfolioUrl}?${new URLSearchParams({contactID:userdata.CONTACTID,portfolioTypeID:45156})}`,{method:"POST",headers})
    portfolioData = await portfolioData.json()
    console.log(portfolioData)
    // Set the API endpoint URL



    // var htmls = fs.readFileSync('./index.html', 'utf8');





    // pdf.create(html, options).toBuffer(async function (err, buffer) {
    //     if (err) return console.log(err);
    //     console.log(buffer); // { filename: '/app/businesscard.pdf' }

    //     const formData = new FormData();
    //     // Append the file to the form-data object
    //     formData.append('addFile', buffer, {
    //       filename: 'Enrollmentform.pdf',
    //       contentType: `application/pdf`,
    //       knownLength: buffer.length,
    //     });

    //     const params = {
    //         contactID: userdata.CONTACTID,
    //         portfolioID: portfolioData.PORTFOLIOID,
    //         addFileFolder: 'other',
    //     };

    //     // Send the POST request to the API endpoint
    //     const url = 'https://childcareservicestraining.app.axcelerate.com/api/contact/portfolio/file';
    //     const postRes = await fetch(`${url}?${new URLSearchParams(params)}`, {
    //       method: 'POST',
    //       headers,
    //       body: formData,
    //     });

    //      // Handle the API response
    //     console.log(postRes.status, postRes.statusText);
    //     const json = await postRes.json();
    //     console.log(json);

    // res.send("done")

    // });

    pdf.create(html, options).toFile(`./temp/EnrollmentForm${userdata.CONTACTID}.pdf`, function (err, filename) {
        if (err) return console.log(err);
        console.log(filename); // { filename: '/app/businesscard.pdf' }
        fs.readFile(`./temp/EnrollmentForm${userdata.CONTACTID}.pdf`, async function (err, data) {
            if (err) {
                console.error(err);
            } else {
                const buffer = Buffer.from(data);
                console.log(buffer);
                const formData = new FormData();
                // Append the file to the form-data object
                formData.append('addFile', buffer, {
                    filename: 'Enrollmentform.pdf',
                    contentType: `application/pdf`,
                    knownLength: buffer.length,
                });

                const params = {
                    contactID: userdata.CONTACTID,
                    portfolioID: portfolioData.PORTFOLIOID,
                    addFileFolder: 'other',
                };

                // Send the POST request to the API endpoint
                const url = 'https://childcareservicestraining.app.axcelerate.com/api/contact/portfolio/file';
                const postRes = await fetch(`${url}?${new URLSearchParams(params)}`, {
                    method: 'POST',
                    headers,
                    body: formData,
                });

                // Handle the API response
                console.log(postRes.status, postRes.statusText);
                const json = await postRes.json();
                console.log(json);

                fs.unlink(`./temp/EnrollmentForm${userdata.CONTACTID}.pdf`, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File removed successfully');
                    }
                });

                res.send("done")



            }
        });

    });







    // functions

    function HighestEducation(value) {
        let valuesArray = userFormData.checkbox_3.split(",")
        if (!Array.isArray(valuesArray)) {
            return parseInt(valuesArray) == value ? true : false
        }

        if (Array.isArray(valuesArray)) {
            let bool = valuesArray.filter((checkboxvalue) => parseInt(checkboxvalue) == value)[0]
            return parseInt(bool) == value ? true : false

        }
    }



    function concession(value) {
        let valuesArray = userFormData.checkbox_4?.split(",")
        if (Array.isArray(valuesArray)) {
            let matchedvalue = valuesArray.filter((checkboxvalue) => checkboxvalue.toLowerCase().includes(value.toLowerCase()))
            return matchedvalue[0]?.toLowerCase().includes(value.toLowerCase()) ? true : false

        }

    }


    function TraningArea(value) {
        let valuesArray = userFormData?.checkbox_5?.split(",")

        if (Array.isArray(valuesArray)) {
            let matchedvalue = valuesArray.filter((checkboxvalue) => checkboxvalue.toLowerCase().includes(value.toLowerCase()))
            return matchedvalue[0]?.toLowerCase().includes(value.toLowerCase()) ? true : false

        }

    }


    function disability(value) {
        let valuesArray = userFormData?.checkbox_9?.split(",")

        if (Array.isArray(valuesArray)) {
            let bool = valuesArray.filter((checkboxvalue) => parseInt(checkboxvalue) == value)[0]
            return parseInt(bool) == value ? true : false

        }
    }

    function StudyReason(value) {
        let valuesArray = userFormData?.checkbox_10?.split(",")

        if (Array.isArray(valuesArray)) {
            let matchedvalue = valuesArray.filter((checkboxvalue) => checkboxvalue.toLowerCase().includes(value.toLowerCase()))
            return matchedvalue[0]?.toLowerCase().includes(value.toLowerCase()) ? true : false
        }

    }


}


