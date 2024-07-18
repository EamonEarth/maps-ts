
export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      
      <div className="flex flex-col p-12 w-[75%] gap-y-4">
        Hallo, here&apos;s a little working version of some of what we&apos;ve spoken about. 

        <div>

        Here&apos;s a super rough working version - (I&apos;ve been trying to get everything working before making it pretty!).
        I&apos;ve hidden the emails in the memberlist -
        I&apos;d suggest including a question in the next newsletter you send out asking whether members are ok with their details being shared, add that Yes/No to the airtable, and we can just add a check in the logic to only fetch the people who&apos;ve responded. 
        </div>
        <p>
          I haven&apos;t made the new sign-up forms yet, once we get the shape of everything set and know what information needs to be gathered it&apos;ll be a quick enough job.
          
        </p>
        <p>
          If you&apos;re adding data to the Airtable, please try and keep everything consistent :)
        </p>
        <div className="pt-8 flex flex-col gap-y-1">
          <h1 className="font-bold text-center">
            
            There&apos;s a lot of messiness in the data, for example:
            </h1>
          <ol>
            <li>- Region Names - &quot;Perh&quot; instead of &quot;Perth&quot; etc</li>
            <li>- Spelling - &quot;Governement&quot;, &quot;Austra;ia&quot; etc</li>
            <li>- Some affiliations in the member list (Angela Rossen )</li>
            <li>- Too much variety in Stakeholder clusters to be usefully utilised to filter</li>
            <li>- Some wild responses like the Stakeholder cluster for Coastal, Ocean and Port Engineering Panel : WA! </li>
            <li>- Aquaculture council of WA</li>
          </ol>
          <p className="">
            I can set checks and fixes for most of these things but the app will run faster if we&apos;re fetching clean data from airtable instead of tweaking when the user loads the page.
          </p>
          

        </div>


        <div className="pt-2">
          <h1 className="font-bold ">
            
            I&apos;ve tried a lot of different ways to gather all the coordinates for Stakeholders, but there&apos;s definitely still some that are completely wrong. Maybe you can explain the process in the next email and ask stakeholders to doublecheck their location is right. If it&apos;s not, I can add a little &quot;submit correction&quot; or &quot;flag error&quot; button so that they can add themselves/let you know. 

            </h1>
          

        </div>
        <div className="pt-8">
          <h1 className="font-bold text-center">
            
            list of bugs I&apos;ve noticed, please take note of anything you see!
            </h1>
          <ol>
            <li>- Formatting of the expandedInfo is very rough</li>
            <li>- CMCN member tick being covered when large stakeholder title in expandedInfo</li>
            <li>- Type filter ugliness on Stakeholder map</li>
            <li>- Up arrow navigation scrolling page aswell as div on left.</li>
            <li>- Some filters don&apos;t work because the data they&apos;re checking in the airtable is erratically listed (i.e. consultants)</li>
          </ol>

        </div>
      </div>
    </div>
  );
}
