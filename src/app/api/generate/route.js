// app/api/generate/route.js
import { NextResponse } from 'next/server';

const TEMPLATES = {
  'SERVICE_AGREEMENT': `Service Agreement
This Service Agreement (the "Agreement") is entered into [DATE] (the "Effective Date") by 
and between [CLIENT_NAME] (the "Customer") located at [CLIENT_ADDRESS] and 
[SERVICE_PROVIDER_NAME] (the "Service Provider") located at [SERVICE_PROVIDER_ADDRESS], also 
individually referred to as the "Party", and collectively the "Parties".

1. Services. The Service Provider shall perform the services listed in this Section 1 (the "Services").
1.1. [SERVICES]
1.2. [ADDITIONAL_SERVICES_1]
1.3. [ADDITIONAL_SERVICES_2]

2. Compensation. The Customer agrees to pay the Service Provider [AMOUNT] as 
payment for the Services provided. This fee will be paid in accordance will the following schedule:
Total Cost of the Services: [TOTAL_COST]
Amount Due at Signing: [AMOUNT_DUE_SIGNING]
Amount Due at Completion: [AMOUNT_DUE_COMPLETION]

3. Expenses. The Customer agrees to reimburse the Service Provider for all expenses incurred as a 
result of performing the Services. The Service Provider agrees to submit all expenses to the Customer 
for approval prior to incurring the expense. All expenses must be approved in writing. The Customer 
will not be liable to reimburse the Service Provider for any expense(s) that was not pre-approved.

4. Payment. The Service Provider shall submit an invoice to the Customer every [INVOICE_PERIOD] days. Invoices shall 
be paid within [PAYMENT_DAYS] days from the date of the invoice. Payments may be made by credit card/electronic 
transfer/check as follows:
[PAYMENT_METHOD_1]
[PAYMENT_METHOD_2]
[PAYMENT_METHOD_3]
[PAYMENT_METHOD_4]

5. Term. The term of this Agreement shall commence on the Effective Date, as stated above, and 
continue for [TERM_LENGTH] days/months/years, unless otherwise terminated per the terms of this 
Agreement.

6. Termination.
6.1. Either Party may terminate the Agreement at any time upon [NOTICE_PERIOD] days prior written notice to the 
other Party. In the event the Customer terminates the Agreement, the Customer shall still 
remain obligated to pay the Service Provider for any Services performed up to the date of 
termination and any expenses approved, but not paid, prior to the date of termination. In the 
event the Service Provider terminates the Agreement, the Service Provider shall reimburse the 
Customer any amounts previously paid to the Service Provider for which the Service Provider 
has not yet performed the Services.
6.2. This Agreement will automatically terminate when both Parties have performed all of their 
obligations under the Agreement and all payments have been received.

7. Relationship of the Parties.
7.1. No Exclusivity. The Parties understand this Agreement is not an exclusive arrangement. The 
Parties agree they are free to enter into other similar agreements with other parties. The 
Service Provider agrees the Service Provider will not enter into any agreements that conflict 
with the Service Provider's obligations under this Agreement.
7.2. Independent Contractor. The Service Provider is an independent contractor. Neither Party 
is an agent, representative, partner, or employee of the other Party.

8. Dispute Resolution.
8.1. Choice of Law. The Parties agree that this Agreement shall be governed by the State and/or 
Country in which the duties of this Agreement are expected to take place. In the event that the 
duties of this Agreement are to take place in multiple States and/or Countries, this Agreement 
shall be governed by [GOVERNING_LAW] law.
8.2. Negotiation. In the event of a dispute, the Parties agree to work towards a resolution through 
good faith negotiation.
8.3. Mediation or Binding Arbitration. In the event that a dispute cannot be resolved through 
good faith negotiation, the Parties agree to submit to binding mediation or arbitration.
8.4. Attorney's Fees. In the event of Arbitration and/or Mediation, the prevailing Party will be 
entitled to its legal fees, including, but not limited to, its attorneys' fees.

9. General.
9.1. Assignment. The Parties may not assign their rights and/or obligations under this Agreement.
9.2. Complete Contract. This Agreement constitutes the Parties entire understanding of their 
rights and obligations. This Agreement supersedes any other written or verbal 
communications between the Parties. Any subsequent changes to this Agreement must be 
made in writing and signed by both Parties.
9.3. Severability. If any section of this Agreement is found to be invalid, illegal, or unenforceable, 
the rest of this Agreement will still be enforceable.
9.4. Waiver. Neither Party can waive any provision of this Agreement, or any rights or obligations 
under this Agreement, unless agreed to in writing. If any provision, right, or obligation is 
waived, it is only waived to the extent agreed to in writing.

10. Notices.
All notices under this Agreement must be sent by email with read receipt requested or by certified or 
registered mail with return receipt requested. Notices shall be sent as follows:

Customer
[CUSTOMER_NOTICE_ADDRESS_1]
[CUSTOMER_NOTICE_ADDRESS_2]
[CUSTOMER_NOTICE_ADDRESS_3]
[CUSTOMER_NOTICE_ADDRESS_4]

Service Provider
[PROVIDER_NOTICE_ADDRESS_1]
[PROVIDER_NOTICE_ADDRESS_2]
[PROVIDER_NOTICE_ADDRESS_3]
[PROVIDER_NOTICE_ADDRESS_4]

The Parties agree to the terms and conditions set forth above as demonstrated by their signatures as follows:

Customer
Signed: _____________________________________
Name: [CUSTOMER_NAME]
Date: [CUSTOMER_SIGNING_DATE]

Service Provider
Signed: _____________________________________
Name: [PROVIDER_NAME]
Date: [PROVIDER_SIGNING_DATE]`,

  
  'EMPLOYMENT_AGREEMENT': `EMPLOYMENT AGREEMENT

This agreement lays down the terms of employment, agreed upon by the employer and employee. 
Whether stated explicitly in the agreement or not, both the employee and the employer have the 
duty of mutual confidence and trust, and to make only lawful and reasonable demands on each 
other.
__________________________________________________________
This EMPLOYMENT AGREEMENT (Hereinafter, the "Agreement")is entered into on this [DAY] day of 
[MONTH], [YEAR], 
BY AND BETWEEN
[COMPANY_NAME], a private limited company incorporated under the Companies Act, 1956, having its 
registered office at [COMPANY_ADDRESS] (hereinafter referred to as the "Company" or "Employer", which 
expression shall, unless repugnant to the meaning or context hereof, be deemed to include all 
permitted successors and assigns), 
AND
[EMPLOYEE_NAME] son/daughter/wife of [GUARDIAN_NAME] aged [AGE] years and residing at 
[EMPLOYEE_ADDRESS] (hereinafter referred to as the "Employee", which expression shall, unless 
repugnant to the meaning or context hereof, be deemed to include all permitted successors and 
assigns). 
WHEREAS, the parties hereto desire to enter into this Agreement to define and set forth the terms 
and conditions of the employment of the Employee by the Company;
NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth below, it is 
hereby covenanted and agreed by the Company and the Employee as follows:
1. Interpretation
In this agreement the following terms shall have the following meanings:
a) "Confidential Information" any trade secret or other information which is confidential 
or commercially sensitive and which is not in the public domain (other than through the wrongful 
disclosure by the Employee) and which belongs to any Group Company (whether stored or recorded 
in documentary or electronic form) and which (without limitation) relates to the business methods, 
management systems, marketing plans, strategic plans, finances, new or maturing business 
opportunities, marketing activities, processes, inventions, designs or similar of any Group Company, 
or to which any Group Company owes a duty of confidentiality to any third party and including in 
particular [CONFIDENTIAL_INFORMATION_SPECIFICS];
b)"The Employment" the employment of the Employee by the Company in accordance with the 
terms of this agreement;
c)"Group Company" the Company, any company of which it is a Subsidiary (being a holding 
company of the Company) and any Subsidiaries of the Company or any holding company, from time 
to time;
d)"Subsidiary" a company as defined in section 1159 of the Companies Act 2006;
e)"Termination Date" the date on which the Employment ceases.
2. Position
a. Upon execution of this Agreement, the employee would be posted as the [POSITION] of the 
Company.
b. During the term period of this Agreement, the Company may change the employee's above 
mentioned post (or position) or location based on the Company's production, operation or working 
requirements or according to the employee's working capacities and performance, including but not 
limited to adjustments made to the employee's job description or work place, promotion, work 
transfer at the same level, and demotion, etc., or adjustments made to the employee's 
responsibilities without any change to employee's post (or position).
3. Term and Probation Period
a. It is understood and agreed that the first [PROBATION_DAYS_NUM] ([PROBATION_DAYS_WORD]) days of employment shall constitute a 
probationary period ("Probationary Period") during which period the Employer may, in its absolute 
discretion, terminate the Employee's employment, without assigning any reasons and without notice 
or cause.
b. After the end of the Probationary Period, the Employer may decide to confirm the 
Employment of the Employee, in its sole discretion. 
c. After the end of the Probationary Period, this Agreement may be terminated in accordance 
with Clause 12 of this Agreement. 
4. Performance of Duties 
a. The Employee agrees that during the Employment Period, he/she shall devote his/her full 
business time to the business affairs of the Company and shall perform the duties assigned to 
him/her faithfully and efficiently, and shall endeavor, to the best of his/her abilities to achieve the 
goals and adhere to the parameters set by the Company. 
b. The Employee shall be responsible for:
[EMPLOYEE_RESPONSIBILITIES]
5. Compensation
Subject to the following provisions of this Agreement, during the Employment Period, the Employee 
shall be compensated for his services as follows:
a. The Employee shall receive anannual salary, payable in monthly or more frequent 
installments, as per the convenience of the Employer, an amount of [SALARY_AMOUNT] per annum/ month, 
subject to such increases from time to time, as determined by the Employer. Such payments shall be 
subject to such normal statutory deductions by the Employer.
b. During the term of this Agreement, the Employee's salary shall be paid by means of bank 
transfer, cheque, or any other method convenient to the Employer, and consented to by the 
Employee.
c. All reasonable expenses arising out of employment shall be reimbursed assuming that the 
same have been authorized prior to being incurred and with the provision of appropriate receipts.
6. Obligations of the Employee
a. Upon execution of agreement, the Employee shall not engage in any sort of theft, fraud, 
misrepresentation or any other illegal act neither in the employment space nor outside the premise 
of employment. If he/she shall do so, the Company shall not be liable for such an act done at his own 
risk.
b. The Employee further promises to never engage in any theft of the Employer's property or 
attempt to defraud the Employer in any manner.
c. The Employee shall always ensure that his/her conduct is in accordance with all the rules, 
regulations and policies of the Company as notified from time to time.
d. The Employee shall not take up part-time or full-time employment or consultation with any 
other party or be involved in any other business during the term of his/her employment with the 
Company.
e. The Employee shall always ensure that his/her conduct is in accordance with all the rules, 
regulations and policies of the Company as notified from time to time, including but not limited to 
Leave Policy and Sexual Harassment Policy.
f. TheEmployer hereby prohibits the Employee from engaging in any sexual harassment and 
the Employee promises to refrain from any form of sexual harassment during the course of 
employment in and around the premise of employment. If the Employee violates this term in the 
agreement, he shall be fully responsible for his/her actions and the Employer shall not be held 
responsible for any illegal acts committed at the discretion of the Employee.
7. Leave Policy 
a. The Employee is entitled to [CASUAL_LEAVE_DAYS_NUM] ([CASUAL_LEAVE_DAYS_WORD]) days of paid casual leaves in a year and [SICK_LEAVE_DAYS_NUM] ([SICK_LEAVE_DAYS_WORD]) 
days of sick leave. In addition, the Employee will be entitled to [PUBLIC_HOLIDAYS_NUM] ([PUBLIC_HOLIDAYS_WORD]) public holidays mentioned 
under the Leave Policy of the Employer. 
b. The Employee may not carry forward or encash any holiday to the next holiday year.
c. In the event that the Employee is absent from work due to sickness or injury, he/she will 
follow the Leave Policy and inform the designated person as soon as possible and will provide regular 
updates as to his/her recovery and as far as practicable will inform the designated person of the 
Employer of his/her expected date of return to work.
d. If the Employee is absent from work due to sickness or injury for more than three 
consecutive days he/she must submit to the Employer a self-certification form. If such absence lasts 
for more than seven consecutive days the Employee must obtain a medical certificate from his/her 
doctor and submit it to the employer. 
e. For any period of absence due to sickness or injury the Employee will be paid statutory sick 
pay only, provided that he satisfies the relevant requirements. The Employee's qualifying days for 
statutory sick pay purposes are Monday to Friday.
8. Assignment
a. The Employee acknowledges that any work including without limitation inventions, designs, 
ideas, concepts, drawings, working notes, artistic works that the Employee may individually or jointly 
conceive or develop during the term of Employment are "works made for hire" and to the fullest 
extent permitted by law, Employee shall assign, and does hereby assign, to the Employer all of 
Employee's right, title and interest in and to all Intellectual Property improved, developed, 
discovered or written in such works.
b. Employee shall, upon request of the Employer, execute, acknowledge, deliver and file any 
and all documents necessary or useful to vest in the Employer all of Employee's right, title and 
interest in and to all such matters.
9. Competing Businesses 
During the Term of this Agreement and for a period of one (1) year after the termination of this 
Agreement, the Employee agrees not to engage in any employment, consulting, or other activity 
involving [COMPETING_BUSINESS_DESCRIPTION] that competes with the business, proposed business or business 
interests of the Employer, without the Employer's prior written consent. 
10. Confidentiality 
a. The Employee acknowledges that, in the course of performing and fulfilling his duties 
hereunder, he may have access to and be entrusted with confidential information concerning the 
present and contemplated financial status and activities of the Employer, the disclosure of any of 
which confidential information to the competitors of the Employer would be highly detrimental to 
the interests of the Employer. 
b. The Employee further acknowledges and agrees that the right to maintain the confidentiality 
of trade secrets, source code, website information, business plans or client information or other 
confidential or proprietary information, for the purpose of enabling the other party such information 
constitutes a proprietary right which the Employer is entitled to protect.
c. Accordingly, the Employee covenants and agrees with the Employer that he will not, under 
any circumstance during the continuance of this agreement, disclose any such confidential 
information to any person, firm or corporation, nor shall he use the same, except as required in the 
normal course of his engagement hereunder, and even after the termination of employment, he shall 
not disclose or make use of the same or cause any of confidential information to be disclosed in any 
manner.
d. The Employer owns any intellectual property created by the Employee during the course of 
the employment, or in relation to a certain field, and he shall thereon have all the necessary rights to 
retain it. After termination of employment, Employee shall not impose any rights on the intellectual 
property created. Any source code, software or other intellectual property developed, including but 
not limited to website design or functionalitythat was created by the employee, during the course of 
employment under this Agreement, shall belong to the Employer.
11. Remedies 
If at any time the Employee violates to a material extent any of the covenants or agreements set 
forth in paragraphs 6 and 9, the Company shall have the right to terminate all of its obligations to 
make further payments under this Agreement. The Employee acknowledges that the Company 
would be irreparably injured by a violation of paragraph 6 or 9 and agrees that the Company shall be 
entitled to an injunction restraining the Employee from any actual or threatened breach of paragraph 
6 or 9 or to any other appropriate equitable remedy without any bond or other security being 
required.
12. Amendment and Termination 
a. In case the Employer terminates the employment without just cause, in which case the 
Employer shall provide the Employee with advance notice of termination or compensation in lieu of 
notice equal to [TERMINATION_NOTICE_MONTHS_NUM] ([TERMINATION_NOTICE_MONTHS_WORD]) month(s).
b. The Employee may terminate his employment at any time by providing the Employer with at 
least [RESIGNATION_NOTICE_MONTHS_NUM] ([RESIGNATION_NOTICE_MONTHS_WORD]) month(s) advance notice of his intention to resign.
c. The Employee may terminate on the last day of the month in which the date of the 
Employee's death occurs; or the date on which the Company gives notice to the Employee if such 
termination is for Cause or Disability.
d. For purposes of this Agreement, "Cause" means the Employee's gross misconduct resulting 
in material damage to the Company, wilful insubordination or disobedience, theft, fraud or 
dishonesty, wilful damage or loss of Employer's property, bribery and habitual lateness or absence, 
or any other willful and material breach of this Agreement. 
13. Restrictive Covenant 
Following the termination of employment of the Employee by the Employer, with or without cause, 
or the voluntary withdrawal by the Employee from the Employer, the Employee shall, for a period of 
three years following the said termination or voluntary withdrawal, refrain from either directly or 
indirectly soliciting or attempting to solicit the business of any client or customer of the Employer for 
his own benefit or that of any third person or organization, and shall refrain from either directly or 
indirectly attempting to obtain the withdrawal from the employment by the Employer of any other 
Employee of the Employer having regard to the same geographic and temporal restrictions. The 
Employee shall not directly or indirectly divulge any financial information relating to the Employer or 
any of its affiliates or clients to any person whatsoever.
14. Notices 
a. Any notice required to be given hereunder shall be deemed to have been properly given if 
delivered personally or sent by pre-paid registered mail as follows: 
• To the Employee: [EMPLOYEE_NOTICE_ADDRESS]
• To the Employer: [EMPLOYER_NOTICE_ADDRESS]
b. And if sent by registered mail shall be deemed to have been received on the 4th business day 
of uninterrupted postal service following the date of mailing. Either party may change its address for 
notice at any time, by giving notice in writing to the other party pursuant to the provisions of this 
agreement.
15. Non-Assignment
The interests of the Employee under this Agreement are not subject to the claims of his creditors and 
may not be voluntarily or involuntarily assigned, alienated or encumbered.
16. Successors 
This agreement shall be assigned by the Employer to any successor employer and be binding upon 
the successor employer. The Employer shall ensure that the successor employer shall continue the 
provisions of this agreement as if it were the original party of the first part.
17. Indemnification
The Employee shall indemnify the employer against any and all expenses, including amounts paid 
upon judgments, counsel fees, environmental penalties and fines, and amounts paid in settlement 
(before or after suit is commenced), incurred by the employer in connection with his/her defense or 
settlement of any claim, action, suit or proceeding in which he/she is made a party or which may be 
asserted against his/her by reason of his/her employment or the performance of duties in this 
Agreement. Such indemnification shall be in addition to any other rights to which those indemnified 
may be entitled under any law, by-law, agreement, or otherwise.
18. Modification
Any modification of this Agreement or additional obligation assumed by either party in connection 
with this Agreement shall be binding only if evidenced in writing signed by each party or an 
authorized representative of each party.
19. Severability
Each paragraph of this agreement shall be and remain separate from and independent of and 
severable from all and any other paragraphs herein except where otherwise indicated by the context 
of the agreement. The decision or declaration that one or more of the paragraphs are null and void 
shall have no effect on the remaining paragraphs of this agreement.
20. Paragraph headings
The titles to the paragraphs of this Agreement are solely for the convenience of the parties and shall 
not be used to explain, modify, simplify, or aid in the interpretation of the provisions of this 
Agreement.
21. Applicable Law and Jurisdiction
This Agreement shall be governed by and construed in accordance with the laws of [GOVERNING_LAW_STATE], [GOVERNING_LAW_COUNTRY]. 
Each party hereby irrevocably submits to the exclusive jurisdiction of the courts of [JURISDICTION_LOCATION], [JURISDICTION_COUNTRY], 
for the adjudication of any dispute hereunder or in connection herewith.
22. Counterparts 
The Agreement may be executed in two or more counterparts, any one of which shall be deemed the 
original without reference to the others.
IN WITNESS WHEREOF, the Employee has hereunto set his hand, and the Company has caused these 
presents to be executed in its name and on its behalf, all as of the day and year first above written.
____________________ ___________________
(Employee) (The Employer) 
Name: [EMPLOYEE_SIGNATORY_NAME]             Represented By: [EMPLOYER_REPRESENTATIVE_NAME]
Designation: [EMPLOYEE_DESIGNATION]`,

  'RENTAL_AGREEMENT': `RENT AGREEMENT

This Rent Agreement is made on this [DATE] (date of rent agreement) by [LANDLORD_NAME]
(name of the landlord) S/o [LANDLORD_FATHER_NAME] (father's name of the landlord), Add:
[LANDLORD_ADDRESS] (residential address of the landlord).
Herein after called the Lessor / Owner, Party Of the first part

AND

[TENANT_COMPANY_NAME] (Name of the proposed company), through its proposed director
[DIRECTOR_NAME] (name of the director) called Lessee/Tenant, Party of the Second Part

That the expression of the term, Lessor/Owner and the Lessee/Tenant Shall mean and
include their legal heirs successors, assigns, representative etc. Whereas the Lessor /Owner is
the owner and in possession of the property No: [PROPERTY_NUMBER]
[PROPERTY_ADDRESS] (registered address of the company) and has agreed to let out the one office Room, one Toilet &
Bathroom Set on said property, to the Lessee/Tenant and the Lessee/Tenant has agreed to take
the same on rent of Rs. [RENT_AMOUNT]/- (In words) per month.

NOW THIS RENT AGREEMENT WITNESSETH AS UNDER:-

1. That the Tenant/Lessee shall pay as the monthly rent of RS. [RENT_AMOUNT]/- (In words) per
month, excluding electricity and water charge.

2. That the Tenant /Lessee shall not sub–let any part of the above said demised premised
premises to anyone else under any circumstances without the consent of Owner.

3. That the Tenant / Lessee shall abide by all the bye - laws, rules and regulation, of the
local authorities in respect of the demised premises and shall not do any illegal activities in the said
demised premises.

4. That this Lease is granted for a period of Eleven (11) months only commencing
from [LEASE_START_DATE] (date of rent commencing from) and this lease can be extended further by
both the parties with their mutual consent on the basis of prevailing rental value in the market.

5. That the Lessee shall pay Electricity & Water charge as per the proportionate consumption
of the meter to the Lessor /Owner.

6. That the Tenant/Lessee shall not be entitled to make structure in the rented premises except
the installation of temporary decoration, wooden partition/ cabin, air – conditioners etc. without the
prior consent of the owner.

7. That the Tenant/lessee can neither make addition/alteration in the said premises
without the written consent of the owner, nor the lessee can sublet part or entire premises to
any person(s)/firm(s)/company(s).

8. That the Tenant/Lessee shall permit the Lessor/Owner or his Authorized agent to enter
in to the said tenanted premises for inspection/general checking or to carry out the repair
work, at any reasonable time.

9. That the Tenant/Lessee shall keep the said premises in clean & hygienic condition and shall
not do or causes to be done any act which may be a nuisance to other.

10. That the Tenant/Lessees shall carry on all day to day minor repairs at his/her own cost.

11. That this Agreement may be terminated before the expiry of this tenancy period by
serving One month prior notice by either party for this intention.

12. That the Lessee shall use the above said premises for Official Purpose Only.

13. That the Lessee/Tenant Shall not store/Keep any offensive, dangerous, explosive or highly
Inflammable articles in the said premises and shall not use the same for any unlawful activities.

14. That the Lessee shall pay the one month's advance rent to the Lessor the same shall be
adjusted in monthly rent.

15. That both the parties have read over and understood all the contents of this agreement and
have signed the same without any force or pressure from any side.

In WITNESS WHEREOF the lessor/Owner and the Tenant / Lessee have hereunto subscribed their
hand at [SIGNING_PLACE] (place) on this the [DATE] (date of rent agreement) year first above
Mentioned in presents of the following Witnesses

WITNESSES:-

1.

2.

[LANDLORD_NAME] (name of the landlord)                [TENANT_COMPANY_NAME] (name of the proposed Company)

Lessor                                                Lessee`,


  'POWER_OF_ATTORNEY': `GENERAL POWER OF ATTORNEY

I, [PRINCIPAL_NAME], residing at [PRINCIPAL_ADDRESS], hereby appoint [ATTORNEY_NAME] ("Agent") of [ATTORNEY_ADDRESS], as my attorney-in-fact ("Agent") to exercise the powers and discretions described below.

If the Agent is unable or unwilling to serve for any reason, I appoint [ALTERNATE_AGENT_NAME] ("Alternate Agent"), of [ALTERNATE_AGENT_ADDRESS], as my alternate or successor Agent, as the case may be to serve with the same powers and discretions.

I hereby revoke any and all general powers of attorney and special powers of attorney that previously have been signed by me. However, the preceding sentence shall not have the effect of revoking any powers of attorney that are directly related to my health care that previously have been signed by me.

My Agent shall have full power and authority to act on my behalf. This power and authority shall authorize my Agent to manage and conduct all of my affairs and to exercise all of my legal rights and powers, including all rights and powers that I may acquire in the future. My Agent's powers shall include, but not be limited to, the power to:

1. Open, maintain or close bank accounts (including, but not limited to, checking accounts, savings accounts, and certificates of deposit), brokerage accounts, retirement plan accounts, and other similar accounts with financial institutions.
- a. Conduct any business with any banking or financial institution with respect to any of my accounts, including, but not limited to, making deposits and withdrawals, negotiating or endorsing any checks or other instruments with respect to any such accounts, obtaining bank statements, passbooks, drafts, money orders, warrants, and certificates or vouchers payable to me by any person, firm, corporation or political entity.
- b. Perform any act necessary to deposit, negotiate, sell or transfer any note, security, or draft of the United States of America, including U.S. Treasury Securities.
- c. Have access to any safe deposit box that I might own, including its contents.

2. Sell, exchange, buy, invest, or reinvest any assets or property owned by me. Such assets or property may include income producing or non-income producing assets and property.

3. Purchase and/or maintain insurance and annuity contracts, including life insurance upon my life or the life of any other appropriate person.

4. Take any and all legal steps necessary to collect any amount or debt owed to me, or to settle any claim, whether made against me or asserted on my behalf against any other person or entity.

5. Enter into binding contracts on my behalf.

6. Exercise all stock rights on my behalf as my proxy, including all rights with respect to stocks, bonds, debentures, commodities, options or other investments.

7. Maintain and/or operate any business that I may own.

8. Employ professional and business assistance, as may be appropriate, including attorneys, accountants, and real estate agents, for my personal or business affairs.

9. Sell, convey, lease, mortgage, manage, insure, improve, repair, or perform any other act with respect to any of my property (now owned or later acquired) including, but not limited to, real estate and real estate rights (including the right to remove tenants and to recover possession). This includes the right to sell or encumber any homestead that I now own or may own in the future.

10. Prepare, sign, and file documents with any governmental body or agency, including, but not limited to, authorization to:
- a. Prepare, sign and file income and other tax returns with federal, state, local, and other governmental bodies.
- b. Obtain information or documents from any government or its agencies, and represent me in all tax matters, including the authority to negotiate, compromise, or settle any matter with such government or agency.
- c. Prepare applications, provide information, and perform any other act reasonably requested by any government or its agencies in connection with governmental benefits (including medical, military and social security benefits), and to appoint anyone, including my Agent, to act as my "Representative Payee" for the purpose of receiving Social Security benefits.

11. Make gifts from my assets to members of my family and to such other persons or charitable organizations with whom I have an established pattern of giving, to file state and federal gift tax returns, and to file a tax election to split gifts with my spouse, if any. However, my Agent shall be prohibited, except as specifically authorized in this instrument, from (a) gifting, appointing, assigning or designating any of my assets, interests or rights, directly or indirectly, to my Agent, my Agent's estate or creditors, or the creditors of my Agent's estate, (b) exercising any powers of appointment I may hold in favor of my Agent, my Agent's estate or creditors, or the creditors of my Agent's estate, or (c) using my assets to discharge any of my Agent's legal obligations, including any obligations of support which my Agent may owe to others, excluding those whom I am legally obligated to support. I appoint [SUBSTITUTE_AGENT_NAME], of [SUBSTITUTE_AGENT_ADDRESS], as my substitute Agent for the sole purpose of making gifts of my property to my Agent or disclaiming assets that then pass directly or indirectly to my Agent or my Agent's estate, as either may be appropriate (unless this substitute Agent is also the Agent).

12. Transfer any of my assets to the trustee of any revocable trust created by me, if such trust is in existence at the time of such transfer.

13. Subject to other provisions of this document, disclaim any interest, which might otherwise be transferred or distributed to me from any other person, estate, trust, or other entity, as may be appropriate. However, my Agent may not disclaim assets, to which I would be entitled, if the result is that the disclaimed assets pass directly or indirectly to my Agent or my Agent's estate.

This Power of Attorney shall be construed broadly as a general Power of Attorney. The listing of specific powers is not intended to limit or restrict the general powers granted in this Power of Attorney in any manner.

Any power or authority granted to my Agent under this document shall be limited to the extent necessary to prevent this Power of Attorney from causing: (i) my income to be taxable to my Agent, (ii) my assets to be subject to a general power of appointment by my Agent, or (iii) my Agent to have any incidents of ownership with respect to any life insurance policies that I may own on the life of my Agent.

My Agent shall not be liable for any loss that results from a judgment error that was made in good faith. However, my Agent shall be liable for willful misconduct or the failure to act in good faith while acting under the authority of this Power of Attorney. A successor Agent shall not be liable for acts of a prior Agent.

No person who relies in good faith on the authority of my Agent under this instrument shall incur any liability to my estate, my personal representative or me. I authorize my Agent to indemnify and hold harmless any third party who accepts and acts under this document. If any part of any provision of this instrument shall be invalid or unenforceable under applicable law, such part shall be ineffective to the extent of such invalidity only, without in any way affecting the remaining parts of such provision or the remaining provisions of this instrument.

My Agent shall be entitled to reasonable compensation for any services provided as my Agent. My Agent shall be entitled to reimbursement of all reasonable expenses incurred as a result of carrying out any provision of this Power of Attorney.

My Agent shall provide an accounting for all funds handled and all acts performed as my Agent, but only if I so request or if such a request is made by any authorized personal representative or fiduciary acting on my behalf.

This Power of Attorney shall become effective immediately, and shall not be affected by my disability or lack of mental competence, except as may be provided otherwise by an applicable state statute. This is a Durable Power of Attorney. This Power of Attorney shall continue effective until my death. This Power of Attorney may be revoked by me at any time by providing written notice to my Agent.

__________________ Date: ___________________
Declarant (signature)

Agent (phone / email): ___________________________

Alternate Agent (phone / email): ___________________________

Witness #1:
Signature: ___________________ Address: ___________________
Full Legal Name: ________________________________________

Witness #2:
Signature: ___________________ Address: ___________________
Full Legal Name: ________________________________________

The foregoing instrument was acknowledged before me on ______________, by
Claimant, _______________, who is personally known to me or who has produced
_________________ as identification.

_____________________________________
Signature of Notary taking acknowledgment
Date of Expiration: _____________________`,

'LAST_WILL_AND_TESTAMENT': `LAST WILL AND TESTAMENT
OF _______________________________

I, ________________________ [Testator], a resident of _________________ [City],
_________________ [State], declare this to be my Last Will and Testament, and revoke all previous wills
and codicils made by me, either jointly or severally.

DECLARATIONS

A. I am of sound mind and of legal age to make this Last Will.

B. This Last Will expresses my wishes without undue influence or duress and with a full understanding of
the nature and extent of all my property and this disposition thereof.

C. At the time of executing this Last Will: (Check one)
☐ I am married to ________________________.
☐ I am NOT married.

D. At the time of executing this Last Will: (Check one)
☐ I have the following children: ________________________________________________.
☐ I do NOT have any children.

ARTICLE I
APPOINTMENT OF EXECUTOR/PERSONAL REPRESENTATIVE

A. I nominate and appoint ________________________ [Executor] to be the executor/personal
representative of this Last Will (the "Executor").

(Optional) If ________________________ [Executor] predeceases me or is otherwise unable to serve as
the Executor, then I appoint ________________________ [Successor Executor] as the successor
Executor.

(Optional) If neither ________________________ [Executor] nor ________________________
[Successor Executor] survives me or is able to serve as the Executor, then I appoint
________________________ [Backup successor Executor] to serve as the backup successor Executor.

I further intend that the term the Executor in this Last Will is synonymous with the terms "personal
representative," "executrix," and "fiduciary," regardless of gender.

B. Compensation (Check one)
☐ The Executor shall be entitled to receive compensation in the amount of $_______________ for the
services performed under this Last Will.
☐ The Executor shall be entitled to receive reasonable compensation for the services performed under
this Last Will.
☐ The Executor is NOT entitled to receive any compensation for the services performed under this Last
Will.

C. Bond (Check one)
☐ The Executor shall be required to furnish a bond or other security for the faithful performance of his or
her duties as the Executor in any jurisdiction.
☐ I direct that any Executor serving hereunder shall NOT be required to furnish any bond or other
security for the faithful performance of his or her duties as the Executor in any jurisdiction whatsoever, or
if a bond is required, he or she shall not be required to furnish any sureties.

ARTICLE II
EXECUTOR'S POWERS

Except as specifically provided in this Will, in addition to the powers conferred by law, I hereby authorize
my [Executor/Personal Representative] and any successors:

A. The Executor shall pay my enforceable unsecured debts, expenses of last illness, funeral expenses,
costs of administration, and claims allowed in administration of my estate: (Check one)
☐ From the principal of my residuary estate according to all applicable laws.
☐ As the Executor deems appropriate, in the Executor's sole discretion, according to all applicable laws.
☐ By the following method: ____________________________________________________________

B. I grant to the Executor the fullest discretionary power to deal with any property held by my estate
without the prior or subsequent approval of any court, including the period after termination of any trust
until finally distributed. No person dealing with the Executor shall be required to inquire into the propriety
of any of his or her actions or make inquiry into the application of any funds or other property. The
Executor shall, however, exercise all powers in a fiduciary capacity for the best interest of the
beneficiaries of the estate. I grant to the Executor all specific powers as conferred by law.

C. In addition to the powers granted by law or as necessary to carry out my intentions in this Last Will, the
Executor shall have the following powers: __________________________________________________
____________________________________________________________________________________

ARTICLE III
EXPENSES

A. All expenses incurred by the Executor during the settlement of my estate in storing, packing, shipping,
delivering, or insuring an article of tangible personal property passing under this Last Will shall be
charged and treated as expenses of administering my estate.

[OPTIONAL] B. If the value of my estate is insufficient to fulfill this Last Will, I give the Executor full
authority to decrease my bequests by a proportionate amount.

ARTICLE IV
DISTRIBUTION OF PERSONAL PROPERTY

A. After payment of my debts, expenses and claims, I give my personal property and effects described
below to:
To ________________________ [NAME], I leave:_______________________.
To ________________________ [NAME], I leave:_______________________.
To ________________________ [NAME], I leave:_______________________.

B. After payment of my debts, expenses and claims, I leave the sum(s) specified below to the following
people:
To ________________________ [NAME], I leave $_______________.
To ________________________ [NAME], I leave $_______________.
To ________________________ [NAME], I leave $_______________.

C. Unless otherwise specifically bequeathed, the remainder of my property, real and personal, and
wheresoever situated, I give to the individuals listed in the apportioned percentages:
To ________________________ [NAME], I leave __________% of my
remaining estate.
To ________________________ [NAME], I leave __________% of my
remaining estate.
To ________________________ [NAME], I leave __________% of my
remaining estate.

D. To the ________________________ [NON_PROFIT_NAME], located at
________________________________________ [ADDRESS], I leave the sum of $_______________ in
honor of ________________________ [HONOREE_NAME].

IN WITNESS WHEREOF, I, ________________________ [Testator], have signed my name below, all this _____ day of
_______________, 20_____.

____________________________________
Testator Signature

SIGNED AND DECLARED by ________________________ [Testator], in our joint presence to be
________________________'s [Testator] Last Will, and remaining in their presence, and in the presence
of each other, and at their request, we signed as attesting witnesses, this clause having first been read
aloud.

____________________________________        ____________________________________
First Witness Signature                        Second Witness Signature

____________________________________        ____________________________________
First Witness Name                            Second Witness Name

____________________________________        ____________________________________
First Witness Address                         Second Witness Address`,


  'NON_DISCLOSURE_AGREEMENT': `NON-DISCLOSURE AGREEMENT

THIS AGREEMENT MADE ON THIS THE [AGREEMENT_DAY] DAY OF [AGREEMENT_MONTH], [AGREEMENT_YEAR]

BY AND BETWEEN

[PARTY_1_NAME], a company incorporated under the Companies Act, 1956 and having its registered office at [PARTY_1_ADDRESS] (hereinafter referred to as "[PARTY_1_SHORT_NAME]", which expression shall unless repugnant to the context or meaning thereof, include its successors in interests and assigns) OF THE ONE PART; 

AND

[COMPANY_NAME] a company incorporated under the Companies Act, 2013 and having its registered office at [COMPANY_ADDRESS] (hereinafter referred to as "Company" which expression shall, unless repugnant to the context or meaning thereof, be deemed to include, its representatives and permitted assigns) OF THE OTHER PART;

[PARTY_1_SHORT_NAME] and COMPANY shall hereinafter be referred to as such or collectively as "Parties" and individually as "Party".


WHEREAS both the Parties herein wish to pursue discussions and negotiate with each other for the purpose of entering into a potential business arrangement in relation to [PROPOSED_TRANSACTION] ("Proposed Transaction");

AND WHEREAS the Parties contemplate that with respect to the Proposed Transaction, both the Parties may exchange certain information, material and documents relating to each other's business, assets, financial condition, operations, plans and/or prospects of their businesses (hereinafter referred to as "Confidential Information", more fully detailed in clause 1 herein below) that each Party regards as proprietary and confidential; and

AND WHEREAS, each Party wishes to review such Confidential Information of the other for the sole purpose of determining their mutual interest in engaging in the Proposed Transaction; 

IN CONNECTION WITH THE ABOVE, THE PARTIES HEREBY AGREE AS FOLLOWS:

1.	"Confidential and or proprietary Information" shall mean and include any information disclosed by one Party (Disclosing Party) to the other (Receiving Party) either directly or indirectly, in writing, orally, by inspection of tangible objects (including, without limitation, documents, prototypes, samples, media, documentation, discs and code). Confidential information shall include, without limitation, any materials, trade secrets, network information, configurations, trademarks, brand name, know-how, business and marketing plans, financial and operational information, and all other non-public information, material or data relating to the current and/ or future business and operations of the Disclosing Party and analysis, compilations, studies, summaries, extracts or other documentation prepared by the Disclosing Party. Confidential Information may also include information disclosed to the Receiving Party by third parties on behalf of the Disclosing Party. 

2.	The Receiving Party shall refrain from disclosing, reproducing, summarising and/or distributing Confidential Information and confidential materials of the Disclosing Party except in connection with the Proposed Transaction.

3.	The Parties shall protect the confidentiality of each other's Confidential Information in the same manner as they protect the confidentiality of their own proprietary and confidential information of similar nature. Each Party, while acknowledging the confidential and proprietary nature of the Confidential Information agrees to take all reasonable measures at its own expense to restrain its representatives from prohibited or unauthorised disclosure or use of the Confidential Information.

4.	Confidential Information shall at all times remain the property of the Disclosing Party and may not be copied or reproduced by the Receiving Party without the Disclosing Party's prior written consent.   

5.	Within seven (7) days of a written request by the Disclosing Party, the Receiving Party shall return/destroy (as may be requested in writing by the Disclosing Party or upon expiry and or earlier termination) all originals, copies, reproductions and summaries of Confidential Information provided to the Receiving Party as Confidential Information.  The Receiving Party shall certify to the Disclosing Party in writing that it has satisfied its obligations under this paragraph.  

6.	The Receiving Party may disclose the Confidential Information only to the Receiving Party's employees and consultants on a need-to-know basis.  The Receiving Party shall have executed or shall execute appropriate written agreements with third parties, in a form and manner sufficient to enable the Receiving Party to enforce all the provisions of this Agreement.

7.	Confidential Information, however, shall not include any information which the Receiving Party can show: 

i)	is in or comes into the public domain otherwise than through a breach of this Agreement or the fault of the Receiving Party; or

ii)	was already in its possession free of any such restriction prior to receipt from the Disclosing Party; or

iii)	was independently developed by the Receiving Party without making use of the Confidential Information; or

iv)	has been approved for release or use (in either case without restriction) by written authorisation of the Disclosing Party.

8.	In the event either Party receives a summons or other validly issued administrative or judicial process requiring the disclosure of Confidential Information of the other Party, the Receiving Party shall promptly notify the Disclosing Party.  The Receiving Party may disclose Confidential Information to the extent such disclosure is required by law, rule, regulation or legal process; provided however, that, to the extent practicable, the Receiving Party shall give prompt written notice of any such request for such information to the Disclosing Party,  and agrees to co-operate with the Disclosing Party, at the Disclosing Party's expense, to the extent permissible and practicable, to challenge the request or limit the scope there of, as the Disclosing Party may reasonably deem appropriate.

9.	Neither Party shall use the other's name, trademarks, proprietary words or symbols or disclose under this Agreement in any publication, press release, marketing material, or otherwise without the prior written approval of the other.

10.	Each Party agrees that the conditions in this Agreement and the Confidential Information disclosed pursuant to this Agreement are of a special, unique, and extraordinary character and that an impending or existing violation of any provision of this Agreement would cause the other Party irreparable injury for which it would have no adequate remedy at law and further agrees that the other Party shall be entitled to obtain immediately injunctive relief prohibiting such violation, in addition to any other rights and remedies available to it at law or in equity.

11.	The Receiving Party shall indemnify the Disclosing Party for all costs, expenses or damages that Disclosing Party incurs as a result of any violation of any provisions of this Agreement. This obligation shall include court, litigation expenses, and actual, reasonable attorney's fees. The Parties acknowledge that as damages may not be a sufficient remedy for any breach under this Agreement, the non-breaching party is entitled to seek specific performance or injunctive relief (as appropriate) as a remedy for any breach or threatened breach, in addition to any other remedies at law or in equity.

12. 	Neither Party shall be liable for any special, consequential, incidental or exemplary damages or loss (or any lost profits, savings or business opportunity) regardless of whether a Party was advised of the possibility of the damage or loss asserted.

13.  	Both the Parties agree that by virtue of the Parties entering into this Agreement neither Party is obligated to disclose all or any of the Confidential Information to the other as stated in this Agreement. The Parties reserve the right to disclose only such information at its discretion and which it thinks, is necessary to disclose in relation to the Proposed Transaction.

14. 	Both the Parties agree that this Agreement will be effective from the date of execution of this Agreement by both Parties and shall continue to be effective till the Proposed Transaction is terminated by either Party by giving a thirty (30)days notice, in case either Party foresees that the Proposed Transaction would not be achieved. 

Notwithstanding anything contained herein, the provisions of this Agreement shall survive and continue after expiration or termination of this Agreement for a further period of five year(s) from the date of expiration.

It being further clarified that notwithstanding anything contained herein, in case a binding agreement is executed between the Parties in furtherance of the Proposed Transaction, the terms and conditions of this Agreement shall become effective and form a part of that binding agreement and be co-terminus with such binding agreement and shall be in effect till the term of such binding agreement and shall after its expiry and or early termination shall continue to be in force in the following manner: 

i.	[SURVIVAL_YEARS_AFTER_TERMINATION] years after the termination of the binding agreement
ii.	[SURVIVAL_YEARS_AFTER_EXPIRY] years after the expiry of the binding agreement 

(whichever is earlier)

15. 	Each Party warrants that it has the authority to enter into this Agreement.

16. 	If any provision of this agreement is held to be invalid or unenforceable to any extent, the remainder of this Agreement shall not be affected and each provision hereof shall be valid and enforceable to the fullest extent permitted by law.  Any invalid or unenforceable provision of this Agreement shall be replaced with a provision that is valid and enforceable and most nearly reflects the original intent of the unenforceable provision.

17. 	This Agreement may be executed in two counterparts, each of which will be deemed to be an original, and all of which, when taken together, shall be deemed to constitute one and the same agreement.

18.  	The relationship between both the Parties to this Agreement shall be on a principal-to-principal basis and nothing in this agreement shall be deemed to have created a relationship of an agent or partner between the Parties and none of the employees of COMPANY shall be considered as employees of [PARTY_1_SHORT_NAME].

19. 	This Agreement shall be governed by the laws of India. Both parties irrevocably submit to the exclusive jurisdiction of the Courts in Bangalore, for any action or proceeding regarding this Agreement. Any dispute or claim arising out of or in connection herewith, or the breach, termination or invalidity thereof, shall be settled by arbitration in accordance with the provisions of Procedure of the Indian Arbitration & Conciliation Act, 1996, including any amendments thereof. The arbitration tribunal shall be composed of a sole arbitrator, and such arbitrator shall be appointed mutually by the Parties. The place of arbitration shall be Bangalore, India and the arbitration proceedings shall take place in the English language.

20. 	Additional oral agreements do not exist. All modifications and amendments to this Agreement must be made in writing.

21. 	The Agreement and/or any rights arising from it cannot be assigned or otherwise transferred either wholly or in part, without the written consent of the other Party.

IN WITNESS WHEREOF, THE PARTIES HERETO HAVE EXECUTED THIS CONFIDENTIALITY AGREEMENT IN DUPLICATE BY AFFIXING THE SIGNATURE OF THE AUTHORISED REPRESENTATIVES AS OF THE DATE HEREIN ABOVE MENTIONED.

[PARTY_1_SHORT_NAME]                                   [COMPANY_NAME]

Signature 1                                            Signature 1

Name: [PARTY_1_SIGNATORY_NAME]                        Name: [COMPANY_SIGNATORY_NAME]

Designation: [PARTY_1_SIGNATORY_DESIGNATION]          Designation: [COMPANY_SIGNATORY_DESIGNATION]

Place: [PARTY_1_SIGNING_PLACE]                        Place: [COMPANY_SIGNING_PLACE]

Date: [PARTY_1_SIGNING_DATE]                          Date: [COMPANY_SIGNING_DATE]

Signature 2                                            Signature 2

Name: [PARTY_1_SECOND_SIGNATORY_NAME]                 Name: [COMPANY_SECOND_SIGNATORY_NAME]

Designation: [PARTY_1_SECOND_SIGNATORY_DESIGNATION]   Designation: [COMPANY_SECOND_SIGNATORY_DESIGNATION]

Place: [PARTY_1_SECOND_SIGNING_PLACE]                 Place: [COMPANY_SECOND_SIGNING_PLACE]

Date: [PARTY_1_SECOND_SIGNING_DATE]                   Date: [COMPANY_SECOND_SIGNING_DATE]`,

  'DISSOLUTION_OF_MARRIAGE_NOTICE': `[Have to be written in Advocates Letter Head]
[ADVOCATE_NAME]
[ADVOCATE_ADDRESS]
Contact No: [ADVOCATE_CONTACT]
Email Id: [ADVOCATE_EMAIL]

To,
[RECIPIENT_NAME]
[RECIPIENT_ADDRESS]

Dated: [NOTICE_DATE]

Ref: Notice For Dissolution of Marriage

Madam,

Under instruction from and on behalf of my client Mr. [CLIENT_NAME] Son of Mr.[CLIENT_FATHER_NAME], of [CLIENT_ADDRESS], I would like to address you as follows,:- 

1. That you were married with my client on [MARRIAGE_DAY] day of [MARRIAGE_MONTH] according to Hindu rites and Customs in the presence of friends, relatives and family members of both the parties.

2. That after marriage you and my client lived together as husband and wife and cohabited with each other in your matrimonial home at [MATRIMONIAL_HOME]

{{#if NOTICE_TYPE == "MUTUAL_CONSENT"}}
3. That, after marriage my Client performed all his duties and obligations towards you as a husband and his old parents always treated you with respect and affection and always given you the status of their own daughter but unfortunately you were not happy with my Client as your demands had no limits. you used to demand for things which were beyond my Client's capabilities and upon his failure to meet your demand you used to abuse my Client and his parents with filthy languages and also used to insult him and his parents in different ways and sometimes you threaten my Client with dire consequences which caused my Client and his old parents terrible mental pain and agony.

4. That although my Client work under a very small designation and earn a nominal amount thereafter also he tried his level best to fulfil all the wishes of yours and always tried the best possible means to make you happy. But unfortunately all my Client's efforts went in vain. Though you were well aware of my Client's economical conditions even after that you used to demand for things which were beyond my Client's capabilities.

5. That in spite of all sorts of torture and harassments my Client had to continue his conjugal life with you with a future expectation that with my Client's love and care you might change your nature and behaviour but the same never came true.

6. That day by day mental and emotional torture by you towards my Client and his family has increased beyond the level of toleration and hence my client wants to dissolve his marriage immediately.

I, therefore, call upon you through this legal notice to execute the Divorce Under Mutual Consent under section 13(B) which will be signed both by you and my Client. My Client is dissolving this marriage immediately within a period of 30 days from the date of receipt of this instant legal notice, failing which my client shall be at liberty to file appropriate proceedings against you in the court of law and in that event you shall be responsible for all costs, risks and responsibilities which may be noted.
{{/if}}

{{#if NOTICE_TYPE == "DESERTION"}}
3. That on [LEFT_DATE] you went to your father's house at [FATHERS_HOUSE_ADDRESS]. you promises my client to return within 15 days, but you did not abide by your word and has not returned till date.

4. That my client went to his father-in-law's house at [FIRST_VISIT_LOCATION] several times to bring you back, but on one pretext or the other, you declined to come along with my client to his house.

5. That lastly my client went to your father's house at [LAST_VISIT_LOCATION] on [LAST_VISIT_DATE] and asked the you to return with him, but you refused to come.

6. That you deserted my client or/and has withdrawn from his company without any reasonable or lawful excuse. I, therefore, call upon you through this legal notice to return back to my clients home and resume your conjugal life with my client within a period of 15 days from the date of receipt of this instant legal notice, failing which my client shall at liberty to file appropriate proceedings against you in the court of law and in that event you shall be responsible for all costs, risks and responsibilities which may be noted.
{{/if}}

Signature of Advocate`,
};


export async function POST(request) {
  try {
    const { docType, inputs } = await request.json();
    
    if (!TEMPLATES[docType]) {
      return NextResponse.json(
        { error: 'Invalid document type' },
        { status: 400 }
      );
    }
    
    let document = TEMPLATES[docType];
    
    // Replace all placeholders with input values
    Object.entries(inputs).forEach(([key, value]) => {
      document = document.replace(
        new RegExp(`\\[${key}\\]`, 'g'),
        value || `[${key}]`
      );
    });
    
    return NextResponse.json({ document });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}